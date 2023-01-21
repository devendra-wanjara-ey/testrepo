
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import React from "react";
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
      contract = new web3.eth.Contract([
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "mint1",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "safeMint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenByIndex",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "tokenOfOwnerByIndex",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ], SMART_CONTRACT);
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
