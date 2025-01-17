import React from "react";

const About = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-center">
        <div className="mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-wide">
            About CoDo
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Codo is an ERC20 token deployed on the{" "}
            <strong>Bitfinity network</strong>,
            known for its significantly lower gas fees compared to other
            blockchain networks. This makes transactions more affordable and
            efficient, providing users with a cost-effective experience for
            various decentralized applications and token activities.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-gray-800">
            CoDo's Mission
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            To provide a solution for blockchain interoperability, Codo serves
            as a precursor to the upcoming bridge. The bridge will connect
            Solana, Tezos, Bitfinity, and Moonbase Alpha testnets. This will
            facilitate the transfer of testnet assets, just like mainnet
            cryptocurrencies. Why focus on testnets? Even blockchain developers
            in the initial stages often prefer testnets, and to better support
            them, this bridge has been planned.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
