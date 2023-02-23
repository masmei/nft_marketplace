import axios from "axios";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import User from "./User";

function Community() {
  const [users, setUsers] = useState([]);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/profiles`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((c) => console.warn("catch", c));
  }, []);
  return (
    <div>
        <div className="py-5 px-5 container">
        <h3>Meet Our Community Members</h3>
        <Row xs={1} md={2} lg={3} className="g-5 py-5">
          {users.map((user) => {
            return <User key={user.id} user={user} />;
          })}
        </Row>
      </div>
    </div>
  );
}

export default Community;
