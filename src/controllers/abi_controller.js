const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.sale = async (request, response) => {
    // Take address from body.
    const abiVersion = request.body.abi_version

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    return response.json({
        "abi" : saleAbi,
        "status" : "ok"
    });
}