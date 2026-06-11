from django.db.models import Count, Q
from .models import GuessAttempt

def get_global_stats():
    agg = GuessAttempt.objects.aggregate(
        total=Count('id'),
        correct=Count('id', filter=Q(correct=True)),
    )
    total = agg['total'] or 0
    correct = agg['correct'] or 0
    return {
        'total': total,
        'correct': correct,
        'accuracy': round(100 * correct / total, 1) if total else 0,
    }
def get_pokemon_stats(pokemon_name):
    qs = GuessAttempt.objects.filter(pokemon=pokemon_name.lower())
    total = qs.count()
    correct = qs.filter(correct=True).count()
    return {
        'pokemon': pokemon_name.lower(),
        'total': total,
        'correct': correct,
        'accuracy': round(100 * correct / total, 1) if total else 0,
    }
