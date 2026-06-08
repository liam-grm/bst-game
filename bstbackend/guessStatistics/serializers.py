# Serializers convert the model instantces to JSON so that the frontend can work with the data
from rest_framework import serializers
from .models import guessAttempt

class guessSerializer(serializers.ModelSerializer):
    class Meta:
        model = guessAttempt # Specifies model to work with
        fields = ('id', 'pokemon', 'correct') # Fields to be converted