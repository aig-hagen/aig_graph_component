# Graph-Component
*TODO (งツ)ว: write a quick intro what you can do with this component*

The graph component is available as a **custom element**,
enabling easy embedding into an HTML-file using the `<graph-editor/>` tag. 
Refer to the [index.ce.html](application-example-ce/index.ce.html) file in the [application-example-ce](application-example-ce) directory for a demonstration.

For a quick start, simply run the referenced index file.

You can use the UI to build your graph or programmatically interact with it via the browser console or with a script.
### UI
*TODO (งツ)ว*
### API
#### Preparation
To be able to call the following functions, we need to get the graph-editors instance.
```javascript
// when it is included as a custom element in an html file (<graph-editor id='ge1'>)
const instance = document.getElementById('ge1')._instance.exposed
```           

```javascript
// when you run the component in development mode
const instance = document.getElementById('app').__vue_app__._instance.exposed
``` 
_Note that when you run the app in development mode, this does not work after a hot-reload. It only works correctly on the initial run or after refreshing the site._

#### Manually write a Graph
We can write a graph manually using a _JSON-like_ format or a string in _Trivial Graph Format (TGF)_ to later pass it to the component.

```javascript
let graphAsObject = {
    nodes: [
        {id: 0, label: "A"},
        {id: 1, label: "B", color: "lavenderblush"},
        {id: 2, label: "C"}
    ],
    links: [
        {sourceId: 0, targetId: 1, label: "A to B"},
        {sourceId: 2, targetId: 2, label: "C to C"}
    ]
}
```
```javascript
let graphAsTgf = "0 A\n 1 B /COLOR:/lavenderblush\n 2 C\n#\n 0 1 A to B\n 2 2 C to C"
```
*In standard TGF, color encoding is not supported. However, you can use it in this Graph-Component as demonstrated.*


#### Display a Graph in the Component
To actually display a graph in the graph component, we call ```setGraph()```.

```javascript
instance.setGraph(graphAsObject)
instance.setGraph(graphAsTgf)
instance.setGraph(graphFromInstance)

//if you call it without arguments, it will clear the graph editor
instance.setGraph()
```

#### Getting a Graph
Gets the graph that is currently displayed in the graph component instance.
```javascript
let graphFromInstance = instance.getGraph()
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
#### Delete Nodes and Links
We can delete one or multiple **nodes** by their id.
```javascript
// delete node with id 0
instance.deleteNode(0)

// delete node with id 4 and node with id 2
instance.deleteNode([4,2])
```
We can also delete one or multiple **links** by their id. A links id consists of the source nodes and target nodes id, joined by a hyphen.
```javascript
// delete link that from node id 0 to node id 1
instance.deleteLink("0-1")

// delete links from node with id 1 to node with id 0 and the self-pointing edge of node with id 2
instance.deleteLink(["1-0", "2-2"])
```

#### Changing Color of Nodes and Links
We can change the color of one or more existing nodes or links by their id or change the color of all existing ones.
The color can be:
- HTML Color Name
- Hexadecimal
- RGB
- HSL / HSLA

_This will not influence the color of nodes or links created in the future._

For changing the color of nodes, we use `setNodeColor(color, id(s))`.
```javascript
//setting the color for the node with id 0 using an html color name
instance.setNodeColor("bisque", 0)
//setting the color for the node with id 0 and the node with id 1 using hexadecimal
instance.setNodeColor("#8FBC8F", [0,1])
//setting the color for all currently existing nodes using RBG and HSLA
instance.setNodeColor("RGB(250,70,99)")
instance.setNodeColor("HSL(212,92%,45%,0.5)")
```

Changing the color of links, is similar to the one of nodes, just use `setLinkColor(color, id(s))`.
_A links id consists of the source nodes and target nodes id, joined by a hyphen._
```javascript
//setting the color for the link that originates from node with id 0 to node with id 1
instance.setLinkColor("orangered", "0-1")
//setting the color for more links
instance.setLinkColor("#FFDAB9", ["0-1", "2-2"])
//setting the color for all currently existing links using RBG and HSLA
instance.setLinkColor("RGB(250,70,99)")
instance.setLinkColor("HSL(212,92%,45%,0.5)")
```


#### Miscellaneous
We can disable and enable the ability to zoom, that nodes repel each other and that there is a fixed distance for links.
```javascript
instance.toggleZoom(false)
```
```javascript
instance.toggleNodePhysics(true)
```
```javascript
instance.toggleFixedLinkDistance(true)
```
After zooming you can reset the canvas to its default position.
```javascript
instance.resetView()
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

