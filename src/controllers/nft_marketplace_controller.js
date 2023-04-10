const Contract = require("web3-eth-contract");
const Web3 = require("web3");
const contractGetters = require("../utils/getters");
const LogDecoder = require("logs-decoder");

const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.asks = async (request, response) => {

    let address = request.body.address
    let askId = request.body.ask_id

    let nftMarketplaceContract = contractGetters.getNftMarketplaceContract()

    // Pull out contract abi/address
    let nftMarketplaceAbi = nftMarketplaceContract['abi']
    let nftMarketplaceAddress = nftMarketplaceContract['address']

    // Init contract.
    let contract = new Contract(nftMarketplaceAbi, nftMarketplaceAddress);

    const result = await contract.methods.asks(askId, address).call()

    return response.json({
        "result" : {
            "value" : result["value"],
            "active" : result["active"]
        },
        "status" : "ok"
    });
}

exports.auction_items = async (request, response) => {
    let itemId = request.body.item_id

    let nftMarketplaceContract = contractGetters.getNftMarketplaceContract()

    // Pull out contract abi/address
    let nftMarketplaceAbi = nftMarketplaceContract['abi']
    let nftMarketplaceAddress = nftMarketplaceContract['address']

    // Init contract.
    let contract = new Contract(nftMarketplaceAbi, nftMarketplaceAddress);

    const result = await contract.methods.auctionItems(itemId).call()

    return response.json({
        "result" : {
            "itemAddress" : result['itemAddress'],
            "tokenId" : result['tokenId'],
            "seller" : result['seller'],
            "bidder" : result['bidder'],
            "startingPrice" : result['startingPrice'],
            "highestBid" : result['highestBid'],
            "endTime" : result['endTime'],
            "available" : result['available']
        },
        "status" : "ok"
    });
}

exports.items = async (request, response) => {
    let itemId = request.body.item_id

    let nftMarketplaceContract = contractGetters.getNftMarketplaceContract()

    // Pull out contract abi/address
    let nftMarketplaceAbi = nftMarketplaceContract['abi']
    let nftMarketplaceAddress = nftMarketplaceContract['address']

    // Init contract.
    let contract = new Contract(nftMarketplaceAbi, nftMarketplaceAddress);

    const result = await contract.methods.items(itemId).call()

    return response.json({
        "result" : {
            "itemAddress" : result['itemAddress'],
            "tokenId" : result['tokenId'],
            "seller" : result['seller'],
            "buyer" : result['buyer'],
            "price" : result['price'],
            "available" : result['available']
        },
        "status" : "ok"
    });
}

exports.decode_logs = async (request, response) => {

    let logs = await parseTransactionLogs(request.body.tx_hash, AVALAUNCH_URL, contractGetters.getNftMarketplaceAbi())

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

async function parseTransactionLogs(txHash, rpc, abi) {

    // Get the receipt.
    let web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    let receipt = await web3.eth.getTransactionReceipt(txHash);

    if (receipt.status !== true) {
        return null;
    }

    const logsDecoder = LogDecoder.create()
    logsDecoder.addABI(abi)

    // decode logs.
    let decoded = logsDecoder.decodeLogs(receipt.logs);

    let logs = [];

    for (let i = 0; i < decoded.length; i++) {

        if ( decoded[i] === undefined) {
            continue;
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