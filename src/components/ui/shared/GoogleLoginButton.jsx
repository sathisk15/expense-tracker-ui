import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton({ text = 'signin_with', handleSuccess }) {
  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap // This enables the One Tap login experience
      text={text} // 'signin_with' | 'signup_with' | 'continue_with'
    />
  );
}

export default GoogleLoginButton;
