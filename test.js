var Team2NFTAbi = require('./Team2NFTAbi.js');
//import Team2NFTAbi from './Team2NFTAbi.js';
var Web3 = require('web3')
var web3 = new Web3('http://127.0.0.1:9545')
web3.eth.getAccounts().then(console.log)

let contract = new web3.eth.Contract(Team2NFTAbi,"0x3dB0f096B559428d47eC8c6426c27050f2333103");
var address = "0x3dB0f096B559428d47eC8c6426c27050f2333103";
async function fun1(){
const balance = await contract.methods.balanceOf(address).call();
console.log(balance);
console.log("Hello");
}
fun1();
//contract.methods.store(8).send({ from: "0xb5A5c6739581F2Bf912731Aa4dC8401B7D8E154f" }).then(console.log)
console.log("Wait")
//contract.methods.retrieve().call().then(console.log)
