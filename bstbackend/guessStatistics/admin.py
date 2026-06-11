from django.contrib import admin
from .models import GuessAttempt

class bstAdmin(admin.ModelAdmin):
    list_display = ('pokemon', 'correct')

# Register your models here.

admin.site.register(GuessAttempt, bstAdmin)