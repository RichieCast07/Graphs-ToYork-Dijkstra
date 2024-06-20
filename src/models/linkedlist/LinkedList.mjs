import Node from './Node.mjs';

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(key, weight = 1) {
        const node = new Node(key, weight);
        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    run(callback) {
        let current = this.head;
        while (current) {
            callback(current);
            current = current.next;
        }
    }
}

export default LinkedList;
