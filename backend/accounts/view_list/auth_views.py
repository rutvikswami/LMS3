from rest_framework import generics
from accounts.models import User, InstructorRequest
from accounts.serializers import RegisterSerializer, InstructorRequestSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer




class CreateInstructorRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # prevent duplicate pending request
        existing = InstructorRequest.objects.filter(
            user=request.user,
            status="pending"
        ).exists()

        if existing:
            return Response(
                {"detail": "Request already pending."},
                status=400
            )

        serializer = InstructorRequestSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

