class Node {
    constructor(key, weight = 1) {
        this._key = key;
        this._weight = weight;
        this._next = null;
    }

    get key() {
        return this._key;
    }

    set key(newKey) {
        this._key = newKey;
    }

    get weight() {
        return this._weight;
    }

    set weight(newWeight) {
        if (typeof newWeight === 'number' && newWeight > 0) {
            this._weight = newWeight;
        } else {
            throw new Error('La ponderacion debe ser un numero positivo.');
        }
    }

    get next() {
        return this._next;
    }

    set next(newNext) {
        if (newNext === null || newNext instanceof Node) {
            this._next = newNext;
        } else {
            throw new Error('El siguiente debe ser un nodo o nulo.');
        }
    }
}

export default Node;
