from django.contrib import admin
from .models import guessAttempt

class bstAdmin(admin.ModelAdmin):
    list_display = ('pokemon', 'correct')

# Register your models here.

admin.site.register(guessAttempt, bstAdmin)