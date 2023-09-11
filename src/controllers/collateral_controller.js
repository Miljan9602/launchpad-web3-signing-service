const { Web3, Contract} = require('web3');
const contractGetters = require("../utils/getters")

const RPC_URL = contractGetters.getRpc();
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

exports.sign_withdraw = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("withdraw(uint256,uint256,bytes[2])");

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "amount" : amount,
        "signature_expiration_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_deposit = async (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("deposit(uint256,uint256,bytes[2])");

    let hash = web3.utils.soliditySha3({t: "address", v: user}, {t: "uint256", v: amount}, {
        t: "uint256",
        v: sigExpTime
    }, {t: "address", v: contractAddress}, {t: "bytes4", v: selector});

    let contract = new Contract(contractGetters.getCollateralAbi(), contractGetters.getCollateralAddress());
    contract.setProvider(RPC_URL);

    let sig = [web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature, web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_2).signature];
    let result = await contract.methods.signaturesValidityCheck(web3.eth.accounts.hashMessage(hash), sig).call();

    console.log({
        "hash": web3.eth.accounts.hashMessage(hash),
        "SIG": sig,
        "result": result
    })

    return response.json({
        "user": user,
        "amount": amount,
        "signature_expiration_time": sigExpTime,
        "contract_address": contractAddress,
        "selector": selector,
        "signature": web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}