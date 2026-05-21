from django.urls import path
from .views import (
    generate_audit,
    detect_changes,
    get_audit
)
urlpatterns = [
    path('audit/', generate_audit),
    path('detect-changes/', detect_changes),
    path(
    'audit/<uuid:audit_id>/',
    get_audit),
]