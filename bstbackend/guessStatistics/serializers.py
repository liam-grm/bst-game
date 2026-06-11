# Serializers convert the model instantces to JSON so that the frontend can work with the data
from rest_framework import serializers
from .models import GuessAttempt

class GuessAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuessAttempt # model
        fields = ('id', 'pokemon', 'correct', 'created_at') 
        read_only_fields = ('id','created_at')

    def validate_pokemon(self, value):
        return value.strip().lower()
    
class GuessAttemptCreateResponseSerializer(serializers.Serializer):
    attempt = GuessAttemptSerializer()            #document the enriched response structure
    global_stats = serializers.DictField()
    pokemon_stats = serializers.DictField()