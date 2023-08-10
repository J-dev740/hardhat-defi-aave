const { getDefaultProvider } = require("ethers");
const {ethers,network,getNamedAccounts} = require("hardhat");
const AMOUNT= ethers.parseEther("0.02");



const getWeth= async ()=>{

let IWeth
// const accounts= await getNamedAccounts();
// const {deployer}= accounts
const accounts=  await ethers.getSigners()
const deployer = accounts[0].address
const signer= await ethers.getSigner(deployer)
console.log(signer)
//wethtokenContractAddress 
//0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
// const Provider =  getDefaultProvider('http://127.0.0.1:8545/')
// const wallet= new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',Provider)


 IWeth= await ethers.getContractAt("IWeth","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",signer)
//  IWeth= IWeth.connect(deployer)

const tx=await  IWeth.deposit({value:AMOUNT})
await tx.wait(1)
const balanceofDeployer= await IWeth.balanceOf(deployer)
// await balanceofDeployer.wait(1)
console.log("getting balance...")
console.log(`got ${balanceofDeployer.toString()} amount of weth`)

}
getWeth().then(()=>process.exit(0))
.catch((error)=>{
    console.log(error)
    process.exit(1)
})

module.exports={getWeth,AMOUNT}