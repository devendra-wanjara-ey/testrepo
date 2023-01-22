import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Team2NFTV1Abi } from './Team2NFTV1Abi';
import { Team2NFTAbi } from './Team2NFTAbi';



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
  const SMART_CONTRACT = "0x841A24C7a9B5454b7Ef5C389beD96C11e2F9Ed1E";
  const TEST_NETWORK = "http://127.0.0.1:9545/";

  useEffect(() => {
    if (true) {
      const fetchData = async () => {

        //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        const web3 = new Web3(TEST_NETWORK);
	console.log(Team2NFTV1Abi);
    const contract = new web3.eth.Contract(Team2NFTV1Abi as any, SMART_CONTRACT);
    const balance = await contract.methods.totalSupply().call();
    console.log(balance);

    const newNfts: Team2NFT[] = [];
    for (let ix = 0; ix < balance; ix++) {
      //console.log("DEBUG1")
      //const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();          
          const tokenId = await contract.methods.tokenByIndex(ix).call();
      //console.log("DEBUG2")
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();
          console.log(metadata);

          const traits: any[] = [];

          for (const attribute of metadata.attributes) {
            //traits[attribute.trait_type] = attribute.value;
            traits.push({trait_type: attribute.trait_type, value: attribute.value });
          }

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
      <h1 className='mt-3'>Our cool Web Team2 NFT viewer</h1>
      <label>Address of the user ... that has alllll the NFTs</label>
      {/* <input type="text"
        className={`form-control ${isValid ? '' : 'is-invalid'}`}
        value={address}
        onChange={e => setAddress(e.target.value)}
      /> */}

<div>
            <p className='text-muted'>The address <span className='text-primary'>{address}</span> has <span className='text-primary'>{ntfs.length}</span> NFTs</p>
            <div className='row'>
              {ntfs.map(nft => <div className='col-4 border'>
                <h5>#{nft.tokenId}</h5>
                <img src={nft.image} alt='cleaver' className='w-100' />
                <div className='row'>
                  <div className='col'>
                      {
                        nft.attributes.map(attr => {
                          return (
                            <div>
                                <div>{attr.trait_type}</div>
                                <div>{attr.value}</div>
                            </div>
                          );
                        })
                      }
                  </div>
                </div>
              </div>)}
            </div>
          </div>
     

    </div>
  );
}

export default App1;