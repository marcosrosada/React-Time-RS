import React, { Component } from "react";
import propTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../../../store/ducks/auth";

import Button from "../../../styles/components/Button";
import { Container, SignForm } from "../styles";

class SignUp extends Component {
  static propTypes = {
    signUpRequest: propTypes.func.isRequired
  };

  state = {
    name: "",
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;

    signUpRequest(name, email, password);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Container>
        <SignForm onSubmit={this.handleSubmit}>
          <h1>Criar conta</h1>

          <span>Nome</span>
          <input name="name" value={name} onChange={this.handleInputChange} />

          <span>E-Mail</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <span>Senha</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />

          <Button size="big" type="submit">
            Criar
          </Button>
        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
