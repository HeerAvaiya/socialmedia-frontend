import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="py-6 px-4 max-w-[1500px] mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
        </div>
    );
};

export default Home;
