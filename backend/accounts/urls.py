from django.urls import path
from accounts.view_list.auth_views import RegisterView, CustomTokenObtainPairView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", CustomTokenObtainPairView.as_view()),
]
