from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group
from accounts.models import Permission, GroupPermission


class Command(BaseCommand):
    help = "Setup default roles and permissions"

    def handle(self, *args, **options):

        # Create groups
        groups = {
            "Student": None,
            "Instructor": None,
            "Admin": None,
        }

        for name in groups:
            group, _ = Group.objects.get_or_create(name=name)
            groups[name] = group
            self.stdout.write(self.style.SUCCESS(f"Group ensured: {name}"))

        # Create permissions
        permissions = [
            ("create_course", "Can create courses"),
            ("edit_own_course", "Can edit own courses"),
            ("delete_own_course", "Can delete own courses"),
            ("view_course", "Can view courses"),
            ("enroll_course", "Can enroll in courses"),
        ]

        perm_objects = {}
        for code, desc in permissions:
            perm, _ = Permission.objects.get_or_create(
                code=code,
                defaults={"description": desc}
            )
            perm_objects[code] = perm
            self.stdout.write(self.style.SUCCESS(f"Permission ensured: {code}"))

        # Map permissions to roles
        role_permissions = {
            "Student": ["view_course", "enroll_course"],
            "Instructor": [
                "create_course",
                "edit_own_course",
                "delete_own_course",
                "view_course",
            ],
            "Admin": [
                "create_course",
                "edit_own_course",
                "delete_own_course",
                "view_course",
                "enroll_course",
            ],
        }

        for role, perm_codes in role_permissions.items():
            group = groups[role]
            for code in perm_codes:
                GroupPermission.objects.get_or_create(
                    group=group,
                    permission=perm_objects[code]
                )

        self.stdout.write(self.style.SUCCESS("Roles and permissions setup complete."))
