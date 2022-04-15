function getContracts() {
    return require("../config/config_"+ process.env.STAGE +".json")
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
    getCollateralContract
};