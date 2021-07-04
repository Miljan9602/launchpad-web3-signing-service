const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");

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


app.post('/sign-registration', (request, response) => {

    let user_address = request.body.user_address
    let roundId = request.body.round_id
    let contractAddress = request.body.contract_address

    const pk = "905cfc35fa3ba0b42a5293306ccc74b4bdf6a0583ed2d3117ef436e9be6715ac";


    const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

    const account = web3.eth.accounts.privateKeyToAccount(pk);

    let hash = web3.utils.soliditySha3({t:"address", v: user_address}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result
    })
});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
