import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss'
function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={4}>
            <h3>About Us</h3>
            <p>We are a company that specializes in creating awesome websites.</p>
          </Col>
          <Col md={4}>
            <h3>Services</h3>
            <p>
              Web Design <br/>
              Web Development <br/>
              SEO <br/>
            </p>
          </Col>
          <Col md={4}>
            <h3>Contact Us</h3>
            <p>123 Main St.<br />Anytown, USA 12345<br />Phone: (555) 555-1212<br />Email: info@example.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer