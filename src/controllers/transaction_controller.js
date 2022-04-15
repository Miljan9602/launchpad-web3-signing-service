const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.status = async (request, response) => {
    let tx_hash = request.body.tx_hash

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    const result = await web3.eth.getTransaction(tx_hash)

    return response.json({
        "tx" : result
    });
}

exports.receipt = async (request, response) => {
    let tx_hash = request.body.tx_hash

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    const result = await web3.eth.getTransactionReceipt(tx_hash)

    return response.json({
        "receipt" : result
    });
}