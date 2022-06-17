const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.get_signature = async (request, response) => {
    let private_key = process.env.PRIVATE_KEY_1;
    let address = request.body.address
    let amountWei = request.body.amount
    let contract_address = request.body.contract_address;

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    /**
     * If the contract_address is address from the HCT sale. We are using the old hash version.
     * @type {string}
     */
    let hash = contract_address.toUpperCase() === '0X87B1BEAAB6F7A40B28A2DEF896C50E57061C3B36' ?
        web3.utils.soliditySha3({t:"address", v: address}, {t: "uint256", v: amountWei}) :
        web3.utils.soliditySha3({t:"address", v: address}, {t: "uint256", v: amountWei}, {t: "address", v: contract_address});

    let result = web3.eth.accounts.sign(hash, private_key);

    return response.json({
        "address": address,
        "amount": amountWei,
        "signature" : result.signature
    });
}

exports.is_claimed = async (request, response) => {
    // Take address from body.
    const airdropContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Init contract.
    let saleAbi = contractGetters.getAirdropAbi()
    let contract = new Contract(saleAbi, airdropContractAddress);

    // Get number of participants
    const payload = await contract.methods.wasClaimed(userAddress).call();

    return response.json({
        "claimed" : payload
    });
}

exports.info = async (request, response) => {

    // Take address from body.
    const airdropContractAddress = request.body.contract_address

    // Init contract.
    let saleAbi = contractGetters.getAirdropAbi()
    let contract = new Contract(saleAbi, airdropContractAddress);

    // Get number of participants
    const totalTokensWithdrawn = await contract.methods.totalTokensWithdrawn().call();
    const airdropToken = await contract.methods.airdropToken().call();

    return response.json({
        "total_tokens_withdrawn" : totalTokensWithdrawn,
        "airdrop_token" : airdropToken
    });
}