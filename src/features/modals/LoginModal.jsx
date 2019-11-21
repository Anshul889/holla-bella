import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/Login/LoginForm';
import { closeModal } from '../modals/modalActions';

const actions = { closeModal };

class LoginModal extends Component {
  render() {
    return (
      <Modal size='mini' open={true} onClose={this.props.closeModal}>
        <Modal.Header style={{textAlign: 'center'}}>Login to Hola Bella</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(LoginModal);
