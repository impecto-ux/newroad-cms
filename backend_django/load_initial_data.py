import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newroad.settings')
django.setup()

from core.models import HeaderConfiguration, HeroConfiguration, Work

def load():
    try:
        # Assuming run from backend_django directory
        with open('../server/data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Header
        header_data = data.get('header', {})
        header, _ = HeaderConfiguration.objects.get_or_create(pk=1)
        header.logo_light = header_data.get('logoLight', '')
        header.logo_dark = header_data.get('logoDark', '')
        header.links = header_data.get('links', [])
        header.save()
        print("Header updated.")

        # Hero
        hero_data = data.get('hero', {})
        hero, _ = HeroConfiguration.objects.get_or_create(pk=1)
        # video_url and poster_url replaced by FileFields. 
        # We leave them empty for now so user can upload via Admin.
        # hero.video_url = hero_data.get('videoUrl', '')
        # hero.poster_url = hero_data.get('posterUrl', '')
        hero.title_line1 = hero_data.get('titleLine1', '')
        hero.title_line2 = hero_data.get('titleLine2', '')
        hero.save()
        print("Hero updated.")

        # Works
        Work.objects.all().delete()
        works_data = data.get('works', [])
        for w in works_data:
            Work.objects.create(
                title=w.get('title', ''),
                category=w.get('category', ''),
                image=w.get('image', ''),
                link=w.get('link', ''),
                order=w.get('id', 0)
            )
        print(f"Imported {len(works_data)} works.")
    except Exception as e:
        print(f"Error loading data: {e}")

if __name__ == '__main__':
    load()
