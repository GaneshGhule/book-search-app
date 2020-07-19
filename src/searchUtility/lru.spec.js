import LRUCache from './lru';

test('LRU : Should add item and get item from cache', () => {
    const cache = new LRUCache();
    cache.addItem(1, "Test item");
    const node = cache.getItem(1);
    expect(cache.size).toBe(1);
    expect(node.value).toBe("Test item");
    expect(node.key).toBe(1);
})


test('LRU : Should add recently used element at head in list', () => {
    const cache = new LRUCache();
    cache.addItem(1, "Test item 1");
    cache.addItem(2, "Test item 2");
    cache.addItem(3, "Test item 3");
    
    const node = cache.getItem(3);

    expect(cache.getFirstKey()).toBe(node.key);
})

test('LRU : Size should not increase beyond capacity', () => {
    const cache = new LRUCache(5);
    cache.addItem(1, "Test item 1");
    cache.addItem(2, "Test item 2");
    cache.addItem(3, "Test item 3");
    cache.addItem(4, "Test item 4");
    cache.addItem(5, "Test item 5");
    cache.addItem(6, "Test item 6");

    expect(cache.size).toBe(5);
})