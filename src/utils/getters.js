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

module.exports = {
    getRpc,
};