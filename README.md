# Graph-Component

> A simple tool that lets you quickly and interactively **create**, **modify** and **display graphs**.
> 
> The focus lies on smaller graphs and manual creation.
> Available as a standalone editor or as a component to integrate into your own project.
>
> https://graphtool.aig.fernuni-hagen.de/
> 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Usage
The graph component is directly available as a **[webpage](https://graphtool.aig.fernuni-hagen.de)**
and also as a **custom element**,
enabling easy embedding into an HTML-file using the `<graph-editor/>` tag. 
Refer to the [index.ce.html](application-example-ce/CLI/index.ce.html) file in the [application-example-ce](application-example-ce) directory for a demonstration.

For a quick start, simply run the referenced index file.

You can use the GUI to build your graph or programmatically interact with it via the browser console or with a script.
During interaction with the graph different events are fired to which you can react.
### GUI
*TODO (งツ)ว*
### Programmatically
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
// graph as object with optional label, color and x- and y- position
let graphAsObject = {
  nodes: [
    {id: 0, label: "A", x: 24, y: 24},
    {id: 1, label: "B", color: "lavenderblush", x: 222, y: 142},
    {id: 2, label: "C"}
  ],
  links: [
    {sourceId: 0, targetId: 1, label: "A to B"},
    {sourceId: 2, targetId: 2, label: "C to C"}
  ]
}
```
```javascript
//graph as tgf with optional label and color
let graphAsTgf = "0 A\n 1 B /COLOR:/lavenderblush\n 2 C\n#\n 0 1 A to B\n 2 2 C to C"
```
*In standard TGF, color encoding is not supported. However, you can use it in this Graph-Component as demonstrated.
Positioning is only available with the object notation.*


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
// delete link that goes from node id 0 to node id 1
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
If we want to embed the component and only display the graph without 
allowing users to add or remove nodes or links, or edit labels via the GUI *(dragging is still allowed and editing options via CLI remain available)*,
we can use the following: 

```javascript
instance.toggleGraphEditingInGUI(false)
```

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
After zooming we can reset the canvas to its default position.
```javascript
instance.resetView()
```
You can also toggle if the nodes and links should have labels.
```javascript
instance.toggleNodeLabels(true)
instance.toggleLinkLabels(false)
```

#### Custom Events
Various events are triggered by different interactions with the graph.

##### Create and Delete
Event Names: 
- `nodecreated`
- `nodedeleted`
- `linkcreated`
- `linkdeleted`

Additional information can be accessed through `detail.node` or `detail.link`.
This includes `id` and `label` for both, with nodes also providing position details via `x` and `y`.
- `detail.node`
    - `id`
    - `label`
    - `x`
    - `y`
- `detail.link`
  - `id`
  - `label`

##### Click
Event Names:
- `nodeclicked`
- `linkclicked`

In addition to the details provided for creation and deletion events,
the click events also include `detail.button`, indicating the button used for the click.




##### Labels
Event Name: `labeledited`

For label editing events, additional information available includes the ID of the parent of the edited label 
via `detail.parent.id`, and the newly added label via `detail.label`.


##### Listening for Events
Events are fired from the graph host. This is where we attach the event listener.

```javascript
// get the graph host
const graphHost = document.getElementById('ge1').shadowRoot.querySelector('.graph-host')
// add event listener for right click on node
graphHost.addEventListener('nodeclicked', function(e){
    if(e.detail.button === 2){
        //change the color on right click
        instance.setNodeColor('#8FBC8F', e.detail.node.id)
    }
})
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

Depending on whether you want to build the **Custom Element** with the *CLI* functionality
or without it (and therefore with a menu bar on top) you have to choose the corresponding method in [main.ce.ts](src/main.ce.ts).

For more commands refer to the scripts section in [package.json](./package.json).

