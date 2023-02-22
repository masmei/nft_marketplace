import { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { Configuration, OpenAIApi } from "openai";

console.log(process.env.REACT_APP_API_DALLE);
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_DALLE,
});
const openai = new OpenAIApi(configuration);

function ArtGenerator() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async (event) => {
    event.preventDefault();

    const imageParameters = {
      prompt: userPrompt,
      n: 1,
      size: "256x256",
    };
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    setImageUrl(urlData);
  };

  const handleTextChange = (event) => {
    setUserPrompt(event.target.value);
  };

  return (
    <div className="container-fluid mt-5">
      <main
        role="main"
        className="col-lg-12 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h2>Generate Art</h2>
        <p>
          Welcome to our Art Generator! Enter a prompt below, and click the 'Submit' button to generate a unique image
          based on your prompt. Once your image is generated, it will appear below
          the input field. If you'd like to generate a new image, simply enter a
          new prompt and click the 'Submit' button again.
        </p>
        <Form className="my-4" onSubmit={generateImage}>
          <Form.Control
            className="mb-2"
            size="md"
            type="text"
            placeholder="Enter prompt here"
            required
            id="userPrompt"
            value={userPrompt}
            onChange={handleTextChange}
          />

          <Button
            type="submit"
            style={{ maxWidth: "200px" }}
            variant="warning"
            size="md"
          >
            Submit
          </Button>
        </Form>
        {imageUrl && <img src={imageUrl} className="image" alt="ai thing" />}
      </main>
    </div>
  );
}

export default ArtGenerator;
