import React, { useEffect, useState } from "react";
import AddToken from "../utils/AddToken";
import { useMyContext } from "../context";
import Connect from "../utils/connect";
import ContractProvider from "../utils/contract";
import Loader from "../components/Loader";

const Faucet = () => {
  const textToCopy = "0x87c9B3bcdb46cF84Db1C0e3B727f17fD6c62D575";
  const final = textToCopy.slice(0, 12) + "...";
  const { connect, setAddress, address, contract } = useMyContext();
  const [inpvalue, setinpvalue] = useState(null);
  const [loading, setLoading] = useState(false);

  const HandleMint = async () => {
    setLoading(true);
    if (inpvalue === "") {
      alert("no address found");
      return;
    }

    if (!connect) {
      try {
        const { provider, signer } = await Connect();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect to wallet.");
      }
    }

    if (contract && connect) {
      try {
        const mintResult = await contract.sendCodo(address);
        console.log("Mint result:", mintResult);
        setLoading(false);
      } catch (error) {
        console.error("Error interacting with contract:", error);
        setLoading(false);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert(`Copied to clipboard: ${textToCopy}`);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen text-center">
        {address && connect && <ContractProvider address={textToCopy} />}
        <div className="max-w-xl w-full px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Get Testnet Codo
          </h1>
          <p className="text-gray-600 mb-8">
            A custom ERC-20 deployed on Bitfinity. Add the token to your wallet
            or copy the token address below.
          </p>
          <div className="mb-8"></div>
          <div>
            <input
              placeholder={
                connect ? "Enter your address" : "Please connect your wallet"
              }
              type="text"
              value={address || ""}
              className="mb-4 w-full flex justify-center text-gray-500 border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setinpvalue(e.target.value)}
            />
            <div className="flex justify-around">
              <div className="flex items-center justify-center gap-3">
                <p className="text-sm text-gray-500">{final}</p>
                <div className="flex items-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    aria-hidden="true"
                    focusable="false"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={handleCopy}
                    alt="Copy Address"
                  >
                    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                  </svg>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  height="1em"
                  width="1em"
                  className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={() => AddToken(textToCopy)}
                  alt="Add Token"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <button
                className="px-6 py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all duration-200"
                onClick={HandleMint}
              >
                {loading ? <Loader /> : "Mint codo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faucet;
