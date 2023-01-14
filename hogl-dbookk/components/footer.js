import { Component } from "react";
import { Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

class Footer extends Component {
    render() {
        return <Container fluid
            className="bg-light tw-text-dark tw-text-center tw-py-4 tw-flex tw-justify-center tw-items-center tw-text-sm tw-mt-5 fixed-bottom border-top border-info p-2 d-inline">

            <Row className="justify-content-md-center">
                <Col xs lg="2">
                <p>
                  HOGL  &copy; Copyright {new Date().getFullYear()}
                </p>
                <p>Designed by
                    <a href="https://nmrobert.com" target="_blank" rel="noreferrer">NMRobert</a>
                </p>
                </Col>
            </Row>
        </Container>;
    }
}

export default Footer;