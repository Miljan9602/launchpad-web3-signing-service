const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const Contract = require('web3-eth-contract');
const AVALAUNCH_URL = contractGetters.getRpc()
const bs58 = require("bs58");


Contract.setProvider(new Web3.providers.HttpProvider(AVALAUNCH_URL));

const {
    Avalanche,
    Buffer,
    BinTools,
} = require("avalanche")

function digestMessage(msgStr) {
    let mBuf = Buffer.from(msgStr, 'utf8')
    let msgSize = Buffer.alloc(4)
    msgSize.writeUInt32BE(mBuf.length, 0)
    let msgBuf = Buffer.from(`\x1AAvalanche Signed Message:\n${msgSize}${msgStr}`, 'utf8')

    return require("crypto").createHash('sha256').update(msgBuf).digest()
}

exports.recover_typed_signature = (request, response) => {
    const address = request.body.address
    const data = request.body.data
    const signature = request.body.signature

    const recovered = ethSig.recoverTypedSignature_v4({
        data: data,
        sig: signature,
    });

    let verificationStatus = recovered.toLowerCase() === address.toString().toLowerCase()

    return response.json({
        "message_signer" : recovered.toLowerCase(),
        "expected_signer" : address.toLowerCase(),
        "verification_status": verificationStatus
    });
}

exports.recover_address = async (request, response) => {
    let msg = request.body.message
    let sig = request.body.signature

    const myNetworkID = 1;
    const hrp = 'avax'
    const avalanche = new Avalanche(AVALAUNCH_URL, 443, "https", myNetworkID);

    // Create Key Pair.
    let keypair = avalanche.XChain().keyChain().makeKey();
    let signerPublicKey = null;

    try {
        let digest = digestMessage(msg)
        let message = Buffer.from(digest.toString('hex'), 'hex')
        let signature = bs58.decode(sig)
        signerPublicKey = keypair.recover(message, signature);
    } catch (error) {

        // TODO: Better handle this case.
        return response.json({
            "address" : "X-avax10enayu7uryrkruzx1hcdc7na899x9lfsx7gmzw"
        })
    }

    let addressBuff = keypair.addressFromPublicKey(signerPublicKey)
    let address = BinTools.getInstance().addressToString(hrp, 'P', addressBuff)

    return response.json({
        "address" : address
    })
}

exports.balance_of = async (request, response) => {
    const walletAddress = request.body.wallet_address
    const tokenAddress = request.body.token_address

    let contract = new Contract(contractGetters.getErc20Abi(), tokenAddress);

    let result = await contract.methods.balanceOf(walletAddress).call();

    return response.json({
        "result" : result
    });
}

exports.total_supply = async (request, response) => {

    const tokenAddress = request.body.token_address

    let contract = new Contract(contractGetters.getErc20Abi(), tokenAddress);

    let result = await contract.methods.totalSupply().call();

    return response.json({
        "result" : result
    });
}

exports.balance = async (request, response) => {

    const userAddress = request.body.user_address

    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));

    let result = await web3.eth.getBalance(userAddress)

    return response.json({
        "result" : result
    });
}

exports.sign_withdraw = async (request, response) => {
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
}

exports.checksum = async (request, response) => {
    const addresses = request.body.addresses
    const web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    const result = [];

    for (let i = 0; i < addresses.length; i++) {
        result.push(web3.utils.toChecksumAddress(addresses[i]))
    }

    return response.json({
        "result" : result
    });
}