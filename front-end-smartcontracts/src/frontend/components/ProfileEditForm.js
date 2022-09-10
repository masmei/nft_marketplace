import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

function SnackEditForm({account, loading}) {
  let navigate = useNavigate();

  const [profile, setProfile] = useState({
    address: account,
    name: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    picture: "",
    about: "",
  });

  const updateProfile = (updatedProfile) => {
    axios
      .put(`${API}/profiles/${profile.id}`, updatedProfile)
      .then(
        () => {
          navigate(`/profiles/${account}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setProfile({ ...profile, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    axios.get(`${API}/profiles/${account}`).then(
      (response) => setProfile(response.data),
      (error) => navigate(`/not-found`)
    );
  }, [account, loading, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(profile, account);
  };

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
    <div className="container-fluid mt-5">
        <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mx-auto">
              <Row className="g-6">
              <Form.Label>Name</Form.Label>
                <Form.Control
                className="mb-2"
                  size="md"
                  type="text"
                  required
                  id="name"
                  value={profile.name}
                  onChange={handleTextChange}
                />
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                className="mb-2"
                  size="md"
                  type="text"
                  id="twitter"
                  value={profile.twitter}
                  onChange={handleTextChange}
                />
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                className="mb-2"
                  size="md"
                  type="text"
                  id="instagram"
                  value={profile.instagram}
                  onChange={handleTextChange}
                />
                <Form.Label>Linkedin</Form.Label>
                <Form.Control
                className="mb-2"
                  size="md"
                  type="text"
                  id="linkedin"
                  value={profile.linkedin}
                  onChange={handleTextChange}
                />
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                className="mb-2"
                  size="md"
                  type="text"
                  id="picture"
                  value={profile.picture}
                  onChange={handleTextChange}
                />
                <Form.Label>About Me</Form.Label>
                <Form.Control
                className="mb-4"
                  size="md"
                  required
                  as="textarea"
                  id="about"
                  value={profile.about}
                  placeholder="Tell us about yourself!"
                  onChange={handleTextChange}
                />
                <div className="d-grid px-0">
                  <Button
                    type="submit"
                    style={{ maxWidth: "200px" }}
                    variant="warning"
                    size="md"
                  >
                    Submit
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </Form>
    </div>
  );
}

export default SnackEditForm;
