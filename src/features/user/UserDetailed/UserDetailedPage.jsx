import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import styles from './UserDetailedPage.module.css';
import format from 'date-fns/format';
import UserAddressForm from './UserAddressForm';
import UserAddressFormTwo from './UserAddressFormTwo';
import { removeNewAddress, removeNewAddressTwo } from '../userActions';

const mapState = (state, ownProps) => ({
  profile: state.firebase.profile
});

const actions = {
  removeNewAddress,
  removeNewAddressTwo
};

class UserDetailedPage extends Component {
  state = {
    isAddressOneOpen: false,
    isAddressTwoOpen: false
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  closeFormOne = () => {
    this.setState({ isAddressOneOpen: false });
  };

  closeFormTwo = () => {
    this.setState({ isAddressTwoOpen: false });
  };

  render() {
    const { profile, removeNewAddressTwo, removeNewAddress } = this.props;
    let createdAt;
    if (profile.createdAt) {
      createdAt = format(profile.createdAt.toDate(), 'do LLL yyyy');
    }
    return (
      <React.Fragment>
        <h1 className={styles.heading}>Your Profile</h1>
        <div className={styles.container}>
          <div className={styles.profileimage}>
            <img src={profile.photoURL} alt='profile' />
            <div className={styles.displayname}>{profile.displayName}</div>
            <div className={styles.membersince}>
              Member Since: <strong>{createdAt}</strong>
            </div>
          </div>
          <Button onClick={this.handleSignOut}>Logout</Button>
        </div>
        {profile.newAddress && (
          <div className={styles.address1}>
            <h3>Address:</h3>
            <div className={styles.editbutton} onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }>edit</div>
            <div className={styles.addressshow}>
              <div>Street: {profile.newAddress.Address}</div>
              <div>City :{profile.newAddress.City}</div>
              <div>Postal Code:{profile.newAddress.postcode}</div>
            </div>
            <div className={styles.deletebutton} onClick={removeNewAddress}>delete</div>
          </div>
        )}

        {profile.newAddressTwo && (
          <div>
            <p>Address 2</p>
            <span>{profile.newAddressTwo.Address}</span>
            <span>{profile.newAddressTwo.City + ', '}</span>
            <span>{profile.newAddressTwo.postcode}</span>
            <Button icon='trash' onClick={removeNewAddressTwo}></Button>
          </div>
        )}
        <div style={{ width: '90%', margin: '20px auto', maxWidth: '1080px' }}>
          {profile.newAddress ? (
            null
          ) : (
            <Button
              onClick={() =>
                this.setState({
                  isAddressOneOpen: !this.state.isAddressOneOpen,
                  isAddressTwoOpen: false
                })
              }
              size='tiny'
              content={'Add Address 1'}
            />
          )}

          {profile.newAddressTwo ? (
            <Button
              onClick={() =>
                this.setState({
                  isAddressTwoOpen: !this.state.isAddressTwoOpen,
                  isAddressOneOpen: false
                })
              }
              color='teal'
              size='tiny'
              content={'Edit Address 2'}
            />
          ) : (
            <Button
              onClick={() =>
                this.setState({
                  isAddressTwoOpen: !this.state.isAddressTwoOpen,
                  isAddressOneOpen: false
                })
              }
              size='tiny'
              content={'Add Address 2'}
            />
          )}
        </div>
        {this.state.isAddressOneOpen && (
          <UserAddressForm closeForm={this.closeFormOne} />
        )}
        {this.state.isAddressTwoOpen && (
          <UserAddressFormTwo closeForm={this.closeFormTwo} />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(
  withFirebase(connect(mapState, actions)(UserDetailedPage))
);
