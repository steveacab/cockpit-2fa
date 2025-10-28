## Enable 2FA directly in Cockpit.

It require Google Authenticator

``
sudo apt install libpam-google-authenticator -y
``

And oathtool to verify it

``
sudo apt install oathtool
``

Copy the folder in /usr/share/cockpit/

Done.

