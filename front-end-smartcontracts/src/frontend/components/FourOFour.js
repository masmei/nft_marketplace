import React from 'react'
import { Image } from "react-bootstrap";
import doge from "../assets/doge.png";

function FourOFour() {
  return (
    <div className='py-5'>
        <h1>Oh No!</h1>
        <h3 className='pb-3'>There's nothing to see here...</h3>
        <Image src={doge} style={{maxWidth:"50%"}}/>
    </div>
  )
}

export default FourOFour