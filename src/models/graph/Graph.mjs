import LinkedList from '../linkedlist/LinkedList.mjs';

class Graph {
    constructor() {
        this.map = new Map();
        this.adjList = [];
    }

    addVertex(key) {
        if (!this.map.has(key)) {
            this.adjList.push(new LinkedList());
            this.map.set(key, this.adjList.length - 1);
        }
    }

    addVertices(...vertices) {
        vertices.forEach(vertex => this.addVertex(vertex));
    }

    addConexion(v1, v2, weight = 1) {
        if (this.map.has(v1) && this.map.has(v2)) {
            this.adjList[this.map.get(v1)].add(v2, weight);
            this.adjList[this.map.get(v2)].add(v1, weight);
        } else {
            console.error("Uno o ambos vertices no existen");
        }
    }

    dfs(startVertex, callback) {
        const visited = new Set();
        const path = [];

        const dfsRecursive = (vertex) => {
            if (visited.has(vertex)) return;
            visited.add(vertex);
            path.push(vertex);
            callback(vertex);

            const idx = this.map.get(vertex);
            this.adjList[idx].run((adj) => {
                if (!visited.has(adj.key)) {
                    dfsRecursive(adj.key);
                }
            });
        };

        dfsRecursive(startVertex);
        return { path };
    }

    dijkstra(startVertex) {
        const INF = 100000;
        const l = [];
        const v = [];
        const lp = [];
        const d = [];
        const dp = [];

        const numVertices = this.map.size;

        for (let i = 0; i < numVertices; i++) {
            v[i] = i;
            lp[i] = v[i];
            d[i] = INF;
            dp[i] = INF;
        }

        const startIdx = this.map.get(startVertex);
        d[startIdx] = 0;
        dp[startIdx] = 0;

        while (l.length != v.length) {
            let min = INF;
            let minIndex = -1;

            for (let i = 0; i < v.length; i++) {
                if (lp[i] !== null && dp[i] < min) {
                    min = dp[i];
                    minIndex = i;
                }
            }

            if (minIndex === -1) break;

            l.push(minIndex);
            lp[minIndex] = null;
            const idx = minIndex;

            this.adjList[idx].run((adj) => {
                const adjIdx = this.map.get(adj.key);
                const alt = dp[idx] + adj.weight;
                if (alt < dp[adjIdx]) {
                    dp[adjIdx] = alt;
                }
            });

            for (let i = 0; i < v.length; i++) {
                if (d[i] === INF && dp[i] !== INF && dp[i] >= 0) {
                    d[i] = dp[i];
                }
            }
        }

        const result = {};
        this.map.forEach((index, vertex) => {
            result[vertex] = d[index];
        });

        return result;
    }

    clear() {
        this.map.clear();
        this.adjList = [];
    }
}

export default Graph;
