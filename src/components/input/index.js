import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * Basic input text box component.
 * 
 * TODO : Use className library
 */
function Input({ className, label, value, onChange, onFocus, onBlur }) {

    function handleChange(event) {
        onChange(event.target.value);
    }

    return (
        <input className={"input" + className}
            placeholder={label}
            type='text'
            onChange={handleChange}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            role="textbox"
        />
    )
}

Input.defaultProps = {
    onFocus: () => { },
    onBlur: () => { },
    className: ""
};

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string
}

export default Input;