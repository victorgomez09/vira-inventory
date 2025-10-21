from uuid import uuid4
from django.db import models

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(null=False)
    colour = models.CharField(null=False)
    quantity = models.IntegerField(null=False, default=0)
    image = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name