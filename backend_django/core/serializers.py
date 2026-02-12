from rest_framework import serializers
from .models import HeaderConfiguration, HeroConfiguration, Work

class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderConfiguration
        fields = ['logo_light', 'logo_dark', 'links']

    def to_representation(self, instance):
        # Ensure field names match frontend expectations (camelCase vs snake_case)
        # Frontend expects: logoLight, logoDark
        data = super().to_representation(instance)
        return {
            'logoLight': data['logo_light'],
            'logoDark': data['logo_dark'],
            'links': data['links']
        }

class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroConfiguration
        fields = ['video_file', 'poster_file', 'title_line1', 'title_line2']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {
            'videoUrl': data['video_file'] if data['video_file'] else "",
            'posterUrl': data['poster_file'] if data['poster_file'] else "",
            'titleLine1': data['title_line1'],
            'titleLine2': data['title_line2']
        }

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ['id', 'title', 'category', 'image', 'link', 'order']
