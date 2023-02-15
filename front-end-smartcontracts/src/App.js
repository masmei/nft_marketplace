import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./frontend/components/Navbar";
import Market from "./frontend/components/Market.js";
import Create from "./frontend/components/Create.js";
import NewProfileForm from "./frontend/components/NewProfileForm";
import MyProfile from "./frontend/components/MyProfile";
import ProfileEditForm from "./frontend/components/ProfileEditForm";
import MyActivities from "./frontend/components/MyActivities.js";
import MarketplaceAbi from "./frontend/contractsData/Marketplace.json";
import MarketplaceAddress from "./frontend/contractsData/Marketplace-address.json";
import NFTAbi from "./frontend/contractsData/NFT.json";
import NFTAddress from "./frontend/contractsData/NFT-address.json";
import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Home from "./frontend/components/Home";
import Footer from "./frontend/components/Footer";
import FourOFour from "./frontend/components/FourOFour";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar web3Handler={web3Handler} account={account} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/market"
              element={
                <Market marketplace={marketplace} nft={nft} loading={loading} />
              }
            />
            <Route
              path="/create"
              element={
                <Create marketplace={marketplace} nft={nft} loading={loading} />
              }
            />
            <Route
              path="/profiles/new"
              element={<NewProfileForm account={account} loading={loading} />}
            />
            <Route
              path="/profiles/:address"
              element={
                <MyProfile
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                  loading={loading}
                />
              }
            />
            <Route
              path="/profiles/:address/edit"
              element={<ProfileEditForm account={account} loading={loading} />}
            />
            <Route
              path="/activities"
              element={
                <MyActivities
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                  loading={loading}
                />
              }
            />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </div>
        <Footer account={account} />
      </div>
    </BrowserRouter>
  );
}

export default App;
