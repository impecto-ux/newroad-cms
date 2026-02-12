import paramiko
import time
import sys

HOSTNAME = '37.148.214.203'
USERNAME = 'root'
PASSWORD = 'Die4sun1234.!'
REPO_URL = 'https://github.com/impecto-ux/newroad-cms.git'
PROJECT_DIR = '/var/www/newroad-cms'

def run_command(ssh, command, description):
    print(f"Running: {description}...")
    stdin, stdout, stderr = ssh.exec_command(command)
    exit_status = stdout.channel.recv_exit_status()
    if exit_status != 0:
        print(f"Error ({exit_status}): {stderr.read().decode().strip()}")
        # sys.exit(1) # Don't exit immediately, try to proceed or handle mismatch
    else:
        print(f"Success: {description}")
        # print(stdout.read().decode().strip())

def deploy():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {HOSTNAME}...")
        ssh.connect(HOSTNAME, username=USERNAME, password=PASSWORD, look_for_keys=False, allow_agent=False, banner_timeout=30)
        print("Connected.")

        # 1. Update & Install Dependencies
        # cmds = [
        #     "apt-get update",
        #     "apt-get install -y python3-venv python3-pip python3-dev nginx git curl",
        #     # Install Node.js 18
        #     "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -",
        #     "apt-get install -y nodejs"
        # ]
        # for cmd in cmds:
        #     run_command(ssh, cmd, f"Installing system dependencies: {cmd[:20]}...")

        # 2. Setup Project Directory & Git
        # Check if dir exists
        stdin, stdout, stderr = ssh.exec_command(f"[ -d {PROJECT_DIR} ] && echo 'exists'")
        if 'exists' in stdout.read().decode():
             run_command(ssh, f"cd {PROJECT_DIR} && git pull", "Pulling latest code")
        else:
             run_command(ssh, f"git clone {REPO_URL} {PROJECT_DIR}", "Cloning repository")

        # 3. Backend Setup
        backend_cmds = [
             f"python3 -m venv {PROJECT_DIR}/backend_django/venv",
             f"{PROJECT_DIR}/backend_django/venv/bin/pip install -r {PROJECT_DIR}/backend_django/requirements.txt",
             f"{PROJECT_DIR}/backend_django/venv/bin/pip install gunicorn",
             f"{PROJECT_DIR}/backend_django/venv/bin/python {PROJECT_DIR}/backend_django/manage.py migrate",
             f"{PROJECT_DIR}/backend_django/venv/bin/python {PROJECT_DIR}/backend_django/manage.py collectstatic --noinput",
             # Ensure media dir exists
             f"mkdir -p {PROJECT_DIR}/backend_django/media",
             f"chmod -R 755 {PROJECT_DIR}/backend_django/media",
             f"chmod -R 755 {PROJECT_DIR}/backend_django/static"
        ]
        for cmd in backend_cmds:
            run_command(ssh, cmd, f"Backend setup: {cmd.split('/')[-1][:20]}...")

        # 4. Frontend Setup
        frontend_cmds = [
            f"cd {PROJECT_DIR} && npm install",
            f"cd {PROJECT_DIR} && npm run build"
        ]
        for cmd in frontend_cmds:
             run_command(ssh, cmd, f"Frontend setup: {cmd.split('&&')[-1].strip()}...")

        # 5. Infrastructure Setup
        infra_cmds = [
            # Nginx
            f"cp {PROJECT_DIR}/nginx.conf /etc/nginx/sites-available/newroad",
            "ln -sf /etc/nginx/sites-available/newroad /etc/nginx/sites-enabled/",
            "rm -f /etc/nginx/sites-enabled/default", # Remove default if exists
            "nginx -t",
            "systemctl restart nginx",
            
            # Gunicorn Systemd
            f"cp {PROJECT_DIR}/backend_django/gunicorn.service /etc/systemd/system/newroad.service",
            "systemctl daemon-reload",
            "systemctl enable newroad",
            "systemctl restart newroad"
        ]
        for cmd in infra_cmds:
             run_command(ssh, cmd, f"Infrastructure setup: {cmd[:20]}...")
        
        print("\nDeployment Complete!")

    except Exception as e:
        print(f"Deployment failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    deploy()
