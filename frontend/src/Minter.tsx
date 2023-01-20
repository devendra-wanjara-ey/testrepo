
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import 'bootstrap/dist/css/bootstrap.css';
import { Team2NFTAbi } from './Team2NFTAbi';
import { Team2NFTV1Abi } from './Team2NFTV1Abi';
import { useState } from "react";
import { Card } from "react-bootstrap";
declare var window: any;

var contract: Contract | null = null;
var account: string | null  = null;
const SMART_CONTRACT = "0xf73427FA6e4270e60F78531eA21dB9019c039E41";

interface Team2NFT {
  tokenId: string
  image: string,
  traits: Record<string, number>
}



function Minter() {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [secondarySkill, setSecondarySkill] = useState('');
  const [empId, setEmpId] = useState('');
  const [ntfs, setNfts] = useState<Team2NFT[]>([]);

  const handleContractChange = async () => {
    try{
      if(window.ethereum){
          console.log("inside window.ethereum");
          var web3 = new Web3(window.ethereum);
          await window.ethereum.send('eth_requestAccounts');
          var accounts = await web3.eth.getAccounts();
           account = accounts[0] ;
           setAddress(account);
      }
    }catch(ex){
      console.log(ex)
    } 
  };

  const mint = async() => {
    try{
        
        const web3 = new Web3(window.ethereum);
	      const contract = new web3.eth.Contract(Team2NFTV1Abi as any, SMART_CONTRACT);
        console.log("add >"+address) 
        contract.methods.mint(account).send({ from: account})
        
    }catch(ex){
      console.log(ex)
    }
  }




  
  return (
    <div className="Minter" >
       <h1  id="title">Team 2 - NFT Minter</h1>
     <div >
       <br></br>
        <button  onClick={() => handleContractChange()}>
          Connect Wallet  
        </button>
        {address.length>0 && 
           <p>Connected to the address:   
           {address}</p>
        }
      </div>
      <form>
      
      <br></br>
     
      <p>
        Simply add your name, skills then press "Mint."
      </p>
     
        <h2 >Name: 
          &nbsp;<input
          type="text"
          placeholder="e.g. NFT Mr. Doe" value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </h2>
        <h2 >Employee ID: 
          &nbsp;<input
          type="text"
          placeholder="XXXXX" value={empId}
          onChange={(e) => setName(e.target.value)}
        />
        </h2>
        <h2>Primary Skills: 
            &nbsp;<input
          type="text" value ={primarySkill}
          placeholder="e.g. UI/ Backend / Manager etc." onChange={(e) => setName(e.target.value)}
        />
        </h2>
        <h2>Secondary Skills: 
            &nbsp;<input
          type="text" value ={secondarySkill}
          placeholder="e.g. UI/ Backend / Manager etc." onChange={(e) => setName(e.target.value)}
        />
        </h2>
  
        </form>
        <button id="mint" onClick={() => mint()}>
          Mint
        </button>
   
 
        
    </div>
   
  );
};

export default Minter;