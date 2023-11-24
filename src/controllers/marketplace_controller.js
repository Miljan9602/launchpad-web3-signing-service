const { Web3, Contract} = require('web3');
const contractGetters = require("../utils/getters")

const RPC_URL = contractGetters.getRpc();
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

exports.is_signature_used = async (request, response) => {

    let user = request.body.user
    let offerId = request.body.offer_id;
    let sigExpTime = request.body.signature_expiration_time
    let amount = request.body.amount
    let selector = request.body.selector;
    let contractAddress = request.body.contract_address

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:offerId},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress},{t: "bytes4", v: selector});

    let contract = new Contract(contractGetters.getMarketplaceAbi(), contractGetters.getMarketplaceAddress());
    contract.setProvider(RPC_URL);

    let result = await contract.methods.isMessageUsed(web3.eth.accounts.hashMessage(hash)).call();

    return response.json({
        "is_used" : result
    });
}

exports.sign_add_offer = (request, response) => {

    let user = request.body.user
    let offerId = request.body.offer_id;
    let sigExpTime = request.body.signature_expiration_time
    let amount = request.body.amount
    let selector = web3.eth.abi.encodeFunctionSignature("addOffer(address,uint256,uint256,address,uint256,uint256,bytes[2])");
    let contractAddress = request.body.contract_address

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:amount},{t:"uint256", v:offerId},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress},{t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "offer_id" : offerId,
        "signature_expiration_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "amount" : amount,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_remove_offer = (request, response) => {

    let user = request.body.user
    let offerId = request.body.offer_id;
    let sigExpTime = request.body.signature_expiration_time
    let selector = web3.eth.abi.encodeFunctionSignature("removeOffer(uint256,uint256,bytes[2])");
    let contractAddress = request.body.contract_address

    let hash = web3.utils.soliditySha3({t:"address", v: user}, {t:"uint256", v:0}, {t:"uint256", v:offerId},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress},{t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "offer_id" : request.body.offer_id,
        "signature_expiration_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "amount" : 0,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}

exports.sign_buy_offer = (request, response) => {
    let user = request.body.user
    let offerId = request.body.offer_id;
    let sigExpTime = request.body.signature_expiration_time
    let selector = web3.eth.abi.encodeFunctionSignature("buy(uint256,uint256,uint256,bytes[2])");
    let contractAddress = request.body.contract_address

    let hash = web3.utils.soliditySha3({t:"address", v: user},{t:"uint256", v:0}, {t:"uint256", v:offerId},{t:"uint256", v:sigExpTime},{t:"address", v: contractAddress},{t: "bytes4", v: selector});

    return response.json({
        "user" : user,
        "offer_id" : request.body.offer_id,
        "signature_expiration_time": sigExpTime,
        "contract_address" : contractAddress,
        "selector" : selector,
        "amount" : 0,
        "signature" : web3.eth.accounts.sign(hash, process.env.PRIVATE_KEY_1).signature
    });
}