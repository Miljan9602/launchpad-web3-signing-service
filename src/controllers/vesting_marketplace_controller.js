const Web3 = require("web3");
const LogDecoder = require('logs-decoder')
const contractGetters = require("../utils/getters")
const {Buffer} = require("avalanche");

contractGetters.getCollateralContract()

// Import contract and add provider.
const AVALAUNCH_URL = contractGetters.getRpc()
const logsDecoder = LogDecoder.create()
logsDecoder.addABI(contractGetters.getMarketplaceContractAbi())

exports.decode_portion_listed = async (request, response) => {

    let logs = await parseTransactionLogs(request.body.tx_hash)

    if (logs === null) {
        return response.status(400).json({
            'status' : 'fail',
            'error' : {
                'message' : 'Invalid transaction. Please check that transaction is valid, and it belongs to right event.',
                'code' : 400,
                'type' : 'invalid_transaction'
            }
        })
    }

    return response.json({
        'status' : 'ok',
        'events' : logs
    });
}

async function parseTransactionLogs(txHash) {

    // Get the receipt.
    let web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    let receipt = await web3.eth.getTransactionReceipt(txHash);

    if (receipt.status !== true) {
        return null;
    }

    // decode logs.
    let decoded = logsDecoder.decodeLogs(receipt.logs);

    let logs = [];

    for (let i = 0; i < decoded.length; i++) {

        if ( decoded[i] === undefined) {
            return null;
        }

        logs.push({
            'name': decoded[i].name,
            'block_number': decoded[i].blockNumber,
            'transaction_hash': decoded[i].transactionHash,
            'events': decoded[i].events
        })
    }

    return logs
}