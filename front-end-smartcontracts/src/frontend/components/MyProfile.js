import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import MyListedItems from "./MyListedItems";
import { Spinner } from "react-bootstrap";

function MyProfile({ marketplace, nft, account, loading }) {
  const [profile, setProfile] = useState([]);
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/profiles/${account}`).then((response) => {
      setProfile(response.data);
    });
  }, [loading]);

  const deleteProfile = () => {
    axios
      .delete(`${API}/profiles/${profile.id}`)
      .then(() => {
        navigate(`/`);
      })
      .catch((c) => console.error("catch", c));
  };
  const handleDelete = () => {
    deleteProfile();
  };

  const createProfile = () => {
    navigate(`/profiles/new`);
  };

  const editProfile = () => {
    navigate(`/profiles/${account}/edit`);
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
    <div className="my-5" style={{color: "white"}}>
      {profile.id ? (
        <div>
          <Card style={{backgroundColor: "#202225", alignItems: "center"}}>
            <Card.Img
              variant="top"
              src={profile.picture}
              style={{ width: "300px" ,borderRadius: "50%"}}
            />
            <Card.Body>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {profile.address}
              </Card.Subtitle>
              <Card.Text>{profile.about}</Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Link
                style={{ color: "white" }}
                href={profile.twitter}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Card.Link>
              <Card.Link
                style={{ color: "white"  }}
                href={profile.instagram}
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Card.Link>
              <Card.Link
                style={{ color: "white"  }}
                href={profile.linkedin}
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </Card.Link>
            </Card.Body>
          </Card>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: ".5rem" }}
          >
            <Button onClick={editProfile} variant="outline-light">
              Edit Profile
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete Profile
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={createProfile} className="mt-5" variant="warning">
          Create Profile
        </Button>
      )}
      <div>
        <MyListedItems marketplace={marketplace} nft={nft} account={account} />
      </div>
    </div>
  );
}

export default MyProfile;
