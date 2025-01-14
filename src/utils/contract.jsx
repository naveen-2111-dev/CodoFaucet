import { useEffect } from "react";
import { useMyContext } from "../context";
import { ethers } from "ethers";
import ABI from "../assets/codo.json";

const ContractProvider = ({ address }) => {
  const { signer, setContract } = useMyContext();

  useEffect(() => {
    if (signer && address) {
      const contractInstance = new ethers.Contract(address, ABI.abi, signer);
      setContract(contractInstance);
      console.log("Contract instance created:", contractInstance);
    }
  }, [signer, address, setContract]);

  return null;
};

export default ContractProvider;
