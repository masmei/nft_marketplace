import React from 'react'
import loader from "../assets/loading.svg"

function Loading() {
  return (
    <div>
        <img src={loader} alt="loading" />
        <h2>Generating...</h2>
    </div>
  )
}

export default Loading