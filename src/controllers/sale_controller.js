const { Web3, Contract} = require('web3');
const contractGetters = require("../utils/getters")

const RPC_URL = contractGetters.getRpc();
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

exports.sign_withdraw_tokens = (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("withdrawTokens(uint256,uint256,bytes[2])");

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

exports.is_signature_used = async (request, response) => {

    let user = request.body.user;
    let amount = request.body.amount;
    let sigExpTime = request.body.signature_expiration_time
    let contractAddress = request.body.contract_address
    let selector = web3.eth.abi.encodeFunctionSignature("withdrawTokens(uint256,uint256,bytes[2])");

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress}, {t: "bytes4", v: selector});

    let contract = new Contract(contractGetters.getStakingAbi(), contractAddress);
    contract.setProvider(RPC_URL);

    let result = await contract.methods.isMessageUsed(web3.eth.accounts.hashMessage(hash)).call();

    return response.json({
        "is_used" : result
    });
}