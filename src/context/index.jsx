import React, { createContext, useState, useContext } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [connect, setConnect] = useState(false);
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <MyContext.Provider
      value={{
        connect,
        setConnect,
        address,
        setAddress,
        setSigner,
        signer,
        setContract,
        contract,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};

export default MyProvider;
