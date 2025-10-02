from django.contrib import admin
from .models import Product, Tag, Category


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'get_category', 'get_tags') # def tuple
 
    def get_category(self, obj):
        return obj.category.name
    
    def get_tags(self, obj):
        return ', '.join(e.name for e in obj.tags.all())
    
    get_category.short_description = 'Category'
    get_tags.short_description = 'Tags'

class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    # TODO: Tag operation pending

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    # TODO: Category operations pending

# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Category, CategoryAdmin)