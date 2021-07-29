from django.contrib import admin
from .models import TAdmin, Team, Ongoing, Completed

# Register your models here.

admin.site.register(TAdmin)
admin.site.register(Team)
admin.site.register(Ongoing)
admin.site.register(Completed)