from django.contrib import admin
from .models import User, Permission, GroupPermission
# Register your models here.

admin.site.register(User)
admin.site.register(Permission)
admin.site.register(GroupPermission)

from .models import InstructorRequest

@admin.register(InstructorRequest)
class InstructorRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "created_at")
    list_filter = ("status",)