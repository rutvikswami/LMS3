from django.contrib import admin
from .models import Course, Section, Chapter, Enrollment

# Register your models here.

admin.site.register(Course)
admin.site.register(Section)
admin.site.register(Chapter)
admin.site.register(Enrollment)
