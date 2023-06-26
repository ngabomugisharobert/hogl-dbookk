import React, { Component } from 'react'
import Layout from '../../components/layout'
import { db } from '../../services/firebase-config'
import { collection, getDocs } from "@firebase/firestore";
import Pagination2 from '../../components/common/pagination';
import { paginate } from '../../components/common/paginate';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { read, utils, writeFileXLSX } from 'xlsx';
import withAuth from '../../utils/withAuth';



class Index extends Component {
    state = {
        visitors: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
        searchQuery: "",
        load: false,
    };
    getVisitors = async () => {
        const vistorsCollectionRef = collection(db, "tb_visitors");
        const data = await getDocs(vistorsCollectionRef);
        const visitors = data.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        console.log("visitors ---------", visitors)
        return visitors;

    };

    async componentDidMount() {
        const visitorsList = (await this.getVisitors()) || [];

        if (visitorsList.length > 0) {
            this.setState({
                ...this.state,
                visitors: visitorsList,
            });
        }
    }

    handleOnExport = () =>{
        this.setState({...this.state, load: true})
        console.log("export", this.state.visitors)

        const ws = utils.json_to_sheet(this.state.visitors);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "SheetJSReactAoO.xlsx");

        this.setState({ ...this.state, load: false })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    getPageData = () => {
        const {
            visitors: allVisitors,
            currentPage,
            pageSize,
            sortColumn,
            searchQuery,
        } = this.state;

        let filteredVisitors = allVisitors;

        if (searchQuery) {
            console.log("********", allVisitors)
            filteredVisitors = allVisitors.filter((m) =>
                m.vis_first_name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }

        let sorted = _.orderBy(
            filteredVisitors,
            [sortColumn.path],
            [sortColumn.order]
        );
        const visitors = paginate(sorted, currentPage, pageSize);
        return {
            totalCount: filteredVisitors.length,
            data: visitors,
        };
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };


    render() {

        console.log("visitors", this.state.visitors)
        const {
            visitors: allVisitors,
            currentPage,
            pageSize,
            searchQuery,
        } = this.state;
        const count = allVisitors.length;

        if (count === 0)
            return (
            <>
                    <Layout activeNav="visitors">
            <div className="mt-5 container">
                <div className="container tw-my-3">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                        <div className="alert alert-info">
                            There are no visitors
                                    </div>
                                    <h2>Loading ... </h2>
                    </div>
                </div>
            </div>
            </Layout>
            </>
            );

        const { totalCount, data } = this.getPageData();
        return (
            <>
                <Layout activeNav="visitors">
                    <div className="container p-5 d-block mb-5" >

                        <div className="container tw-my-3">
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                                <h4 className="tw-mb-0 tw-col-span-2">All Visitors</h4>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="search" onChange={event => this.handleSearch(event.target.value)}
                                        placeholder="Search by Name" />
                                </Form.Group>
{/* container with padding */}
                                <Container fluid className='p-3' >
                                    <Row className="justify-content-md-center">
                                        <Col xs lg="2">
                                <Button variant="primary" onClick={this.handleOnExport}>
                                    Export XSL
                                </Button>
                                        </Col>
                                </Row>
                                </Container>
{
    this.state.load && <h1>Loading...</h1>}
                            </div>

                            <div className="tw-flex tw-flex-col md:tw-justify-between">
                                <div className="tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
                                    <div className="tw-inline-block tw-py-2 tw-min-w-full sm:tw-px-6 lg:tw-px-8">
                                        <div className="tw-overflow-hidden tw-shadow sm:tw-rounded">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            #
                                                        </th>
                                                        <th>
                                                            Names
                                                        </th>
                                                        <th>
                                                            Phone
                                                        </th>
                                                        <th>
                                                            type
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {data &&
                                                        data.map((visitor, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {visitor.vis_first_name} {visitor.vis_last_name}
                                                                </td>
                                                                <td>
                                                                    {visitor.vis_phone}
                                                                </td>
                                                                <td>
                                                                    {visitor.vis_type}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
                                <div>
                                    <p>
                                        Showing {data && data.length} {/*to {data.length}*/} of {totalCount && totalCount} entries
                                    </p>
                                </div>
                                <Pagination2
                                    itemsCount={totalCount}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange}
                                />
                            </div>

                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}


export default withAuth(Index)