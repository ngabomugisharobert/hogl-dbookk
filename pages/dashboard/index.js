import React from 'react'
import { toast } from "react-toastify";
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../components/layout';

const Index = () => {

    console.log("*********useEffect**********");
    useEffect(() => {
        console.log("*********useEffect**********");
        // use axios to get the user data from the database
        axios.get("http://localhost:8080/api/movements")
            .then((res) => {
                console.log(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )

    }, [])


    return (
        <>
            <ToastContainer
                position='top-center'/>

            <Layout>
                <div className="container">
                    <div className="row justify-content-center tw-my-10">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h1>Dashboard</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default Index