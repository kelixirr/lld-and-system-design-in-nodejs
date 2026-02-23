class Graph {
  private adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  public addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
      console.log(`Added city: ${vertex}`);
    }
  }

  public addEdge(vertex1: string, vertex2: string): void {
    this.adjacencyList.get(vertex1)?.push(vertex2);

    this.adjacencyList.get(vertex2)?.push(vertex1);

    console.log(`Flight added: ${vertex1} <---> ${vertex2}`);
  }

  public removeEdge(vertex1: string, vertex2: string): void {
    const v1List = this.adjacencyList.get(vertex1);
    if (v1List) {
      this.adjacencyList.set(
        vertex1,
        v1List.filter((v) => v !== vertex2),
      );
    }

    const v2List = this.adjacencyList.get(vertex2);
    if (v2List) {
      this.adjacencyList.set(
        vertex2,
        v2List.filter((v) => v !== vertex1),
      );
    }

    console.log(`Flight canceled: ${vertex1} <-X-> ${vertex2}`);
  }

  public removeVertex(vertexToRemove: string): void {
    const connections = this.adjacencyList.get(vertexToRemove);
    if (!connections) return;

    for (const connectedCity of connections) {
      this.removeEdge(vertexToRemove, connectedCity);
    }

    this.adjacencyList.delete(vertexToRemove);
    console.log(`City completely destroyed: ${vertexToRemove}`);
  }

  public printGraph(): void {
    console.log("\n--- Current Flight Network ---");
    for (const [city, flights] of this.adjacencyList.entries()) {
      console.log(`${city} ---> [ ${flights.join(", ")} ]`);
    }
  }

  public dfsRecursive(startVertex: string): string[] {
    const result: string[] = [];
    const visited: Set<string> = new Set();

    const dfsHelper = (vertex: string) => {
      if (!vertex || visited.has(vertex)) return;

      visited.add(vertex);
      result.push(vertex);

      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        dfsHelper(neighbor);
      }
    };

    dfsHelper(startVertex);
    return result;
  }

  public bfs(startVertex: string): string[] {
    const result: string[] = [];
    const visited: Set<string> = new Set();
    const queue: string[] = [startVertex];

    visited.add(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift()!;
      result.push(currentVertex);

      const neighbors = this.adjacencyList.get(currentVertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

const map = new Graph();

map.addVertex("Delhi");
map.addVertex("Tokyo");
map.addVertex("London");
map.addVertex("Dubai");
map.addVertex("New York");

map.addEdge("Delhi", "Dubai");
map.addEdge("Delhi", "Tokyo");
map.addEdge("Delhi", "London");
map.addEdge("London", "New York");
map.addEdge("Dubai", "New York");

map.printGraph();

map.removeEdge("Delhi", "Dubai");
map.removeVertex("London");

map.printGraph();
