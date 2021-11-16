const contracts =  {
    "ALLOCATION_STAKING" : {
        "address" : "0x027D6EA70Bc4904c2BfC00b014571c6C4EDF0DD6",
        "abi" : [{"inputs":[{"internalType":"contractIERC20","name":"_erc20","type":"address"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTimestamp","type":"uint256"},{"internalType":"address","name":"_salesFactory","type":"address"},{"internalType":"uint256","name":"_depositFeePercent","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"depositFeePercent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeePrecision","type":"uint256"}],"name":"DepositFeeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contractIERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFeePrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"deposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"getPendingAndDepositedForUsers","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paidOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contractIERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTimestamp","type":"uint256"},{"internalType":"uint256","name":"accERC20PerShare","type":"uint256"},{"internalType":"uint256","name":"totalDeposits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amountToRedistribute","type":"uint256"}],"name":"redistributeXava","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"salesFactory","outputs":[{"internalType":"contractISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_depositFeePercent","type":"uint256"},{"internalType":"uint256","name":"_depositFeePrecision","type":"uint256"}],"name":"setDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalXavaRedistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    },
    "AVALAUNCH_SALE" : {
        "abi" : [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_admin","internalType":"address"},{"type":"address","name":"_allocationStaking","internalType":"address"}]},{"type":"event","name":"MaxParticipationSet","inputs":[{"type":"uint256","name":"roundId","internalType":"uint256","indexed":false},{"type":"uint256","name":"maxParticipation","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RegistrationTimeSet","inputs":[{"type":"uint256","name":"registrationTimeStarts","internalType":"uint256","indexed":false},{"type":"uint256","name":"registrationTimeEnds","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"RoundAdded","inputs":[{"type":"uint256","name":"roundId","internalType":"uint256","indexed":false},{"type":"uint256","name":"startTime","internalType":"uint256","indexed":false},{"type":"uint256","name":"maxParticipation","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"SaleCreated","inputs":[{"type":"address","name":"saleOwner","internalType":"address","indexed":false},{"type":"uint256","name":"tokenPriceInAVAX","internalType":"uint256","indexed":false},{"type":"uint256","name":"amountOfTokensToSell","internalType":"uint256","indexed":false},{"type":"uint256","name":"saleEnd","internalType":"uint256","indexed":false},{"type":"uint256","name":"tokensUnlockTime","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TokenPriceSet","inputs":[{"type":"uint256","name":"newPrice","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TokensSold","inputs":[{"type":"address","name":"user","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TokensWithdrawn","inputs":[{"type":"address","name":"user","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UserRegistered","inputs":[{"type":"address","name":"user","internalType":"address","indexed":false},{"type":"uint256","name":"roundId","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"addressToRoundRegisteredFor","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IAdmin"}],"name":"admin","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IAllocationStaking"}],"name":"allocationStakingContract","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"checkParticipationSignature","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"user","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"amountXavaToBurn","internalType":"uint256"},{"type":"uint256","name":"round","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"checkRegistrationSignature","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"user","internalType":"address"},{"type":"uint256","name":"roundId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositTokens","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"extendRegistrationPeriod","inputs":[{"type":"uint256","name":"timeToAdd","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ISalesFactory"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentRound","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"bool[]","name":"","internalType":"bool[]"}],"name":"getParticipation","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getParticipationSigner","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"user","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"amountXavaToBurn","internalType":"uint256"},{"type":"uint256","name":"roundId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRegistrationInfo","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"},{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getVestingInfo","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isParticipated","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"numberOfParticipants","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"one","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"participate","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"amountXavaToBurn","internalType":"uint256"},{"type":"uint256","name":"roundId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"portionVestingPrecision","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"postponeSale","inputs":[{"type":"uint256","name":"timeToShift","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"registerForSale","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"uint256","name":"roundId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"registrationTimeStarts","internalType":"uint256"},{"type":"uint256","name":"registrationTimeEnds","internalType":"uint256"},{"type":"uint256","name":"numberOfRegistrants","internalType":"uint256"}],"name":"registration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"startTime","internalType":"uint256"},{"type":"uint256","name":"maxParticipation","internalType":"uint256"}],"name":"roundIdToRound","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"roundIds","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"token","internalType":"contract IERC20"},{"type":"bool","name":"isCreated","internalType":"bool"},{"type":"bool","name":"earningsWithdrawn","internalType":"bool"},{"type":"bool","name":"tokensDeposited","internalType":"bool"},{"type":"address","name":"saleOwner","internalType":"address"},{"type":"uint256","name":"tokenPriceInAVAX","internalType":"uint256"},{"type":"uint256","name":"amountOfTokensToSell","internalType":"uint256"},{"type":"uint256","name":"totalTokensSold","internalType":"uint256"},{"type":"uint256","name":"totalAVAXRaised","internalType":"uint256"},{"type":"uint256","name":"saleEnd","internalType":"uint256"},{"type":"uint256","name":"tokensUnlockTime","internalType":"uint256"}],"name":"sale","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCapPerRound","inputs":[{"type":"uint256[]","name":"rounds","internalType":"uint256[]"},{"type":"uint256[]","name":"caps","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRegistrationTime","inputs":[{"type":"uint256","name":"_registrationTimeStarts","internalType":"uint256"},{"type":"uint256","name":"_registrationTimeEnds","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRounds","inputs":[{"type":"uint256[]","name":"startTimes","internalType":"uint256[]"},{"type":"uint256[]","name":"maxParticipations","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSaleParams","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_saleOwner","internalType":"address"},{"type":"uint256","name":"_tokenPriceInAVAX","internalType":"uint256"},{"type":"uint256","name":"_amountOfTokensToSell","internalType":"uint256"},{"type":"uint256","name":"_saleEnd","internalType":"uint256"},{"type":"uint256","name":"_tokensUnlockTime","internalType":"uint256"},{"type":"uint256","name":"_portionVestingPrecision","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setVestingParams","inputs":[{"type":"uint256[]","name":"_unlockingTimes","internalType":"uint256[]"},{"type":"uint256[]","name":"_percents","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateTokenPriceInAVAX","inputs":[{"type":"uint256","name":"price","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amountBought","internalType":"uint256"},{"type":"uint256","name":"amountAVAXPaid","internalType":"uint256"},{"type":"uint256","name":"timeParticipated","internalType":"uint256"},{"type":"uint256","name":"roundId","internalType":"uint256"}],"name":"userToParticipation","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"vestingPercentPerPortion","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"vestingPortionsUnlockTime","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawEarningsAndLeftover","inputs":[{"type":"bool","name":"withBurn","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawTokens","inputs":[{"type":"uint256","name":"portionId","internalType":"uint256"}]}]
    },
    "AIRDROP" : {
        "abi" : [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_airdropToken","internalType":"address"},{"type":"address","name":"_admin","internalType":"address"}]},{"type":"event","name":"TokensAirdropped","inputs":[{"type":"address","name":"beneficiary","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contractIAdmin"}],"name":"admin","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contractIERC20"}],"name":"airdropToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"checkSignature","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"beneficiary","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getSigner","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"beneficiary","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalTokensWithdrawn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"wasClaimed","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawTokens","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"uint256","name":"amount","internalType":"uint256"}]}]
    }
};

module.exports = {
    CONTRACTS: contracts
};
