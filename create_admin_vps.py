import paramiko
import time

HOSTNAME = '37.148.214.203'
USERNAME = 'root'
PASSWORD = 'Die4sun1234.!'

def create_admin():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {HOSTNAME}...")
        ssh.connect(HOSTNAME, username=USERNAME, password=PASSWORD, look_for_keys=False, allow_agent=False, banner_timeout=30)
        print("Connected.")

        # Command to create superuser if not exists
        django_cmd = "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin')"
        
        full_cmd = f"cd /var/www/newroad-cms/backend_django && venv/bin/python manage.py shell -c \"{django_cmd}\""
        
        print(f"Running: Create Superuser 'admin'...")
        stdin, stdout, stderr = ssh.exec_command(full_cmd)
        
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        
        if out: print(f"Output: {out}")
        if err: print(f"Error/Info: {err}")
        
        print("\nSuperuser 'admin' / 'admin' created (or already existed).")

    except Exception as e:
        print(f"Failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    create_admin()
