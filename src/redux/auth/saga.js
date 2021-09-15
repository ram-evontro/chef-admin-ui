import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import * as axiosURLS from "helpers/endpoints";
import axios from "helpers/api";
import { adminRoot, currentUser } from "constants/defaultValues";
import { setCurrentUser } from "helpers/Utils";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, FORGOT_PASSWORD, RESET_PASSWORD } from "../actions";

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from "./actions";

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  // eslint-disable-next-line no-return-await
  const user = await axios({
    method: "POST",
    url: axiosURLS.LOGIN,
    data: { email: email, password: password },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  })
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      return error;
    });
  console.log(user);
  return user;
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      const item = {
        uid: loginUser.user.id,
        name: loginUser.user.name,
        ...currentUser,
      };
      setCurrentUser(item);
      yield put(loginUserSuccess(loginUser));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await

  function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
      const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
      if (!registerUser.message) {
        const item = { uid: registerUser.user.uid, ...currentUser };
        setCurrentUser(item);
        yield put(registerUserSuccess(item));
        history.push(adminRoot);
      } else {
        yield put(registerUserError(registerUser.message));
      }
    } catch (error) {
      yield put(registerUserError(error));
    }
  };

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  // await axios({
  //   method: 'POST',
  //   url: axiosURLS.LOGOUT,
  // })
  //   .then(({ data }) => {
  //     console.log(data);
  //     return data;
  //   })
  //   .catch(function (error) {
  //     return error;
  //   });
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess("success"));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(resetPasswordAsync, resetPasswordCode, newPassword);
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess("success"));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser), fork(watchRegisterUser), fork(watchForgotPassword), fork(watchResetPassword)]);
}
