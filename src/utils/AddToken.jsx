import React from "react";

const AddToken = async (contractAddress) => {
  const Options = {
    tokenAddress: contractAddress,
    tokenSymbol: "CODO",
    tokenDecimals: 18,
  };

  try {
    const isAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: Options.tokenAddress,
          symbol: Options.tokenSymbol,
          decimals: Options.tokenDecimals,
        },
      },
    });
    if (isAdded) {
      console.log("success")
    } else {
      console.log("error",error)
    }
  } catch (error) {
    console.log(error);
  }
};

export default AddToken;
