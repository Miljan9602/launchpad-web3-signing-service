const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractMap = getContracts()

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = getRpc()
const bs58 = require("bs58");

Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

const {
    Avalanche,
    Buffer,
    BinTools,
} = require("avalanche")

app.post('/is-user-staking', async (request, response) => {

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

    // Pull out contract abi/address
    let allocationStakingAbi = contractMap['ALLOCATION_STAKING']['abi']
    let allocationStakingAddress = contractMap['ALLOCATION_STAKING']['address']

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
});

app.post('/recover-typed-signature', (request, response) => {

    const address = request.body.address
    const data = request.body.data
    const signature = request.body.signature
    let verificationStatus = false

    const recovered = ethSig.recoverTypedSignature_v4({
        data: data,
        sig: signature,
    });

    if (recovered.toLowerCase() === address.toString().toLowerCase()) {
        verificationStatus = true;
    } else {
        return false;
    }

    return response.json({
        "message_signer" : recovered.toLowerCase(),
        "expected_signer" : address.toLowerCase(),
        "verification_status": verificationStatus
    });
});

app.post('/sign-registration', (request, response) => {

    let user_address = request.body.user_address
    let roundId = request.body.round_id
    let contractAddress = request.body.contract_address

    const pk = process.env.PRIVATE_KEY_1;

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    const account = web3.eth.accounts.privateKeyToAccount(pk);

    let hash = web3.utils.soliditySha3({t:"address", v: user_address}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
});

app.post('/sign-participation', (request, response) => {

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
});

app.post('/get-sale-information', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const sale = await contract.methods.sale().call();

    return response.json({
        tokenPriceInAVAX: Web3.utils.fromWei(sale.tokenPriceInAVAX, 'ether'),
        amountOfTokensToSell: Web3.utils.fromWei(sale.amountOfTokensToSell, 'ether'),
        totalTokensSold: Web3.utils.fromWei(sale.totalTokensSold, 'ether'),
        totalAVAXRaised: Web3.utils.fromWei(sale.totalAVAXRaised, 'ether'),
    });
})

app.post('/get-unlock-time', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']


    // TODO: fix this.
    let map = ['0x4437c4ca026f08380812d545e26679eb8404e26b','0x8498a16b04e754f873198434063c8684d506a967','0x8c18dbd68a2fd18f10b56d902cd6ad02c41828e0','0x16bc59978851012ada4843e49df2a314ea38665a','0xf4e11d41aec3bb2f980cbe2d62ebe7497e54f027','0x52f351a405ad70a931e03fef20e97230f720f20b']
    if (map.includes(saleContractAddress.toLowerCase())) {
        saleAbi = [{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_allocationStaking","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"name":"MaxParticipationSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"registrationTimeStarts","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"registrationTimeEnds","type":"uint256"}],"name":"RegistrationTimeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"name":"RoundAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"saleOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"saleEnd","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensUnlockTime","type":"uint256"}],"name":"SaleCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"TokenPriceSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToRoundRegisteredFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"contractIAdmin","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allocationStakingContract","outputs":[{"internalType":"contractIAllocationStaking","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"round","type":"uint256"}],"name":"checkParticipationSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"checkRegistrationSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToAdd","type":"uint256"}],"name":"extendRegistrationPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contractISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfRegisteredUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getParticipation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getParticipationSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isParticipated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxVestingTimeShift","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"one","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"participate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"portionVestingPrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"postponeSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"registerForSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"registration","outputs":[{"internalType":"uint256","name":"registrationTimeStarts","type":"uint256"},{"internalType":"uint256","name":"registrationTimeEnds","type":"uint256"},{"internalType":"uint256","name":"numberOfRegistrants","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registrationDepositAVAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registrationFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundIdToRound","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sale","outputs":[{"internalType":"contractIERC20","name":"token","type":"address"},{"internalType":"bool","name":"isCreated","type":"bool"},{"internalType":"bool","name":"earningsWithdrawn","type":"bool"},{"internalType":"bool","name":"tokensDeposited","type":"bool"},{"internalType":"address","name":"saleOwner","type":"address"},{"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"totalTokensSold","type":"uint256"},{"internalType":"uint256","name":"totalAVAXRaised","type":"uint256"},{"internalType":"uint256","name":"saleEnd","type":"uint256"},{"internalType":"uint256","name":"tokensUnlockTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"rounds","type":"uint256[]"},{"internalType":"uint256[]","name":"caps","type":"uint256[]"}],"name":"setCapPerRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_registrationTimeStarts","type":"uint256"},{"internalType":"uint256","name":"_registrationTimeEnds","type":"uint256"}],"name":"setRegistrationTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"startTimes","type":"uint256[]"},{"internalType":"uint256[]","name":"maxParticipations","type":"uint256[]"}],"name":"setRounds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_saleOwner","type":"address"},{"internalType":"uint256","name":"_tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"_amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"_saleEnd","type":"uint256"},{"internalType":"uint256","name":"_tokensUnlockTime","type":"uint256"},{"internalType":"uint256","name":"_portionVestingPrecision","type":"uint256"},{"internalType":"uint256","name":"_stakingRoundId","type":"uint256"},{"internalType":"uint256","name":"_registrationDepositAVAX","type":"uint256"}],"name":"setSaleParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_unlockingTimes","type":"uint256[]"},{"internalType":"uint256[]","name":"_percents","type":"uint256[]"},{"internalType":"uint256","name":"_maxVestingTimeShift","type":"uint256"}],"name":"setVestingParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"shiftVestingUnlockingTimes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"updateTokenPriceInAVAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userToParticipation","outputs":[{"internalType":"uint256","name":"amountBought","type":"uint256"},{"internalType":"uint256","name":"amountAVAXPaid","type":"uint256"},{"internalType":"uint256","name":"timeParticipated","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPercentPerPortion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPortionsUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"withBurn","type":"bool"}],"name":"withdrawEarningsAndLeftover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRegistrationFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"portionId","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    }

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get sale Object
    const sale = await contract.methods.sale().call();

    return response.json({
        "tokens_unlock_time": sale.tokensUnlockTime
    });
})

app.post('/recover-address', async (request, response) => {

    let msg = request.body.message
    let sig = request.body.signature

    const myNetworkID = 1;
    const hrp = 'avax'
    const avalanche = new Avalanche(AVALAUNCH_URL, 443, "https", myNetworkID);

    // Create Key Pair.
    let keypair = avalanche.XChain().keyChain().makeKey();
    let signerPubk = null;

    try {
        let digest = digestMessage(msg)
        let message = Buffer.from(digest.toString('hex'), 'hex')
        let signature = bs58.decode(sig)
        signerPubk = keypair.recover(message, signature);
    } catch (error) {

        // TODO: Better handle this case.
        return response.json({
            "address" : "X-avax10enayu7uryrkruzx1hcdc7na899x9lfsx7gmzw"
        })
    }

    let addressBuff = keypair.addressFromPublicKey(signerPubk)
    let address = BinTools.getInstance().addressToString(hrp, 'P', addressBuff)

    return response.json({
        "address" : address
    })
});

function digestMessage(msgStr) {
    let mBuf = Buffer.from(msgStr, 'utf8')
    let msgSize = Buffer.alloc(4)
    msgSize.writeUInt32BE(mBuf.length, 0)
    let msgBuf = Buffer.from(`\x1AAvalanche Signed Message:\n${msgSize}${msgStr}`, 'utf8')

    return require("crypto").createHash('sha256').update(msgBuf).digest()
}

app.post('/is-user-registered', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const round = await contract.methods.addressToRoundRegisteredFor(userAddress).call();
    const result = parseInt(round, 10) > 0

    return response.json({
        "is_user_registered" : result
    });
})

app.post('/get-participation', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']

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
        'isWithdrawn': participation['4']
    };

    return response.json(result);
})

app.post('/is-participated', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const participated = await contract.methods.isParticipated(userAddress).call();

    return response.json({
        "is_participated" : participated
    });
})

app.post('/get-number-of-participants', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const numberOfParticipants = await contract.methods.numberOfParticipants().call();

    return response.json({
        "number_of_participants" : numberOfParticipants.toString()
    });
})

app.post('/get-number-of-registered', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of registered
    const numberOfRegistered = await contract.methods.getNumberOfRegisteredUsers().call();

    return response.json({
        "number_of_registered" : numberOfRegistered.toString()
    });
})

app.post('/get-number-of-registrants', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const payload = await contract.methods.registration().call();

    return response.json({
        "number_of_registrants" : payload.numberOfRegistrants.toString()
    });
})

app.post('/get-stake-during-registration', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const payload = await contract.methods.addressToStakeAtRegistration(userAddress).call();

    let resp = 0;

    if(payload.toString() !== '0') {
        resp = Web3.utils.fromWei(payload, 'ether');
    }
    return response.json({
        "staked_amount" : resp
    });
})

app.post('/address-to-round-registered-for', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    if (Web3.utils.isAddress(userAddress.toUpperCase()) === false) {
        return response.json({
            "round_registered_for" : "0"
        });
    }

    // Pull out contract abi/address
    let saleAbi = contractMap['AVALAUNCH_SALE']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const payload = await contract.methods.addressToRoundRegisteredFor(userAddress).call();

    return response.json({
        "round_registered_for" : payload
    });
})

app.post('/airdrop/get-signature', async (request, response) => {

    let private_key = process.env.PRIVATE_KEY_1;
    let address = request.body.address
    let amountWei = request.body.amount
    let contract_address = request.body.contract_address;

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    /**
     * If the contract_address is address from the HCT sale. We are using the old hash version.
     * @type {string}
     */
    let hash = contract_address.toUpperCase() === '0X87B1BEAAB6F7A40B28A2DEF896C50E57061C3B36' ?
        web3.utils.soliditySha3({t:"address", v: address}, {t: "uint256", v: amountWei}) :
        web3.utils.soliditySha3({t:"address", v: address}, {t: "uint256", v: amountWei}, {t: "address", v: contract_address});

    let result = web3.eth.accounts.sign(hash, private_key);

    return response.json({
        "address": address,
        "amount": amountWei,
        "signature" : result.signature
    });
})

app.post('/airdrop/is-claimed', async (request, response) => {

    // Take address from body.
    const airdropContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Init contract.
    let saleAbi = contractMap['AIRDROP']['abi']
    let contract = new Contract(saleAbi, airdropContractAddress);

    // Get number of participants
    const payload = await contract.methods.wasClaimed(userAddress).call();

    return response.json({
        "claimed" : payload
    });
})

app.post('/balance-of', async (request, response) => {

    const userAddress = request.body.user_address

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let result = await web3.eth.getBalance(userAddress)

    return response.json({
        "result" : result
    });
})

function getContracts() {

    if (process.env.STAGE === 'staging') {
        return require("./contracts_staging").CONTRACTS
    }

    return require("./contracts").CONTRACTS
}

function getRpc() {

    if (process.env.STAGE === 'staging') {
        return 'https://api.avax-test.network/ext/bc/C/rpc'
    }

    return 'https://api.avax.network/ext/bc/C/rpc'
}

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
