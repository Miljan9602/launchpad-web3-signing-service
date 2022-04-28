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
        tokenPriceInAVAX: Web3.utils.fromWei(sale.tokenPriceInAVAX, 'ether'),
        amountOfTokensToSell: Web3.utils.fromWei(sale.amountOfTokensToSell, 'ether'),
        totalTokensSold: Web3.utils.fromWei(sale.totalTokensSold, 'ether'),
        totalAVAXRaised: Web3.utils.fromWei(sale.totalAVAXRaised, 'ether'),
        tokenPriceInUSD: sale.tokenPriceInUSD
    });
}

exports.timeline = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const stakingRoundId = parseInt(await contract.methods.stakingRoundId().call());
    const validatorRoundId = stakingRoundId-1;
    const boosterRoundId = stakingRoundId+1;

    const registrationTimeline = await contract.methods.registration().call();
    const validatorRoundStart = await contract.methods.roundIdToRound(validatorRoundId).call();
    const stakingRoundStart = await contract.methods.roundIdToRound(stakingRoundId).call();
    const boosterRoundStart = await contract.methods.roundIdToRound(boosterRoundId).call();
    const saleEndTime = await contract.methods.sale().call();

    return response.json({
        "registration_opens" : registrationTimeline['registrationTimeStarts'],
        "registration_closes" : registrationTimeline['registrationTimeEnds'],
        "validator_round" : validatorRoundStart['startTime'],
        "seed_round" : stakingRoundStart['startTime'],
        "booster_round" : boosterRoundStart['startTime'],
        "sale_ends" : saleEndTime['saleEnd'],
    })
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

exports.staking_round_id = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of registered
    const stakingRoundId = await contract.methods.stakingRoundId().call();

    return response.json({
        "staking_round_id" : stakingRoundId
    })
}

exports.round_id_to_round = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const roundId = request.body.round_id_to_round
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get start time and max participation
    const startTimeAndMaxParticipation = await contract.methods.roundIdToRound(roundId).call();

    return response.json({
        "start_time" : startTimeAndMaxParticipation[0],
        "max_participation": startTimeAndMaxParticipation[1]
    })
}

exports.supports_dexalot_withdraw = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const supportsDexalotWithdraw = await contract.methods.supportsDexalotWithdraw().call();

    return response.json({
        "supports_dexalot_withdraw" : supportsDexalotWithdraw
    })
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

    let hash = web3.utils.soliditySha3({t: "uint256", v: timestamp}, {t:"address", v: user_address}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
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

exports.get_number_of_registered = async (request, response) => {
    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const abiVersion = request.header('X-ABI-VERSION')

    // Pull out contract abi/address
    let saleAbi = contractGetters.getSaleAbi(abiVersion)
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of registered
    const numberOfRegistered = await contract.methods.getNumberOfRegisteredUsers().call();

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

    let hash = web3.utils.soliditySha3({t:"address", v: userAddress}, {t: "uint256", v: amountWei},{t: "uint256", v: amountXavaToBurn}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
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

    // const participation = await contract.methods.userToParticipation(userAddress).call();
    const participation = await contract.methods.getParticipation(userAddress).call();

    /**
     p.amountBought,
     p.amountAVAXPaid,
     p.timeParticipated,
     p.roundId,
     p.isWithdrawn
     * @type {{}}
     */
    const result = {
        'amountBought': Web3.utils.fromWei(participation['0'], 'ether'),
        'amountAVAXPaid': Web3.utils.fromWei(participation['1'], 'ether'),
        'timeParticipated': participation['2'],
        'roundId': participation['3'],
        'isWithdrawn': participation['4'],
        'isWithdrawnToDexalot': participation['5'] || [],
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