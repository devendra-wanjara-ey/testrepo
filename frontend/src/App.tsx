import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Team2NFTAbi } from './Team2NFTAbi';

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

        //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        const web3 = new Web3("http://127.0.0.1:9545/");
        const contract = new web3.eth.Contract(Team2NFTAbi as any, "0x3dB0f096B559428d47eC8c6426c27050f2333103");

        const balance = await contract.methods.balanceOf(address).call();

        const newNfts: Team2NFT[] = [];
        for (let ix = 0; ix < balance; ix++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
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
      <h1 className='mt-3'>Our cool Team2 NFT viewer</h1>
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
