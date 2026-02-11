from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

from courses.models import Chapter, Course, Section, Enrollment
from courses.serializers import (
    SectionSerializer, 
)
from django.db import transaction

    
class CreateSectionView(generics.CreateAPIView):
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        course_id = self.request.data.get("course")

        if not course_id:
            raise PermissionDenied("Course ID is required")

        course = get_object_or_404(Course, id=course_id)

        if course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        serializer.save(course=course)

class UpdateSectionView(generics.UpdateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        section = super().get_object()
        user = self.request.user

        if section.course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        return section
    

class DeleteSectionView(generics.DestroyAPIView):
    queryset = Section.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        section = super().get_object()
        user = self.request.user

        if section.course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        return section




class ReorderSectionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        sections = request.data.get("sections", [])

        with transaction.atomic():
            for item in sections:
                Section.objects.filter(
                    id=item["id"],
                    course__creator=request.user
                ).update(order=item["order"])

        return Response({"status": "reordered"})

