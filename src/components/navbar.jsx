import React, { useEffect, useState } from "react";
import Meta from "../pictures/Meta.png";
import Connect from "../utils/connect";
import Logo from "../pictures/Logo.png";
import BIT from "../pictures/Bit.png";

/**
 * Navbar Component
 *
 * This component renders a responsive navigation bar with a logo, navigation links,
 * and a "Connect" button to allow users to connect their Web3 wallets (MetaMask).
 * The navbar is styled using Tailwind CSS for a clean and modern design.
 *
 * @component
 * @returns {JSX.Element} A responsive navbar component with a wallet connection option.
 *
 * @example
 * // Render the Navbar component
 * <Navbar />
 */
const Navbar = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const fetchWallet = async () => {
    try {
      const { provider, signer } = await Connect();
      setProvider(provider);
      setSigner(signer);

      if (signer) {
        const userAccount = await signer.getAddress();
        const mainString = userAccount.slice(0, 5) + "...";
        setAccount(mainString);
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };
  fetchWallet();

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="bg-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg">
              <img src={Logo} alt="logo" width="80" height="80" />
            </div>
            <div className="hidden md:flex space-x-4">
              <ul className="flex space-x-4">
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  About
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  Docs
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  dApp
                </li>
                <li className="text-gray-300 hover:text-white cursor-pointer">
                  bridge
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <a
                href="https://github.com/naveen-2111-dev/CodoFaucet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.04 3.29 9.33 7.88 10.89.58.11.79-.25.79-.55 0-.28-.01-1.02-.02-2.01-3.23.7-3.91-1.56-3.91-1.56-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.11-.75.4-1.26.73-1.55-2.49-.28-5.11-1.24-5.11-5.5 0-1.22.43-2.23 1.14-3.02-.12-.28-.5-1.41.11-2.94 0 0 1.1-.35 3.61 1.34 1.05-.29 2.18-.44 3.29-.44 1.11 0 2.24.15 3.29.44 2.51-1.7 3.61-1.34 3.61-1.34.61 1.53.23 2.66.11 2.94.71.79 1.14 1.8 1.14 3.02 0 4.27-2.63 5.22-5.12 5.5.41.35.77.96.77 1.88 0 1.36-.01 2.46-.01 2.8 0 .31.2.66.79.55C20.71 21.33 24 16.04 24 12c0-6.63-5.37-12-12-12z"
                    fill="#FFFFFF"
                  />
                </svg>
              </a>

              <img
                src={BIT}
                alt="bitfinity"
                width="45"
                height="45"
                className="inline ml-2"
              />
            </div>
            <button
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Connect to MetaMask wallet"
              onClick={fetchWallet}
            >
              {account ? `connected : ${account}` : "Connect"}
              <img
                src={Meta}
                alt="MetaMask Logo"
                width="20"
                height="20"
                className="inline ml-2"
              />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
