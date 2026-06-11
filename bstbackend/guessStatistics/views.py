from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import GuessAttempt
from .serializers import GuessAttemptSerializer
from .stats import get_global_stats, get_pokemon_stats


class GuessAttemptViewSet(viewsets.ModelViewSet):
    serializer_class = GuessAttemptSerializer
    queryset = GuessAttempt.objects.all()
    http_method_names = ['get', 'post', 'head', 'options']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        attempt = serializer.save()
        pokemon_name = attempt.pokemon
        return Response({
            'attempt': GuessAttemptSerializer(attempt).data,
            'global_stats': get_global_stats(),
            'pokemon_stats': get_pokemon_stats(pokemon_name),
        }, status=status.HTTP_201_CREATED)
