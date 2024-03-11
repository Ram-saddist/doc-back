// Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>

            <Link to="/">Home</Link>

            <Link to="/doctors">Doctors</Link>

            <Link to="/patients">Patients</Link>

        </nav>
    );
};

export default Navigation;
