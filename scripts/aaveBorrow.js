// const {ILendingPoolAddressesProvider} = require ('@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol')
const {getWeth,AMOUNT}= require('./getWeth')
const {ethers,network} =require('hardhat')

const main= async ()=>{
    const accounts=  await ethers.getSigners()
    const deployer = accounts[0].address
    const signer= await ethers.getSigner(deployer)
 const wethTokenAddress= '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

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
main()
.then(()=>process.exit(0))
.catch((error)=>{

    console.log(error)
    process.exit(1)

})