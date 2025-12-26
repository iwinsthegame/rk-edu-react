import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "../pages/home/Header";
import "./AdminLayout.css";
import Footer from "../pages/home/Footer";

export default function AdminLayout() {
    return (
        <>
            <Header />
            <div className="admin-layout">
                <AdminSidebar />
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}
