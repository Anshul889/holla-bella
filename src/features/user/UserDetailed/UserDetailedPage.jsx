import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import styles from "./UserDetailedPage.module.css";
import format from "date-fns/format";
import UserAddressForm from "./UserAddressForm";
import UserAddressFormTwo from "./UserAddressFormTwo";
import {removeNewAddress, removeNewAddressTwo} from '../userActions';

const mapState = (state, ownProps) => ({
  profile: state.firebase.profile
});

const actions = {
  removeNewAddress,
  removeNewAddressTwo
}

class UserDetailedPage extends Component {
  state = {
    isAddressOneOpen: false,
    isAddressTwoOpen: false
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };

  closeFormOne =() => {
    this.setState({isAddressOneOpen: false})
  }

  closeFormTwo =() => {
    this.setState({isAddressTwoOpen: false})
  }

  render() {
    const { profile, removeNewAddressTwo, removeNewAddress } = this.props;
    let createdAt;
    if (profile.createdAt) {
      createdAt = format(profile.createdAt.toDate(), "do LLL yyyy");
    }
    return (
      <React.Fragment>
        <div className={styles.container}>
          <div className={styles.profileimage}>
            <img src={profile.photoURL} alt="profile" />
            <p>{profile.displayName}</p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
          </div>
          <Button onClick={this.handleSignOut}>Logout</Button>

        </div>
        {profile.newAddress && <div>
        <p>Address 1</p>
        <span>{profile.newAddress.Address + ', '}</span>
        <span>{profile.newAddress.City + ', '}</span>
        <span>{profile.newAddress.postcode}</span>
        <Button icon='trash' onClick={removeNewAddress} ></Button>
        </div> 
      }

       {profile.newAddressTwo && <div><p>Address 2</p>
        <span>{profile.newAddressTwo.Address + ', '}</span>
        <span>{profile.newAddressTwo.City + ', '}</span>
        <span>{profile.newAddressTwo.postcode}</span> 
        <Button icon='trash' onClick={removeNewAddressTwo} ></Button>
        </div>}
        <div style={{ width: "90%", margin: "20px auto" }}>
          {profile.newAddress ?<Button
            onClick={() => 
              this.setState({ isAddressOneOpen: !this.state.isAddressOneOpen, isAddressTwoOpen: false })
            }
            color="teal"
            size="tiny"
            content={'Edit Address 1'}
          /> : <Button
          onClick={() => 
            this.setState({ isAddressOneOpen: !this.state.isAddressOneOpen, isAddressTwoOpen: false })
          }
          color="teal"
          size="tiny"
          content={'Add Address 1'}
        />}

          {profile.newAddressTwo ? <Button
            onClick={() =>
              this.setState({ isAddressTwoOpen: !this.state.isAddressTwoOpen, isAddressOneOpen: false })
            }
            color="teal"
            size="tiny"
            content={'Edit Address 2'}
          />: <Button
          onClick={() =>
            this.setState({ isAddressTwoOpen: !this.state.isAddressTwoOpen, isAddressOneOpen: false })
          }
          color="teal"
          size="tiny"
          content={'Add Address 2'}
        />}
        </div>
        {this.state.isAddressOneOpen && <UserAddressForm closeForm={this.closeFormOne}/>}
        {this.state.isAddressTwoOpen && <UserAddressFormTwo closeForm={this.closeFormTwo}/>}
      </React.Fragment>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(UserDetailedPage)));
