#!/bin/bash
USER=${SUDO_USER:-$(whoami)}
SECRET_FILE="/home/$USER/.google_authenticator"

if [ ! -f "$SECRET_FILE" ]; then
    sudo -u rustuser google-authenticator -t -f -d -r 3 -R 30 -w 3 -q > /dev/null
fi

SECRET=$(head -n 1 "$SECRET_FILE")
URL="otpauth://totp/rustuser@$(hostname)?secret=$SECRET&issuer=Cockpit"

# Genera il QR code e restituisci direttamente il base64
qrencode -t PNG -o - "$URL" | base64 -w 0
