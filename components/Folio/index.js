import styles from "./folio.module.css";
import Link from 'next/link'
import PIEChart from '../Piechart/index.js';
import PSlider from "../Slider/index.js";
import { useState, useEffect, useContext } from 'react';
//import runPythonScript from '../PythonScript/index.js';
import { useRouter } from 'next/router';
import ContractDetail from "../BuyFolio/invest.js";
import { contractAddress, contractABI, wethAbi } from '../../GlobalConfig/config';
import { WETH_ADDRESS } from '../../GlobalConfig/config';
import { AddressContext } from '../MetaMask/AddressContext'
import { ethers } from "ethers";

const folioDetail = () => {

    // Read data from Json
    //-----------------------------------------------
    const [percentage, setPercentage] = useState([]);
    const [tokens, setTokens] = useState([]);
    const [EtherNum, setEtherNum] = useState(1);

    // const router = useRouter();
    // const rowData = router.query;
    // if (rowData && rowData.percentage && rowData.tokens) {

    //     console.log('rowData', rowData);
    //     const percentageData = rowData.percentage
    //     const tokensData = rowData.tokens
    //     console.log('percentageData', percentageData)
    //     console.log('tokensData', tokensData)
    // }

    const router = useRouter();

    useEffect(() => {
        const rowData = router.query;
        if (rowData && rowData.percentage && rowData.tokens) {
            const percentageData = rowData.percentage;
            const parsedPercentageData = Array.from(percentageData, value => parseFloat(value));

            const tokensData = rowData.tokens;
            setPercentage(parsedPercentageData);
            setTokens(tokensData);
        }
    }, []);
    //-----------------------------------------------


    // when user change the percentage of each token    
    const handlePercentageChange = (index, newPercentage) => {
        // setPercentage(newPercentage);

        const total = percentage.reduce((acc, value) => acc + value, 0);
        const diff = newPercentage - percentage[index];
        const coefficient = (total + diff) / total;

        setPercentage(percentage.map((value, i) => {
            if (i === index) {
                return newPercentage;
            } else {
                return Math.round(value * coefficient);
            }
        }));
    };


    // // debug
    // console.log('slider data', tokens); // ['ETH', 'BNB', 'DAI', 'MKR', 'WEI']
    // console.log('slider data', percentage); // [15, 15, 15, 15, 40]

    // Piechart data
    const data = tokens.map((token, index) => {
        return {
            value: percentage[index],
            name: token,
        }
    })

    //-----------------------------------------------

    // Token string
    const totalPercentage = percentage.reduce((acc, val) => acc + val, 0);
    const percentageValues = percentage.map(p => (p / totalPercentage) * 100);
    const formattedData = tokens.reduce((acc, token, index) => {
        return acc += `${token} ${percentageValues[index].toFixed(1)}% ${index !== tokens.length - 1 ? '+ ' : ''}`;
    }, '');


    // // FINAL Return Data
    console.log(percentageValues)


    // ------------ convert token to address -------------
    const tokenAddressMap = {
        WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        USDC: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        LINK: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
    };

    const getAddressByToken = (token) => {
        return tokenAddressMap[token] || '';
    };
    const addressTokens = tokens.map((token) => getAddressByToken(token));
    console.log(addressTokens)


    const addressContext = useContext(AddressContext);
    console.log('contractAddress', contractAddress)
    console.log('contractABI', contractABI)
    console.log('addressContext.signer', addressContext.signer)
    console.log('WETH_ADDRESS', WETH_ADDRESS)
    console.log('wethAbi', wethAbi)

    const contract = new ethers.Contract(contractAddress, contractABI, addressContext.signer);
    // WETH contract instance
    const wethContract = new ethers.Contract(WETH_ADDRESS, wethAbi, addressContext.signer);
    const tokensToBuy = addressTokens
    

    for (var i = 0; i < percentageValues.length; i++) {
        percentageValues[i] = Math.round(percentageValues[i]);
    }

    const proportions = percentageValues
    console.log('proportions', proportions)


    // const Invest = async () => {
    //     // Specify the amount of ETH you want to send
    //     const amountInEth = ethers.utils.parseEther('1'); // replace '1' with the amount of ETH you want to send
    //     const gasLimit = ethers.utils.hexlify(6000000); // specify the gas limit

    //     // Deposit ETH into WETH and set gaslimit manually
    //     const overrides = {
    //         value: amountInEth, // ether in wei (1 ether = 1e18 wei)
    //         gasLimit: gasLimit  // gas limit
    //     };

    //     // Deposit ETH into WETH and approve the contract to spend WETH
    //     await wethContract.deposit(overrides);
    //     await wethContract.approve(contractAddress, amountInEth);

    //     // Call the Solidity function and pass the parameters
    //     const tx = contract.investInPortfolio(tokensToBuy, proportions, amountInEth, overrides);
    //     await console.log(tx.receipt);
    // };

    // Invest in the portfolio
    async function Invest() {
        const ehterString = getEther();
        // Specify the amount of ETH you want to send
        const amountInEth = ethers.utils.parseEther(ehterString); // replace '1' with the amount of ETH you want to send
        const gasLimit = ethers.utils.hexlify(6000000); // specify the gas limit

        // Deposit ETH into WETH and set gaslimit manually
        const overrides = {
            gasLimit: gasLimit  // gas limit
        };

        const depositAmount = {
            value: amountInEth
        };
        // Check if the user has enough WETH to invest, if not, deposit ETH into WETH
        //if (await wethContract.balanceOf(addressContext.address) < amountInEth) {
        await wethContract.deposit(depositAmount);
        //}

        // Approve the contract to spend WETH
        await wethContract.approve(contractAddress, amountInEth);

        // Call the Solidity function and pass the parameters
        const tx = contract.investInPortfolio(tokensToBuy, proportions, amountInEth, overrides);
    }

    // // Get the Solidity events
    // async function getBuyEvents() {
    //     // Create a filter to get the Buy events
    //     const buyEvent = contract.filters.Buy("0xcD872177a786F05f37ee6Cf2deE489C1C3611CeD"); // replace with the actual name and parameters of the Buy event

    //     // Get all events
    //     const events = await contract.queryFilter(buyEvent, 0, 'latest');

    //     // Store the events args in arrays
    //     let ethSpentArray = [];
    //     let amountsOutArray = [];
    //     let tokensArray = [];
    //     let proportionsArray = [];

    //     // Loop through the events and store the args in the arrays
    //     for (let i = 0; i < events.length; i++) {
    //         let ethSpent = events[i].args.ethSpent.toString();
    //         let amountsOut = events[i].args.amountsOut.map(amount => amount.toString());
    //         let tokens = events[i].args.tokens;
    //         let proportions = events[i].args.proportions.map(proportion => proportion.toString());

    //         ethSpentArray.push(ethSpent);
    //         amountsOutArray.push(amountsOut);
    //         tokensArray.push(tokens);
    //         proportionsArray.push(proportions);
    //     }
    //     // Print the arrays
    //     console.log(ethSpentArray);
    //     console.log(amountsOutArray);
    //     console.log(tokensArray);
    //     console.log(proportionsArray);
    //     // Convert the ethSpentArray to wei (TODO: pass these args to the contract function)
    //     //let ethSpent = ethers.utils.parseUnits(ethSpentArray[0], 'wei');
    // }

    function getEther() {
        var etherValue = document.getElementById("myInput").value;
        var etherNum = parseFloat(etherValue);

        // 判断是否为0或非负数
        if (etherNum <= 0) {
            etherNum = 0;
        }
        // var message = "You have invested " + etherNum + " Ether";
        var etherString = etherNum.toString();
        return etherString;
    }


    return (
        <div className={styles.main}>
            <div className={styles.tag_top}>
                <p>The Markowitz Optimisation Algorithm is an investment strategy designed to find the portfolio with the greatest expected return and the least risk by considering the overall risk and return of the portfolio.
                </p>
            </div>
            <h1>Markowitz Folio</h1>
            <div>
                <Link href="/algorithm">
                    <a >
                        <button className={styles.buttonReturn}>Back</button>
                    </a>
                </Link>
            </div>

            <div>
                <Link href="/loader">
                    <a >
                        <button className={styles.buttonBuy} onClick={Invest} >Buy Folio</button>
                    </a>
                </Link>
            </div>

            <div>
                <input id='myInput' type="number" placeholder="Enter Ether (0)" className={styles.myInput} min='0' />
            </div>



            {/* <div>
                <ContractDetail />
            </div> */}
            {/* <Link href="/loader">
                <a >
                    <button className={styles.buttonBuy} onClick={contractDetail.invest()} >Buy Folio</button>
                </a>
            </Link> */}
            <div className={styles.content_box}>

                {/* //----------------------------------------------- */}
                {/* Slider */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 50%' }}>
                        <div className={styles.token_box}>
                            <h2 style={{ textAlign: 'Left', margin: '1rem 0' }}>
                                {/* Tokens:{' '} */}
                                {tokens.map((token, index) => (
                                    <span key={token}>
                                        {token}{' '}
                                        <PSlider
                                            value={percentage[index]}
                                            onChange={(newValue) =>
                                                handlePercentageChange(index, newValue)
                                            }
                                        />
                                    </span>
                                ))
                                }
                            </h2>
                        </div>
                    </div>

                    {/* Piechart */}
                    <div style={{ flex: '0 0 50%' }}>
                        <PIEChart data={data} />
                    </div>
                </div>
                {/* //----------------------------------------------- */}

                <hr />
                <div className={styles.token_box}>
                    <h2 style={{ textAlign: 'Left', margin: '1rem 0' }}>
                        Tokens : {formattedData}
                    </h2>
                </div>
            </div>




        </div>
    );
    //   return <div className={styles.container}> folioDetail </div>;
};

export default folioDetail;
