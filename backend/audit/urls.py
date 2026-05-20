from django.urls import path
from .views import (
    generate_audit,
    detect_changes
)
urlpatterns = [
    path('audit/', generate_audit),
    path('detect-changes/', detect_changes),
]