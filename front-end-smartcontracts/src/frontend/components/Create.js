import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";

const ipfsClient = require('ipfs-http-client');
const projectId = '2E6RLQV7aYOMW7GFFPjI5qil41h';
const projectSecret = '6911b789c1804911b2bc781396a4d0bc';

const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
host: 'ipfs.infura.io',
port: 5001,
protocol: 'https',
headers: {
authorization: auth,
},
});

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  let navigate = useNavigate();

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://pursuitnft.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://pursuitnft.infura-ipfs.io/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    navigate(`/market`)
  }
  return (
    <div className="container-fluid mt-5">
      <h2 style={{marginBottom: "10px"}}>Create New Item</h2>
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
            <Form.Label>Image, Video, Audio, or 3D Model
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              </Form.Label>
              <Form.Label>Name
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Item Name" />
              </Form.Label>
              <Form.Label>Description
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Provide a description of your nft." />
              </Form.Label>
              <Form.Label>Price
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              </Form.Label>
              <div className="d-grid px-3">
                <Button style={{ maxWidth: '200px' }} onClick={createNFT} variant="warning" size="md">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create