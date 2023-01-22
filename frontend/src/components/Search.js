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
  const SMART_CONTRACT = "0x841A24C7a9B5454b7Ef5C389beD96C11e2F9Ed1E";
  const TEST_NETWORK = "http://127.0.0.1:9545/";

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(ntfs);
  const excludeColumns = ["id", "color"];


  useEffect(() => {
    if (true) {
      const fetchData = async () => {

        //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        const web3 = new Web3(TEST_NETWORK);
	console.log(Team2NFTV1Abi);
    const contract = new web3.eth.Contract(Team2NFTV1Abi, SMART_CONTRACT);
    const balance = await contract.methods.totalSupply().call();
    console.log(balance);

    const newNfts = [];
    for (let ix = 0; ix < balance; ix++) {
      //console.log("DEBUG1")
      //const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();          
          const tokenId = await contract.methods.tokenByIndex(ix).call();
      //console.log("DEBUG2")
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();
          console.log(metadata);

          const traits = [];

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


       // setNfts(newNfts);
        setLoading(false);
        setData(newNfts);
        console.log(newNfts);
      }
      fetchData();
    }
  }, [address, isValid])

    const dataList = [
    {
      "tokenId": 1,
      "name": "Team2 NFT #0",
      "description": "Team2  NFTs are great",
      "image": "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_0.jpg",
      "external_url": "https://github.com/devendra-wanjara-ey/testrepo",
      "attributes": [
        {
            "trait_type": "name",
            "value": "Mr. XXX"
        },
        {
            "trait_type": "empId",
            "value": 23
        },
        {
            "trait_type": "primarySkill",
            "value": "DB"
        },
        {
            "trait_type": "secondarySkill",
            "value": "Micro Services"
        },
        {
            "trait_type": "secondarySkill",
            "value": "California"
        }
       ]
    },
    {
        "tokenId": 1,
        "name": "Team2 NFT #1",
        "description": "Team2 NFTs are great",
        "image": "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_1.jpg",
        "external_url": "https://github.com/devendra-wanjara-ey/testrepo",
        "attributes": [
            {
                "trait_type": "name",
                "value": "Mr. Joe"
            },
            {
                "trait_type": "empId",
                "value": 22
            },
            {
                "trait_type": "primarySkill",
                "value": "Cloud"
            },
            {
                "trait_type": "secondarySkill",
                "value": "Micro Services"
            },
            {
                "trait_type": "secondarySkill",
                "value": "California"
            }
        ]
    },
    {
        "tokenId": 2,
        "name": "Team2 NFT #2",
        "description": "Team2 NFTs are great",
        "image": "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_2.jpg",
        "external_url": "https://github.com/devendra-wanjara-ey/testrepo",
        "attributes": [
            {
                "trait_type": "name",
                "value": "Mr. Doe"
            },
            {
                "trait_type": "empId",
                "value": 21
            },
            {
                "trait_type": "primarySkill",
                "value": "UI"
            },
            {
                "trait_type": "secondarySkill",
                "value": "Cloud"
            },
            {
                "trait_type": "secondarySkill",
                "value": "New York"
            }
        ]
    },
    {
        "tokenId": 3,
        "name": "Team2 NFT #3",
        "description": "Team2 NFTs are great",
        "image": "https://raw.githubusercontent.com/devendra-wanjara-ey/testrepo/main/assets/Team2NFT_3.jpg",
        "external_url": "https://github.com/devendra-wanjara-ey/testrepo",
        "attributes": [
            {
                "trait_type": "name",
                "value": "Test 1"
            },
            {
                "trait_type": "empId",
                "value": 20
            },
            {
                "trait_type": "primarySkill",
                "value": "Java"
            },
            {
                "trait_type": "secondarySkill",
                "value": "UI"
            },
            {
                "trait_type": "secondarySkill",
                "value": "Texa"
            }
        ]
    }];
  
 
  
  
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(data);
    else {
      const filteredData = data.filter(item => {
        return Object.keys(item).some(key => {
            return excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue);
        }
        );
      });
      setData(filteredData);
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
    <div className="box-container title">
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
                                <div>{attr.trait_type}</div>
                                <div>{attr.value}</div>
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
