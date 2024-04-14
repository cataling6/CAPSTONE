import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";
const Footer = () => {
  return (
    <>
      <footer className="shadow-lg p-3 mt-3 bg-dark text-white">
        <Container>
          <Row>
            <Col className="text-center">
              <span>&copy; {new Date().getFullYear()} MyFinance by Catalin</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
