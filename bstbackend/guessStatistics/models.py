from django.db import models

# Create your models here.

class guessAttempt(models.Model):
    pokemon = models.CharField(max_length=40) #change
    correct = models.BooleanField()

    def str (self):
        return (self.pokemon, self.correct)
