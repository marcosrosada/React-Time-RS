import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import ProjectsActions from "../ducks/projects";

export function* getProjects({ team }) {
  const response = yield call(api.get, `projects?teamId=${team.id}`);

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}
