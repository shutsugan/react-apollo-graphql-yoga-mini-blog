import React from 'react';
import { Link } from 'react-router-dom';

const PageSwitcher = ({to, label, text}) => (
    <div className="switch-link flex center full">
        <p className="sub-text sm-f">{text}</p>
        <Link className="link sm-f" to={to}>{label}</Link>
    </div>
);

export default PageSwitcher;