import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import {Spinner} from "../components/Spinner/Spinner";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useState } from "react";

export const ProfileComponent = () => {
  const { user,getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    async function getAccessToken() {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (e) {
        console.log(e);
      }
    }
    getAccessToken();
  }, [getAccessTokenSilently]);

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(accessToken, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Spinner />,
});
