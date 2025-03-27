from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BebidaViewSet

router = DefaultRouter()
router.register(r'bebidas', BebidaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]