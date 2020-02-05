import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import MembersActions from "../ducks/members";

export function* getMembers({ team }) {
  const response = yield call(api.get, `members?teamId=${team.id}`);

  yield put(MembersActions.getMembersSuccess(response.data));
}
