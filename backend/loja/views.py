from loja.serializer.bebida_serializer import BebidaSerializer
from rest_framework import viewsets
from .models import Bebida

class BebidaViewSet(viewsets.ModelViewSet):
    queryset = Bebida.objects.all()
    serializer_class = BebidaSerializer
