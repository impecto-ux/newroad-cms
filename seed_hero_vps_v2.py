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
        
        # Determine correct python path
        # python_cmd = "/var/www/newroad-cms/backend_django/venv/bin/python"
        
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
    print("--- Starting Content Seeding ---")
    video_url = "https://newroad.com.tr/storage/web_teaser_1-20250219200849.mp4"
    poster_url = "https://newroad.com.tr/assets/img/hero-poster.jpg" # Likely 404, but trying anyway

    try:
        hero, created = HeroConfiguration.objects.get_or_create(pk=1)
        print(f"Hero Instance: {hero} (Created: {created})")
        
        # Download Video
        print(f"Downloading video from {video_url}...")
        try:
            r_vid = requests.get(video_url, stream=True, timeout=30)
            if r_vid.status_code == 200:
                content = r_vid.content
                size = len(content)
                print(f"Video downloaded. Size: {size} bytes")
                if size > 1000: # Basic validity check
                    # save=True triggers model save immediately
                    hero.video_file.save('hero.mp4', ContentFile(content), save=True)
                    print(f"Video saved to: {hero.video_file.name}")
                    print(f"Video URL via Django: {hero.video_file.url}")
                else:
                    print("Video file too small, skipping save.")
            else:
                print(f"Failed to download video: Status {r_vid.status_code}")
        except Exception as vid_err:
            print(f"Exception downloading video: {vid_err}")

        # Download Poster
        # print(f"Downloading poster from {poster_url}...")
        # r_img = requests.get(poster_url, stream=True)
        # if r_img.status_code == 200:
        #     hero.poster_file.save('hero-poster.jpg', ContentFile(r_img.content), save=True)
        #     print(f"Poster saved to: {hero.poster_file.name}")
        # else:
        #     print(f"Failed to download poster: {r_img.status_code}")

        # Final Verify
        hero.refresh_from_db()
        print(f"Final Video Field: '{hero.video_file}'")
        
    except Exception as e:
        print(f"Critical Error seeding content: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    download_and_save()
"""
        # Save script to temporary file on VPS
        create_script_cmd = f"cat <<EOF > /tmp/seed_script_v2.py\n{remote_script}\nEOF"
        ssh.exec_command(create_script_cmd)

        # Install requests and run script
        full_cmd = "cd /var/www/newroad-cms/backend_django && venv/bin/pip install requests && venv/bin/python /tmp/seed_script_v2.py"
        
        print(f"Running content seeding v2 on VPS...")
        stdin, stdout, stderr = ssh.exec_command(full_cmd)
        
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        
        print("--- Output ---")
        print(out)
        if err: 
            print("--- Stderr ---")
            print(err)

    except Exception as e:
        print(f"Failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    seed_content()
