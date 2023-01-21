import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Team2NFTAbi } from '../Team2NFTAbi';
import Web3 from 'web3';

import { Team2NFT } from "../App";

function Search() {

  const [address, setAddress] = useState('');
  const [ntfs, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isValid = Web3.utils.isAddress(address);

  useEffect(() => {
    if (true) {
      const fetchData = async () => {

        //const web3 = new Web3("https://rinkeby.infura.io/v3/d4ed4c25a40645bd95f4d33bc7cd0925");
        // add this one on a constant 
        const web3 = new Web3("http://127.0.0.1:9545/");
    console.log(Team2NFTAbi);
        const contract = new web3.eth.Contract(Team2NFTAbi , "0x4080867b3941dC20977828025326B6364F2Be70B");

        // number of tokens under that small contract 
        console.log(address);
        const balance = await contract.methods.balanceOf(address).call();
    console.log(balance);

        const newNfts = [];
        for (let ix = 0; ix < balance; ix++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(address, ix).call();
          //const tokenURI = await contract.methods.tokenURI(tokenId).call();
          const tokenURI = await contract.methods.tokenURI(ix).call();
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();
          console.log(metadata);

          const traits  = {};

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
  
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);
  const excludeColumns = ["id", "color"];
  
  
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key => {
            return excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue);
        }
        );
      });
      setData(filteredData);
    }
  }

    return (
    <div className="App">
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
          <div  style={{ backgroundColor: '#98B2D1' }}>
            <b>Name: </b>{d.name}<br />
            <b>Description: </b>{d.description}<br />
            <b>External URL: </b>{d.external_url}<br />
            <b>Tech Stack: </b>
              {/* <div>  
                {
                    d.attributes.map(attr => {
                        return (
                            <div>
                                <div>{attr.trait_type}</div>
                                <div>{attr.value}</div>
                            </div>
                        );
                    })
                }
              </div> */}
          </div>
        </div>
      })}
      <div className="clearboth"></div>
      {data.length === 0 && <span>No records found to display!</span>}
    </div>
    {address}
  </div>
  );
}


export default Search;
