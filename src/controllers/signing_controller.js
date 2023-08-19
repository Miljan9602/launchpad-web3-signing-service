const { Web3 } = require('web3');
const contractGetters = require("../utils/getters")

const web3 = new Web3(new Web3.providers.HttpProvider(contractGetters.getRpc()));


exports.sign_claim_application_token = (request, response) => {
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "claimArbr"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "fee" : fee,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_claim_mint_token = (request, response) => {
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "claimHarbr"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "fee" : fee,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_conversion_application_to_mint = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "hundredDayConversionAToH"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_conversion_mint_to_application = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "hundredDayConversionHToA"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_instant_conversion_application_to_mint = (request, response) => {

    let fromStake = request.body.from_stake;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "instantConversionAToH"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"bool", v:fromStake},{t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "from_stake" : fromStake,
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_instant_conversion_mint_to_application = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "instantConversionHToA"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_staking_application_token = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "stakeArbr"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}

exports.sign_withdraw_application_token = (request, response) => {
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let selector = "withdrawArbr"

    const pk = process.env.PRIVATE_KEY_1;

    let hash = web3.utils.soliditySha3({t:"uint256", v:amount},{t:"uint256", v:sigExpTime}, {t: "string", v: selector});

    return response.json({
        "amount" : amount,
        "sigExpTime": sigExpTime,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, pk).signature
    });
}