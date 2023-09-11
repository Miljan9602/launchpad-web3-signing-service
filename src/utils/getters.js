function getConfig() {

    let stage = process.env.STAGE

    if (stage === 'staging' || stage === 'develop') {
        return require('../config/config_' + stage + '.json')
    }
    return require("../config/config_production.json")
}

function getRpc() {
    return getConfig()['RPC']
}

function getStakingAbi() {
    return getConfig()['STAKING']['abi']
}

function getStakingAddress() {
    return getConfig()['STAKING']['address']
}

function getCollateralAbi() {
    return getConfig()['COLLATERAL']['abi']
}

function getCollateralAddress() {
    return getConfig()['COLLATERAL']['address']
}


module.exports = {
    getRpc,
    getStakingAbi,
    getStakingAddress,
    getCollateralAddress,
    getCollateralAbi
};