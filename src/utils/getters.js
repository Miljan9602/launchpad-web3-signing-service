function getContracts() {

    let stage = process.env.STAGE

    if (stage === 'staging' || stage === 'develop') {
        return require('../config/config_'+stage+'.json')
    }

    return require("../config/config_production.json")
}

function getSaleAbi(version = null) {

    let contracts = getContracts()

    if (version == null || contracts['AVALAUNCH_SALE']['versions'][version] === undefined) {
        return contracts['AVALAUNCH_SALE']['abi']
    }

    return contracts['AVALAUNCH_SALE']['versions'][version]["abi"]
}

function getRpc() {
    return getContracts()['RPC']
}

function getAllocationStakingContract() {
    return getContracts()['ALLOCATION_STAKING']
}

function getCollateralContract() {
    return getContracts()['COLLATERAL']
}

function getMarketplaceContract() {
    return getContracts()['MARKETPLACE']
}

function getMarketplaceContractAbi() {
    return getMarketplaceContract()['abi']
}

function getErc20Abi() {
    return getContracts()['ERC_20']['abi']
}

function getAirdropAbi() {
    return getContracts()['AIRDROP']['abi']
}

module.exports = {
    getRpc,
    getSaleAbi,
    getAllocationStakingContract,
    getAirdropAbi,
    getErc20Abi,
    getCollateralContract,
    getMarketplaceContractAbi
};