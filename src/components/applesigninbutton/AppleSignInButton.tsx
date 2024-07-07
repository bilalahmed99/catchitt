import React from 'react';
import AppleSignin from 'react-apple-signin-auth';

const AppleSigninButtonCustom = () => {
  return (
    <AppleSignin
      authOptions={{
        clientId: 'com.posh.seezitt', // Your service ID from Apple Developer account
        scope: 'email name', // the scopes you want to access
        redirectURI: 'https://74a1-39-58-195-146.ngrok-free.app/auth/callback', // Your ngrok URL
        state: 'state', // State parameter
        nonce: 'nonce', // Nonce parameter
        usePopup: true, // Whether to use popup window or not
      }}
      uiType="dark"
      className="apple-auth-btn"
      noDefaultStyle={false}
      buttonExtraChildren="Continue with Apple"
      onSuccess={(response: any) => console.log(response)}
      onError={(error: any) => console.error(error)}
    />
  );
};

export default AppleSigninButtonCustom;
