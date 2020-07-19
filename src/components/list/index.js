import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card';
import './index.css';

/** 
 * This components display list of Cards for given set of data.
 * 
 * TODO : Add pagination or infinite scroller support 
 * TODO : Use className library
 * 
 * */ 
function List({ className, data, titleKey, subTitleKey, contentKey }) {
    
    /**
     * Get the list of card component
     */
    function getItems() {
        const items = [];
        data.forEach((item, index) => {
            items.push(<Card key={item[titleKey]+"-"+index} title={item[titleKey]} subtitle={item[subTitleKey]} content={item[contentKey]} />);
        });
        return items;
    }

    return (
        <div className={"list " + className} role="list">
            {getItems()}
        </div>
    )
}

List.defaultProps = {
    className: "",
    data: [],
}

List.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    titleKey: PropTypes.string,
    subTitleKey: PropTypes.string,
    contentKey: PropTypes.string,
}

export default List;

