const { Web3} = require('web3');
const contractGetters = require("../utils/getters")

const web3 = new Web3(new Web3.providers.HttpProvider(contractGetters.getRpc()));

exports.sign_claim_application_token = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("stakeArbr(uint256,uint256,bytes[2])");

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_claim_mint_token = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "claimHarbr"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_conversion_application_to_mint = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "hundredDayConversionAToH"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_conversion_mint_to_application = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "hundredDayConversionHToA"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_instant_conversion_application_to_mint = (request, response) => {
    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "instantConversionAToH"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_instant_conversion_mint_to_application = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "instantConversionHToA"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_staking_application_token = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("stakeArbr(uint256,uint256,bytes[2])");

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_withdraw_application_token = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let fee = request.body.fee;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = "withdrawArbr"

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:fee},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "string", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "fee" : fee,
        "sig_exp_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}
