import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import api from "../../services/api";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MembersActions from "../../store/ducks/members";

import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";

import { MembersList, Invite } from "./styles";

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          rolesId: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string
            })
          )
        })
      )
    }).isRequired
  };

  state = {
    invite: "",
    roles: []
  };

  async componentDidMount() {
    const { getMembersRequest, activeTeam } = this.props;

    if (activeTeam) {
      getMembersRequest(activeTeam);

      const response = await api.get("roles");

      this.setState({ roles: response.data });
    }
  }

  handleRolesChange = (id, roles) => {
    const { updateMemberRequest } = this.props;

    updateMemberRequest(id, roles);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = e => {
    e.preventDefault();

    const { inviteMemberRequest, activeTeam } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite, activeTeam);
  };

  render() {
    const { closeMembersModal, members } = this.props;
    const { roles, invite } = this.state;

    return (
      <Modal size="big">
        <h1>Membros</h1>

        <Invite onSubmit={this.handleInvite}>
          <input
            name="invite"
            placeholder="Convidar para o time"
            value={invite}
            onChange={this.handleInputChange}
          />
          <Button type="submit">Enviar</Button>
        </Invite>
        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.name}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.rolesId}
                  getOptionLabel={role => role.name}
                  getOptionValue={role => role.id}
                  onChange={value => this.handleRolesChange(member.id, value)}
                />
              </li>
            ))}
          </MembersList>

          <Button
            type="button"
            onClick={closeMembersModal}
            filled={false}
            color="gray"
          >
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  members: state.members
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
