import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './DetailsPage.css';

function DetailsPage() {
    let { id } = useParams();

    const [contact, setContact] = useState([]);

    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const contactId = parseInt(id);
        const contact = savedContacts.find((contact) => contact.id === contactId);
        setContact(contact);
    }, [id]);

    return (
        <div className="Details">
            <div className="Details-picture">
                <img src={contact.picture} alt=""/>
            </div>
            <div className="Details-info">
                <h1> Contact information </h1>
                <p> Name: {contact.name} </p>
                <p> Contact: {contact.contact} </p>
                <p> E-mail: {contact.email} </p>

                <Link to={`/edit/${id}`} className="Edit-link"> Edit </Link>
                <Link to="/"> Go Back </Link>
            </div>
        </div>
    );
}

export default DetailsPage;
