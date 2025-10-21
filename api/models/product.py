from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(null=False)
    colour = models.CharField(null=False)
    quantity = models.IntegerField(null=False, default=0)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name