import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumConract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionContract;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// eslint-disable-next-line react/prop-types
export const TransactionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactioncount, setTransactionCount] = useState(
    localStorage.getItem("transaction-count")
  );
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleFormChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const isWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions
      } else {
        console.log("No accounts");
      }
      console.log(accounts);
    } catch (error) {
      throw new Error("no ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("no ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please Install Metamask");
      const { receiver, amount, message, keyword } = formData;
      const transactionContract = await getEthereumConract();

      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: receiver,
            gas: "0x5208", //21000 gwei
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        receiver,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading  -${transactionHash.hash}`);
      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success- ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.error(error);
      throw new Error("no ethereum object");
    }
  };

  useEffect(() => {
    isWalletConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleFormChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
