import React from "react";

const Unauthorized = () => {
    return (
        <div className="container text-center mt-5">
            <h2>Unauthorized Access</h2>
            <p>You do not have permission to view this page.</p>
            <a href="/" className="btn btn-primary mt-3">Go Home</a>
        </div>
    );
};

export default Unauthorized;
