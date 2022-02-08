const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractGetters = require("./getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()
const bs58 = require("bs58");

// Middleware to confirm auth key.
app.use(function (req, res, next) {

    const bearerHeader = req.header('Authorization')
    const authKey = process.env.AUTH_KEY

    if (typeof bearerHeader === 'string' && bearerHeader.startsWith("Bearer ")) {

        // Extract bearer token.
        const bearerToken = bearerHeader.substring(7, bearerHeader.length);

        if (bearerToken === authKey)
            return next()
    }

    return res.status(401).json({
        "status" : "fail",
        "error" : {
            "message" : "User not authorized to perform request.",
            "code" : 401,
            "type" : "unauthorized"
        }
    });
})


Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

const {
    Avalanche,
    Buffer,
    BinTools,
} = require("avalanche")
const {getAllocationStakingContract, getErc20Abi} = require("./getters");

app.post('/staking/is-user-staking', async (request, response) => {

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
});

app.post('/utils/recover-typed-signature', (request, response) => {

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
        verificationStatus = false;
    }

    return response.json({
        "message_signer" : recovered.toLowerCase(),
        "expected_signer" : address.toLowerCase(),
        "verification_status": verificationStatus
    });
});

app.post('/sale/sign-registration', (request, response) => {

    let user_address = request.body.user_address
    let roundId = request.body.round_id
    let contractAddress = request.body.contract_address
    let timestamp = request.body.timestamp

    const pk = process.env.PRIVATE_KEY_1;

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    const account = web3.eth.accounts.privateKeyToAccount(pk);

    let hash = web3.utils.soliditySha3({t:"address", v: user_address}, {t: "uint256", v: roundId}, {t: "address", v: contractAddress}, {t: "uint256", v: timestamp});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
});

app.post('/sale/sign-participation', (request, response) => {

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

app.post('/sale/get-sale-information', async (request, response) => {

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
    });
})

app.post('/sale/get-unlock-time', async (request, response) => {

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
})

app.post('/utils/recover-address', async (request, response) => {

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

app.post('/sale/is-user-registered', async (request, response) => {

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
})

app.post('/sale/get-participation', async (request, response) => {

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
        'isWithdrawn': participation['4']
    };

    return response.json(result);
})

app.post('/sale/get-number-of-participants', async (request, response) => {

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
})

app.post('/sale/staking-round-id', async (request, response) => {

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
});

app.post('/sale/get-number-of-registered', async (request, response) => {

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
})

app.post('/sale/address-to-round-registered-for', async (request, response) => {

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
    let saleAbi = contractGetters.getAirdropAbi()
    let contract = new Contract(saleAbi, airdropContractAddress);

    // Get number of participants
    const payload = await contract.methods.wasClaimed(userAddress).call();

    return response.json({
        "claimed" : payload
    });
})

app.post('/utils/balance-of', async (request, response) => {

    const walletAddress = request.body.wallet_address
    const tokenAddress = request.body.token_address

    const contract = new Web3Client.eth.Contract(getErc20Abi(), tokenAddress);

    let result = await contract.methods.balanceOf(walletAddress).call();

    return response.json({
        "result" : result
    });
})

app.post('/staking/pool-info', async (request, response) => {

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
});

app.post('/utils/sign-withdraw', (request, response) => {

    let userAddress = request.body.user_address
    let poolId = request.body.pool_id
    let amount = request.body.amount
    let nonce = request.body.nonce

    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let hash = web3.utils.soliditySha3({t:"address", v: userAddress}, {t: "uint256", v: poolId},{t: "uint256", v: amount},{t: "uint256", v: nonce});

    let result = web3.eth.accounts.sign(hash, pk);

    return response.json({
        "result" : result.signature
    })
});

app.post('/utils/checksum', async (request, response) => {

    const addresses = request.body.addresses
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    var result = []

    for (var i = 0; i < addresses.length; i++) {
        result.push(web3.utils.toChecksumAddress(addresses[i]))
    }

    return response.json({
        "result" : result
    });
})

app.post('/staking/user-info', async (request, response) => {

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
})

app.post('/staking/is-nonce-used', async (request, response) => {

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
})

app.post('/sale/token-price-in-avax', async (request, response) => {

    const tokenPriceInAvax = request.body.token_price_in_avax
    const pk = process.env.PRIVATE_KEY_1;
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const account = web3.eth.accounts.privateKeyToAccount(pk)

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
        "gasPrice":web3.utils.toHex(25000000000),
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
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
