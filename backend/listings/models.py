from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Product(models.Model):
    name = models.CharField()
    description = models.TextField()
    category = models.TextField()
    tags = ArrayField(models.TextField())

    def _str_(self):
        return self.name