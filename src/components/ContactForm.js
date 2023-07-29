import React, {useEffect, useState} from 'react';
import './ContactForm.css';

const ContactForm = ({id}) => {

    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [picture, setPicture] = useState(null);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(savedContacts);
    }, []);

    useEffect(() => {
        setEditId(id);
        const contactEdit = contacts.find((contact) => contact.id === parseInt(id));
        if (contactEdit){
            setName(contactEdit?.name);
            setEmail(contactEdit?.email);
            setContact(contactEdit?.contact);
            setPicture(contactEdit?.picture);
        }
    }, [id, contacts]);

    const validation = ({name, email, contact, picture}) => {
        if (!name || !email || !contact || !picture) {
            alert('Fill all fields.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid e-mail.');
            return false;
        }

        if (name.trim().length < 6) {
            alert('Name must have length greater than 5.');
            return false;
        }

        if (contact.trim().length !== 9 ) {
            alert('Contact must have length 9.');
            return false;
        }

        console.log(contacts, editId);
        console.log(contacts.some((it) => (it.contact === contact && editId === null)));

        if (editId === null) { // add
            if (contacts.some((it) => it.contact === contact)) {
                alert('Contact already saved.');
                return false;
            }

            if (contacts.some((it) => it.email === email)) {
                alert('E-mail already saved.');
                return false;
            }
        } else { // edit
            if (contacts.some((it) => it.contact === contact && it.id !== parseInt(editId))) {
                alert('Contact already saved.');
                return false;
            }

            if (contacts.some((it) => it.email === email && it.id !== parseInt(editId))) {
                alert('E-mail already saved.');
                return false;
            }
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId !== null) { // edit
            const updatedContacts = contacts.map((it) =>
                it.id === parseInt(editId) ? { ...it, name, email, contact, picture } : it
            );

            if (!validation({name, email, contact, picture})){
                return;
            }

            setContacts(updatedContacts);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
            alert('Contact updated successfully!');

        } else {
            const newContact = {
                name: name,
                email: email,
                contact: contact,
                picture: picture,
                id: Date.now(),
            };

            if (!validation({name, email, contact, picture}) === false){
                return;
            }

            const updatedContacts = [...contacts, newContact];
            setContacts(updatedContacts);
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
            alert('Contact created successfully!');

        }

        setName('');
        setContact('');
        setEmail('');
        setPicture(null);
    };

    const handleImageChange = (e) => {
        const picture = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPicture(reader.result);
        };

        if (picture) {
            reader.readAsDataURL(picture);
        }
    };

    return (
        <div className="Space">
            <div className="Form">
                <form onSubmit={handleSubmit}>
                    <div className="Form-field">
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="Form-field">
                        <label>
                            Contact:
                            <input
                                type="number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="Form-field">
                        <label>
                            E-mail:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="Form-field">
                        <label>
                            Picture:
                            <input
                                type="file"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="Form-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;