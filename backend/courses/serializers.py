from rest_framework import serializers
from .models import Course, Section, Chapter, Enrollment
from django.db.models import Sum

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ["id", "title", "video_url", "video_duration", "order"]

    def get_video_url(self, obj):
        request = self.context.get("request")
        user = request.user if request else None
    
        if not user or not user.is_authenticated:
            return None

        if obj.section.course.enrollments.filter(user=user).exists():
            return obj.video_url

        if obj.section.course.creator == user:
            return obj.video_url

        
        return None


class SectionSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ["id", "title", "order", "chapters"]


class CourseSerializer(serializers.ModelSerializer):

    
    total_hours = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "requirements",
            "total_hours",
        ]
        read_only_fields = ["total_hours"]


    def get_total_hours(self, obj):
        total_hours = Chapter.objects.filter(
            section__course=obj
        ).aggregate(
            total = Sum("video_duration")
        )["total"] or 0
        return total_hours    


class CourseDetailSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    total_hours = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "requirements",
            "total_hours",
            "sections",
            "is_published",
        ]

    def get_total_hours(self, obj):
        total_hours = Chapter.objects.filter(
            section__course=obj
        ).aggregate(
            total = Sum("video_duration")
        )["total"] or 0
        return total_hours

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ["id", "user", "course", "status"]
        read_only_fields = ["user"]


class CourseListSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source="creator.user_name", read_only=True)
    
    total_hours = serializers.SerializerMethodField()

    
    creator_id = serializers.IntegerField(
        source="creator.id",
        read_only=True
    )


    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "thumbnail",
            "total_hours",
            "creator_name",
            "creator_id",
        ]

    def get_total_hours(self, obj):
        total_hours = Chapter.objects.filter(
            section__course=obj
        ).aggregate(
            total = Sum("video_duration")
        )["total"] or 0
        return total_hours
