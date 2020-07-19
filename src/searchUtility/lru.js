class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}


function LRUCache(capacity = 10, infoLog = false) {

    //private
    let head = new Node(0, 0);
    let tail = new Node(0, 0);
    let nodes = new Map();


    //public
    this.size = 0;
    this.capacity = capacity;

    head.next = tail;
    tail.prev = head;

    //private methods
    const addToHead = (node) => {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    const remove = (node) => {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    const print = () => {
        let current = head;
        let keyList = [];
        while (current.next !== tail) {
            keyList.push(current.next.key);
            current = current.next;
        }
        console.info("LRU CACHE: Key list "+keyList);
    }

    //public methods

    // add cache element for given key and value
    this.addItem = (key, value) => {
        const node = nodes.get(key)
        if (node) {
            node.value = value;
            nodes.set(key, node);
            remove(node);
            addToHead(node);
        } else {
            const node = new Node(key, value);
            nodes.set(key, node);
            if (this.size < this.capacity) {
                this.size++;
                addToHead(node);
            } else {
                nodes.delete(tail.prev.key);
                remove(tail.prev);
                addToHead(node);
            }
        }

        if(infoLog){
            print();
        }
    }

    //return cache element of given key
    this.getItem = (key)=> {
        const node = nodes.get(key);
        if (!node) {
            return false;
        }
        remove(node);
        addToHead(node);
        if(infoLog){
           print();
        }
        
        return node;
    }

    //clear cache
    this.clear = () => {
        head = null;
        tail = null;
        this.size = 0;
        nodes = new Map();
    }

    //return first cache element key
    this.getFirstKey = () => {
        if(head.next !== tail){
            return head.next.key;
        }
        return false;
    }

    //return last cache element key
    this.getLastKey = () => {
        if(tail.prev !== head){
            return tail.prev.key;
        }
        return false;
    }
}

export default LRUCache;