import { useState, useEffect, useContext } from 'react';
import styles from './transaction.module.css';
import { AddressContext } from '../MetaMask/AddressContext'
import { ethers } from "ethers";
import { contractAddress, contractABI } from '../../GlobalConfig/config';
import Link from 'next/link';

const Transaction = () => {
    const addressContext = useContext(AddressContext);
    const [tableData, setTableData] = useState([]);

    const tokenAddressMap = {
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6": "WETH",
        "0x07865c6E87B9F70255377e024ace6630C1Eaa37F": "USDC",
        "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": "UNI",
        "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": "LINK"
    };

    const contract = new ethers.Contract(contractAddress, contractABI, addressContext.signer);

    useEffect(() => {
        getBuyEvents();
    }, []);

    async function getBuyEvents() {
        try {
            if (addressContext.address !== null) {
                const buyEvent = contract.filters.Buy(addressContext.address);

                // debug
                // const buyEvent = contract.filters.Buy('0xcD872177a786F05f37ee6Cf2deE489C1C3611CeD');
                // try{
                //     const events = await contract.queryFilter(buyEvent, 0, 'latest');
                //     console.log(events)
                // } catch (error) {
                //     console.log(error)
                // }
                const events = await contract.queryFilter(buyEvent, 0, 'latest');

                const tableData = events.map(event => {
                    const ethSpent = ethers.utils.formatUnits(event.args.ethSpent, 'wei');
                    const amountsOut = event.args.amountsOut.map(amount => ethers.utils.formatUnits(amount, 'wei'));
                    const tokens = event.args.tokens;
                    const proportionsFormattedArray = event.args.proportions.map((proportion) => `${(parseFloat(proportion)).toFixed(2)}%`);

                    return {
                        ethSpent: ethSpent / 10 ** 18,
                        amountsOut: amountsOut.map(amount => amount / 10 ** 18),
                        tokens: tokens.map(token => tokenAddressMap[token]),
                        proportionsFormattedArray: proportionsFormattedArray
                    };
                });
                setTableData(tableData);
                console.log(tableData)
            }

        }
        catch (error) {
            console.log(error)

        }


    }

    function handleButtonClick() {
        // debug
        // console.log("Clicked button in row, data:", rowData);
        // console.log('table data', rowData.tokens);
        // console.log('table data', rowData.percentage);

        // router.push({
        //   pathname: '/folio',
        //   query: rowData,
        // });
        console.log('clicked')
    }

    return (
        <div>
            <div>
                {addressContext.address ? (
                    <table className={styles.tablet} id="transaction-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Eth Spent</th>
                                <th>Token and Proportion</th>
                                <th>Token Receive</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.ethSpent}</td>
                                    <td>
                                        {row.tokens.map((token, i) => (
                                            <span key={i}>
                                                {token} ({row.proportionsFormattedArray[i]})
                                                {i !== row.tokens.length - 1 && <br />}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{row.amountsOut.join(' ')}</td>
                                    <td>
                                        {/* <button onClick={() => handleButtonClick(row)}>Button</button> Sell button */}
                                        <Link href='/folio'>
                                            <a className={styles.button} onClick={() => handleButtonClick()}>
                                                Sell
                                            </a>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>Please connect to MetaMask</h1>
                )}
            </div>
        </div>

    );



}

export default Transaction;
