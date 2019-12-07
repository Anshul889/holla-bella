const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var pesapal = require('pesapal')({
  consumerKey: 'BcNUFekLE8Ckj996PAfceovOxWGXERat',
  consumerSecret: 'FC/GFkdmahWvIq41q85GVQzc7ug=',
  testing: false,
});

exports.completePayment = functions.firestore.document('users/{userId}/confirmed_orders/{autoId}').onCreate(async (snap, context) => {
  try {
  let newConfirmedOrder = snap.data();
  const amount = newConfirmedOrder.amount;
  const description = 'testing';
  var requestData = {
    'Amount': amount,
    'Description': description,
    'Type': 'MERCHANT',
    'Reference': '12erwe',
    'PhoneNumber': '0700111000'
  }
  const response = pesapal.postDirectOrder(postParams, requestData)
  return snap.ref.set(response, {merge: true});
  } catch(error){
    await snap.ref.set({error: userFacingMessage(error)},
    {merge: true});
  }
})

function userFacingMessage(error) {
  return error.type ? error.message : 'An error occurred, developers have been alerted';
}