const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const web3 = require("web3");

app.post('/recover-typed-signature', (request, response) => {

    const address = request.body.address
    const data = request.body.data
    const signature = request.body.signature

    const recovered = ethSig.recoverTypedSignature({
        data: [data],
        sig: signature.toString(),
    });

    let verificationStatus = false;

    if (recovered.toLowerCase() === address.toLowerCase()) {
        verificationStatus = true;
    }

    return response.json({
        "message_signer" : recovered.toLowerCase(),
        "expected_signer" : address.toLowerCase(),
        "verification_status": verificationStatus
    });
});


app.post('/sign-order', (request, response) => {

    // let user_address = request.body.user_address
    // let roundId = request.body.roundId
    // let address = request.body.address
    //
    // let hash = "0x" + ethereumjs.ABI.soliditySHA3(
    //     ["address", "uint256", "address"],
    //     [user_address, roundId, sale_contract_address]
    // ).toString("hex");
    //
    // let result = web3.personal.sign(hash, web3.eth.defaultAccount, callback);
    //
    // return response.json({
    //     "result" : result
    // })

    return response.json({
        "result" : "test"
    })
});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
