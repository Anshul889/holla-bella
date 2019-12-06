const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const Mpesa = require('mpesa-node');
const mpesaApi = new Mpesa({ consumerKey: '6AL3tEF4L4GKhtd8iow835rpt3OPsbAM', consumerSecret: 'oB7JQYkIh5lC1Qdw' })
const {
  accountBalance,
  b2b,
  b2c,
  c2bRegister,
  c2bSimulate,
  lipaNaMpesaOnline,
  lipaNaMpesaQuery,
  reversal,
  transactionStatus
} = mpesaApi

exports.completePayment = functions.firestore.document('users/{userId}/confirmed_orders/{autoId}').onCreate(async (snap, context) => {
  try {
  let newConfirmedOrder = snap.data();
  const amount = newConfirmedOrder.amount;
  const testMSISDN = 254708374149;
  let url = 'hola-bella-adbba.web.app';
  const response = await mpesaApi.c2bRegister(URL + '/cart', URL + '/c2b/success');
  return snap.ref.set(response, {merge: true});
  } catch(error){
    await snap.ref.set({error: userFacingMessage(error)},
    {merge: true});
  }
})

function userFacingMessage(error) {
  return error.type ? error.message : 'An error occurred, developers have been alerted';
}