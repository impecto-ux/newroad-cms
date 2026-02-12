from django.contrib import admin
from .models import HeaderConfiguration, HeroConfiguration, Work

@admin.register(HeaderConfiguration)
class HeaderAdmin(admin.ModelAdmin):
    # Determine if we want to allow adding multiple
    # Since it's a singleton, we might want to restrict add permission
    def has_add_permission(self, request):
        return not HeaderConfiguration.objects.exists()

@admin.register(HeroConfiguration)
class HeroAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not HeroConfiguration.objects.exists()

@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order')
    list_editable = ('order',)
