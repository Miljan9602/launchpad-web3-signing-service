const Web3 = require("web3");
const contractGetters = require("../utils/getters")
// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

exports.get_sale_information = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const sale = await contract.methods.sale().call();

    return response.json({
        token_price_in_avax: Web3.utils.fromWei(sale.tokenPriceInAVAX, 'ether'),
        amount_of_tokens_to_sell: Web3.utils.fromWei(sale.amountOfTokensToSell, 'ether'),
        total_tokens_sold: Web3.utils.fromWei(sale.totalTokensSold, 'ether'),
        total_avax_raised: Web3.utils.fromWei(sale.totalAVAXRaised, 'ether'),
        token_price_in_usd: sale.tokenPriceInUSD,
        phase_id : sale.phase
    });
}

exports.get_vesting_info = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get vesting info
    const vestingInfo = await contract.methods.getVestingInfo().call();

    return response.json({
        "portions_unlock_time" : vestingInfo[0],
        "portions": vestingInfo[1]
    })
}

exports.get_unlock_time = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get sale Object
    const sale = await contract.methods.sale().call();

    return response.json({
        "tokens_unlock_time": sale.tokensUnlockTime
    });
}

exports.dexalot_unlock_time = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const dexalotUnlockTime = await contract.methods.dexalotUnlockTime().call();

    return response.json({
        "dexalot_unlock_time" : dexalotUnlockTime
    })
}

exports.sign_registration = async (request, response) => {
    let user_address = request.body.user_address
    let roundId = request.body.round_id
    let contractAddress = request.body.contract_address
    let timestamp = request.body.timestamp

    const pk = process.env.PRIVATE_KEY_1;

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t: "uint256", v: timestamp}, {t:"address", v: user_address}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress}, {t: "string", v: "registerForSale"});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
}
// addressToPhaseRegisteredFor
exports.address_to_phase_registered_for = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const round = await contract.methods.addressToPhaseRegisteredFor(userAddress).call();
    const result = parseInt(round, 10) > 0

    return response.json({
        "is_user_registered" : result,
        "address_to_phase_registered_for" : round
    });
}

exports.is_user_registered = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const round = await contract.methods.addressToRoundRegisteredFor(userAddress).call();
    const result = parseInt(round, 10) > 0

    return response.json({
        "is_user_registered" : result
    });
}

exports.number_of_registrants = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of registered
    const numberOfRegistered = await contract.methods.numberOfRegistrants().call();

    return response.json({
        "number_of_registered" : numberOfRegistered.toString()
    });
}

exports.address_to_round_registered_for = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    if (Web3.utils.isAddress(userAddress.toUpperCase()) === false) {
        return response.json({
            "round_registered_for" : "0"
        });
    }

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const payload = await contract.methods.addressToRoundRegisteredFor(userAddress).call();

    return response.json({
        "round_registered_for" : payload
    });
}

exports.sign_participation = async (request, response) => {
    let userAddress = request.body.user_address;
    let amountWei = request.body.amount_wei;
    let roundId = request.body.round_id;
    let contractAddress = request.body.contract_address;
    let amountXavaToBurn = request.body.amount_xava_to_burn;

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t:"address", v: userAddress}, {t: "uint256", v: amountWei},{t: "uint256", v: amountXavaToBurn}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress}, {t: "string", v: "participate"});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
}

exports.get_participation_amounts_and_states = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const getParticipationAmountsAndStates = await contract.methods.getParticipationAmountsAndStates(userAddress).call();

    /**
     p.amount_bought,
     p.amount_avax_paid,
     p.time_participated,
     p.round_id,
     p.is_withdrawn
     * @type {{}}
     */
    const result = {
        'portion_amounts': getParticipationAmountsAndStates['0'] || [],
        'portion_states': getParticipationAmountsAndStates['1'] || [],
    };

    return response.json(result);
}

exports.get_participation_v2 = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const getParticipationAmountsAndStates = await contract.methods.getParticipationAmountsAndStates(userAddress).call();
    const userToParticipation = await contract.methods.userToParticipation(userAddress).call();


    /**
     p.amount_bought,
     p.amount_avax_paid,
     p.time_participated,
     p.round_id,
     p.is_withdrawn
     * @type {{}}
     */
    const result = {
        'amount_bought': Web3.utils.fromWei(userToParticipation['0'], 'ether'),
        'amount_avax_paid': Web3.utils.fromWei(userToParticipation['1'], 'ether'),
        'time_participated': userToParticipation['2'],
        'phase_id': userToParticipation['3'],
        'is_buy_remainder_bought' : userToParticipation['5'] > 0  || false,
        'buy_remainder_amount_bought_in_avax' : userToParticipation['4'] || 0,
        'buy_remainder_amount_bought' : userToParticipation['5'] || 0,
        'portion_amounts': getParticipationAmountsAndStates['0'] || [],
        'portion_states': getParticipationAmountsAndStates['1'] || [],
    };

    return response.json(result);
}

exports.get_participation = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const participation = await contract.methods.getParticipation(userAddress).call();

    /**
     p.amount_bought,
     p.amount_avax_paid,
     p.time_participated,
     p.round_id,
     p.is_withdrawn
     * @type {{}}
     */
    const result = {
        'amount_bought': Web3.utils.fromWei(participation['0'], 'ether'),
        'amount_avax_paid': Web3.utils.fromWei(participation['1'], 'ether'),
        'time_participated': participation['2'],
        'round_id': participation['3'],
        'is_withdrawn': participation['4'],
        'is_withdrawn_to_dexalot': participation['5'] || [],
        'is_buy_remainder_bought' : participation['6'] || false,
        'buy_remainder_amount_bought' : participation['7'] || 0,
        'buy_remainder_amount_bought_in_avax' : participation['8'] || 0
    };

    return response.json(result);
}

exports.get_number_of_participants = async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const numberOfParticipants = await contract.methods.numberOfParticipants().call();

    return response.json({
        "number_of_participants" : numberOfParticipants.toString()
    });
}

exports.is_participated = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const result = await contract.methods.isParticipated(userAddress).call();

    return response.json({
        "is_participated" : result
    })
}

exports.token_price_in_avax = async (request, response) => {

    const tokenPriceInAvax = request.body.token_price_in_avax
    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)
    const gasPrice = request.body.gas_price

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);
    let data = contract.methods.updateTokenPriceInAVAX(tokenPriceInAvax);
    let rawTransaction = {
        "from":account.address,
        "to":saleContractAddress,
        "gasPrice":web3.utils.toHex(gasPrice),
        "gasLimit":web3.utils.toHex(290000),
        "data": data.encodeABI()
    };

    let result = await account.signTransaction(rawTransaction).then(signed => {
        return web3.eth.sendSignedTransaction(signed.rawTransaction);
    });

    return response.json({
        "tx_hash" : result.transactionHash,
        "to" : result.to,
        "status" : result.status
    });
}

exports.change_phase = async (request, response) => {

    const phaseId = request.body.phase_id
    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)
    const gasPrice = request.body.gas_price

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);
    let data = contract.methods.changePhase(phaseId);
    let rawTransaction = {
        "from":account.address,
        "to":saleContractAddress,
        "gasPrice":web3.utils.toHex(gasPrice),
        "gasLimit":web3.utils.toHex(290000),
        "data": data.encodeABI()
    };

    let result = await account.signTransaction(rawTransaction).then(signed => {
        return web3.eth.sendSignedTransaction(signed.rawTransaction);
    });

    return response.json({
        "tx_hash" : result.transactionHash,
        "to" : result.to,
        "status" : result.status
    });
}