import React, { useState } from 'react';
import AutoComplete from '../../components/autocomplete';
import List from '../../components/list';
import Service, { createFormattedData } from '../../searchUtility/service';
import { data } from '../../data/index'
import './index.css';

let bookSearchService = new Service(createFormattedData(data));

/**
 * Book search container component
 * This display search bar and selected books list.
 */
function BookSearch() {

    //TODO : Use Set instead of Map
    const [books, setBooks] = useState(new Map());
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(0);


    function handleSelect(selectedBook) {
        if (books.has(selectedBook.id)) {
            return;
        }
        books.set(selectedBook.id, selectedBook);
        setBooks(new Map(books));
    }

    function handleChange(value, limit) {
        setFetching(fetching + 1);
        setTimeout(() => {
            bookSearchService.search(value, limit).then(options => {
                setOptions(options);
                setFetching(fetching > 0 ? fetching - 1 : 0)
            });
        }, 0);
    }

    function getOptionLabel(data) {
        return data.title + (data.matchPercentage ? " (" + data.matchPercentage + "% match)" : "");
    }

    return (
        <div className="search">
            <header className="search__header">Book Summary Search</header>
            <form>
                <div className="search__bar">
                    <div className="search__bar__autocomplete">
                        <AutoComplete
                            label="Search..."
                            optionLabelKey="title"
                            onChange={handleChange}
                            onSelect={handleSelect}
                            options={options}
                            getOptionLabel={getOptionLabel}
                            isLoading={fetching > 0}
                            numberOfSuggestions={10}

                        />
                    </div>
                </div>
            </form>
            <div className="search__list">
                <List data={books} titleKey="title" subTitleKey="author" contentKey="summary" />
            </div>
        </div>
    );
}

export default BookSearch;
