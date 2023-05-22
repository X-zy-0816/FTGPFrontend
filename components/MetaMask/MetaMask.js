import { ethers } from 'ethers';
import { useState, useContext } from 'react';
import { AddressContext } from './AddressContext';
import styles from './MetaMask.module.css'

const MetaMask = () => {

    const addressContext = useContext(AddressContext);
    const [buttonText, setButtonText] = useState('Connect Wallet');

    const ButtonClick = () => {
        connectWallet();
        changeText('Connected');
    };
    const changeText = (text) => {
        setButtonText(text)
    };

    async function getWeb3Modal(){
        const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: "INFURA_ID"
                    },
                },
            },
        });
        return web3Modal;
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                // get signer
                addressContext.setSigner(provider.getSigner());

                await window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
                    addressContext.setAddress(accounts[0]);
                    addressContext.setBalance(getUserBalance(accounts[0]));
                    console.log(addressContext.address);
                    console.log(addressContext.balance);
                    console.log(addressContext.signer);
                });
            } catch (err) {
                console.error(err)
            }
        } else {
            console.log('Failed to connect to MetaMask');
        }
    }

    const getUserBalance = (accounts) => {
        window.ethereum.request({ method: "eth_getBalance", params: [accounts, "latest"] }).then((balance) => {
            addressContext.setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
        });
    }



    return (
        <div>
            {/* <button className={active ? 'wallet_button_clicked' : 'wallet_button'} onClick={ButtonClick}>
            </button> */}
            {addressContext.address ?
                (<button className={styles.wallet_button_clicked} onClick={ButtonClick}>Connected</button>)
                :
                (<button className={styles.wallet_button} onClick={ButtonClick}>{buttonText}</button>)
            }
        </div>
    )
}



export default MetaMask;
