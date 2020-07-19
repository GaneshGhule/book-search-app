import { name, lorem } from 'faker';
import { KMPSearch } from './search';
import LRUCache from './lru';

/**
 * Create test data
 */
export function createFakeData() {
    const rows = [];
    const count = 100000;
    for (let i = 0; i < count; i++) {
        rows.push({ id: i, author: (name.firstName() + name.lastName()), title: name.jobTitle(), summary: lorem.paragraph() });
    }

    return { summaries: rows };
}

/**
 * Create formmatted data
 * inout : {summaries :[{id:1, summary:'text'}], title: [], authors:[]}
 * output: {summaries:{{id:1,summary:'text',author:'author name', title:'title of book'}}}
 * @param {Object} data 
 */
export function createFormattedData(data) {
    const authorMap = new Map();
    data.authors.forEach(author => {
        authorMap.set(author.book_id, author);
    });
    data.summaries.forEach((bookSummary, index) => {
        bookSummary.author = authorMap.get(bookSummary.id).author;
        bookSummary.title = data.titles[index];
    });
    return data;
}

/**
 * Search service to search given query in boook summary dataset
 * 
 * Note: This can be further improve using web worker.
 * 
 * @param {Object} dataSource 
 * @param {Boolean} infoLog 
 */
function SearchService(dataSource, infoLog = false) {

    const data = dataSource;
    const cache = new LRUCache(20);

    // Log message if logging is enable
    const logInfo = (message) => {
        if (infoLog) {
            console.log("SEARCH UTILITY: " + message);
        }
    }

    /**
     *  Search given keywords in book summary and return matching books 
     *  This API first search books using string index of method 
     *  if books found for given query keywords then it will return list of mathcing books
     *  else it will try find books using partial match.
     * 
     *  Partial match:
     *  For partial match this uses KMP algorithm. 
     *  By default it will return books which has match percentage more than 50 %
     * 
     * @param {String) query 
     * @param {Number} limit 
     * @param {Number} matchPercentage  optional
     */
    this.search = async (query, limit, matchPercentage = 50) => {
        if (!query) {
            return Promise.resolve([]);
        }

        const cacheOptions = cache.getItem(query);
        if (cacheOptions) {
            logInfo("Returning from cache " + cacheOptions.value);
            return cacheOptions.value;
        }

        const books = [];
        const t1 = new Date().getTime();
        for (let index = 0; index < data.summaries.length; index++) {
            if (books.length >= limit) {
                break;
            }
            const bookSummary = data.summaries[index];
            if (bookSummary.summary.toLowerCase().includes(query.toLowerCase())) {
                books.push(bookSummary);
            }
        }
        const t2 = new Date().getTime();

        logInfo("IndexOf search took " + (t2 - t1) + " milliseconds ");

        //If books not found for given pattern then search books using partial match 
        if (books.length === 0) {
            for (let index = 0; index < data.summaries.length; index++) {
                if (books.length >= limit) {
                    break;
                }
                const bookSummary = data.summaries[index];
                const mPercentage = KMPSearch(bookSummary.summary.toLowerCase(), query.toLowerCase());
                if (mPercentage >= matchPercentage) {
                    books.push({ ...bookSummary, matchPercentage: mPercentage });
                }
            }
            const t3 = new Date().getTime();
            logInfo("KMP search took " + (t3 - t2) + " milliseconds ");
        }


        logInfo("Pattern : " + query + " Books:" + (books.map(b => b.id)));

        cache.addItem(query, books);

        return books;
    }
}

export default SearchService;

