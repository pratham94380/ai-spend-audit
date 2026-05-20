from django.db import models

import uuid


class Audit(models.Model):

    audit_id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        unique=True
    )

    email = models.EmailField()

    input_stack = models.JSONField()

    output_result = models.JSONField()

    pricing_snapshot = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return f"{self.email} - {self.audit_id}"