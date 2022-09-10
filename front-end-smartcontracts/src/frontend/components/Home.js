import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Carousel, Button } from "react-bootstrap";
import User from "./User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faImage,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import metamaskImage from "../assets/metamask.png";
import ethImage from "../assets/ethbanner.png";
import nftImage from "../assets/whatisNFT.png";
import nftBanner from "../assets/nftBanner1.jpeg";

const API = process.env.REACT_APP_API_URL;

function Home({ setLoading }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/profiles`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((c) => console.warn("catch", c));
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${nftBanner})`,
          backgroundSize: "cover",
          height: "50vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
        }}
      >
        {/* <img src={nftBanner} style={{objectFit: "cover", width: "100%", height: "100%", zIndex: "-2"}}/> */}
        <h1>CREATE, CONNECT & COLLECT</h1>
        <h4>Your journey begins here!</h4>
      </div>

      <div className="px-5 container">
        <Row xs={1} md={3} lg={3} className="py-5">
          <section>
            <FontAwesomeIcon icon={faAddressCard} size="2xl" />
            <h5>Join Our Community</h5>
            <p>
              Once you’ve set up your MetaMask wallet, connect it by clicking
              the "Connect Wallet" icon in the top right corner. Set up your
              profile by going to "My Profile" and start connecting with our
              community!
            </p>
          </section>
          <section>
            <FontAwesomeIcon icon={faImage} size="2xl" />
            <h5>Create Your NFT</h5>
            <p>
              Upload your work (image, video, audio, or 3D art), add a name and
              description to create your very own NFT that will live on the
              blockchain!
            </p>
          </section>
          <section>
            <FontAwesomeIcon icon={faHandshake} size="2xl" />
            <h5>Start Trading</h5>
            <p>
              List your NFT at your desired price. Browse the Marketplace. Buy and Sell NFTs!
            </p>
          </section>
        </Row>
        <div className="py-5 container">
          <h3>Learning Resources</h3>
          <Carousel >
            <Carousel.Item interval={3000}>
              <img className="d-block" src={nftImage} alt="First slide" style={{ objectFit: "cover", height: "400px", width: "100%" }}/>
              <Carousel.Caption>
              <a href="https://ethereum.org/en/nft/" target="_blank">
                <Button variant="dark" size="lg">Learn More</Button>
                </a>  
                <h2 style={{color:"black"}}>
                What is a NFT?
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block"
                src={metamaskImage}
                alt="Second slide"
                style={{ objectFit: "cover", height: "400px", width: "100%"}}
              />
              <Carousel.Caption>
                <a href="https://opensea.io/blog/learn/how-to-easily-setup-a-metamask-wallet/" target="_blank">
              <Button variant="dark" size="lg">Learn More</Button>
                </a>  
                <h2 style={{color:"#ffcc5f"}}>Setting up your MetaMask wallet.</h2>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img className="d-block" src={ethImage} alt="Third slide" style={{ objectFit: "cover", height: "400px", width: "100%" }}/>
              <Carousel.Caption>
              <a href= "https://opensea.io/blog/learn/how-to-fund-metamask-with-eth/" target="_blank">
              <Button variant="dark" size="lg">Learn More</Button>
              </a>  
                <h2 style={{color:"black"}}>
                How to Fund MetaMask with ETH
                </h2>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div className="px-5 container">
        <h3>Meet Our Community Members</h3>
        <Row xs={1} md={2} lg={3} className="g-5 py-5">
          {users.map((user) => {
            return <User key={user.id} user={user} />;
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
