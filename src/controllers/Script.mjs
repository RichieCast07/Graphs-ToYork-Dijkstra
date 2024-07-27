import Graph from '../models/graph/Graph.mjs';

const graph = new Graph();

document.getElementById('vertexForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const vertex = document.getElementById('vertexInput').value.trim();
    if (vertex) {
        graph.addVertex(vertex);
        alert(`Lugar "${vertex}" agregado`);
        document.getElementById('vertexInput').value = '';
        updateGraphTable();
    } else {
        alert('Por favor ingrese un nombre de lugar valido.');
    }
});

document.getElementById('edgeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v1 = document.getElementById('startVertex').value.trim();
    const v2 = document.getElementById('endVertex').value.trim();
    const weight = parseInt(document.getElementById('weightInput').value);
    if (v1 && v2 && !isNaN(weight)) {
        if (graph.map.has(v1) && graph.map.has(v2)) {
            graph.addConexion(v1, v2, weight);
            alert(`Conexión de "${v1}" a "${v2}" agregada con una distancia de ${weight} km`);
            document.getElementById('startVertex').value = '';
            document.getElementById('endVertex').value = '';
            document.getElementById('weightInput').value = '';
            updateGraphTable();
        } else {
            alert('Uno o ambos lugares no existen. Agregue los lugares primero.');
        }
    } else {
        alert('Por favor ingrese datos validos para la conexion.');
    }
});

document.getElementById('dfsButton').addEventListener('click', () => {
    const startVertex = document.getElementById('dfsinput').value.trim();
    if (startVertex && graph.map.has(startVertex)) {
        const result = graph.dfs(startVertex, (vertex) => {
            console.log(`Visited: ${vertex}`);
        });
        const resultString = result.path.join(' -> ');
        updateResultTable('DFS', resultString);
    } else {
        alert('Por favor ingrese un lugar valido para el inicio del DFS.');
    }
});

document.getElementById('dijkstraButton').addEventListener('click', () => {
    const startVertex = document.getElementById('startDijkstra').value.trim();
    if (startVertex && graph.map.has(startVertex)) {
        const result = graph.dijkstra(startVertex);
        const resultString = Object.entries(result)
            .map(([vertex, distance]) => `${vertex}: ${distance} km`)
            .join('<br>');
        updateResultTable('Dijkstra', resultString);
    } else {
        alert('Por favor ingrese un lugar valido para el inicio de Dijkstra.');
    }
});

function updateGraphTable() {
    const tableBody = document.getElementById('graphTable').querySelector('tbody');
    tableBody.innerHTML = '';

    graph.map.forEach((index, key) => {
        const row = document.createElement('tr');
        const vertexCell = document.createElement('td');
        vertexCell.innerText = key;
        row.appendChild(vertexCell);

        const edgesCell = document.createElement('td');
        const edges = [];
        graph.adjList[index].run(node => {
            edges.push(`${node.key} (${node.weight} km)`);
        });
        edgesCell.innerText = edges.join(', ');
        row.appendChild(edgesCell);

        tableBody.appendChild(row);
    });
}

function updateResultTable(algorithm, result) {
    const tableBody = document.getElementById('resultTable').querySelector('tbody');
    const row = document.createElement('tr');

    const algorithmCell = document.createElement('td');
    algorithmCell.innerText = algorithm;
    row.appendChild(algorithmCell);

    const resultCell = document.createElement('td');
    resultCell.innerHTML = result;
    row.appendChild(resultCell);

    tableBody.appendChild(row);
}
