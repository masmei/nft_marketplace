import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

export default function MyActivities({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplace.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };

  const loadSoldItems = async () => {
    const itemCount = await marketplace.itemCount();
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId);
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        if (i.sold) {
          soldItems.push(item);
        }
      }
    }
    setLoading(false);
    setSoldItems(soldItems);
  };
  useEffect(() => {
    loadPurchasedItems();
    loadSoldItems();
  }, [loading, loadPurchasedItems, loadSoldItems]);
  if (loading) return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
    }}
  >
    <Spinner animation="border" style={{ display: "flex" }} />
    <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
  </div>
  ) 
  return (
    <div className="my-5">
      <div className="flex justify-center">
        {purchases.length > 0 ? (
          <div className="px-5 container">
            <h2>Purchased</h2>
            <Row xs={1} md={2} lg={3} className="g-5 py-3">
              {purchases.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card bg="dark" variant="dark">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Footer>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases</h2>
          </main>
        )}
      </div>
      <div className="flex justify-center">
        {purchases.length > 0 ? (
          <div className="px-5 container">
            <h2>Sold</h2>
            <Row xs={1} md={2} lg={3} className="g-5 py-3">
              {soldItems.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card bg="dark" variant="dark">
                    <Card.Img variant="top" src={item.image} />
                    <Card.Footer>
                      For {ethers.utils.formatEther(item.totalPrice)} ETH -
                      Recieved {ethers.utils.formatEther(item.price)} ETH
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No Sales</h2>
          </main>
        )}
      </div>
    </div>
  );
}
