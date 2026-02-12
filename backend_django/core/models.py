from django.db import models
from django.core.exceptions import ValidationError

class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.pk and self.__class__.objects.exists():
            raise ValidationError(f"There can be only one {self.__class__.__name__} instance")
        return super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

class HeaderConfiguration(SingletonModel):
    logo_light = models.URLField(default="https://newroad.com.tr/assets/img/logo-light.png")
    logo_dark = models.URLField(default="https://newroad.com.tr/assets/img/logo-dark.png")
    
    # We will store links as JSON for simplicity to match the frontend structure quickly
    # Alternatively, we could make a separate Link model, but a JSONField is faster for configuration
    # Since we use SQLite, we can use a TextField with JSON validation or just a JSONField if using Django 3.0+
    # Django 3.0+ supports JSONField on all backends.
    links = models.JSONField(default=list)

    def __str__(self):
        return "Header Configuration"

    class Meta:
        verbose_name_plural = "Header Configuration"

class HeroConfiguration(SingletonModel):
    video_file = models.FileField(upload_to='hero/', blank=True, null=True)
    poster_file = models.FileField(upload_to='hero/', blank=True, null=True)
    title_line1 = models.CharField(max_length=100, default="WE BUILD")
    title_line2 = models.CharField(max_length=100, default="DIGITAL PRODUCTS")

    def __str__(self):
        return "Hero Configuration"

    class Meta:
        verbose_name_plural = "Hero Configuration"

class Work(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    image = models.URLField()
    link = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
