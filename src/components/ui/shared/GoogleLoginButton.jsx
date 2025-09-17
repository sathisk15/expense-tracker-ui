import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function GoogleLoginButton() {
  const handleSuccess = (credentialResponse) => {
    // The response contains the JWT token in the 'credential' field
    console.log(credentialResponse);
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log('Login Success! User Info: ', credentialResponseDecoded);

    // Here you would typically:
    // 1. Send this token to your backend to verify and create a session.
    // 2. Store user info in your app's state (e.g., React Context or Redux).
    // 3. Redirect the user to their dashboard.
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap // This enables the One Tap login experience
    />
  );
}

export default GoogleLoginButton;
