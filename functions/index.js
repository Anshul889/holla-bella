const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const Mpesa = require("mpesa-node");

const cors = require('cors')({origin: true});

const consumer_key = "nQw3v67bCD9o6jAGImnvA9idgiOXFPLz";
const consumer_secret = "AmNO8SRyQRdWNUGb";


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.mpesaAuth = functions.https.onRequest((request, response) => {
    var requestMpesa = require('request'),
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

    requestMpesa(
        {
            url : url,
            headers : {
                "Authorization" : auth,
                "Access-Control-Allow-Origin": "*"
            }
        },
        function (error, responseMpesa, body) {
            // TODO: Use the body object to extract OAuth access token
            console.log("sd");
            response.send(responseMpesa.body);
        }
    )
    /*return cors(request, response, () => {
        requestMy(
            {
                url : url,
                headers : {
                    "Authorization" : auth,
                    "Access-Control-Allow-Origin": "*"
                }
            },
            function (error, responseMy, body) {
                // TODO: Use the body object to extract OAuth access token
                console.log("sd");
                response.send(responseMy.body);
            }
        )
    });*/
});

exports.CustomerPayBillOnline = functions.https.onRequest((request, response) => {
    var requestMpesa = require('request'),
        oauth_token = "xO0aAe9rAicUQuTJsvhjSiEVA2R7",
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    auth = "Bearer " + oauth_token;

    requestMpesa(
        {
            method: 'POST',
            url : url,
            headers : {
                "Authorization" : auth
            },
            json : {
                "BusinessShortCode": "174379",
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTgwODE0MDg1NjIw",
                "Timestamp": "20180814085620",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": "10",
                "PartyA": "254701121217",
                "PartyB": "174379",
                "PhoneNumber": "254701121217",
                "CallBackURL": "https://agizapap.com/rideNeibaResponse",
                "AccountReference": "Debt",
                "TransactionDesc": "Pay Now"
            }
        },
        function (error, responseMpesa, body) {
            // TODO: Use the body object to extract the response
            console.log(body)
            response.send(responseMpesa.body);
        }
    )
});

exports.AccountBalance = functions.https.onRequest((request, response) => {
    var requestMpesa = require('request'),
        oauth_token = "HDx94wGFpFAd9Er9kUDK7fgRgYhT",
        url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query"
    auth = "Bearer " + oauth_token;

    requestMpesa(
        {
            method: 'POST',
            url : url,
            headers : {
                "Authorization" : auth
            },
            json : {
                "Initiator":"Sanjay",
                "SecurityCredential":"MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTgwODE0MDg1NjIw",
                "CommandID":"AccountBalance",
                "PartyA":"174379",
                "IdentifierType":"4",
                "Remarks":"Check Account Balance",
                "QueueTimeOutURL":"https://agizapap.com/rideNeibaResponse",
                "ResultURL":"https://agizapap.com/rideNeibaResponse"
            }
        },
        function (error, responseMpesa, body) {
            // TODO: Use the body object to extract the response
            console.log(body)
            response.send(responseMpesa.body);
        }
    )
});

exports.C2BPay = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response.status(500).send({test: 'Testing'});
    })

    var requestMpesa = require('request'),
        oauth_token = "JtJg30Zf594S2071NIHIPj2gjLF6",
        url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    auth = "Bearer " + oauth_token;

    requestMpesa(
        {
            method: 'POST',
            url : url,
            headers : {
                "Authorization" : auth
            },
            json : {
                "ShortCode": "174379",
                "ResponseType": "Completed",
                "ConfirmationURL": "https://agizapap.com/rideNeibaResponse",
                "ValidationURL": "https://agizapap.com/rideNeibaResponse"
            }
        },
        function (error, responseMpesa, body) {
            // TODO: Use the body object to extract the response
            console.log(body)
            response.send(responseMpesa.body);
            //
        }
    )
});

exports.payMpesa = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        //console.log("Request Data: " + request);
        response.status(200).send({test: 'Testing payMpesa: ' + request});
    })

    var requestMpesa = require('request'),
        oauth_token = "JtJg30Zf594S2071NIHIPj2gjLF6",
        url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    auth = "Bearer " + oauth_token;

    /**
     *
     */

    requestMpesa(
        {
            method: 'POST',
            url : url,
            headers : {
                "Authorization" : auth
            },
            json : {
                "ShortCode":"174379", // The short code of the organization.
                "CommandID":"CustomerPayBillOnline",
                "Amount":"100",
                "Msisdn":"+919584264871",
                "BillRefNumber":"B5F66H"
            }
        },
        function (error, responseMpesa, body) {
            // TODO: Use the body object to extract the response
            console.log(body)
            response.send(responseMpesa.body);
        }
    )
});