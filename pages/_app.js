import '../styles/globals.css'
import { AddressContext } from '../components/MetaMask/AddressContext'
import React, { useState } from "react";

function MyApp({ Component, pageProps }) {

    // user address and signer
    const [address, setAddress] = useState();
    const [signer, setSigner] = useState();
    const [balance, setBalance] = useState();
    const addressContext = { address, setAddress, signer, setSigner, balance, setBalance};


    return(
      <AddressContext.Provider value={addressContext}>
        <Component {...pageProps} />
      </AddressContext.Provider>
    );
}

export default MyApp
