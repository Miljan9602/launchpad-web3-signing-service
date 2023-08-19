const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const RPC_URL = contractGetters.getRpc()

exports.sign_claim_application_token = (request, response) => {
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime}, {t: "string", v: "claimArbr"});

    return response.json({
        "amount" : amount,
        "fee" : fee,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_claim_mint_token = (request, response) => {
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime}, {t: "string", v: "claimHarbr"});

    return response.json({
        "amount" : amount,
        "fee" : fee,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_conversion_application_to_mint = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "hundredDayConversionAToH"});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_conversion_mint_to_application = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "hundredDayConversionHToA"});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_instant_conversion_application_to_mint = (request, response) => {

    let fromStake = request.body.from_stake;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"bool", v:fromStake},{t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "instantConversionAToH"});

    return response.json({
        "from_stake" : fromStake,
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_instant_conversion_mint_to_application = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "instantConversionHToA"});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_staking_application_token = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "stakeArbr"});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}

exports.sign_withdraw_application_token = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: "withdrawArbr"});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "signature" : web3.eth.accounts.sign(hash, pk)
    });
}