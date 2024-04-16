# Graph-Component

## Usage
The graph component is available as a **custom element**,
enabling easy embedding into an HTML-file using the `<graph-editor/>` tag. 
Refer to the [index.ce.html](application-example-ce/index.ce.html) file in the [application-example-ce](application-example-ce) directory for a demonstration.

For a quick start, simply run the referenced index file.

You can use the UI to build your graph or programmatically interact with it via the browser console or with a script.
### UI

### API
#### Preparation
To be able to call the following functions, we need to get the graph-editors instance.
```javascript
// when it is included as a custom element in an html file (<graph-editor id='ge1'>)
let instance = document.getElementById(ge1)._instance.exposed
```           

```javascript
// when you run the component in development mode
let instance = document.getElementById(app).__vue_app__._instance.exposed
``` 

#### Manually write a Graph
We can manually write a graph using a _JSON_ kind of format or a string in _Trivial Graph Format (TGF)_ to later 
give it to the component.

```javascript
let graphAsObject = {
    nodes: [
        {id: 0, label: "A"},
        {id: 1, label: "B"},
        {id: 2, label: "C"}
    ],
    links: [
        {sourceId: 0, targetId: 1, label: "A to B"},
        {sourceId: 2, targetId: 2, label: "C to C"}
    ]
}

let graphAsTgf = "0 A\n 1 B\n 2 C\n#\n 0 1 A to B\n 2 2 C to C"
```
#### Getting a Graph
Gets the graph that is currently displayed in the graph component instance.
```javascript
let graphFromInstance = instance.getGraph()
```

#### Display a Graph in the Component
To actually display a graph we can use ```setGraph()```.

```javascript
instance.setGraph(graphAsObject)
instance.setGraph(graphAsTgf)
instance.setGraph(graphFromInstance)

//if you call it without arguments, it will clear the graph editor
instance.setGraph()
```

#### Print a Graph
If we want to print the currently displayed graph we call `printGraph()` on the instance.
For a graph assigned to a variable we use a simple `console.log()`.

```javascript
// log the currently displayed graph in TGF format on the console
instance.printGraph()

// log a graph assigned to a variable to the console
console.log(graphAsTgf)
```


#### Changing Color of a Node
We can change the color of an existing node by its id `instance.setNodeColor(color, [id])` or change the color of all existing nodes.
The color can be:
- HTML Color Name
- Hexadecimal
- RGB
- HSL / HSLA

_This will not influence the color of nodes created in the future and is also not persisted._


```javascript
//setting the color for the node with id 0 using a html color name
instance.setNodeColor("bisque", [0])
//setting the color for the node with id 0 and the node with id 1 using hexadecimal
instance.setNodeColor("#8FBC8F", [0,1])
//setting the color for all currently existing nodes using RBG and HSLA
instance.setNodeColor("RGB(250,70,99)")
instance.setNodeColor("HSL(212,92%,45%,0.5)")
```

#### Miscellaneous
```javascript
//Switch off the ability to zoom (or switch it on again with true)
instance.toggleZoom(false)
```

## Development
### Project Setup

#### Install required Dependencies
```sh
npm install
```

#### Compile and Hot-Reload for Development
```sh
npm run dev
```
_The `customElement` option in [vite.config.ts](./vite.config.ts) has to be set to `false`._

#### Type-Check and Compile for Production

```sh
npm run build
```
_The `customElement` option in [vite.config.ts](./vite.config.ts) has to be set to `true`._

For more commands refer to the scripts section in [package.json](./package.json).

