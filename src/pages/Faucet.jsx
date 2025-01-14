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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {address && connect && <ContractProvider address={textToCopy} />}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
        <div className="bg-gradient-to-b from-gray-50 to-gray-200 p-8 rounded-l-lg flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Get Testnet Codo
          </h1>
          <p className="text-gray-600 leading-relaxed">
            A custom ERC-20 deployed on Bitfinity. Add the token to your wallet
            or copy the token address below.
          </p>
        </div>

        <div className="p-8 flex-1">
          <div className="bg-gray-50 rounded-lg p-5 shadow-md flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-1">
                Token Address
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-sm text-gray-500">{final}</p>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                  focusable="false"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                  onClick={handleCopy}
                >
                  <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                </svg>
              </div>
            </div>
            <button
              onClick={() => AddToken(textToCopy)}
              className="px-5 py-2 bg-black text-white font-medium rounded-md shadow-sm hover:bg-gray-800 transition-all duration-200"
            >
              Add to Wallet
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Mint Your Codo
            </h3>
            <input
              placeholder={
                connect ? "Enter your address" : "Please connect your wallet"
              }
              type="text"
              value={address || null}
              className="mb-4 w-full max-w-xs border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setinpvalue(e.target.value)}
            />
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
  );
};

export default Faucet;
