from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import User, InstructorRequest


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "user_name", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()

        # default role = Student
        student_group = Group.objects.get(name="Student")
        user.groups.add(student_group)

        return user
    


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.utils import get_user_permission_ids

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        data["user"] = {
            "id": user.id,
            "email": user.email,
            "user_name": user.user_name,
            "permissions": get_user_permission_ids(user),
        }

        return data
    


class InstructorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructorRequest
        fields = "__all__"
        read_only_fields = ["user", "status"]
