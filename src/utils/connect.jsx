import { ethers } from "ethers";
import React from "react";

/**
 * Connects to the Ethereum network using MetaMask or a default provider.
 *
 * This function attempts to connect to the Ethereum network via MetaMask. If MetaMask is installed,
 * it initializes the provider and signer with MetaMask's connection. Otherwise, it defaults to
 * using a read-only provider from ethers.js.
 *
 * @async
 * @function Connect
 * @returns {Promise<{ provider: ethers.providers.Provider, signer: ethers.Signer | null }>}
 * An object containing the `provider` and `signer`. If MetaMask is unavailable, the `signer` is `null`.
 */
const Connect = async () => {
  let signer = null;
  let provider = null;

  if (window.ethereum === null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  }

  return { provider, signer };
};

export default Connect;
