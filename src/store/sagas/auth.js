import { call, put } from "redux-saga/effects";

import api from "../../services/api";

import AuthActions from "../ducks/auth";

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, "login", { email, password });

    localStorage.setItem("@Ommi:token", response.data);
    yield put(AuthActions.signInSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
