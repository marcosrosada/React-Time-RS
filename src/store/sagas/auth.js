import { /* call, */ put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";

// import api from "../../services/api";

import AuthActions from "../ducks/auth";

export function* signIn({ email, password }) {
  try {
    // const response = yield call(api.post, "login", { email, password });
    const response = {
      data:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNvc2Zyb3NhZGFAZ21haWwuY29tIiwiaWF0IjoxNTgwMjA1NTcyLCJleHAiOjE1ODAyMDkxNzIsInN1YiI6IjIifQ.PEZo1cd2qkINwuMOMNiyWIBPblQgnJUOj8FV4GVLZ0c"
    };

    localStorage.setItem("@Omni:token", response.data);
    yield put(AuthActions.signInSuccess(response.data));
    yield put(push("/"));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Falha no login",
        message: "Verifique seu e-mail/senha!"
      })
    );
  }
}
