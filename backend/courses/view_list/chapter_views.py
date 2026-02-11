from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

from courses.models import Chapter, Course, Section, Enrollment
from courses.serializers import (
    ChapterSerializer,
)

from accounts.utils import has_permission
from django.db import transaction


class CreateChapterView(generics.CreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        section_id = self.request.data.get("section")

        if not section_id:
            raise PermissionDenied("Section ID is required")

        section = get_object_or_404(Section, id=section_id)
        course = section.course

        if course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        serializer.save(section=section)

class UpdateChapterView(generics.UpdateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        chapter = super().get_object()
        user = self.request.user

        if chapter.section.course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        return chapter

class DeleteChapterView(generics.DestroyAPIView):
    queryset = Chapter.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        chapter = super().get_object()
        user = self.request.user

        if chapter.section.course.creator != user:
            raise PermissionDenied("You can only modify your own course")

        return chapter





class ReorderChapterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):

        section_id = request.data.get("section_id")
        chapters = request.data.get("chapters", [])

        if not section_id:
            return Response(
                {"detail": "section_id is required"},
                status=400
            )

        section = get_object_or_404(Section, id=section_id)

        # Only creator can reorder
        if section.course.creator != request.user:
            raise PermissionDenied(
                "You can only modify your own course"
            )

        with transaction.atomic():
            for item in chapters:
                Chapter.objects.filter(
                    id=item["id"],
                    section=section
                ).update(order=item["order"])

        return Response({"status": "reordered"})
