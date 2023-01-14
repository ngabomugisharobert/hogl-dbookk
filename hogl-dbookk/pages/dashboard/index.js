import React from 'react'
import { toast } from "react-toastify";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '../../components/layout';

const Index = () => {
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