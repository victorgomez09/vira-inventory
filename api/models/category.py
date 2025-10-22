from django.db import models

class Category(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100, null=False)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name