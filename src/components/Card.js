import './Card.css';

const Card = ({ id, name, contact, email, picture, handleDelete}) => {
    return (
        <div className="Card">
            <img className="Card-picture" src={picture} />
            <div className="Card-details">
                <h2>{name}</h2>
                <p>Contact: {contact}</p>
                <p>E-mail: {email}</p>
                <a href={`/details/${id}`}> Details </a>
                <button onClick={() => handleDelete(id)} className="Delete-button"> Delete </button>
            </div>
        </div>
    );
}

export default Card;
