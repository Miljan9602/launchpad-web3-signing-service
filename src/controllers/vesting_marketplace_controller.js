const Web3 = require("web3");
const LogDecoder = require('logs-decoder')
const contractGetters = require("../utils/getters")
const Contract = require("web3-eth-contract");

contractGetters.getCollateralContract()

// Import contract and add provider.
const AVALAUNCH_URL = contractGetters.getRpc()
const logsDecoder = LogDecoder.create()
logsDecoder.addABI(contractGetters.getMarketplaceContractAbi())

exports.buy_portions = async (request, response) => {

    // Take values from body.
    const payableAmount = request.body.payable_amount
    const saleContractAddress = request.body.sale_contract_address
    const ownerAddress = request.body.owner_address
    const sigExpTimestamp = request.body.sig_exp_timestamp
    const priceSum = request.body.price_sum
    const itemId = request.body.item_id
    const portions = request.body.portions
    const signature = request.body.signature
    const gasPrice = request.body.gas_price

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)

    let marketplaceContract = contractGetters.getMarketplaceContract()

    // Pull out contract abi/address
    let marketplaceAbi = marketplaceContract['abi']
    let marketplaceAddress = marketplaceContract['address']

    // Init contract.
    let contract = new Contract(marketplaceAbi, marketplaceAddress);
    let data = contract.methods.buyPortions(payableAmount, saleContractAddress, ownerAddress, sigExpTimestamp, priceSum, itemId, portions, signature);
    let rawTransaction = {
        "from":account.address,
        "to":marketplaceAddress,
        "gasPrice":web3.utils.toHex(gasPrice),
        "gasLimit":web3.utils.toHex(950000),
        "data": data.encodeABI()
    };

    const signedTransaction = (await account.signTransaction(rawTransaction))
    const result = await sendTransactionAndGetHash(signedTransaction.rawTransaction)

    return response.json({
        "tx_hash" : result,
        "status" : "ok"
    });
}

exports.sign_add_portions_to_marketplace = async (request, response) => {

    let userAddress = request.body.user_address;
    let saleAddress = request.body.sale_address;
    let portions = request.body.portions
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t:"address", v: userAddress}, {t: "address", v: saleAddress}, {t:"uint256[]", v:portions},{t:"uint256", v:sigExpTime}, {t: "string", v: "addPortionsToMarket"});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
}

exports.sign_remove_portions = async (request, response) => {

    let ownerAddress = request.body.owner_address;
    let saleAddress = request.body.sale_address;
    let portions = request.body.portions
    let sigExpTime = request.body.signature_expiration_time

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t:"address", v: ownerAddress}, {t: "address", v: saleAddress}, {t:"uint256[]", v:portions}, {t:"uint256", v:sigExpTime}, {t: "string", v: "removePortionsFromMarket"});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
}

exports.sign_buy_portions = async (request, response) => {

    let ownerAddress = request.body.owner_address;
    let saleAddress = request.body.sale_address;
    let portions = request.body.portions
    let price = request.body.price
    let sigExpTime = request.body.signature_expiration_time
    let userAddress = request.body.user_address
    let itemId = request.body.item_id

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t:"address", v: ownerAddress}, {t:"address", v: userAddress}, {t: "address", v: saleAddress}, {t:"uint256[]", v:portions}, {t:"uint256", v:price}, {t:"uint256", v:itemId}, {t:"uint256", v:sigExpTime}, {t: "string", v: "buyPortions"});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
}

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