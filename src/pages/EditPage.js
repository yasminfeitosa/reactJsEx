import React from "react";
import {Link, useParams} from "react-router-dom";
import ContactForm from "../components/ContactForm";
import './EditPage.css';

function EditPage() {
    let { id } = useParams();

    return (
        <div className="Edit">
            <ContactForm id={id}></ContactForm>
            <Link to={`/details/${id}`} className="Back-link"> Go Back </Link>
        </div>
    );
}

export default EditPage;
