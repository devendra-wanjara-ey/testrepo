import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App1.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Team2NFTV1Abi } from './Team2NFTV1Abi';
import { Team2NFTAbi } from './Team2NFTAbi';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


interface Team2NFT {
  tokenId: string,
  name: string,
  description: string,
  image: string,
  external_url: string,
  attributes: any[]
}

function App1() {
  const [address, setAddress] = useState('');
  const [ntfs, setNfts] = useState<Team2NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const isValid = Web3.utils.isAddress(address);
  const SMART_CONTRACT = "0x4080867b3941dC20977828025326B6364F2Be70B";
  const TEST_NETWORK = "http://127.0.0.1:9545/";
  
  const [name, setName] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [secondarySkill, setSecondarySkill] = useState('');
  const [empId, setEmpId] = useState('');
  const [location, setLocation] = useState('');
  

  

  useEffect(() => {
    if (true) {
      const fetchData = async () => {

    //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
    const web3 = new Web3(TEST_NETWORK);
    // const jsonObj = {
    //   name: {name},
    //   empId: {empId},
    //   primarySkill: {primarySkill},
    //   secondarySkill: {secondarySkill},
    //   location:{location}
    // }
	  console.log(Team2NFTV1Abi);
    const contract = new web3.eth.Contract(Team2NFTV1Abi as any, SMART_CONTRACT);
    const balance = await contract.methods.totalSupply().call();
    console.log(balance);

    const newNfts: Team2NFT[] = [];
    for (let ix = 0; ix < balance; ix++) {      
      //const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();          
          const tokenId = await contract.methods.tokenByIndex(ix).call();      
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();          
          //var saved: string = localStorage.getItem(tokenURI)?.toString;
          //console.log(saved);
          
          const initialValue = JSON.parse(localStorage.getItem(tokenURI) || '{}');
          console.log(initialValue);
          //return initialValue || "";
          console.log(metadata);

          const traits: any[] = [];
          const initVal: any[] = [];

          for (const attribute of metadata.attributes) {
            //traits[attribute.trait_type] = attribute.value;
           // traits.push({trait_type: attribute.trait_type, value: attribute.value });
          // traits.push({trait_type: attribute.trait_type, value: attribute.value });
           
          }
          traits.push([initialValue]);
          newNfts.push({
            tokenId: tokenId,
            name: '',
            description: '',
            image: metadata.image,
            external_url: '',
            attributes: traits,
          })
        }


        setNfts(newNfts)
        setLoading(false);
      }
      fetchData();
    }
  }, [address, isValid])


  return (
    <div className="container">
      <h1 className='mt-3'>Web Team 2 NFT Viewer</h1>
      <label>All NFT token issued are listed below</label>
      {/* <input type="text"
        className={`form-control ${isValid ? '' : 'is-invalid'}`}
        value={address}
        onChange={e => setAddress(e.target.value)}
      /> */}

<div>
            <p className='text-muted'>The address <span className='text-primary'>{address}</span> has <span className='text-primary'>{ntfs.length}</span> NFTs</p>
            <div className='row' style={{border:'5em' }}>
              {ntfs.map(nft =>
                 <div className='col-4 border'>
                  <h5>#{nft.tokenId}</h5>                
                  <Card className={Number(nft.tokenId)%2 ? 'card_0' : 'card_1'}>
                    <Card.Img  src={nft.image} style={{width:200, height:200 ,alignSelf:'center'}} />
                    <Card.Body>
                      <Card.Title>Details</Card.Title>
                      <Card.Text as="div"> {
                                      nft.attributes.map(attr => {
                                        return (
                                         <div>
                                         <div>
                                          <div>
                                            <li>Name: {attr[0].name}</li>
                                            <li> Id: {attr[0].empId}</li>
                                            <li>Skils : {attr[0].primarySkill} {attr[0].secondarySkill}</li>
                                            <li>Localtion: {attr[0].location}</li>
                                          </div>
                                          </div>
                                        </div>
                                        );
                                      })
                                    }
                      </Card.Text>
                     </Card.Body>
                  </Card>
                     
                   
              </div>)}
            </div>
          </div>
     

    </div>
  );
}

export default App1;