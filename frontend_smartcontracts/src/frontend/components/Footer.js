import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/pursuitlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer({ account }) {
  return (
    <footer className="my-5">
      <Container>
        <Row xs={1} md={3} lg={3}>
          <Col>
            <Link to="/" style={{ color: "white", listStyle: "none" }}>
              <img src={logo} width="230.77" height="60" className="" alt="" />
              &nbsp; NFTs
            </Link>
          </Col>
          <Col>
            <h4>Navigation</h4>
            <div>
              <Link className="link-light" to="/market">
                Marketplace
              </Link>
            </div>
            <div>
              <Link className="link-light" to="/create">
                Create NFT
              </Link>
            </div>
            <div>
              <Link className="link-light" to={`/profiles/${account}`}>
                My Profile
              </Link>
            </div>
            <div>
              <Link className="link-light" to="/activities">
                Activities&nbsp;
              </Link>
            </div>
          </Col>
          <Col >
            <h4>Get in touch with me at:</h4>
            <p>masonmei@pursuit.org</p>
            <p>or my socials below...</p>
            <section style={{display:"flex", justifyContent:"center", gap:"20px"}}>
            <a
            style={{ color: "white" }}
            href= "https://github.com/masmei"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
            
            <a
            style={{ color: "white" }}
            href= "https://twitter.com/Dapp_Boy"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          <a
            style={{ color: "white" }}
            href= "https://www.instagram.com/masmei/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            style={{ color: "white" }}
            href= "https://www.linkedin.com/in/masonmei/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
            </section>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>Copyright &copy; masmei</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
