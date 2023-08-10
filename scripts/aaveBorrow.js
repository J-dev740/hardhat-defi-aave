const {getWeth,AMOUNT}= require('./getWeth')

const main= async ()=>{

await getWeth()


}

main()
.then(()=>process.exit(0))
.catch((error)=>{

    console.log(error)
    process.exit(1)

})