import React from 'react';
import _ from "lodash";
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Pagination2 = ({ itemsCount, pageSize, onPageChange, currentPage }) => {

    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (

        <Container fluid className='p-3' >
            <Row className="justify-content-md-center">
                <Col xs lg="auto">
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm">
                {
                    pages.map(page => (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                            <button onClick={() => onPageChange(page)} type='button' className="page-link">
                                {page}
                            </button>
                        </li>
                    ))
                }

            </ul>
        </nav>
        </Col>
        </Row>
        </Container>
    );
};

Pagination2.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination2;