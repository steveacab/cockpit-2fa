Cockpit.Module.register('cockpit-2fa', {
    title: 'Two-Factor Authentication',
    html: 'cockpit-2fa/cockpit-2fa.html',
    ready: function() {
        var enableBtn = document.getElementById('enable-2fa');
        var verifyBtn = document.getElementById('verify-code');
        var qrDiv = document.getElementById('qr-code');
        var codeInput = document.getElementById('verification-code');
        var statusDiv = document.getElementById('status');
        
        enableBtn.addEventListener('click', function() {
            statusDiv.textContent = 'Generating QR code...';
            qrDiv.innerHTML = '';
            
            cockpit.spawn(['/usr/share/cockpit/cockpit-2fa/cockpit-2fa-setup.sh'], { superuser: "try" })
                .done(function(base64Data) {
                    console.log('Received base64 data, length:', base64Data.length);
                    
                    if (!base64Data || base64Data.trim().length === 0) {
                        statusDiv.textContent = 'Error: No QR code data received';
                        return;
                    }
                    
                    var cleanBase64 = base64Data.trim();
                    qrDiv.innerHTML = '<img src="data:image/png;base64,' + cleanBase64 + '" style="max-width:300px; border: 1px solid #ccc;"/>';
                    codeInput.style.display = 'block';
                    verifyBtn.style.display = 'block';
                    statusDiv.textContent = 'Scan the QR code with your authenticator app';
                })
                .fail(function(err) {
                    console.error('Setup error:', err);
                    statusDiv.textContent = 'Setup failed: ' + err;
                });
        });
        
        verifyBtn.addEventListener('click', function() {
            var code = codeInput.value.trim();
            if (!code) {
                statusDiv.textContent = 'Please enter a verification code';
                return;
            }
            
            cockpit.spawn(['/usr/share/cockpit/cockpit-2fa/cockpit-2fa-verify.sh', code])
                .done(function(result) {
                    statusDiv.textContent = result.trim();
                })
                .fail(function(err) {
                    console.error('Verification error:', err);
                    statusDiv.textContent = 'Verification failed: ' + err;
                });
        });
    }
});
