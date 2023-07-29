import './LandingPage.css'
import Card from "../components/Card";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
function LandingPage() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(savedContacts);
    }, []);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('This action will be permanent. Are you sure you want to delete?');

        if (shouldDelete) {
            const updatedContacts = contacts.filter((contact) => contact.id !== id);
            setContacts(updatedContacts);

            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        }
    };


    return (
        <div className="Landing">
            <div className="Landing-link">
                <Link to="/add" className="Details-link"> Create new contact </Link>
            </div>
            <div className="Card-container">
                {contacts.map((contact) => (
                    <div className="Landing-center">
                        <Card id = {contact.id} name = {contact.name} contact={contact.contact} email={contact.email} picture={contact.picture} handleDelete={handleDelete}></Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
