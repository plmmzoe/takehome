from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

# Define Category Model
class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=128)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    category = models.ForeignKey(
        Category, 
        on_delete = models.CASCADE, # delete all product under the category when delete category
        related_name = 'products'
    )
    tags = models.ManyToManyField(
        Tag, 
        related_name = 'products'
    )

    def __str__(self):
        return self.name