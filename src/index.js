const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractMap = require("./contracts").CONTRACTS

// Import contract and add provider.
const Contract = require('web3-eth-contract');
Contract.setProvider(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

app.post('/is-user-staking', async (request, response) => {

    // Take address from body.
    const userAddress = request.body.address

    // Pull out contract abi/address
    let allocationStakingAbi = contractMap['AllocationStaking']['abi']
    let allocationStakingAddress = contractMap['AllocationStaking']['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const amountStaking = await contract.methods.deposited(0, userAddress).call();
    const amountPending = await contract.methods.pending(0, userAddress).call();

    return response.json({
        "is_user_staking" : amountStaking > 0,
        "address" : userAddress,
        "amount_staking" : Web3.utils.fromWei(amountStaking, 'ether'),
        "amount_pending" : Web3.utils.fromWei(amountPending, 'ether')
    });
});

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
        "result" : result.signature
    })
});

app.post('/sign-participation', (request, response) => {

    let userAddress = request.body.user_address;
    let amountWei = request.body.amount_wei;
    let roundId = request.body.round_id;
    let contractAddress = request.body.contract_address;
    let amountXavaToBurn = request.body.amount_xava_to_burn;

    return response.json({
        "result" : "!23123",
        "user_address" : userAddress,
        "amountWei" : amountWei,
        "roundId" : roundId,
        "contractAddress" : contractAddress,
        "xavaToBurn" : amountXavaToBurn
    })

    // Staviti u env variablu.
    const pk = "905cfc35fa3ba0b42a5293306ccc74b4bdf6a0583ed2d3117ef436e9be6715ac";
    const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

    const account = web3.eth.accounts.privateKeyToAccount(pk);

    let hash = web3.utils.soliditySha3({t:"address", v: userAddress}, {t: "uint256", v: amountWei},{t: "uint256", v: amountXavaToBurn}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
