import React, { Component } from 'react';
import TextInput from '../../app/common/form/TextArea';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { addMpesaNumber } from '../user/userActions';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import {
  composeValidators,
  combineValidators,
  isRequired,
  isNumeric,
  hasLengthGreaterThan
} from 'revalidate';

const actions = {
  addMpesaNumber
};

const validate = combineValidators({
  mpesa: composeValidators(
    isRequired({ message: 'Please enter your phone number' }),
    isNumeric({ message: 'enter a valid phone' }),
    hasLengthGreaterThan(7)({ message: 'enter a valid phone number' })
  )()
});

class MpesaForm extends Component {
  handleMpesaSubmit = async values => {
    this.props.addMpesaNumber(values);
    this.props.closeMpesaForm();
  };

  render() {
    const { invalid, submitting } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleMpesaSubmit)}>
        <Field
          placeholder={'Mpesa Number'}
          name='mpesa'
          type='text'
          component={TextInput}
          rows={1}
        />
        <Button disabled={invalid || submitting} content='Submit' />
      </Form>
    );
  }
}

export default withFirestore(
  connect(
    null,
    actions
  )(
    reduxForm({ form: 'addAddress', destroyOnUnmount: false, validate })(
      MpesaForm
    )
  )
);
