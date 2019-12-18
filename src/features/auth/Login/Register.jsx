import React from 'react';
import styles from './Register.module.css';
import {combineValidators, isRequired} from 'revalidate'
import { registerUser } from '../authActions';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

const actions ={
  registerUser
}

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

const Register =({handleSubmit, registerUser, error, invalid, submitting}) => {
  let history= useHistory()
  return (
    <div>
      <Form size='large' onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field name='displayName' type='text' component={TextInput} placeholder="Username"/>
          <Field name='email' type='text' component={TextInput} placeholder="Email"/>
          <Field name='password' type='password' component={TextInput} placeholder="Password"/>
          {error && <Label basic color='red'>{error}</Label>}
          <Button onClick={() => history.goBack()} disabled={invalid || submitting}>
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  )
}

export default connect(null, actions)(reduxForm({form:'registerForm', validate})(Register));