const Web3 = require("web3");
const LogDecoder = require('logs-decoder')
const contractGetters = require("../utils/getters")

contractGetters.getCollateralContract()

// Import contract and add provider.
const AVALAUNCH_URL = contractGetters.getRpc()
const logsDecoder = LogDecoder.create()
logsDecoder.addABI(contractGetters.getMarketplaceContractAbi())

exports.decode_portion_listed = async (request, response) => {

    // Get hash from a body.
    let txHash = request.body.tx_hash

    // Get the receipt.
    let web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    let receipt = await web3.eth.getTransactionReceipt(txHash);

    // decode logs.
    let decoded = logsDecoder.decodeLogs(receipt.logs);

    let logs = [];

    for (let i = 0; i < decoded.length; i++) {
        logs.push({
            'name': decoded[i].name,
            'block_number' : decoded[i].blockNumber,
            'transaction_hash' : decoded[i].transactionHash,
            'events' : decoded[i].events
        })
    }

    return response.json({
        'status' : 'ok',
        'events' : logs
    });
}