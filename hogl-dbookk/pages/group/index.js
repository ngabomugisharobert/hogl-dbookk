import React, { Component } from 'react'
import Layout from '../../components/layout'
import { db } from '../../services/firebase-config'
import { collection, getDocs } from "@firebase/firestore";
import Pagination2 from '../../components/common/pagination';
import { paginate } from '../../components/common/paginate';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Skeleton } from 'react-Skeleton-generator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { read, utils, writeFileXLSX } from 'xlsx';

export default class Index extends Component {


    state = {
        groups: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
        searchQuery: "",
        load: false,
    };
    getGroups = async () => {
        const groupsCollectionRef = collection(db, "tb_groups");
        const data = await getDocs(groupsCollectionRef);
        const groups = data.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        console.log("groups ---------", groups)
        return groups;

    };

    async componentDidMount() {
        const groupsList = (await this.getGroups()) || [];

        if (groupsList.length > 0) {
            this.setState({
                ...this.state,
                groups: groupsList,
            });
        }
    }

    handleOnExport = () => {
        this.setState({ ...this.state, load: true })
        console.log("export", this.state.groups)

        const ws = utils.json_to_sheet(this.state.groups);
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
            groups: allGroups,
            currentPage,
            pageSize,
            sortColumn,
            searchQuery,
        } = this.state;

        let filteredGroups = allGroups;

        if (searchQuery) {
            console.log("********", allGroups)
            filteredGroups = allGroups.filter((m) =>
                m.grp_leader.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }

        let sorted = _.orderBy(
            filteredGroups,
            [sortColumn.path],
            [sortColumn.order]
        );
        const groups = paginate(sorted, currentPage, pageSize);
        return {
            totalCount: filteredGroups.length,
            data: groups,
        };
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

  render() {


      console.log("groups", this.state.groups)
      const {
          groups: allGroups,
          currentPage,
          pageSize,
          searchQuery,
      } = this.state;
      const count = allGroups.length;

      if (count === 0)
          return (
              <>
                  <Layout activeNav="groups">
                      <div className="mt-5 container">
                          <div className="container tw-my-3">
                              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                                  <div className="alert alert-info">
                                      There are no groups
                                  </div>
                                  <Skeleton.SkeletonThemeProvider>
                                      <Skeleton count={4} widthMultiple={['100%', '75%', '50%', '25%']} heightMultiple={['30px', '30px', '30px', '30px']} />
                                  </Skeleton.SkeletonThemeProvider>
                              </div>
                          </div>
                      </div>
                  </Layout>
              </>
          );

      const { totalCount, data } = this.getPageData();
    return (
        <>
            <Layout activeNav="groups">
                <div className="container p-5 d-block mb-5" >

                    <div className="container tw-my-3">
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                            <h4 className="tw-mb-0 tw-col-span-2"> Groups List</h4>
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
                                                       Group Name
                                                    </th>
                                                    <th>
                                                        Group Leader
                                                    </th>
                                                    <th>
                                                        Group Memembers #
                                                    </th>
                                                    <th>
                                                        Group Registered Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {data &&
                                                    data.map((group, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {group.grp_name}
                                                            </td>
                                                            <td>
                                                                {group.grp_leader}
                                                            </td>
                                                            <td>
                                                                {group.grp_members}
                                                            </td>
                                                            <td>
                                                                {group.timestamp}
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
