
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import React from "react";
import { Team2NFTV1Abi } from './Team2NFTV1Abi';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
   
    if(address == ''){
    alert("Please Connect the Wallet");
      return;
    }

    if(name == '' && empId == ''){
      alert("Please enter Name and EmployeeID");
      return;
    }
    // const jsonObj = {
    //   name: {name}.name,
    //   empId: {empId}.empId,
    //   primarySkill: {primarySkill}.primarySkill,
    //   secondarySkill: {secondarySkill}.secondarySkill,
    //   location:{location}.location
    // }
   

    const jsonObj = {
        name: {name}.name,
        empId: {empId}.empId,
        primarySkill: {primarySkill}.primarySkill,
        secondarySkill: {secondarySkill}.secondarySkill,
        location:{location}.location
      }
    

      const web3 = new Web3(window.ethereum);      
      contract = new web3.eth.Contract(Team2NFTV1Abi as any, SMART_CONTRACT);
      console.log("add >"+address) 

      var tokenID = await contract.methods.getNextTokenId().call();
      console.log(tokenID);
      const data = await contract.methods.mint(address).encodeABI()
      console.log("data >>"+data);
      
      const token = "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_"
      +tokenID+".json"
      
      


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
      }).catch((error: string) => {
        console.log("error >>"+error);
       });

      
  }




  
  return (
       <div className="Minter" >
       <h1  id="title" className="header-mint">NFT Minter</h1>
     <div  className="header-mint">
     <Container>  
          <Button variant="secondary" onClick={() => handleContractChange()}>
             Connect Wallet  
          </Button>
        </Container>
       
        <br></br>
        {address.length>0 && 
           <p>Connected to the address: &nbsp;  
           <b style={{color:'blue'}}>{address}</b></p>
        }
      </div>
      <div  className="div-mint">
      <form>
      
      <br></br>
      <p>
        Simply add your name, skills then press "Mint."
      </p>

      <Container style={{width:"700px"}}>
      <Row>
        <Col className="label">* Name: </Col>
        <Col>
          <input required className="input_text"
          type="text"
          placeholder="e.g. NFT Mr. Doe" value={name}
          onChange={(e) => setName(e.target.value)}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="label">*Employee ID: </Col>
        <Col>
          <input required className="input_text"
          type="text"
          placeholder="e.g. XXXXX" value={empId}
          onChange={(e) => setEmpId(e.target.value)}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="label">Primary Skills: </Col>
        <Col>
           <input className="input_text"
          type="text" value ={primarySkill}
          placeholder="e.g. UI/ Backend " onChange={(e) => setPrimarySkill(e.target.value)}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="label">Secondary Skills: </Col>
        <Col>
          <input className="input_text"
          type="text" value ={secondarySkill}
          placeholder="e.g. UI/ Backend " onChange={(e) => setSecondarySkill(e.target.value)}/>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="label">Location: </Col>
        <Col>
        <input className="input_text"
          type="text" value ={location}
          placeholder="e.g. Texas" onChange={(e) => setLocation(e.target.value)}
        />
        </Col>
      </Row>
      </Container>
    </form>
        <br></br>
        <Container>  
          <Button variant="secondary"onClick={() => mint()}>Mint</Button>
        </Container>
      
        </div>
        
    </div>
   
  );
};

export default Minter;

