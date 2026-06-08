from django.shortcuts import render

from rest_framework import viewsets
from .serializers import guessSerializer
from .models import guessAttempt

class guessView(viewsets.ModelViewSet):
    serializer_class = guessSerializer
    queryset = guessAttempt.objects.all()

#Viewset base class provides the implementation for CRUD operations
#by default. This code specifies the serializer_class and the
#queryset