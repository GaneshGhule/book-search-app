import React from 'react';
import PropTypes from 'prop-types';
import debounce from "lodash/debounce";
import Input from '../input';

import './index.css';

/**
 * Option component for autocomplete suggestion
 */
function Option({ data, optionLabelKey, onClick, getOptionLabel }) {

    function handleClick() {
        onClick(data);
    }
    return (
        <option className="autocomplete__options__option" onClick={handleClick}>{getOptionLabel ? getOptionLabel(data) : data[optionLabelKey]}</option>
    )
}

/**
 * Empty option component for autocomplete suggestion
 */
function EmptyOption({ isLoading }) {
    return (
        <option className="autocomplete__options__empty" >{isLoading ? "Loading suggestions" : "No suggestions"}</option>
    )
}

/**
 * 
 * Basic autocomplete component
 *
 */

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            open: false,
        }
        this.inputRef = React.createRef();

        // To avoid onChange call on every keypress using debounce
        this.delayedOnChange = debounce(props.onChange, props.delay);
    }


    onChange = (value) => {
        if (!value) {
            this.setState({ options: [], searchText: "" });
        } else {
            this.delayedOnChange(value, this.props.numberOfSuggestions);
            this.setState({ searchText: value });
        }
    }

    getOptions = () => {
        return this.props.options.map(option =>
            <Option
                data={option} key={option.id}
                onClick={this.handleClick}
                optionLabelKey={this.props.optionLabelKey}
                getOptionLabel={this.props.getOptionLabel}
            />
        )
    }

    handleClick = (option) => {
        this.props.onSelect(option);
        this.setState({ options: [], searchText: "" });
    }

    onFocus = () => {
        this.setState({ open: true });
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({ open: false });
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }, 100);

    }

    render() {
        let optionStyle = {};
        if (this.inputRef.current) {
            optionStyle = this.inputRef.current.getBoundingClientRect();
        }

        return (
            <div className="autocomplete" role="listbox">
                <div ref={this.inputRef}>
                    <Input onChange={this.onChange} value={this.state.searchText} label={this.props.label} onFocus={this.onFocus} onBlur={this.handleBlur} />
                </div>
                {
                    this.props.options.length > 0 && !this.props.isLoading &&
                    <datalist className="autocomplete__options" style={{ display: this.state.open ? 'block' : 'none', left: optionStyle.left, right: optionStyle.right, top: optionStyle.top + 35, width: optionStyle.width }}>
                        {this.getOptions()}
                    </datalist>
                }
                {
                    this.state.searchText.length > 0 && !this.props.options.length && !this.props.isLoading &&
                    <div className="autocomplete__options" style={{ display: this.state.open ? 'block' : 'none', left: optionStyle.left, right: optionStyle.right, top: optionStyle.top + 35, width: optionStyle.width }}>
                        <EmptyOption />
                    </div>
                }
                {
                    this.props.isLoading &&
                    <div className="autocomplete__options" style={{ display: this.state.open ? 'block' : 'none', left: optionStyle.left, right: optionStyle.right, top: optionStyle.top + 35, width: optionStyle.width }}>
                        <EmptyOption isLoading={true} />
                    </div>
                }
            </div>
        )
    }
}

AutoComplete.defaultProps = {
    numberOfSuggestions: 10,
    delay: 300,
    options: [],
    isLoading: false,
};

AutoComplete.propTypes = {
    label: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    optionLabelKey: PropTypes.string,
    numberOfSuggestions: PropTypes.number,
    delay: PropTypes.number,
    options: PropTypes.array,
    getOptionLabel: PropTypes.func,
    onBlur: PropTypes.func,
    isLoading: PropTypes.bool,
}


export default AutoComplete;