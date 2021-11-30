function getContracts() {

    if (process.env.STAGE === 'staging') {
        return require("./contracts_staging").CONTRACTS
    }

    return require("./contracts").CONTRACTS
}

function getSaleAbi(version = null) {

    let contracts = getContracts()

    if (version == null || contracts['AVALAUNCH_SALE']['versions'][version] === undefined) {
        return contracts['AVALAUNCH_SALE']['abi']
    }

    return contracts['AVALAUNCH_SALE']['versions'][version]["abi"]
}

function getRpc() {

    if (process.env.STAGE === 'staging') {
        return 'https://api.avax-test.network/ext/bc/C/rpc'
    }

    return 'https://api.avax.network/ext/bc/C/rpc'
}

function getAllocationStakingContract() {
    return getContracts()['ALLOCATION_STAKING']
}

function getAirdropAbi() {
    return getContracts()['AIRDROP']['abi']
}

module.exports = {
    getRpc,
    getSaleAbi,
    getAllocationStakingContract,
    getAirdropAbi
};