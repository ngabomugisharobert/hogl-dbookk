import React, { Component } from 'react'
import Layout from '../../components/layout'
import { db } from '../../services/firebase-config'
import { collection, getDocs, addDoc } from "@firebase/firestore";
import Pagination2 from '../../components/common/pagination';
import CompToolTipV2 from '../../components/common/CompToolTipV2';
import { paginate } from '../../components/common/paginate';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { read, utils, writeFileXLSX } from 'xlsx';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';
import withAuth from '../../utils/withAuth';

class Index extends Component {
    state = {
        movements: [
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2022-12-18 15:55",
                "check_in_gate": "0",
                "check_out": "2022-12-19 09:42",
                "check_out_gate": "1",
                "duration": "8",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2022-12-20 01:40",
                "check_in_gate": "0",
                "check_out": "2022-12-20 07:11",
                "check_out_gate": "1",
                "duration": "5",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-02 07:12",
                "check_in_gate": "1",
                "check_out": "2023-01-02 17:40",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-03 07:08",
                "check_in_gate": "1",
                "check_out": "2023-01-03 17:42",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-04 07:00",
                "check_in_gate": "1",
                "check_out": "2023-01-04 17:19",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-05 06:51",
                "check_in_gate": "1",
                "check_out": "2023-01-05 17:07",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-07 10:32",
                "check_in_gate": "0",
                "check_out": "2023-01-07 16:59",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-08 08:11",
                "check_in_gate": "1",
                "check_out": "2023-01-08 12:06",
                "check_out_gate": "0",
                "duration": "3",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-09 07:10",
                "check_in_gate": "1",
                "check_out": "2023-01-09 17:21",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-10 07:17",
                "check_in_gate": "1",
                "check_out": "2023-01-10 16:58",
                "check_out_gate": "1",
                "duration": "9",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-11 06:55",
                "check_in_gate": "1",
                "check_out": "2023-01-11 17:13",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-12 07:22",
                "check_in_gate": "1",
                "check_out": "2023-01-12 17:17",
                "check_out_gate": "1",
                "duration": "9",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-13 07:01",
                "check_in_gate": "1",
                "check_out": "2023-01-13 17:22",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-14 07:09",
                "check_in_gate": "1",
                "check_out": "",
                "check_out_gate": "",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-16 17:27",
                "check_in_gate": "1",
                "check_out": "2023-01-17 07:21",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-17 08:24",
                "check_in_gate": "1",
                "check_out": "",
                "check_out_gate": "",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-17 10:56",
                "check_in_gate": "1",
                "check_out": "2023-01-18 07:22",
                "check_out_gate": "1",
                "duration": "13",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-18 16:59",
                "check_in_gate": "1",
                "check_out": "2023-01-19 07:17",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-19 17:03",
                "check_in_gate": "1",
                "check_out": "2023-01-20 07:20",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "",
                "check_in_gate": "",
                "check_out": "2023-01-21 07:27",
                "check_out_gate": "1",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-21 17:05",
                "check_in_gate": "1",
                "check_out": "2023-01-22 06:50",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-22 17:31",
                "check_in_gate": "1",
                "check_out": "2023-01-23 07:10",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-23 16:56",
                "check_in_gate": "1",
                "check_out": "2023-01-24 07:15",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-24 16:56",
                "check_in_gate": "1",
                "check_out": "2023-01-25 07:23",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            }
        ],
        user: "",
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "visitor_name", order: "asc" },
        searchQuery: "",
        searchType: "",
        load: false,
        showEdit: false,
        movementToEdit: {},
        startDate: new Date(),
        justification: "",
        disabledSave: false,
    }
    getMovements = async () => {
        // use axios to get the movements data from the database
        // const movements = await axios.get("http://localhost:8080/api/movements")
        // .then((res) => {
        //     console.log(res.data);
        //     return res.data;
        // }
        // )
        // .catch((err) => {
        //     console.log(err);
        // }
        // )

        // return movements;
        return [
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2022-12-18 15:55",
                "check_in_gate": "0",
                "check_out": "2022-12-19 09:42",
                "check_out_gate": "1",
                "duration": "8",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2022-12-20 01:40",
                "check_in_gate": "0",
                "check_out": "2022-12-20 07:11",
                "check_out_gate": "1",
                "duration": "5",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-02 07:12",
                "check_in_gate": "1",
                "check_out": "2023-01-02 17:40",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-03 07:08",
                "check_in_gate": "1",
                "check_out": "2023-01-03 17:42",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-04 07:00",
                "check_in_gate": "1",
                "check_out": "2023-01-04 17:19",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-05 06:51",
                "check_in_gate": "1",
                "check_out": "2023-01-05 17:07",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-07 10:32",
                "check_in_gate": "0",
                "check_out": "2023-01-07 16:59",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-08 08:11",
                "check_in_gate": "1",
                "check_out": "2023-01-08 12:06",
                "check_out_gate": "0",
                "duration": "3",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 2,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-09 07:10",
                "check_in_gate": "1",
                "check_out": "2023-01-09 17:21",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-10 07:17",
                "check_in_gate": "1",
                "check_out": "2023-01-10 16:58",
                "check_out_gate": "1",
                "duration": "9",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-11 06:55",
                "check_in_gate": "1",
                "check_out": "2023-01-11 17:13",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-12 07:22",
                "check_in_gate": "1",
                "check_out": "2023-01-12 17:17",
                "check_out_gate": "1",
                "duration": "9",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-13 07:01",
                "check_in_gate": "1",
                "check_out": "2023-01-13 17:22",
                "check_out_gate": "1",
                "duration": "10",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "day",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-14 07:09",
                "check_in_gate": "1",
                "check_out": "",
                "check_out_gate": "",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-16 17:27",
                "check_in_gate": "1",
                "check_out": "2023-01-17 07:21",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-17 08:24",
                "check_in_gate": "1",
                "check_out": "",
                "check_out_gate": "",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-17 10:56",
                "check_in_gate": "1",
                "check_out": "2023-01-18 07:22",
                "check_out_gate": "1",
                "duration": "13",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-18 16:59",
                "check_in_gate": "1",
                "check_out": "2023-01-19 07:17",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-19 17:03",
                "check_in_gate": "1",
                "check_out": "2023-01-20 07:20",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "",
                "check_in_gate": "",
                "check_out": "2023-01-21 07:27",
                "check_out_gate": "1",
                "duration": "0",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "",
                "status": 1,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-21 17:05",
                "check_in_gate": "1",
                "check_out": "2023-01-22 06:50",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-22 17:31",
                "check_in_gate": "1",
                "check_out": "2023-01-23 07:10",
                "check_out_gate": "1",
                "duration": "6",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-23 16:56",
                "check_in_gate": "1",
                "check_out": "2023-01-24 07:15",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            },
            {
                "visitor_id": "f9b78a04eed29956-18",
                "check_in": "2023-01-24 16:56",
                "check_in_gate": "1",
                "check_out": "2023-01-25 07:23",
                "check_out_gate": "1",
                "duration": "7",
                "visitor_name": "DUKUZUMUREMYI J de Dieu",
                "shift": "night",
                "status": 0,
                "employee_type": "HOGL employee"
            }
        ]
    };

    async componentDidMount() {
        // get user email from local storage
        const user = localStorage.getItem("email");
        this.setState({ ...this.state, user: user });
        // const movementsList = (await this.getMovements()) || [];
        const movementsList = this.state.movements;

        if (movementsList.length > 0) {
            this.setState({
                ...this.state,
                movements: movementsList,
            });
        }
    }

    handleSubmit = async () => {
        // CHECK IF THE movementToEdit, startDate ARE NOT EMPTY
        //get user from local storage
        this.setState({ ...this.state, disabledSave: true })
        const user = localStorage.getItem("email");
        if (this.state.movementToEdit && this.state.startDate && user) {
            // save the movementToEdit and startDate to the database with db and collection
            const movementsCollectionRef = collection(db, "tb_movements");

            var date = new Date();
            // check if the check-in is ""
            if (this.state.movementToEdit.check_in === "") {
                await addDoc(movementsCollectionRef, {
                    visitor_id: this.state.movementToEdit.visitor_id,
                    mv_time: (this.state.startDate).toISOString().slice(0, 16).replace("T", " "),
                    MovementType: "check-in",
                    mv_id: "1",
                    timestamp: "" + date.getTime(),
                    comment: this.state.justification,
                    editor: user,
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    // update the state of movements
                })
            }
            else {
                await addDoc(movementsCollectionRef, {
                    visitor_id: this.state.movementToEdit.visitor_id,
                    mv_time: (this.state.startDate).toISOString().slice(0, 16).replace("T", " "),
                    MovementType: "check-out",
                    mv_id: "1",
                    timestamp: "" + date.getTime(),
                    comment: this.state.justification,
                    editor: user,
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    // update the state of movements
                })
            }
        }
        // close the modal
        this.handleCloseEdit();
        this.setState({ ...this.state, disabledSave: false })
    }

    handleCloseEdit = () => {
        this.setState({ ...this.state, showEdit: false })
    }

    // handleSaveClick(updatedRow) {
    //     const newData = this.state.data.map(row => {
    //         if (row.id === updatedRow.id) {
    //             return updatedRow;
    //         } else {
    //             return row;
    //         }
    //     });
    //     this.setState({ data: newData, selectedRow: null });
    // }

    // handleOpenEdit = (mvmnt) => {
    //     this.setState({ showEdit: true })
    //     this.setState({ ...this.state, movementToEdit: mvmnt })
    //     console.log("mvmnt", mvmnt)
    //     // this.setState({ ...this.state, movementToEdit: mvmnt })
    // }

    handleOnExport = () => {
        this.setState({ ...this.state, load: true })
        console.log("export", this.state.movements)

        const ws = utils.json_to_sheet(this.state.movements);
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
            movements: allMovements,
            currentPage,
            pageSize,
            sortColumn,
            searchQuery,
            searchType,
        } = this.state;

        let filteredMovements = allMovements;

        if (searchQuery) {
            console.log("********", allMovements)
            filteredMovements = allMovements.filter((m) =>
                m.visitor_name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        if (searchType) {
            console.log("********", allMovements)
            filteredMovements = allMovements.filter((m) =>
                m.employee_type.toLowerCase().startsWith(searchType.toLowerCase())
            );
        }


        var sorted = _.orderBy(
            filteredMovements,
            [sortColumn.path],
            [sortColumn.order]
        );
        const movements = paginate(sorted, currentPage, pageSize);
        return {
            totalCount: filteredMovements.length,
            data: movements,
        };
    };
    // method to take date (2023-09-09 17:40) and return Date object
    getDate = (date) => {
        var year = date.substring(0, 4);
        var month = date.substring(5, 7);
        var day = date.substring(8, 10);
        var hour = date.substring(11, 13);
        var minute = date.substring(14, 16);

        return new Date(year, month - 1, day, hour, minute);
    };


    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };
    handleSearchType = (query) => {
        this.setState({ searchType: query, currentPage: 1 });
    };

    handleOpenEdit = (mvmt) => {
        // this.setState({ searchQuery: query, currentPage: 1 });


        this.setState({ showEdit: true })
        this.setState({ movementToEdit: mvmt })
        //check if check in is empty then set date to check in
        if (mvmt.check_in === "") {
            console.log("mvmnt", mvmt)
            this.setState({ startDateIn: this.getDate(mvmt.check_in) })
        }
        else {
            this.setState({ startDateOut: this.getDate(mvmt.check_out) })
        }
    };

    render() {

        console.log("Movements", this.state.Movements)
        const {
            movements: allMovements,
            currentPage,
            pageSize,
            sortColumn,
            disabledSave,
            searchQuery,
            searchType,
        } = this.state;
        const count = allMovements.length;

        if (count === 0)
            return (
                <>
                    <Layout activeNav="Movements">
                        <div className="mt-5 container">
                            <div className="container tw-my-3">
                                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                                    <div className="alert alert-info">
                                        There are no Movements
                                    </div>
                                    <h2>Loading ...</h2>

                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            );

        const { totalCount, data } = this.getPageData();
        return (
            <>
                <Layout activeNav="movements">
                    <div className="container p-5 d-block mb-5" >

                        <div className="container tw-my-3">
                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                                <h4 className="tw-mb-0 tw-col-span-2">All Movements</h4>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="search" onChange={event => this.handleSearch(event.target.value)}
                                        placeholder="Search by Name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    {/* <Form.label htmlFor="visitors" for="visitors"> Visitors </Form.label> */}
                                    <Form.Select id="visitors" onChange={event => this.handleSearchType(event.target.value)}>

                                        {/* {data &&
                                            data.map((movement, index) => (
                                                <option key={index} value={movement.visitor_name}>
                                                    {movement.visitor_name}
                                                </option>
                                            ))} */}
                                        {data && [...new Set(data.map(movement => movement.visitor_name))].map((visitorName, index) => (
                                            <option key={index} value={visitorName}>
                                                {visitorName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="search" onChange={event => this.handleSearchType(event.target.value)}
                                        placeholder="Search by Visitor Type" />
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
                                                            Visitor Name
                                                        </th>
                                                        <th>
                                                            Visitor Type
                                                        </th>
                                                        <th>
                                                            Check In
                                                        </th>
                                                        <th>
                                                            Check In Gate
                                                        </th>
                                                        <th>
                                                            check Out
                                                        </th>
                                                        <th>
                                                            Check Out Gate
                                                        </th>
                                                        <th>
                                                            Duration
                                                        </th>
                                                        <th>
                                                            Shift
                                                        </th>
                                                        <th>
                                                            status
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {data &&
                                                        data.map((movement, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {movement.visitor_name}
                                                                </td>
                                                                <td>
                                                                    {movement.employee_type}
                                                                </td>
                                                                <td>
                                                                    {movement.check_in}
                                                                </td>
                                                                <td>
                                                                    {movement.check_in_gate}
                                                                </td>
                                                                <td>
                                                                    {movement.check_out}
                                                                </td>
                                                                <td>
                                                                    {movement.check_out_gate}
                                                                </td>
                                                                <td>
                                                                    {movement.duration}
                                                                </td>
                                                                <td>
                                                                    {movement.shift}
                                                                </td>
                                                                <td>
                                                                    {/* if the status is zero make background blue */}
                                                                    {movement.status == 0 ?
                                                                        <>
                                                                            <span className="badge bg-primary">Complete</span>
                                                                        </>
                                                                        : movement.status == 1 ?
                                                                            <>
                                                                                <span className="badge bg-danger">Incomplete</span>

                                                                            </>
                                                                            : movement.status == 2 ? <>
                                                                                <CompToolTipV2 comment={movement.comment} editor={movement.editor} status="edit" />
                                                                            </>
                                                                                : <>
                                                                                </>}

                                                                </td>
                                                                <td>

                                                                    <Button variant="primary" size="sm" onClick={() => this.handleOpenEdit(movement)}>
                                                                        Edit
                                                                    </Button>

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

                                <Container className='p-3' >
                                    <Row className="justify-content-md-center">
                                        <Col xs lg="auto">
                                            <div>
                                                <p>
                                                    Showing {data && data.length} {/*to {data.length}*/} of {totalCount && totalCount} entries
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
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

                <Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Complete movement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Visitor Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    autoFocus
                                    disabled
                                    value={this.state.movementToEdit.visitor_name}
                                />
                            </Form.Group>

                            {/* check if the check-out is empty */}
                            {this.state.movementToEdit.check_out === "" ? (
                                <>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Pick check-in Date and Time</Form.Label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={(date) => this.setState({ startDate: date })}
                                            timeInputLabel='Time:'
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            showTimeInput
                                        />

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Checkout:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="name"
                                            autoFocus
                                            disabled
                                            value={this.state.movementToEdit.check_out}
                                        />
                                    </Form.Group>
                                </>) :
                                <>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>check Out Date and Time:</Form.Label>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Check In:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="name"
                                            autoFocus
                                            disabled
                                            value={this.state.movementToEdit.check_in}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Pick check-in Date and Time</Form.Label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={(date) => this.setState({ startDate: date })}
                                            timeInputLabel='Time:'
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            showTimeInput
                                        />
                                    </Form.Group>
                                </>
                            }


                            {/* add a text area for comment */}
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Comment or justification......."
                                    value={this.state.comment}
                                    onChange={(e) => this.setState({ comment: e.target.value })}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.disabledSave}>
                            {this.state.disabledSave ? "Saving..." : "Save"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withAuth(Index)