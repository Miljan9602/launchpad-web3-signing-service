const Web3 = require("web3");
const InputDataDecoder = require('ethereum-input-data-decoder');
const LogDecoder = require('logs-decoder')
const AVALAUNCH_URL = 'https://api.avax-test.network/ext/bc/C/rpc'

let contractAddress = '0x4273cbcd68be6784bbd9ed396b19ca89c4a40b81'
let contractAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"LockActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"NewTokenPriceSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountAVAX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountTokens","type":"uint256"}],"name":"ParticipationBoosted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum AvalaunchSaleV2.Phases","name":"phase","type":"uint8"}],"name":"PhaseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountRefunded","type":"uint256"}],"name":"RegistrationAVAXRefunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"saleEnd","type":"uint256"}],"name":"SaleCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawnToDexalot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"phaseId","type":"uint256"}],"name":"UserRegistered","type":"event"},{"inputs":[],"name":"activateLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"portions","type":"uint256[]"},{"internalType":"uint256[]","name":"prices","type":"uint256[]"}],"name":"addPortionsToMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToPhaseRegisteredFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"contract IAdmin","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allocationStaking","outputs":[{"internalType":"contract IAllocationStaking","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"phaseId","type":"uint256"}],"name":"autoParticipate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"}],"name":"boostParticipation","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"enum AvalaunchSaleV2.Phases","name":"_phase","type":"uint8"}],"name":"changePhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collateral","outputs":[{"internalType":"contract ICollateral","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dexalotPortfolio","outputs":[{"internalType":"contract IDexalotPortfolio","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dexalotUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract ISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getParticipationAmountsAndStates","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"enum AvalaunchSaleV2.PortionStates[]","name":"","type":"uint8[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_allocationStaking","type":"address"},{"internalType":"address","name":"_collateral","type":"address"},{"internalType":"address","name":"_marketplace","type":"address"},{"internalType":"address","name":"_moderator","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isLockOn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isParticipated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPriceUpdateTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketplace","outputs":[{"internalType":"contract IAvalaunchMarketplace","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"moderator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfRegistrants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfVestedPortions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"overrideTokenPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"phaseId","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"participate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"portionVestingPrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"signatureExpirationTimestamp","type":"uint256"},{"internalType":"uint256","name":"phaseId","type":"uint256"}],"name":"registerForSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"registrationDepositAVAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registrationFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"portions","type":"uint256[]"}],"name":"removePortionsFromMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"removeStuckTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sale","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"enum AvalaunchSaleV2.Phases","name":"phase","type":"uint8"},{"internalType":"bool","name":"isCreated","type":"bool"},{"internalType":"bool","name":"earningsWithdrawn","type":"bool"},{"internalType":"bool","name":"leftoverWithdrawn","type":"bool"},{"internalType":"bool","name":"tokensDeposited","type":"bool"},{"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"totalTokensSold","type":"uint256"},{"internalType":"uint256","name":"totalAVAXRaised","type":"uint256"},{"internalType":"uint256","name":"saleEnd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_dexalotPortfolio","type":"address"},{"internalType":"uint256","name":"_dexalotUnlockTime","type":"uint256"}],"name":"setDexalotParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"_amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"_saleEnd","type":"uint256"},{"internalType":"uint256","name":"_portionVestingPrecision","type":"uint256"},{"internalType":"uint256","name":"_registrationDepositAVAX","type":"uint256"}],"name":"setSaleParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"saleToken","type":"address"}],"name":"setSaleToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_unlockingTimes","type":"uint256[]"},{"internalType":"uint256[]","name":"_percents","type":"uint256[]"}],"name":"setVestingParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"shiftDexalotUnlockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"shiftSaleEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"shiftVestingUnlockTimes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256[]","name":"portions","type":"uint256[]"}],"name":"transferPortions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"updateTokenPriceInAVAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userToParticipation","outputs":[{"internalType":"uint256","name":"amountBought","type":"uint256"},{"internalType":"uint256","name":"amountAVAXPaid","type":"uint256"},{"internalType":"uint256","name":"timeParticipated","type":"uint256"},{"internalType":"uint256","name":"phaseId","type":"uint256"},{"internalType":"uint256","name":"boostedAmountAVAXPaid","type":"uint256"},{"internalType":"uint256","name":"boostedAmountBought","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPercentPerPortion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPortionsUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"earnings","type":"bool"},{"internalType":"bool","name":"leftover","type":"bool"}],"name":"withdrawEarningsAndLeftover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"portionIds","type":"uint256[]"},{"internalType":"bool","name":"toDexalot","type":"bool"}],"name":"withdrawMultiplePortions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRegistrationFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawUnusedFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const decoder = new InputDataDecoder(contractAbi);
const logsDecoder = LogDecoder.create()

let marketPlaceAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"portionOwner","type":"address"},{"indexed":false,"internalType":"address","name":"saleAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"portionId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"initialPortionPrice","type":"uint256"}],"name":"PortionListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"portionOwner","type":"address"},{"indexed":false,"internalType":"address","name":"saleAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"portionId","type":"uint256"}],"name":"PortionRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"portionSeller","type":"address"},{"indexed":false,"internalType":"address","name":"portionBuyer","type":"address"},{"indexed":false,"internalType":"address","name":"saleAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"portionId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"portionPrice","type":"uint256"}],"name":"PortionSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sale","type":"address"},{"indexed":true,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"SaleApproved","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"contract IAdmin","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"sale","type":"address"}],"name":"approveSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sale","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"sigExpTimestamp","type":"uint256"},{"internalType":"uint256[]","name":"portions","type":"uint256[]"},{"internalType":"uint256[]","name":"prices","type":"uint256[]"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"buyPortions","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract ISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feePrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"uint256","name":"_feePercentage","type":"uint256"},{"internalType":"uint256","name":"_feePrecision","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256[]","name":"portions","type":"uint256[]"},{"internalType":"uint256[]","name":"prices","type":"uint256[]"}],"name":"listPortions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"listedUserPortionsPerSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"officialSales","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256[]","name":"portions","type":"uint256[]"}],"name":"removePortions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"}],"name":"setFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_percentage","type":"uint256"},{"internalType":"uint256","name":"_precision","type":"uint256"}],"name":"setFeeParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalFeesCollected","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAVAX","outputs":[],"stateMutability":"nonpayable","type":"function"}];
logsDecoder.addABI(marketPlaceAbi)

class TransactionChecker {
    constructor(address) {
        this.address = address.toLowerCase();
        this.web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
    }

    async printTransaction2(txHash) {

        // Get the receipt.
        let web3 = new Web3(new Web3.providers.HttpProvider(AVALAUNCH_URL));
        let receipt = await web3.eth.getTransactionReceipt(txHash);

        // decode logs.
        let decoded = logsDecoder.decodeLogs(receipt.logs);

        let logs = [];

        for (let i = 0; i < decoded.length; i++) {
            logs.push({
                'name': decoded[i].name,
                'block_number' : decoded[i].blockNumber,
                'transaction_hash' : decoded[i].transactionHash,
                'events' : decoded[i].events
            })
        }

        return logs
    }

    async printTransaction(txHash) {
        let tx = await this.web3.eth.getTransaction(txHash);

        if (this.address === tx.to.toLowerCase()) {

            let receipt = await this.web3.eth.getTransactionReceipt(txHash);
            const decodedLogs = logsDecoder.decodeLogs(receipt.logs);

            console.log({
                "decodedLogs" : decodedLogs,
                "decodedLogsEvent"  :decodedLogs[0].events,
                "tx" : tx
            })
        }
    }

    async checkBlock(blockNumber) {

        let block = await this.web3.eth.getBlock(blockNumber);

        if (block.transactions != null) {
            for (let txHash of block.transactions) {
                this.printTransaction(txHash)
            }
        }
    }
}

// let block = await this.web3.eth.getBlock('latest');

var transactionChecker = new TransactionChecker(contractAddress);

transactionChecker.printTransaction2('0x98a9b97066cddd76ca78ef50241ba99f3c0972e46770d5496c2baa9ef56093f4');
// transactionChecker.checkBlock(13354171);



// let startBlock = 13354170;
//
// for (let i = startBlock; i < startBlock + 2; i++) {
//      transactionChecker.checkBlock(13354170);
// }