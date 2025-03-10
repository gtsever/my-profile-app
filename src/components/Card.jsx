import style from "../styles/card.module.css";
import PropTypes from "prop-types";

const Card = ({image_url, name, title, email}) => {


    return(
        <div className={`${style['profile-card']}`}
        >
            <div className={style['profile-card__img']}>
                <img src= {image_url} alt={name}/>
            </div>
            <div className={style['profile-card__content']}>
                <p>{name}</p>
                <p>{title}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    title: PropTypes.string}
export default Card;


