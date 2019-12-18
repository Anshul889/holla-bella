import React from 'react'
import { connect } from 'react-redux';
import LoginModal from './LoginModal';

const modalLookup = {
  LoginModal
}

const mapState = (state) => ({
  currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
  let renderedModal;

  if(currentModal){
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps}/>
  }
  return (
    <div>{renderedModal}</div>
  )
}

export default connect(mapState)(ModalManager);