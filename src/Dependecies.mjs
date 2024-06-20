export function renderGraph(graph) {
    const graphView = document.getElementById('graphView');
    graphView.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('graph-table');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Vertice</th><th>Conexiones</th>';
    table.appendChild(headerRow);

    graph.map.forEach((index, key) => {
        const row = document.createElement('tr');
        const vertexCell = document.createElement('td');
        vertexCell.innerText = key;
        row.appendChild(vertexCell);

        const edgesCell = document.createElement('td');
        const edges = [];
        graph.adjList[index].run(node => {
            edges.push(`${node.key} (${node.weight})`);
        });
        edgesCell.innerText = edges.join(', ');
        row.appendChild(edgesCell);

        table.appendChild(row);
    });

    graphView.appendChild(table);
}

export function renderDFS(result) {
    const resultView = document.getElementById('resultView');
    resultView.innerHTML = `<h3>DFS Resultado:</h3><p>${result.join(' -> ')}</p>`;
}

export function renderBFS(result) {
    const resultView = document.getElementById('resultView');
    resultView.innerHTML = `<h3>BFS Resultado:</h3><p>${result.join(' -> ')}</p>`;
}
