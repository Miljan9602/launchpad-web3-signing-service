const contracts =  {
    "ALLOCATION_STAKING" : {
        "address" : "0xA6A01f4b494243d84cf8030d982D7EeB2AeCd329",
        "abi": [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountAdded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalDeposited","type":"uint256"}],"name":"CompoundedEarnings","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"depositFeePercent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFeePrecision","type":"uint256"}],"name":"DepositFeeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountStake","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountRewards","type":"uint256"}],"name":"PostSaleWithdrawFeeCharged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contractIERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositFeePrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"deposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20","outputs":[{"internalType":"contractIERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"getPendingAndDepositedForUsers","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"amountToWithdraw","type":"uint256"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getWithdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contractIERC20","name":"_erc20","type":"address"},{"internalType":"uint256","name":"_rewardPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTimestamp","type":"uint256"},{"internalType":"address","name":"_salesFactory","type":"address"},{"internalType":"uint256","name":"_depositFeePercent","type":"uint256"},{"internalType":"uint256","name":"_depositFeePrecision","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paidOut","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contractIERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTimestamp","type":"uint256"},{"internalType":"uint256","name":"accERC20PerShare","type":"uint256"},{"internalType":"uint256","name":"totalDeposits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postSaleWithdrawPenaltyLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postSaleWithdrawPenaltyPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postSaleWithdrawPenaltyPrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_amountToRedistribute","type":"uint256"}],"name":"redistributeXava","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"salesFactory","outputs":[{"internalType":"contractISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_depositFeePercent","type":"uint256"},{"internalType":"uint256","name":"_depositFeePrecision","type":"uint256"}],"name":"setDepositFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_postSaleWithdrawPenaltyPercent","type":"uint256"},{"internalType":"uint256","name":"_postSaleWithdrawPenaltyLength","type":"uint256"},{"internalType":"uint256","name":"_postSaleWithdrawPenaltyPrecision","type":"uint256"}],"name":"setPostSaleWithdrawPenaltyPercentAndLength","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_salesFactory","type":"address"}],"name":"setSalesFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_tokensUnlockTime","type":"uint256"}],"name":"setTokensUnlockTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalBurnedFromUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalXavaRedistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"tokensUnlockTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    },
    "AVALAUNCH_SALE" : {
        "abi": [{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address","name":"_allocationStaking","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"name":"MaxParticipationSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountRefunded","type":"uint256"}],"name":"RegistrationAVAXRefunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"registrationTimeStarts","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"registrationTimeEnds","type":"uint256"}],"name":"RegistrationTimeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"name":"RoundAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"saleOwner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"saleEnd","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensUnlockTime","type":"uint256"}],"name":"SaleCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"TokenPriceSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"UserRegistered","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToRoundRegisteredFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"contractIAdmin","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allocationStakingContract","outputs":[{"internalType":"contractIAllocationStaking","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"round","type":"uint256"}],"name":"checkParticipationSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"checkRegistrationSignature","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToAdd","type":"uint256"}],"name":"extendRegistrationPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contractISalesFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumberOfRegisteredUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getParticipation","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"getParticipationSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isParticipated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxVestingTimeShift","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfParticipants","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"one","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"amountXavaToBurn","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"participate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"portionVestingPrecision","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"postponeSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"name":"registerForSale","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"registration","outputs":[{"internalType":"uint256","name":"registrationTimeStarts","type":"uint256"},{"internalType":"uint256","name":"registrationTimeEnds","type":"uint256"},{"internalType":"uint256","name":"numberOfRegistrants","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registrationDepositAVAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registrationFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundIdToRound","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"maxParticipation","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roundIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sale","outputs":[{"internalType":"contractIERC20","name":"token","type":"address"},{"internalType":"bool","name":"isCreated","type":"bool"},{"internalType":"bool","name":"earningsWithdrawn","type":"bool"},{"internalType":"bool","name":"leftoverWithdrawn","type":"bool"},{"internalType":"bool","name":"tokensDeposited","type":"bool"},{"internalType":"address","name":"saleOwner","type":"address"},{"internalType":"uint256","name":"tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"totalTokensSold","type":"uint256"},{"internalType":"uint256","name":"totalAVAXRaised","type":"uint256"},{"internalType":"uint256","name":"saleEnd","type":"uint256"},{"internalType":"uint256","name":"tokensUnlockTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"rounds","type":"uint256[]"},{"internalType":"uint256[]","name":"caps","type":"uint256[]"}],"name":"setCapPerRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_registrationTimeStarts","type":"uint256"},{"internalType":"uint256","name":"_registrationTimeEnds","type":"uint256"}],"name":"setRegistrationTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"startTimes","type":"uint256[]"},{"internalType":"uint256[]","name":"maxParticipations","type":"uint256[]"}],"name":"setRounds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_saleOwner","type":"address"},{"internalType":"uint256","name":"_tokenPriceInAVAX","type":"uint256"},{"internalType":"uint256","name":"_amountOfTokensToSell","type":"uint256"},{"internalType":"uint256","name":"_saleEnd","type":"uint256"},{"internalType":"uint256","name":"_tokensUnlockTime","type":"uint256"},{"internalType":"uint256","name":"_portionVestingPrecision","type":"uint256"},{"internalType":"uint256","name":"_stakingRoundId","type":"uint256"},{"internalType":"uint256","name":"_registrationDepositAVAX","type":"uint256"}],"name":"setSaleParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"saleToken","type":"address"}],"name":"setSaleToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_unlockingTimes","type":"uint256[]"},{"internalType":"uint256[]","name":"_percents","type":"uint256[]"},{"internalType":"uint256","name":"_maxVestingTimeShift","type":"uint256"}],"name":"setVestingParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timeToShift","type":"uint256"}],"name":"shiftVestingUnlockingTimes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"updateTokenPriceInAVAX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userToParticipation","outputs":[{"internalType":"uint256","name":"amountBought","type":"uint256"},{"internalType":"uint256","name":"amountAVAXPaid","type":"uint256"},{"internalType":"uint256","name":"timeParticipated","type":"uint256"},{"internalType":"uint256","name":"roundId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPercentPerPortion","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vestingPortionsUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawEarnings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEarningsAndLeftover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawLeftover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"portionIds","type":"uint256[]"}],"name":"withdrawMultiplePortions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRegistrationFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"portionId","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawUnusedFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
    },
    "AIRDROP" : {
        "abi" : [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_airdropToken","internalType":"address"},{"type":"address","name":"_admin","internalType":"address"}]},{"type":"event","name":"TokensAirdropped","inputs":[{"type":"address","name":"beneficiary","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contractIAdmin"}],"name":"admin","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contractIERC20"}],"name":"airdropToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"checkSignature","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"beneficiary","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getSigner","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"address","name":"beneficiary","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalTokensWithdrawn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"wasClaimed","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawTokens","inputs":[{"type":"bytes","name":"signature","internalType":"bytes"},{"type":"uint256","name":"amount","internalType":"uint256"}]}]
    }
};

module.exports = {
    CONTRACTS: contracts
};
