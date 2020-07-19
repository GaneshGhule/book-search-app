import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/** 
 * Basic button component.
 * 
 * TODO: Use className lib
 * 
 * Notes : 
 * It support only onClick event.
 * */
function Button({ className, label, onClick }) {
    return (
        <button onClick={onClick} className={"button ripple" + className} > {label}</button >
    )
}

Button.defaultProps = {
    className: "",
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
}


export default Button;