import LinkedList from '../linkedlist/LinkedList.mjs';

class Graph {
    constructor() {
        this.map = new Map();
        this.adjList = [];
    }

    addVertex(key) {
        if (!this.map.has(key)) {
            const list = new LinkedList();
            this.adjList.push(list);
            this.map.set(key, this.adjList.length - 1);
        }
    }

    addVertices(...vertices) {
        for (const vertex of vertices) {
            this.addVertex(vertex);
        }
    }

    addConexion(v1, v2, weight = 1) {
        if (this.map.has(v1) && this.map.has(v2)) {
            this.adjList[this.map.get(v1)].add(v2, weight);
            this.adjList[this.map.get(v2)].add(v1, weight);
        } else {
            console.error("Uno o ambos vertices no existen");
        }
    }

    bfs(startVertex) {
        const visited = new Set();
        const queue = [[startVertex, 0, [startVertex]]];

        visited.add(startVertex);

        while (queue.length) {
            const [vertex, dist, path] = queue.shift();
            const idx = this.map.get(vertex);
            this.adjList[idx].run((adj) => {
                if (!visited.has(adj.key)) {
                    visited.add(adj.key);
                    queue.push([adj.key, dist + adj.weight, [...path, adj.key]]);
                }
            });
        }

        const pathArray = Array.from(visited);
        const totalDistance = pathArray.reduce((acc, vertex, i, arr) => {
            if (i === 0) return acc;
            const prevVertex = arr[i - 1];
            const idx = this.map.get(prevVertex);
            let weight = 0;
            this.adjList[idx].run((adj) => {
                if (adj.key === vertex) {
                    weight = adj.weight;
                }
            });
            return acc + weight;
        }, 0);

        return { path: pathArray, distance: totalDistance };
    }

    dfs(startVertex) {
        const visited = new Set();
        const path = [];
        let totalDistance = 0;

        const dfsRecursive = (vertex, dist) => {
            if (visited.has(vertex)) return;
            visited.add(vertex);
            path.push(vertex);
            totalDistance += dist;

            const idx = this.map.get(vertex);
            this.adjList[idx].run((adj) => {
                if (!visited.has(adj.key)) {
                    dfsRecursive(adj.key, adj.weight);
                }
            });
        };

        dfsRecursive(startVertex, 0);

        return { path, distance: totalDistance };
    }

    dijkstra(startVertex, targetVertex) {
        const distances = new Map([...this.map.keys()].map(k => [k, Infinity]));
        const previous = new Map();
        const pq = new PriorityQueue();

        distances.set(startVertex, 0);
        pq.enqueue(startVertex, 0);

        while (!pq.isEmpty()) {
            const { element: currentVertex } = pq.dequeue();

            if (currentVertex === targetVertex) {
                const path = [];
                let distance = 0;
                for (let at = targetVertex; at; at = previous.get(at)) {
                    path.unshift(at);
                }
                for (let i = 0; i < path.length - 1; i++) {
                    const idx = this.map.get(path[i]);
                    this.adjList[idx].run((adj) => {
                        if (adj.key === path[i + 1]) {
                            distance += adj.weight;
                        }
                    });
                }
                return { path, distance };
            }

            this.adjList[this.map.get(currentVertex)].run((adj) => {
                const alt = distances.get(currentVertex) + adj.weight;
                if (alt < distances.get(adj.key)) {
                    distances.set(adj.key, alt);
                    previous.set(adj.key, currentVertex);
                    pq.enqueue(adj.key, alt);
                }
            });
        }

        return null;
    }

    clear() {
        this.map.clear();
        this.adjList = [];
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return !this.items.length;
    }
}

export default Graph;
