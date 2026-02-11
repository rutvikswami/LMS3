from django.urls import path
from accounts.view_list.auth_views import RegisterView, CustomTokenObtainPairView, CreateInstructorRequestView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", CustomTokenObtainPairView.as_view()),
    path("instructor-request/",CreateInstructorRequestView.as_view(),),

]
