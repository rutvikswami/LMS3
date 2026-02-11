from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

from courses.models import Chapter, Course, Section, Enrollment
from courses.serializers import (
    ChapterSerializer,
    CourseSerializer,
    CourseDetailSerializer,
    SectionSerializer, 
    EnrollmentSerializer,
    CourseListSerializer,
)

from accounts.utils import has_permission

CREATE_COURSE = 1
UPDATE_COURSE = 2

class CreateCourseView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        if not has_permission(user, CREATE_COURSE):
            raise PermissionDenied("You cannot create courses")
        
        serializer.save(creator=user)
    
class UpdateCourseView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_object(self):
        course = super().get_object()
        user = self.request.user

        if course.creator != user:
            raise PermissionDenied("You can only edit your own course")
        
        if not has_permission(user, UPDATE_COURSE):
            raise PermissionDenied("No permission to edit course")
        return course

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class CourseListView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [permissions.AllowAny]

    

    def get_queryset(self):
        return Course.objects.filter(is_published = True)



class MyCoursesView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(
            creator=self.request.user
        )



ENROLL_COURSE = 5



class MyEnrollmentsView(generics.ListAPIView):
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(
            enrollments__user=self.request.user
        )


class EnrollCourseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, course_id):
        user = request.user

        if not has_permission(user, ENROLL_COURSE):
            raise PermissionDenied("You are not allowed to enroll")
        
        

        course = get_object_or_404(Course, id=course_id)

        if course.creator == user:
            return Response(
                {"status": "creator has access automatically"},
                status=200
            )


        enrollment, created = Enrollment.objects.get_or_create(
            user=user,
            course=course
        )

        if created:
            return Response({"status": "enrolled"}, status=201)
        else:
            return Response({"status": "already enrolled"}, status=200)



class TogglePublishCourseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        course = get_object_or_404(Course, pk=pk)

        if course.creator != request.user:
            raise PermissionDenied("You can only publish your own course.")

        course.is_published = not course.is_published
        course.save()

        return Response({
            "is_published": course.is_published
        })
    


class InstructorCourseDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)

        if course.creator != request.user:
            raise PermissionDenied(
                "You can only access your own courses."
            )

        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)


class InstructorDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        courses = Course.objects.filter(creator=user)

        total_courses = courses.count()
        published_courses = courses.filter(is_published=True).count()
        unpublished_courses = courses.filter(is_published=False).count()

        total_enrollments = Enrollment.objects.filter(
            course__creator=user
        ).count()

        total_students = Enrollment.objects.filter(
            course__creator=user
        ).values("user").distinct().count()

        return Response({
            "total_courses": total_courses,
            "published_courses": published_courses,
            "unpublished_courses": unpublished_courses,
            "total_enrollments": total_enrollments,
            "total_students": total_students,
        })



class LearnCourseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)

        # Allow creator
        if course.creator == request.user:
            serializer = CourseDetailSerializer(course)
            return Response(serializer.data)

        # Allow enrolled students
        is_enrolled = Enrollment.objects.filter(
            user=request.user,
            course=course
        ).exists()

        if not is_enrolled:
            raise PermissionDenied(
                "You must enroll to access this course."
            )

        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)
