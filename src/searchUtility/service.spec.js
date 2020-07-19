import { waitForElement} from '@testing-library/react'
import SearchService, { createFormattedData } from './service';
import data from '../data';

const bookSearchService = new SearchService(createFormattedData(data));

test('SEARCH SERVICE : Search should return 1 result', async () => {
    const books = await waitForElement(() => bookSearchService.search("that is", 1));
    expect(books.length).toBe(1);
});

test('SEARCH SERVICE : Search should return 0 result', async () => {
    const books = await waitForElement(() => bookSearchService.search("that istheteteh", 1));
    expect(books.length).toBe(0);
});

test('SEARCH SERVICE : Search should return 1 result with partial match', async () => {
    const books = await waitForElement(() => bookSearchService.search("that isth", 1));
    expect(books.length).toBe(1);
    expect(books[0].matchPercentage).not.toBeNull(); 
    expect(books[0].matchPercentage >= 50).not.toBeNull(); 
});