from .models import GroupPermission

def get_user_permission_ids(user):
    perms = GroupPermission.objects.filter(
        group__in = user.groups.all()
    ).values_list("permission__id", flat=True)
    return list(perms)

def has_permission(user, perm_id):
    return perm_id in get_user_permission_ids(user)