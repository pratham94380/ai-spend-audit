from django.urls import path
from .views import generate_audit

urlpatterns = [
    path('audit/', generate_audit),
]