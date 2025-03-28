from loja.models import Bebida
from rest_framework import serializers

class BebidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bebida
        fields = '__all__'
