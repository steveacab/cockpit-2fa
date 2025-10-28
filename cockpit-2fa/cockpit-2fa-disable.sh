#!/bin/bash
USER=${SUDO_USER:-$(whoami)}
SECRET_FILE="/home/$USER/.google_authenticator"

if [ -f "$SECRET_FILE" ]; then
    sudo -u rustuser rm -f "$SECRET_FILE"
    echo "2FA disabled successfully"
else
    echo "2FA was not enabled"
fi
