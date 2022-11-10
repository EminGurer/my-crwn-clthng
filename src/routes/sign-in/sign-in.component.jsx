import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h2>Sign-in page</h2>
      <button onClick={logGoogleUser}>Login with google</button>
    </div>
  );
};

export default SignIn;
