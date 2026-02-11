from django.urls import path
from courses.view_list.course_views import (
    CreateCourseView,
    UpdateCourseView,
    CourseDetailView,

    EnrollCourseView,
    CourseListView,
    MyEnrollmentsView,
    MyCoursesView,
    TogglePublishCourseView,
    InstructorDashboardView,
    InstructorCourseDetailView,
    LearnCourseView,
)

from courses.view_list.section_views import (
    CreateSectionView,
    DeleteSectionView,
    UpdateSectionView,
    ReorderSectionView
)

from courses.view_list.chapter_views import (
    CreateChapterView,
    DeleteChapterView,
    UpdateChapterView,
    ReorderChapterView,
)

urlpatterns = [
    path("", CourseListView.as_view()),

    path("my-enrollments/", MyEnrollmentsView.as_view()),
    path("my-courses/", MyCoursesView.as_view()),


    path("create/", CreateCourseView.as_view(), name="create-course"),
    path("<int:pk>/update/", UpdateCourseView.as_view(), name="update-course"),
    path("<int:pk>/", CourseDetailView.as_view(), name = 'course-detail'),
    path("learn/<int:pk>/",LearnCourseView.as_view(),),
    
    path("section/create/", CreateSectionView.as_view()),
    path("section/<int:pk>/update/", UpdateSectionView.as_view()),
    path("section/<int:pk>/delete/", DeleteSectionView.as_view()),
    path("section/reorder/", ReorderSectionView.as_view()),


    path("chapter/create/", CreateChapterView.as_view()),
    path("chapter/<int:pk>/update/", UpdateChapterView.as_view()),
    path("chapter/<int:pk>/delete/", DeleteChapterView.as_view()),
    path("chapter/reorder/", ReorderChapterView.as_view()),


    path("<int:course_id>/enroll/", EnrollCourseView.as_view()),
    path("<int:pk>/toggle-publish/", TogglePublishCourseView.as_view()),


    path("instructor/dashboard/", InstructorDashboardView.as_view()),
    path("instructor/course/<int:pk>/",InstructorCourseDetailView.as_view()),

]
