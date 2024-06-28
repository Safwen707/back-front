import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center text-center">
        <Col>
          <h1>Welcome to MyApp</h1>
          <p>
            This is a simple hero unit, a simple Jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary" as={Link} to="/register">Sign Up</Button>
            <Button variant="secondary" as={Link} to="/login" className="ml-2">Login</Button>
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4} className="text-center">
          <h2>Feature 1</h2>
          <p>Description of feature 1.</p>
        </Col>
        <Col md={4} className="text-center">
          <h2>Feature 2</h2>
          <p>Description of feature 2.</p>
        </Col>
        <Col md={4} className="text-center">
          <h2>Feature 3</h2>
          <p>Description of feature 3.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
