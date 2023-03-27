import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import {
  checkUserSession,
  signInFail,
  signInSuccess,
  googleSignInStart,
  emailSignInStart,
  signUpStart,
} from './user.slice';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    console.log('google sign action');
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    put(signInFail(error));
  }
}

export function* signInWithEmail(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* signUp({ payload: { email, password, displayName } }) {
  const response = yield call(
    createAuthUserWithEmailAndPassword,
    email,
    password
  );
  const { user } = response;
  if (!user) return;
  yield call(createUserDocumentFromAuth, user, { displayName });
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart, signUp);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
  ]);
}

/*
const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = response;
      if (!user) return;
      await createUserDocumentFromAuth(user, {
        displayName,
      });
*/
