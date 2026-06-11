from django.db import models

# Create your models here.

class GuessAttempt(models.Model):
    pokemon = models.CharField(max_length=40)  # target pokemon name (lowercase)
    correct = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"{self.pokemon} ({'correct' if self.correct else 'wrong'})"