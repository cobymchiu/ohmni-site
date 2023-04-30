let INF = Number.MAX_VALUE;

class stack {
    constructor() {
      this.items = [];
    }

    // add element to the stack
    push(element) {
      return this.items.push(element);
    }

    // remove element from the stack
    pop() {
      if (this.items.length > 0) {
        return this.items.pop();
      }
    }

    // view the last element
    top() {
      return this.items[this.items.length - 1];
    }

    // check if the stack is empty
    empty() {
      return this.items.length == 0;
    }

    // the size of the stack
    size() {
      return this.items.length;
    }

    // empty the stack
    clear() {
      this.items = [];
    }
}


class Graph {

    constructor (numVertices) {
        this.numVertices = numVertices;
        this.AdjList = new Map();
    }

    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        this.AdjList.get(v).push(w);
    }

    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();
    
        // iterate over the vertices
        for (var i of get_keys){
            // get the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";
    
            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    //dfs shortest path algorithm
    findPath(startingNode, goalNode) {
        var visited = {};
        var path = {};

        this.DFSUtil(startingNode, goalNode, path, visited)
    }

    DFSUtil(vertex, goal, path, visited){
        visited[vertex] = true;

        var getNeighbors = this.AdjList.get(vert);

        for(var i in getNeighbors) {
            if (i === goal) {
                return path;
            }
        }
    }
}

