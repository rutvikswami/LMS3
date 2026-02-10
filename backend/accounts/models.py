from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None  # remove default username
    email = models.EmailField(unique=True)
    user_name = models.CharField(max_length=150, default='user')
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']

    objects = UserManager()

    def __str__(self):
        return self.email

class Permission(models.Model):
    code = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.code
    
class GroupPermission(models.Model):
    group = models.ForeignKey(
        'auth.Group',
        on_delete=models.CASCADE
    )
    permission = models.ForeignKey(
        Permission,
        on_delete=models.CASCADE
    )
    class Meta:
        unique_together = ('group', 'permission')
    
    def __str__(self):
        return f"{self.group.name} -> {self.permission.code}"
# connect signals
# import accounts.signals
