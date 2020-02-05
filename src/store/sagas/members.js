import { call, put } from "redux-saga/effects";
import { actions as toastrActions } from "react-redux-toastr";
import api from "../../services/api";

import MembersActions from "../ducks/members";

export function* getMembers({ team }) {
  const response = yield call(api.get, `members?teamId=${team.id}`);

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMembers({ id, rolesId }) {
  try {
    yield call(api.put, `members/${id}`, { rolesId: rolesId });

    yield put(
      toastrActions.add({
        type: "success",
        title: "Membro atualizado",
        message: "O membro foi atualizado com sucesso"
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Erro na operação",
        message: "Tente novamente"
      })
    );
  }
}

export function* inviteMembers({ email, team }) {
  try {
    yield call(api.post, `invites`, { email: [email], teamId: team.id });

    yield put(
      toastrActions.add({
        type: "success",
        title: "Convite enviado",
        message: "Enviamos um convite ao usuário para participar do time"
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Erro na operação",
        message: "Tente novamente"
      })
    );
  }
}
