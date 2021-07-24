const express = require('express')
const app = express()
app.use(express.json());
const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractMap = require("./contracts").CONTRACTS

// Import contract and add provider.
const Contract = require('web3-eth-contract');
Contract.setProvider(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc'));

app.post('/is-user-staking', async (request, response) => {

    // Take address from body.
    const userAddress = request.body.address

    // Pull out contract abi/address
    let allocationStakingAbi = contractMap['AllocationStaking']['abi']
    let allocationStakingAddress = contractMap['AllocationStaking']['address']

    // Init contract.
    let contract = new Contract(allocationStakingAbi, allocationStakingAddress);

    const amountStaking = await contract.methods.deposited(0, userAddress).call();
    const amountPending = await contract.methods.pending(0, userAddress).call();

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

    const recovered = ethSig.recoverTypedSignature({
        data: [data],
        sig: signature.toString(),
    });

    let verificationStatus = false;

    if (recovered.toLowerCase() === address.toLowerCase()) {
        verificationStatus = true;
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

    const pk = "9d1e21e1ef38e3222654bd9c47b2c1c59ab453075459320d756b5ecdb9b9b8fd";

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


    const pk = "9d1e21e1ef38e3222654bd9c47b2c1c59ab453075459320d756b5ecdb9b9b8fd";
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
    let saleAbi = contractMap['AvalaunchSale']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const sale = await contract.methods.sale().call();

    return response.json(sale);
})

app.post('/get-unlock-time', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AvalaunchSale']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get sale Object
    const sale = await contract.methods.sale().call();

    return response.json({
        "tokens_unlock_time": sale.tokensUnlockTime
    });
})


app.post('/is-user-registered', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AvalaunchSale']['abi']

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
    let saleAbi = contractMap['AvalaunchSale']['abi']

    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    const participation = await contract.methods.userToParticipation(userAddress).call();

    /**
     *  p.amountBought,
     p.amountAVAXPaid,
     p.timeParticipated,
     p.roundId,
     p.isWithdrawn
     * @type {{}}
     */
    const result = {
        'amountBought': Web3.utils.fromWei(participation.amountBought, 'ether'),
        'amountAVAXPaid': Web3.utils.fromWei(participation.amountAVAXPaid, 'ether'),
        'timeParticipated': participation.timeParticipated,
        'roundId': participation.roundId,
        'isWithdrawn': participation.isWithdrawn
    };

    return response.json(result);
})

app.post('/is-participated', async (request, response) => {

    // Take address from body.
    const saleContractAddress = request.body.contract_address
    const userAddress = request.body.user_address

    // Pull out contract abi/address
    let saleAbi = contractMap['AvalaunchSale']['abi']

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
    let saleAbi = contractMap['AvalaunchSale']['abi']
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
    let saleAbi = contractMap['AvalaunchSale']['abi']
    // Init contract.
    let contract = new Contract(saleAbi, saleContractAddress);

    // Get number of participants
    const payload = await contract.methods.registration().call();

    return response.json({
        "number_of_registrants" : payload.numberOfRegistrants.toString()
    });
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`🚀  Running on the ${3000 || process.env.PORT} port.`);
});
