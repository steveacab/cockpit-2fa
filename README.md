## Enable 2FA directly in Cockpit.

It require Google Authenticator

``
sudo apt install libpam-google-authenticator
``

And oathtool to verify it

``
sudo apt install oathtool
``

Copy the folder in /usr/share/cockpit/

Done.

![cockpit-mfa_enable](https://github.com/user-attachments/assets/8471471b-18e4-432c-bdbc-8c177891ad8b)

![cockpit-mfa-disable](https://github.com/user-attachments/assets/b956e9b7-f99f-476c-bb1e-e5ab8fba5bd9)
