import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    Admin,
    Client
} from '../page';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/Client" element={<Client />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation;