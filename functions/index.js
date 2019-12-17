const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const Mpesa = require("mpesa-node");

const cors = require('cors')({origin: true});

const consumer_key = "nQw3v67bCD9o6jAGImnvA9idgiOXFPLz";
const consumer_secret = "AmNO8SRyQRdWNUGb";
const short_code = "600375";


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.mpesaAuth = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var requestMpesa = require('request'),
            url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

        requestMpesa(
            {
                url: url,
                headers: {
                    "Authorization": auth,
                    "Access-Control-Allow-Origin": "*"
                }
            },
            function (error, responseMpesa, body) {
                // TODO: Use the body object to extract OAuth access token
                //console.log("sd");
                return response.status(200).send(responseMpesa.body);
            }
        );
    });
});

exports.CustomerPayBillOnline = functions.https.onRequest((request, response) => {
    var requestMpesa = require('request'),
        oauth_token = "xO0aAe9rAicUQuTJsvhjSiEVA2R7",
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    auth = "Bearer " + oauth_token;

    requestMpesa(
        {
            method: 'POST',
            url: url,
            headers: {
                "Authorization": auth
            },
            json: {
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
            url: url,
            headers: {
                "Authorization": auth
            },
            json: {
                "Initiator": "Sanjay",
                "SecurityCredential": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTgwODE0MDg1NjIw",
                "CommandID": "AccountBalance",
                "PartyA": "174379",
                "IdentifierType": "4",
                "Remarks": "Check Account Balance",
                "QueueTimeOutURL": "https://agizapap.com/rideNeibaResponse",
                "ResultURL": "https://agizapap.com/rideNeibaResponse"
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
            url: url,
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": short_code,
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

exports.ConfirmationURL = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response.json(response.body);
    });
});

exports.ValidationURL = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response.json(response.body);
    });
});

exports.payMpesa = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const requestBody = request.body;
        const amount = requestBody.data.amount;
        const mpesanumber = requestBody.data.mpesanumber;

        var requestMpesa = require('request'),
            oauth_token = "3OufGQKvdRGhv8rGC6fdPZZiADLY",
            url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
        auth = "Bearer " + oauth_token;

        requestMpesa(
            {
                url: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
                headers: {
                    "Authorization": "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64"),
                    "Access-Control-Allow-Origin": "*"
                }
            },
            function (error, responseMpesa, body) {
                // TODO: Use the body object to extract OAuth access token

                const authTokenObj = JSON.parse(responseMpesa.body);

                if(typeof authTokenObj.access_token !== 'undefined') {
                    oauth_token = authTokenObj.access_token;
                    auth = "Bearer " + oauth_token;
                    requestMpesa(
                        {
                            method: 'POST',
                            url: url,
                            headers: {
                                "Authorization": auth
                            },
                            json: {
                                "ShortCode": short_code,
                                "ResponseType": "json",
                                "ConfirmationURL": "https://hola-bella-adbaa.firebaseapp.com/ConfirmationURL",
                                "ValidationURL": "https://hola-bella-adbaa.firebaseapp.com/ValidationURL"
                            }
                        },
                        function (error, responseMpesa, body) {
                            // TODO: Use the body object to extract the
                            responseRegisterUrl = responseMpesa.body;
                            if (responseRegisterUrl.ResponseDescription === "success") {
                                requestMpesa(
                                    {
                                        method: 'POST',
                                        url: "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate",
                                        headers: {
                                            "Authorization": auth
                                        },
                                        json: {
                                            "ShortCode": short_code, // The short code of the organization.
                                            "CommandID": "CustomerPayBillOnline",
                                            "Amount": amount,
                                            "Msisdn":mpesanumber,
                                            //"Msisdn": "254708374149",
                                            "BillRefNumber": "TXN191216"
                                        }
                                    },
                                    function (error, responseMpesa, body) {
                                        // TODO: Use the body object to extract the response
                                        response.json({
                                            success: true,
                                            data: responseMpesa.body
                                        });
                                    }
                                )
                            } else {
                                response.json({
                                    success: false
                                });
                            }
                        }
                    )
                } else {
                    return response.status(200).send({success: falsej});
                }
            }
        );
    });
});