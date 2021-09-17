const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractMap = getContracts()

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = 'https://api.avax.network/ext/bc/C/rpc'
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

    if (Web3.utils.isAddress(userAddress) === false) {
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

    const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

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
    const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

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

    const myNetworkID = 1; //default is 1, we want to override that for our local network
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

function getContracts() {

    if (process.env.STAGE === 'staging') {
        return require("./contracts_staging").CONTRACTS
    }

    return require("./contracts").CONTRACTS
}

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
