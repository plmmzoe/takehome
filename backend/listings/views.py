from django.shortcuts import render
from rest_framework import viewsets
from .serializer import ProductSerializer, CategorySerializer, TagSerializer
from .models import Product, Category, Tag

# Create your views here.

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        queryset = Product.objects.all()

        # get filter value from request
        desc = self.request.GET.get('desc')
        category = self.request.GET.get('category')
        tags = self.request.GET.getlist('tags')

        # if filter exist
        if desc:
            queryset = queryset.filter(description__icontains=desc) # ignore case
        if category:
            queryset = queryset.filter(category__name=category) # match category name
        if tags:
            queryset = queryset.filter(tags__name__in=tags).distinct() # match tag name

        return queryset
    
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()