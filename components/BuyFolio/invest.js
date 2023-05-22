import { Divider } from 'antd';
import { contractAddress, contractABI, wethAbi } from '../../GlobalConfig/config';
import { WETH_ADDRESS } from '../../GlobalConfig/config';
import { AddressContext } from '../MetaMask/AddressContext'
import Link from 'next/link'
import styles from './buyfolio.module.css'
import { useContext } from 'react';
import { ethers } from 'ethers';

const contractDetail = () => {
    const addressContext = useContext(AddressContext);

    // const navigate = useNavigate()
    // let provider
    // if (process.env.ENVIRONMENT == 'local') {
    //     provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    // } else if (process.env.ENVIRONMENT == 'testnet') {
    //     provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
    // } else {
    //     provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
    // }

    const contract = new ethers.Contract(contractAddress, contractABI, addressContext.signer);
    console.log('contractAddress', contractAddress)
    console.log('contractABI',contractABI)
    console.log('addressContext.signer', addressContext.signer)
    console.log('WETH_ADDRESS',WETH_ADDRESS)
    console.log('wethAbi',wethAbi)


    // WETH contract instance
    const wethContract = new ethers.Contract(WETH_ADDRESS, wethAbi, addressContext.signer);

    const tokensToBuy = []
    const proportions = []
    
    const Invest = async () => {
        // Specify the amount of ETH you want to send
        const amountInEth = ethers.utils.parseEther('1'); // replace '1' with the amount of ETH you want to send
        const gasLimit = ethers.utils.hexlify(6000000); // specify the gas limit

        // Deposit ETH into WETH and set gaslimit manually
        const overrides = {
            value: amountInEth, // ether in wei (1 ether = 1e18 wei)
            gasLimit: gasLimit  // gas limit
        };

        // Deposit ETH into WETH and approve the contract to spend WETH
        await wethContract.deposit(overrides);
        await wethContract.approve(contractAddress, amountInEth);

        // Call the Solidity function and pass the parameters
        const tx = contract.investInPortfolio(tokensToBuy, proportions, amountInEth, overrides);
        await console.log(tx.receipt);
    };

    return (
        <div>
            <Link href="/loader">
                <a >
                    <button className={styles.buttonBuy} onClick={Invest} >Buy Folio</button>
                </a>
            </Link>
        </div>
    );
}

export default contractDetail;