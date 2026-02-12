import paramiko
import time

HOSTNAME = '37.148.214.203'
USERNAME = 'root'
PASSWORD = 'Die4sun1234.!'

def seed_content():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {HOSTNAME}...")
        ssh.connect(HOSTNAME, username=USERNAME, password=PASSWORD, look_for_keys=False, allow_agent=False, banner_timeout=30)
        print("Connected.")

        # Python script to run on VPS
        # 1. Installs requests (if missing)
        # 2. Downloads files
        # 3. Saves to Django model
        remote_script = """
import os
import sys
import django
import requests
from django.core.files.base import ContentFile

sys.path.append('/var/www/newroad-cms/backend_django')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newroad.settings')
django.setup()

from core.models import HeroConfiguration

def download_and_save():
    print("Fetching original content...")
    video_url = "https://newroad.com.tr/assets/video/hero.mp4"
    poster_url = "https://newroad.com.tr/assets/img/hero-poster.jpg"

    try:
        hero, _ = HeroConfiguration.objects.get_or_create(pk=1)
        
        # Download Video
        print(f"Downloading video from {video_url}...")
        r_vid = requests.get(video_url, stream=True)
        if r_vid.status_code == 200:
            hero.video_file.save('hero.mp4', ContentFile(r_vid.content), save=False)
        else:
            print(f"Failed to download video: {r_vid.status_code}")

        # Download Poster
        print(f"Downloading poster from {poster_url}...")
        r_img = requests.get(poster_url, stream=True)
        if r_img.status_code == 200:
            hero.poster_file.save('hero-poster.jpg', ContentFile(r_img.content), save=False)
        else:
            print(f"Failed to download poster: {r_img.status_code}")

        hero.save()
        print("Successfully saved media files to HeroConfiguration.")

    except Exception as e:
        print(f"Error seeding content: {e}")

if __name__ == "__main__":
    download_and_save()
"""
        
        # Save script to temporary file on VPS
        create_script_cmd = f"cat <<EOF > /tmp/seed_script.py\n{remote_script}\nEOF"
        ssh.exec_command(create_script_cmd)

        # Install requests and run script
        full_cmd = "cd /var/www/newroad-cms/backend_django && venv/bin/pip install requests && venv/bin/python /tmp/seed_script.py"
        
        print(f"Running content seeding on VPS...")
        stdin, stdout, stderr = ssh.exec_command(full_cmd)
        
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        
        print(out)
        if err: print(f"STDERR: {err}")

    except Exception as e:
        print(f"Failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    seed_content()
