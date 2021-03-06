import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  openMembersModal: null,
  closeMembersModal: null,
  getMembersRequest: ["team"],
  getMembersSuccess: ["data"],
  updateMemberRequest: ["id", "roles"],
  inviteMemberRequest: ["email", "team"]
});

export const MembersTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false
});

/* Reducers */

export const openModal = state => state.merge({ membersModalOpen: true });

export const closeModal = state => state.merge({ membersModalOpen: false });

export const getSuccess = (state, { data }) => state.merge({ data });

export const updateMember = (state, { id, rolesId }) =>
  state.merge({
    data: state.data.map(member =>
      member.id === id ? { ...member, rolesId } : member
    )
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBERS_MODAL]: openModal,
  [Types.CLOSE_MEMBERS_MODAL]: closeModal,
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember
});
