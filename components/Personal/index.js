import styles from "./Personal.module.css";
import { AddressContext } from '../MetaMask/AddressContext'
import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from '../../GlobalConfig/config';
import Transaction from '../Transaction/index.js';


const Personal = () => {
  const addressContext = useContext(AddressContext);

  const contract = new ethers.Contract(contractAddress, contractABI, addressContext.signer);

  // Get the Solidity events
  async function getBuyEvents() {
    // Create a filter to get the Buy events
    const buyEvent = contract.filters.Buy("0xcD872177a786F05f37ee6Cf2deE489C1C3611CeD"); // replace with the actual name and parameters of the Buy event

    // Get all events
    const events = await contract.queryFilter(buyEvent, 0, 'latest');

    // Store the events args in arrays
    let ethSpentArray = [];
    let amountsOutArray = [];
    let tokensArray = [];
    let proportionsArray = [];

    // Loop through the events and store the args in the arrays
    for (let i = 0; i < events.length; i++) {
      let ethSpent = events[i].args.ethSpent.toString();
      let amountsOut = events[i].args.amountsOut.map(amount => amount.toString());
      let tokens = events[i].args.tokens;
      let proportions = events[i].args.proportions.map(proportion => proportion.toString());

      ethSpentArray.push(ethSpent);
      amountsOutArray.push(amountsOut);
      tokensArray.push(tokens);
      proportionsArray.push(proportions);
    }
    // Print the arrays
    console.log(ethSpentArray);
    console.log(amountsOutArray);
    console.log(tokensArray);
    console.log(proportionsArray);
    // Convert the ethSpentArray to wei (TODO: pass these args to the contract function)
    //let ethSpent = ethers.utils.parseUnits(ethSpentArray[0], 'wei');
    const ethSpentArrayInEth = ethSpentArray.map((ethSpent) => ethSpent / 10 ** 18);
    const amountsOutArrayInEth = amountsOutArray.map((amountsOut) => amountsOut / 10 ** 18);
    console.log(ethSpentArrayInEth);
    console.log(amountsOutArrayInEth);


    const tokenAddressMap = {
      "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6": "WETH",
      "0x07865c6E87B9F70255377e024ace6630C1Eaa37F": "USDC",
      "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": "UNI",
      "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": "LINK"
    };


    const tokenNamesArray = tokensArray.map((token) => tokenAddressMap[token]);

    console.log(tokenNamesArray);


    const proportionsFormattedArray = proportionsArray.map((proportion) => `${(proportion * 100).toFixed(2)}%`);
    console.log(proportionsFormattedArray);
  }





  return (
    <div className={styles.main}>
      <div className={styles.box1}>
        <div className={styles.left_content}>
          <h2>Account Balance</h2>
          <span id={styles.balance_number}>{addressContext.balance} ETH</span>
          <h5 id='UserAddress'>Addrss: {addressContext.address}</h5>
        </div>
      </div>
      <div className={styles.box2}>
        <div className={styles.transactions_box}>
          <h2>Transactions</h2>

{/* 
          <button onClick={getBuyEvents}>Get Buy Events</button> */}

          <Transaction />

          <div className={styles.no_transactions}>

          </div>
        </div>
      </div>
    </div>
  );

  // return <div className={styles.container}> Personal </div>;
};

export default Personal;
