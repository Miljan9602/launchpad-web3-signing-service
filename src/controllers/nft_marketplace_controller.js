const Contract = require("web3-eth-contract");
const Web3 = require("web3");
const contractGetters = require("../utils/getters");

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
        "result" : result,
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
        "result" : result,
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
        "result" : result,
        "status" : "ok"
    });
}