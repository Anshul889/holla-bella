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

exports.completePayment = functions.firestore.document('users/{userId}/confirmed_orders/{confirmedId}').onCreate(confirmedOrder => {
  let newConfirmedOrder = confirmedOrder.data();

  console.log(newConfirmedOrder);

  const testMSISDN = 254708374149
})
