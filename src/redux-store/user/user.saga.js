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
  signUpSuccess,
  signUpFail,
  signOutStart,
  signOutSuccess,
  signOutFail,
} from './user.slice';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  signOutUser,
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
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    console.log(user);
    if (!user) return;
    yield put(signUpSuccess({ user, displayName }));
  } catch (error) {
    put(signUpFail(error));
  }
}

export function* signInAfterSignUp({ payload: { user, displayName } }) {
  yield call(getSnapshotFromUserAuth, user, { displayName });
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess, signInAfterSignUp);
}

export function* signOut() {
  console.log('signOut called');
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
