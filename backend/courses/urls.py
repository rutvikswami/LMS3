from django.urls import path
from courses.view_list.course_views import (
    CreateCourseView,
    UpdateCourseView,
    CourseDetailView,
    CreateSectionView,
    CreateChapterView,
    DeleteSectionView,
    UpdateSectionView,
    UpdateChapterView,
    DeleteChapterView,

    EnrollCourseView,
    CourseListView,
    MyEnrollmentsView,
    MyCoursesView,
    PublishCourseView,
)

urlpatterns = [
    path("", CourseListView.as_view()),

    path("my-enrollments/", MyEnrollmentsView.as_view()),
    path("my-courses/", MyCoursesView.as_view()),


    path("create/", CreateCourseView.as_view(), name="create-course"),
    path("<int:pk>/update/", UpdateCourseView.as_view(), name="update-course"),
    path("<int:pk>/", CourseDetailView.as_view(), name = 'course-detail'),
    
    path("section/create/", CreateSectionView.as_view()),
    path("section/<int:pk>/update/", UpdateSectionView.as_view()),
    path("section/<int:pk>/delete/", DeleteSectionView.as_view()),

    path("chapter/create/", CreateChapterView.as_view()),
    path("chapter/<int:pk>/update/", UpdateChapterView.as_view()),
    path("chapter/<int:pk>/delete/", DeleteChapterView.as_view()),

    path("<int:course_id>/enroll/", EnrollCourseView.as_view()),
    path("<int:course_id>/publish/", PublishCourseView.as_view()),

]
