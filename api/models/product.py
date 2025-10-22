from django.db import models
from api.models.category import Category

class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    colour = models.CharField(null=False)
    quantity = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
    )

    def __str__(self):
        return self.name