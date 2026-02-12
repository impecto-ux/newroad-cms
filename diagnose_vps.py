import paramiko
import time

HOSTNAME = '37.148.214.203'
USERNAME = 'root'
PASSWORD = 'Die4sun1234.!'

def run_diagnosis():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {HOSTNAME}...")
        ssh.connect(HOSTNAME, username=USERNAME, password=PASSWORD, look_for_keys=False, allow_agent=False, banner_timeout=30)
        print("Connected.")

        commands = [
            ("Check Nginx Status", "systemctl status nginx --no-pager"),
            ("Check Gunicorn Status", "systemctl status newroad --no-pager"),
            ("Check Nginx Errors", "tail -n 20 /var/log/nginx/error.log"),
            ("Check Internal Backend", "curl -v http://localhost:8000/api/content/"),
            ("Check Listening Ports", "netstat -tuln | grep -E '80|8000'"),
        ]

        for title, cmd in commands:
            print(f"\n--- {title} ---")
            stdin, stdout, stderr = ssh.exec_command(cmd)
            print(stdout.read().decode())
            err = stderr.read().decode()
            if err:
                print(f"STDERR: {err}")

    except Exception as e:
        print(f"Diagnosis failed: {e}")
    finally:
        ssh.close()

if __name__ == "__main__":
    run_diagnosis()
