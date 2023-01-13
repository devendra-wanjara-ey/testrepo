import { Team2NFTAbi } from './Team2NFTAbi';
var Web3 = require('web3')
var web3 = new Web3('http://127.0.0.1:9545')
web3.eth.getAccounts().then(console.log)

let contract = new web3.eth.Contract(Team2NFTAbi,"0x719B6541E8BB8F782920CEDd55884a6E153f6dc6")

const balance = await contract.methods.balanceOf(address).call();

//contract.methods.store(8).send({ from: "0xb5A5c6739581F2Bf912731Aa4dC8401B7D8E154f" }).then(console.log)
console.log("Wait")
//contract.methods.retrieve().call().then(console.log)
