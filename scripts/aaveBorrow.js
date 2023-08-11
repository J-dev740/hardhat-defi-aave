// const {ILendingPoolAddressesProvider} = require ('@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol')
const {getWeth,AMOUNT}= require('./getWeth')
const {ethers,network} =require('hardhat')

const main= async ()=>{
    const accounts=  await ethers.getSigners()
    const deployer = accounts[0].address
    const signer= await ethers.getSigner(deployer)
 const wethTokenAddress= '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
 const DaiTokenAddress='0x6B175474E89094C44Da98b954EedeAC495271d0F'
 const AggregatorV3InterfaceAddressDai_ETH='0x773616E4d11A78F511299002da57A0a94577F1f4'

//converting AMOUNT of eth to weth tokens 
await getWeth()
//address of LendingPoolAddressProvider 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5

const lendingPoolAddressesProvider = await ethers.getContractAt("ILendingPoolAddressesProvider",'0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5',signer)
const lendingPoolAddress= await lendingPoolAddressesProvider.getLendingPool()
//creating lendingPool contract instance for aave contract running aave protocol
const lendingPool= await ethers.getContractAt("ILendingPool",lendingPoolAddress.toString(),signer)
//before depositing collateral we need to approve lendingPool contract instance to withdraw erc20 (wethtokens) from 
//our account in which it is currently deposited and to borrow it to deposit it as a collateral for borrowing dai tokens using aave contract (protocol)
 //contract address for ERC20 CONTRACT for mainnet 0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA

const tx= await erc20Approve(wethTokenAddress,lendingPoolAddress,AMOUNT,signer)
// await tx.wait(1)
const tx1= await lendingPool.deposit(wethTokenAddress,AMOUNT,deployer,0)
// await tx1.wait(1)
console.log(`deposition complete...as collateral into aave protocol`)
//getUserAccountData for deployer
 const availableBorrowETH=await getAccountData(deployer,lendingPool)
 const DaiPrice=await getDaiPrice(AggregatorV3InterfaceAddressDai_ETH)
 const availableBorrowDai= availableBorrowETH.toString() * 0.95 *(1/DaiPrice.toString())
 console.log(`you got ${availableBorrowDai} amount of dai to borrow`)
 const availableBorrowDaiWei= ethers.parseEther(availableBorrowDai.toString())
 //Borrow Time!
 await BorrowDai(lendingPool,DaiTokenAddress,availableBorrowDaiWei,deployer)
//Repay Time!
 await Repay(DaiTokenAddress,lendingPoolAddress,availableBorrowDaiWei,deployer,signer,lendingPool)



}
async function erc20Approve(
    erc20Address,
    spenderAddress,
    amount,
    signer
){
    const erc20= await ethers.getContractAt('IERC20',erc20Address,signer)
    await erc20.approve(spenderAddress,amount)
    console.log("approved...")

}

async function getAccountData(account,lendingPool){
    const AccountData= await lendingPool.getUserAccountData(account)
    const {totalCollateralETH,totalDebtETH,availableBorrowsETH}=AccountData
    console.log(`1.got ${totalCollateralETH} as collateral`)
    console.log(`2.got ${totalDebtETH} as Debt`)
    console.log(`3.got ${availableBorrowsETH} as availabe borrow`)
    return availableBorrowsETH

}
//we don't have to connect agrregator interface to a signer since we are only reading off the oracle chain
async function getDaiPrice(priceFeedAddress){
    const priceFeed= await ethers.getContractAt("AggregatorV3Interface",priceFeedAddress)
    const {answer:conversionRate}= await priceFeed.latestRoundData()
    console.log(`latest Dai_to_ETH conversionRate:${conversionRate.toString()}`)
    return conversionRate
}

async function BorrowDai(lendingPool,assetAddress,amount,account){
   await  lendingPool.borrow(assetAddress,amount,1,0,account)
   console.log("you have borrowed...")
   await getAccountData(account,lendingPool)
}

async function Repay(daiAddress,spenderAddress,amount,account,signer,lendingPool){
    await erc20Approve(daiAddress,spenderAddress,amount,signer)
    const tx=await lendingPool.repay(daiAddress,amount,1,account)
     tx.wait(1)
    console.log(`you have repayed what you have borrowed .....`)
    await getAccountData(account,lendingPool)
}
main()
.then(()=>process.exit(0))
.catch((error)=>{

    console.log(error)
    process.exit(1)

})