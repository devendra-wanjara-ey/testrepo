import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Team2NFTAbi } from './Team2NFTAbi';
import { Team2NFTV1Abi } from './Team2NFTV1Abi';

interface Team2NFT {
  tokenId: string
  image: string,
  traits: Record<string, number>
}

function App() {
  const [address, setAddress] = useState('');
  const [ntfs, setNfts] = useState<Team2NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const isValid = Web3.utils.isAddress(address);

  useEffect(() => {
    if (isValid) {
      const fetchData = async () => {
        
        const web3 = new Web3("http://127.0.0.1:8545/");
	console.log(Team2NFTAbi);
        const contract = new web3.eth.Contract(Team2NFTV1Abi as any, "0xEF00f4944a631047D60C7B470D7C2BE3b8d2BE3e");

        const balance = await contract.methods.balanceOf(address).call();
	console.log(balance);

        const newNfts: Team2NFT[] = [];
        for (let ix = 0; ix < balance; ix++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();
          //const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const tokenURI = await contract.methods.tokenURI(ix).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();
          console.log(metadata);

          const traits: Record<string, number> = {};

          for (const attribute of metadata.attributes) {
            traits[attribute.trait_type] = attribute.value;
          }

          newNfts.push({
            tokenId,
            image: metadata.image,
            traits,
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
      <input type="text"
        className={`form-control ${isValid ? '' : 'is-invalid'}`}
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      {isValid && <div className='mt-5'>
        <h3>These are all the cool NFTs</h3>

        {loading
          ? <p className='text-muted'>Loading ...</p>
          : <div>
            <p className='text-muted'>The address <span className='text-primary'>{address}</span> has <span className='text-primary'>{ntfs.length}</span> NFTs</p>
            <div className='row'>
              {ntfs.map(nft => <div className='col-4 border'>
                <h5>#{nft.tokenId}</h5>
                <img src={nft.image} alt='cleaver' className='w-100' />

                <div className='row'>
                  <div className='col'>
                    H: {nft.traits.Hardworking}
                  </div>
                  <div className='col'>
                    E: {nft.traits.Efficient}
                  </div>
                </div>
              </div>)}
            </div>
          </div>}
      </div>}

    </div>
  );
}

export default App;
