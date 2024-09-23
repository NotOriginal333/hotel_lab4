import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import CottageList from './resort/CottageList';
import Layout from "./Layout";
import CottageDetails from "./resort/CottageDetails";

const App = () => {
    useEffect(() => {
        document.title = "Cottage Management";
    }, []);

    return (
        <div className="App">
            <Layout>
                <Routes>
                    <Route path="/cottages" element={<CottageList/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<CottageList/>}/>
                    <Route path="/cottages/:id" element={<CottageDetails/>}/>
                </Routes>
            </Layout>
        </div>
    );
};


export default App;
