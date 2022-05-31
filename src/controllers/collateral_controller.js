const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

function sendTransactionAndGetHash(signedTransaction) {
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    return new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction(signedTransaction)
            .once('transactionHash', (hash) => {
                resolve(hash)
            })
    })
}

exports.auto_participate = async (request, response) => {
    // Take values from body.
    const saleContractAddress = request.body.contract_address
    const amountAVAX = request.body.amount_avax
    const amount = request.body.amount
    const amountXavaToBurn = request.body.amount_xava_to_burn
    const roundId = request.body.round_id
    const user = request.body.user_address
    const participationFeeAVAX = request.body.participation_fee_avax
    const signature = request.body.signature
    const gasPrice = request.body.gas_price

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)

    let collateralContract = contractGetters.getCollateralContract()

    // Pull out contract abi/address
    let collateralAbi = collateralContract['abi']
    let collateralAddress = collateralContract['address']

    // Init contract.
    let contract = new Contract(collateralAbi, collateralAddress);
    let data = contract.methods.autoParticipate(saleContractAddress, amountAVAX, amount, amountXavaToBurn, roundId, user, participationFeeAVAX, signature);
    let rawTransaction = {
        "from":account.address,
        "to":collateralAddress,
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

exports.boost_participation = async (request, response) => {

    // Take values from body.
    const saleContractAddress = request.body.contract_address
    const amountAVAX = request.body.amount_avax
    const amount = request.body.amount
    const amountXavaToBurn = request.body.amount_xava_to_burn
    const roundId = request.body.round_id
    const user = request.body.user_address
    const boostFeeAVAX = request.body.boost_fee_avax
    const signature = request.body.signature
    const gasPrice = request.body.gas_price

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)

    let collateralContract = contractGetters.getCollateralContract()

    // Pull out contract abi/address
    let collateralAbi = collateralContract['abi']
    let collateralAddress = collateralContract['address']

    // Init contract.
    let contract = new Contract(collateralAbi, collateralAddress);
    let data = contract.methods.boostParticipation(saleContractAddress, amountAVAX, amountXavaToBurn, user, boostFeeAVAX, signature);
    let rawTransaction = {
        "from":account.address,
        "to":collateralAddress,
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

exports.user_balance = async (request, response) => {

    const user = request.body.user_address

    let collateralContract = contractGetters.getCollateralContract()

    // Pull out contract abi/address
    let collateralAbi = collateralContract['abi']
    let collateralAddress = collateralContract['address']

    let contract = new Contract(collateralAbi, collateralAddress);

    const result = await contract.methods.userBalance(user).call();

    return response.json({
        "result" : result,
    });
}
