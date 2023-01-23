import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Team2NFTV1Abi } from '../Team2NFTV1Abi';
import Web3 from 'web3';

import { Team2NFT } from "../App";

function Search() {

  const [address, setAddress] = useState('');
  const [ntfs, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isValid = Web3.utils.isAddress(address);
  const SMART_CONTRACT = "0x4080867b3941dC20977828025326B6364F2Be70B";
  const TEST_NETWORK = "http://127.0.0.1:9545/";

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(ntfs);
  const [newNfts, setnewNfts] = useState([]);

  useEffect(() => {
    if (true) {
      const fetchData = async () => {

        //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        const web3 = new Web3(TEST_NETWORK);
	console.log(Team2NFTV1Abi);
    const contract = new web3.eth.Contract(Team2NFTV1Abi, SMART_CONTRACT);
    const balance = await contract.methods.totalSupply().call();
    console.log(balance);

  //  const newNfts = [];
    for (let ix = 0; ix < balance; ix++) {
      //console.log("DEBUG1")
      //const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();          
          const tokenId = await contract.methods.tokenByIndex(ix).call();
      //console.log("DEBUG2")
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const metadataResponse = await fetch(tokenURI);          
          const metadata = await metadataResponse.json();          
          const initialValue = JSON.parse(localStorage.getItem(tokenURI) || '{}');
          console.log(initialValue);
          //return initialValue || "";
          //console.log(metadata);

          const traits = [];          
          
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


       // setNfts(newNfts);
        setLoading(false);
        setData(newNfts);
        console.log(newNfts);
      }
      fetchData();
    }
  }, [address, isValid])

  
  
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  
  const filterData = (value) => {
    console.log(ntfs);
    console.log(newNfts);
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(newNfts);
    else {
        var returnValues = [];
       
      const filteredData = newNfts.filter(item => {
       
        item['attributes'].forEach(element => {
            var localValue = element['value'];
            if (isNaN(localValue)) {
                if (localValue.toLowerCase().includes(lowercasedValue)) {
                    returnValues.push(item);
                }
            } else {
                var toCampare = localValue.toString();
                if (toCampare.toLowerCase().includes(lowercasedValue)) {
                    returnValues.push(item);
                }
            }
           
        });



        return returnValues;
        
      });
      setData(returnValues);
    }
  }

    return (
     <div>
        {loading ? <p >Loading ...</p> :     <div className="App">
      <div className="title">Search:</div>
     <input 
      style={{ marginLeft: 5 }}
      type="text"
      placeholder="Type to search..."
      value={searchText}
      onChange={e => handleChange(e.target.value)}
    />
    <div className="box-container  search-box">
      {data.map((d, i) => {
        return <div key={i} className="box title title-width " >
          <div className="parent-search" style={{ backgroundColor: '#98B2D1' }}>
            {/* <b>Name: </b>{d.name}<br />
            <b>Description: </b>{d.description}<br />
            <b>External URL: </b>{d.external_url}<br />
            <b>Tech Stack: </b> */}
              <div><img src={d.image}  className='img-size' /></div>
              <div>  
                {
                    d.attributes.map(attr => {
                        return (
                        <div className="parent-search">
                        <li>Name: {attr[0].name}</li>
                        <li> Id: {attr[0].empId}</li>
                        <li>Skils : {attr[0].primarySkill} {attr[0].secondarySkill}</li>
                        <li>Localtion: {attr[0].location}</li>
                        </div>
                        );
                    })
                }
              </div>
          </div>
        </div>
      })}
      <div className="clearboth"></div>
      {data.length === 0 && <span>No records found to display!</span>}
    </div>
  </div> }
        
     </div>




        

  );
}


export default Search;
