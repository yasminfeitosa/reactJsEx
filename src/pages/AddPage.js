import React from "react";
import {Link} from "react-router-dom";
import ContactForm from "../components/ContactForm";
import './EditPage.css';

function AddPage() {
    return (
        <div className="Add">
            <ContactForm></ContactForm>
            <Link to="/" className="Back-link"> Go Back </Link>
        </div>
    );
}

export default AddPage;
