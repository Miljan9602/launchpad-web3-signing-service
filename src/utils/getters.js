function getContracts() {

    console.log({
        "env" : process.env.STAGE
    })

    console.log({
        "path" : "../config/config_"+ process.env.STAGE +".json"
    })

    return require("../config/config_staging.js").CONTRACTS
}

function getSaleAbi(version = null) {

    let contracts = getContracts()

    console.log({
        "contracts" : contracts,
        "version" : version
    })

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