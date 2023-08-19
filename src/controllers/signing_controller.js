const ethSig = require('eth-sig-util');
const Web3 = require("web3");
const contractGetters = require("../utils/getters")

// Import contract and add provider.
const RPC_URL = contractGetters.getRpc()

exports.sign_claim_application_token = (request, response) => {
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

exports.sign_claim_mint_token = (request, response) => {
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

exports.sign_conversion_application_to_mint = (request, response) => {
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

exports.sign_conversion_mint_to_application = (request, response) => {
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

exports.sign_instant_conversion_application_to_mint = (request, response) => {
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

exports.sign_instant_conversion_mint_to_application = (request, response) => {
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

exports.sign_staking_application_token = (request, response) => {
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

exports.sign_withdraw_application_token = (request, response) => {
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