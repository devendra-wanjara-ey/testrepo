
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import React from "react";
import { Team2NFTV1Abi } from './Team2NFTV1Abi';
declare var window: any;

var contract: Contract | null = null;
var account: string | null  = null;
const SMART_CONTRACT = "0x4080867b3941dC20977828025326B6364F2Be70B";

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
  const [location, setLocation] = useState('');
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
  

   var tokenID = Math.floor(Math.random()*10);
   const token = "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_"
  +tokenID+".json"
    console.log(tokenID)
    if(address == ''){
    alert("Please Connect the Wallet");
      return;
    }

    if(name == '' && empId == ''){
      alert("Please enter Name and EmployeeID");
      return;
    }
    const jsonObj = {
      name: {name},
      empId: {empId},
      primarySkill: {primarySkill},
      secondarySkill: {secondarySkill},
      location:{location}
    }
   
    

      const web3 = new Web3(window.ethereum);      
      contract = new web3.eth.Contract(Team2NFTV1Abi as any, SMART_CONTRACT);
      console.log("add >"+address) 

     
      const data = await contract.methods.mint(address).encodeABI()
      console.log("data >>"+data);


      const params = {
          from: address,
          to: SMART_CONTRACT,
          data: data
      };
      
      localStorage.setItem(token,JSON.stringify(jsonObj));

      window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [params]
      }).then((res: string) => {
          console.log("res >>"+res);
      });

      
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
          &nbsp;<input required
          type="text"
          placeholder="e.g. NFT Mr. Doe" value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </h2>
        <h2 >Employee ID: 
          &nbsp;<input required 
          type="text"
          placeholder="XXXXX" value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        </h2>
        <h2>Primary Skills: 
            &nbsp;<input
          type="text" value ={primarySkill}
          placeholder="e.g. UI/ Backend " onChange={(e) => setPrimarySkill(e.target.value)}
        />
        </h2>
        <h2>Secondary Skills: 
            &nbsp;<input
          type="text" value ={secondarySkill}
          placeholder="e.g. UI/ Backend " onChange={(e) => setSecondarySkill(e.target.value)}
        />
        </h2>

        <h2>Location: 
            &nbsp;<input
          type="text" value ={location}
          placeholder="Texas" onChange={(e) => setLocation(e.target.value)}
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

function axios(url: string): any {
  throw new Error("Function not implemented.");
}