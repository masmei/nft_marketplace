import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import logo from "../assets/pursuitlogo.png";
// import { getAccountPath } from "ethers/lib/utils";

function Navigation({ web3Handler, account }) {
  // console.log(account)
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link as={Link} to="/" style={{ color: "white" }}>
          <img src={logo} width="192.3" height="50" className="" alt="" />
          &nbsp; NFTs
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/market">
              Marketplace
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create NFT
            </Nav.Link>
            <Nav.Link as={Link} to={`/profiles/${account}`}>
              My Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/activities">
              Activities&nbsp;
            </Nav.Link>
          </Nav>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="warning">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
