const Web3 = require("web3");
const contractGetters = require("./utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.user_info = async (request, response) => {

    let userAddress = request.body.user_address
    let allocationStakingContract = contractGetters.getAllocationStakingContract()

    // Pull out contract abi/address
    let allocationStakingAbi = allocationStakingContract['abi']
    let allocationStakingAddress = allocationStakingContract['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const userInfo = await contract.methods.userInfo(0, userAddress).call();

    return response.json({
        "user_info" : {
            "tokens_unlock_time" : userInfo.tokensUnlockTime
        }
    });
}

exports.is_user_staking = async (request, response) => {

    // Take address from body.
    const userAddress = request.body.address

    if (Web3.utils.isAddress(userAddress.toUpperCase()) === false) {
        return response.json({
            "is_user_staking" : false,
            "address" : userAddress,
            "amount_staking" : 0,
            "amount_pending" : 0
        });
    }

    let allocationStakingContract = contractGetters.getAllocationStakingContract()

    // Pull out contract abi/address
    let allocationStakingAbi = allocationStakingContract['abi']
    let allocationStakingAddress = allocationStakingContract['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const amountStaking = await contract.methods.deposited(0, userAddress).call();
    let amountPending = 0

    try {
        amountPending = await contract.methods.pending(0, userAddress).call();
    } catch (error) {
        console.log({
            "error" : error
        })
    }


    return response.json({
        "is_user_staking" : amountStaking > 0,
        "address" : userAddress,
        "amount_staking" : Web3.utils.fromWei(amountStaking, 'ether'),
        "amount_pending" : Web3.utils.fromWei(amountPending, 'ether')
    });
}

exports.pool_info = async (request, response) => {
    let pid = request.body.pid
    let allocationStakingContract = contractGetters.getAllocationStakingContract()

    // Pull out contract abi/address
    let allocationStakingAbi = allocationStakingContract['abi']
    let allocationStakingAddress = allocationStakingContract['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const poolInfo = await contract.methods.poolInfo(pid).call();

    return response.json({
        "pid" : pid,
        "pool_info" : poolInfo
    });
}

exports.is_nonce_used = async (request, response) => {
    let nonce = request.body.nonce
    let allocationStakingContract = contractGetters.getAllocationStakingContract()

    // Pull out contract abi/address
    let allocationStakingAbi = allocationStakingContract['abi']
    let allocationStakingAddress = allocationStakingContract['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const result = await contract.methods.isNonceUsed(nonce).call();

    return response.json({
        "nonce" : nonce,
        "is_nonce_used" : result
    });
}