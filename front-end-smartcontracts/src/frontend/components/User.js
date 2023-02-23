import React from "react";
import { Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function User({ user }) {
  return (
    <Col className="overflow-hidden">
      <Card bg="dark" variant="dark" style={{alignItems: "center"}}>
        <Card.Img className="py-3" variant="top" src={user.picture} style={{ width: "250px" ,borderRadius: "50%"}} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text style={{height:"100px", overflow:"hidden"}}>{user.about}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Link
            style={{ color: "white" }}
            href={user.twitter}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Card.Link>
          <Card.Link
            style={{ color: "white" }}
            href={user.instagram}
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Card.Link>
          <Card.Link
            style={{ color: "white" }}
            href={user.linkedin}
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Card.Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default User;
