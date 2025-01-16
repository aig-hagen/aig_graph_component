# Graph-Component

> A simple tool that lets you quickly and interactively **create**, **modify** and **display graphs**.
> 
> The focus lies on smaller graphs and manual creation.
> Available as a standalone editor or as a component to integrate into your own project.
>
> https://graphtool.aig.fernuni-hagen.de/
> 
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
![Static Badge](https://www.mathjax.org/badge/mj_logo_60x20.png)


## Usage
The graph component is directly available as a **[webpage](https://graphtool.aig.fernuni-hagen.de)** (_currently V3.0, will be kept up-to-date starting from version 3.3._)
and also as a **custom element**,
enabling easy embedding into an HTML-file using the `<graph-component/>` tag. 
Refer to the [index.ce.html](application-example-ce/CLI/index.ce.html) file in the [application-example-ce](application-example-ce) directory for a demonstration
_(and simply run it for a quick start)_.


You can build your graph using the GUI or interact with it programmatically,
customizing its behaviour to suit your needs via the browser console or a script.

During interaction with the graph, various events are triggered to which you can react.
### GUI
*TODO (งツ)ว*
### Programmatically
#### Preparation
To be able to call the following functions, we need to get the graph-components instance.
```javascript
// when it is included as a custom element in an html file (<graph-component id='gc1'>)
const instance = document.getElementById('gc1')._instance.exposed
```           

```javascript
// when you run the component in development mode
const instance = document.getElementById('app').__vue_app__._instance.exposed
``` 
_Note that when you run the app in development mode, this does not work after a hot-reload. 
It only works correctly on the initial run or after refreshing the site._

#### Setting the default behaviour


#### Manually write a Graph
We can write a graph manually using a _JSON-like_ format or a string in _Trivial Graph Format (TGF)_ to later pass it to the component.

##### JSON
```javascript
// graph as object with optional normal and LaTeX label, color and x- and y- position
let graphAsObject = {
  nodes: [
    {id: 0, label: "$a_0$", x: 24, y: 24},
    {id: 1, label: "b", color: "lavenderblush", x: 222, y: 142},
    {id: 2, label: "c"}
  ],
  links: [
    {sourceId: 0, targetId: 1, label: "$a_0\\ to\\ b$"},
    {sourceId: 2, targetId: 2, label: "c to c"}
  ]
}
```
In _JSON-like_ format the individual [editability options](#editability) can be directly passed in.
```javascript
// graph as object with some added editability options
let graphAsObjectWithEditability = {
  nodes: [
    {id: 0, label: "$a_0$", x: 24, fixedPosition: {x: true, y:false}},
    {id: 1, label: "b", color: "lavenderblush", x: 222, y: 142, labelEditable: false},
    {id: 2, label: "c", deletable: false, allowIncomingLinks: false, allowOutgoingLinks: false}
  ],
  links: [
    {sourceId: 0, targetId: 1, label: "$a_0\\ to\\ b$", deletable: true},
    {sourceId: 2, targetId: 2, label: "c to c", labelEditable: false}
  ]
}
```

##### TGF
```javascript
//graph as tgf with optional normal and LaTeX label and color
let graphAsTgf = "0 $a_0$\n 1 b /COLOR:/lavenderblush\n 2 c\n#\n 0 1 $a_0\\ to\\ b$\n 2 2 c to c"
```
*In standard TGF, color encoding is not supported. However, you can use it in this Graph-Component as demonstrated.
Positioning and the editability options are only available with the object notation.*

##### Using LaTeX in Labels
We can also use LaTeX input for labels by enclosing them in math delimiters `$$` or `\(\)`.

It is recommended to use only one pair of delimiters per label. 
If a space is required between expressions use `\\` before the space
(_for GUI Input it is just one backslash_) or `\text()`.


#### Display a Graph in the Component
To actually display a graph in the graph component, we call ```setGraph()```.

```javascript
instance.setGraph(graphAsObject)
instance.setGraph(graphAsTgf)
instance.setGraph(graphFromInstance)

//if you call it without arguments, it will clear the graph component
instance.setGraph()
```

#### Getting a Graph
Get the graph that is currently displayed in the graph component instance with `getGraph()`.

Optionally, we can pass the following parameters to determine in which format and
how detailed we want to get the graph:
- format 
  - `"tgf" | "json"` 
  - default: `"json"`
- includeColor 
  - `boolean`
  - default: true
- includePosition
  - `boolean`
  - default: true
  - only available in json like format
- includeEditability
  - `boolean`
  - default: true
  - only available in json like format


```javascript
// get graph in json format
let graphFromInstance = instance.getGraph()

// get graph without node color, position and without node and link editability values
instance.getGraph('json', false, false, false)

```

#### Print a Graph
If we want to print the currently displayed graph we call `printGraph()` on the instance.
Similar to [getting a graph](#getting-a-graph), we can pass optional parameters to determine how detailed the print should be.

For a graph assigned to a variable we use a simple `console.log()`.

```javascript
// log the currently displayed graph in JSON like format on the console
instance.printGraph()

// log in json like format but exclude colors and editability but include position.
instance.printGraph('json', false, true, false)

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

#### Changing Size
We may want to change the size of the displayed elements.
For nodes this can be done by changing their radius:
```javascript
instance.setNodeRadius(42)
```

#### Editability
We also have precise control over what can be edited through the GUI 
using the ids of the specific nodes and links
 - [Node and Link Deletion](#delete)
 - [Label Editing](#label-editable)
 - [Node Position Locking](#fixed-position)
 - [Nodes Link Permission](#incoming-and-outgoing-links)

##### Delete
We can set whether nodes or links can be deleted with `setDeletable()`.
```javascript
// prohibit deletion via GUI for node 0 and 1 and the two edges connecting them
instance.setDeletable(false, [0, 1, "0-1", "1-0"])

// allow deletion via GUI for all currently existing nodes and links
instance.setDeletable(true)
```
##### Label Editable
We can set whether labels of nodes and links can be edited using `setLabelEditable()`.
```javascript
// prohibit label editing via GUI for the node with id 3 and the edge with the id 2-3
instance.setLabelEditable(false, [3, "2-3"])

// prohibit label editing via GUI for all currently existing nodes and links
instance.setLabelEditable(false)
```
##### Fixed Position
For nodes, it is also possible to set whether they should have a fixed position.
Meaning that they cannot be dragged via the GUI and are unaffected by the simulation forces.
Fixed positions can be configured separately for the x- and y-axes using
`setNodesFixedPosition({x: bool, y: bool}, id(s))`.
```javascript
// fix node 1 in x direction
instance.setNodesFixedPosition({x: true, y: false}, 1)

// fix node 0 and 2 in y direction
instance.setNodesFixedPosition({x:false, y:true}, [0,2])

// completely fix all currently existing nodes
instance.setNodesFixedPosition({x: true, y: true})
instance.setNodesFixedPosition(true)
```
##### Incoming and Outgoing Links
Additionally, we can control whether certain nodes are allowed to have incoming and/or
outgoing links with `setNodesLinkPermission(bool, bool)`.

```javascript
// only allow incoming links but no outgoing ones for the nodes with id 2 and 3
instance.setNodesLinkPermission(true, false, [2,3])

// allow neither incoming, nor outgoing links for all currently existing nodes
instance.setNodesLinkPermission(false, false)
```

##### Convenience Function
To set all the node editability parameter at once, we can use `setNodeEditability()`
with an editability-object
(`{deletable, labelEditable, fixedDistance: {x, y}, allowIncomingLinks, allowOutgoingLinks}`)
and the specific IDS as parameters
```javascript
// setting all possible node editability options at once for the nodes with IDs 0, 1 and 2
instance.setNodeEditability(
    { 
        deletable: false,
        labelEditable: false,
        fixedPosition:
            {
                x: true,
                y: false
            },
        allowIncomingLinks: true,
        allowOutgoingLinks: true
    },
    [0, 1, 2]  
)
```
This is also possible for the links editability using `setLinkEditability()` with an
editability-object containing: `{deletable, labelEditable}` and the link IDs.

```javascript
// setting all possible link editability options at once for the link with ID 0-1 and 2-2
instance.setLinkEditability(
    {
        deletable: true,
        labelEditable: false
    },
    ["0-1", "2-2"]    
)

// setting all possible link editability options at once for all currently existing links
instance.setLinkEditability(
    {
        deletable: false,
        labelEditable: false
    },
)
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
// w/o shadow root
const graphHost = document.getElementById('gc1').querySelector('.graph-host')
// with shadow root: document.getElementById('gc1').shadowRoot.querySelector('.graph-host')

// add event listener for right click on node
graphHost.addEventListener('nodeclicked', function(e){
    if(e.detail.button === 0){
        //change the color on left click
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

#### Type-Check and Compile for Production

```sh
npm run build
```
For more commands refer to the scripts section in [package.json](./package.json).


Depending on whether you want to build the **Custom Element** with *LaTeX* support
or without it, you have to choose the corresponding method in [main.ce.ts](src/main.ce.ts).
To choose between inline style or an external style.css file *(current default)*,
you have the option for *custom element mode* in [vite.config.ts](vite.config.ts).


