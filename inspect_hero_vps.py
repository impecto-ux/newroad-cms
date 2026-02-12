import paramiko
import time

HOSTNAME = '37.148.214.203'
USERNAME = 'root'
PASSWORD = 'Die4sun1234.!'

def inspect_hero():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {HOSTNAME}...")
        ssh.connect(HOSTNAME, username=USERNAME, password=PASSWORD, look_for_keys=False, allow_agent=False, banner_timeout=30)
        print("Connected.")

        remote_script = """
import os
import sys
import django

sys.path.append('/var/www/newroad-cms/backend_django')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newroad.settings')
django.setup()

from core.models import HeroConfiguration

def inspect():
    try:
        hero = HeroConfiguration.objects.first()
        if not hero:
            print("No HeroConfiguration found!")
            return

        print(f"ID: {hero.id}")
        print(f"Video File: '{hero.video_file}'")
        if hero.video_file:
            print(f"Video URL: {hero.video_file.url}")
        else:
            print("Video URL: None")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect()
"""
        # Save script to temporary file on VPS
        create_script_cmd = f"cat <<EOF > /tmp/inspect_hero.py\n{remote_script}\nEOF"
        ssh.exec_command(create_script_cmd)

        # Run script
        full_cmd = "cd /var/www/newroad-cms/backend_django && venv/bin/python /tmp/inspect_hero.py"
        
        print(f"Running inspection on VPS...")
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
    inspect_hero()
