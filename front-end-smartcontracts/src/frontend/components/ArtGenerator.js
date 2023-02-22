import { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { Configuration, OpenAIApi } from "openai";
import Error from "./Error";
import Loading from "./Loading"

console.log(process.env.REACT_APP_API_DALLE);
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_DALLE,
});
const openai = new OpenAIApi(configuration);

function ArtGenerator() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateImage = async (event) => {
    event.preventDefault();

    const imageParameters = {
      prompt: userPrompt,
      n: 1,
      size: "256x256",
    };
    try {
      setError("");
      setLoading(true);
      const response = await openai.createImage(imageParameters);
      const urlData = response.data.data[0].url;
      setImageUrl(urlData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
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
          Welcome to our Art Generator! Enter a prompt below, and click the
          'Generate' button to generate a unique image based on your prompt. Once
          your image is generated, it will appear below the input field. If
          you'd like to generate a new image, simply enter a new prompt and
          click the 'Generate' button again.
        </p>
        <Form className="my-4" onSubmit={generateImage}>
          <Form.Control
            className="mb-4"
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
            Generate
          </Button>
        </Form>
        {error ? (
          <div>
            <Error />
          </div>
        ) : (
          <div>{loading ? <Loading /> : 
          (imageUrl && <img src={imageUrl} className="image" alt="ai-image" />
          )}</div>
        )}
        
      </main>
    </div>
  );
}

export default ArtGenerator;
