#!/bin/bash
USER=${SUDO_USER:-$(whoami)}
SECRET_FILE="/home/$USER/.google_authenticator"

if [ -f "$SECRET_FILE" ]; then
    echo "enabled"
else
    echo "disabled"
fi
