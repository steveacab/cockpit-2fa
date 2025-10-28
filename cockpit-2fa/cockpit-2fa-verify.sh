#!/bin/bash
CODE=$1
USER=${SUDO_USER:-$(whoami)}
SECRET_FILE="/home/$USER/.google_authenticator"

# Verifica codice con oathtool
if oathtool --totp -b "$(head -n 1 "$SECRET_FILE")" | grep -q "^$CODE$"; then
    echo "Verification successful!"
else
    echo "Verification failed."
fi
