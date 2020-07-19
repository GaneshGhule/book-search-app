import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * 
 * Basic card component
 * In card header it display title and subtitle and In card body it display content text
 * 
 * TODO: Add action buttons and Icon support.
 * TODO: Use className lib
 */
function Card({ className, title, subtitle, content }) {
    return (
        <div className={"card " + className}>
            <div className="card__header">
                <div className="card__header__title">{title}</div>
                <div className="card__header__subtitle">{subtitle}</div>
            </div>
            <div className="card__body">
                <div className="card__body__content">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

Card.defaultProps = {
    className: ''
}

Card.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    className: PropTypes.string,
}

export default Card;