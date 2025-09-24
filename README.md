# Graph-Component

> A simple tool that lets you quickly and interactively **create**, **modify** and **display graphs**.
>
> The focus lies on smaller graphs and manual creation.
> Available as a standalone editor or as a component to integrate into your own project.
>
> https://graphtool.aig.fernuni-hagen.de/ (_currently V2.0_)
>
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
![Static Badge](https://www.mathjax.org/badge/mj_logo_60x20.png)

## Usage

The graph component is available as a **custom element**
allowing easy embedding into an HTML-file using the `<graph-component/>` tag.
Refer to the explanation below and check out the [application-example-ce](application-example-ce) directory for integration examples.

You can create your graph using the GUI, or interact with it
and customize its behaviour [via the API](#API).

## API

How the initial behaviour of the component is set, is described in 
[setting defaults](#setting-defaults). This is the default behaviour of the graph
and its elements that takes place, if no individual properties for graph nodes and links is set.

Some properties can also be set for [individual elements](#individual-elements). 

### Preparation

To be able to call the following functions, we need to get the graph-components instance first.
```javascript
// when it is included as a custom element in an html file (<graph-component id='gc1'>)
const instance = document.getElementById('gc1')._instance.exposed
```           

```javascript
// when you run the component in development mode
const instance = document.getElementById('app').__vue_app__._instance.exposed
``` 
>[!NOTE] When you run the app in development mode, this does not work after a hot-reload.
It only works correctly on the initial run or after refreshing the site.

### Setting Defaults

We can configure the default behaviour of the graph component and its elements.
A detailed description, what every prop does, will be provided in the following sections.

#### Global vs. Individual Setting

There are props set at graph level, and some at an individual level.

>[!IMPORTANT] Props that are set at graph level apply to all elements, regardless of when they were created.
>
>For props that can also be set individually, the default behaviour will only apply
to elements created after the default settings are set, and only if those elements do not have their own 
individual settings specified.

#### Graph-Level Props
- `isGraphEditableInGUI`
  - whether nodes and links are *deletable* and their *label is editable*
  - regardless of this, nodes can still be dragged  
  - for more fine granular editing options, configure it on [individual element level](#editability-1)
- `zoomEnabled`
- `nodePhysicsEnabled`
- `fixedLinkDistanceEnabled`
- `showNodeLabels`
- `showLinkLabels`
- `nodeAutoResizeToLabelSize`
  - if set to true, the nodes resize dynamically to match the labels width and height and words in the label will stay on a single line (no horizontal wrapping)
  - if set to false, the nodes have a fixed size, and label words may wrap to the next line or potentially overflow

#### Individual-Element-Level Props
- `nodeProps`


#### Example of a full config input object
```typescript 
instance.setDefaults(
    {
        isGraphEditableInGUI: true,
        zoomEnabled: false,
        nodePhysicsEnabled: false,
        fixedLinkDistanceEnabled: false,
        showNodeLabels: true,
        showLinkLabels: true,
        nodeAutoResizeToLabelSize: false,
        nodeProps: {
            shape: 'rect',
            width: 42,
            height: 24,
            cornerRadius: 4,
            reflexiveEdgeStart: 'MOVABLE'
        }
    }
)
```


### Graph and Component

#### Graph Object
A graph that is displayed in the component can be represented as a **graph object** in _JSON-like_ format or a string in _Trivial Graph Format (TGF)_.

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
In _JSON-like_ format the individual [editability options](#editability-1) can be directly passed in.
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
//graph as tgf with optional normal and LaTeX label
let graphAsTgf = "0 $a_0$\n 1 b\n 2 c\n#\n 0 1 \text{$a_0 to b$}\n 2 2 c to c"
```
*Positioning and the editability options are only available in the object notation.*



#### Display a Graph
To actually display a graph in the graph component, we use ```setGraph```.

```javascript
instance.setGraph(graphAsObject)
instance.setGraph(graphAsTgf)
instance.setGraph(graphFromInstance)

//if you call it without arguments, it will delete the graph currently displayed in the component
instance.setGraph()
```

#### Getting a displayed graph
Get the graph that is currently displayed in the graph component instance with `getGraph` either as **JSON** or **TGF**.

As a default behaviour the graph is received in **JSON** format containing all available information.

- format: `'json'` or `'tgf'`

In the JSON format (not available for TGF), you can pass additional parameters to control how much additional information
is included.

- includeNodePosition
- includeNodeProps
- includeColor
- includeEditability


```javascript
// get graph in json format
let graphFromInstance = instance.getGraph()
// get graph with node position, but without node props, color and node and link editability values
instance.getGraph('json', true, false, false, false)
```

#### Printing a graph

You can also log the currently displayed graph at the console with `printGraph` or just use `console.log`.
Similar to [getting a graph](#getting-a-displayed-graph), we can pass optional parameters to determine how detailed this should be.

```javascript
// log the currently displayed graph in JSON like format on the console
instance.printGraph()
// log in JSON like format but exclude props and colors but include position and editability.
instance.printGraph('json', true, false, false, true)
// log a graph assigned to a variable to the console
console.log(graphAsTgf)
```


#### Canvas and Zooming
When zoom is disabled nodes can only be placed inside the view.
When zoom is enabled the user can change the view resulting in nodes being
located outside the view, which can be useful for bigger graphs.

```javascript
instance.toggleZoom(true)
```

After zooming we can reset the canvas to its default position with `resetView`.
```javascript
instance.resetView()
```

#### Labels and Auto Resize
We can set if nodes and links should have labels.
```javascript
instance.toggleNodeLabels(true)
instance.toggleLinkLabels(false)
```

- nodeAutoResizeToLabelSize
hier vllt using latex

#### Editability
If we want to embed the component and only display the graph without
allowing users to add or remove nodes or links, or edit labels via the GUI 
*(dragging is still allowed and editing options via API remain available)*,
we can use `toggleGraphEditingInGUI`.

```javascript
instance.toggleGraphEditingInGUI(false)
```
More fine-granular editability options are also available at [individual element level](#editability-1).

#### Simulation Behaviour

A force-directed automatic graph-layout can be enabled.
When setting `toggleNodePhysics`, nodes repel each other and are attracted
towards the initial center of the canvas *(before any zooming or panning)*.

Additionally, links can be configured to maintain a fixed distance by setting `toggleFixedLinkDistance`,
ensuring that all links have the same length between the center points of the connected nodes.

```javascript
instance.toggleNodePhysics(true)
instance.toggleFixedLinkDistance(true)
```



### Individual Elements

The general behaviour of the following functions is that you can set options based on ids.
You can pass no ids, one, or muliple ids.
If the id parameter is skipped, it applies to all currently existing elements
(but not ones that are created in the future - for that, you should change default behaviour).

#### Actions

##### Labels and LaTeX

We can change the labels of existing nodes and links via their id with `setLabel`.

>[!NOTE] To use **LaTeX** inside labels you can enclose it in math delimiters `$$`.
*(Use only one pair of delimiters per label).*


```javascript
//setting a new label for the nodes with id 0 and 1 and the link between it
instance.setLabel("new label", [0, 1, "1-0"])
//setting node with id 2 with a latex label
instance.setLabel("$\text{this is }g_2$")
```

##### Changing Color
We can change the color of one or more existing nodes or links by their id or change the color of all existing ones.
The color can be:
- HTML Color Name
- Hexadecimal
- RGB
- HSL / HSLA

_This will not influence the color of nodes or links created in the future.
If you wish to do this, you need to change the corresponding CSS-classes._

For changing the color of nodes and links, we use `setColor(color, id(s))`.
```javascript
//setting the color for the node with id 0 using an html color name
instance.setColor("bisque", 0)
//setting the color for the node with id 0 and the node with id 1 using hexadecimal
instance.setColor("#8FBC8F", [0,1])
//setting the color for the link that originates from node with id 0 to node with id 1
instance.setColor("orangered", "0-1")

//setting the color for more nodes and links
instance.setColor("#FFDAB9", [1, "0-1", "2-2"])

//setting the color for all currently existing nodes and links using RBG and HSLA
instance.setColor("RGB(250,70,99)")
instance.setColor("HSL(212,92%,45%,0.5)")
```

##### Delete Elements

We can delete **nodes** and **links** by their id. A links id consists of the source nodes and target nodes id, joined by a hyphen.
```javascript
// delete node with id 0
instance.deleteElement(0)
// delete node with id 4 and node with id 2
instance.deleteElement([4,2])
// delete link that goes from node id 0 to node id 1
instance.deleteElement("0-1")
// delete node with id 0 and the link that goes from node id 1 to node id 2
instance.deleteElement([0, "1-2"])
// delete all currently existing nodes and links
instance.deleteElement()
```

#### Editability
We have precise control over **what can be edited through the GUI** using the IDs of the specific nodes and links.

>[!NOTE] If any of this is set for an element, 
this overrides the default behaviour set with `isGraphEditableInGUI`for this specific element.
-> Should be like this in the future, but isnt currentlu todo

##### Deletion and Label Editing
We can set whether nodes or links can be **deleted** with `setDeletable` and whether labels of nodes or links can be 
**edited** using `setLabelEditable`.
```javascript
// prohibit deletion via GUI for node 0 and 1 and the two edges connecting them
instance.setDeletable(false, [0, 1, "0-1", "1-0"])
// allow deletion via GUI for all currently existing nodes and links
instance.setDeletable(true)
```

```javascript
// prohibit label editing via GUI for the node with id 3 and the edge with the id 2-3
instance.setLabelEditable(false, [3, "2-3"])
// prohibit label editing via GUI for all currently existing nodes and links
instance.setLabelEditable(false)
```

##### Nodes fixed position and incoming/outgoing links
Specifically for nodes we can set if they have a **fixed position** and if they are allowed to have 
**incoming and outgoing links**.

The node that has a fixed position cannot be dragged via the GUI and is unaffected by the simulation forces.
This can be configured separately for the x- and y-axes using
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

Additionally, we can control whether certain nodes are allowed to have incoming and
outgoing links with `setNodesLinkPermission(bool, bool)`.

```javascript
// only allow incoming links but no outgoing ones for the nodes with id 2 and 3
instance.setNodesLinkPermission(true, false, [2,3])

// allow neither incoming, nor outgoing links for all currently existing nodes
instance.setNodesLinkPermission(false, false)
```

##### Editability Convenience Function
To set all the editability parameter at once, we can use `setEditability(editabilityObject, id(s))`
with an editability-object and the specific ids as parameters.

- Nodes editability object:`{deletable, labelEditable, fixedDistance: {x, y}, allowIncomingLinks, allowOutgoingLinks}`
- Links editability object:`{deletable, labelEditable}`

When applying the editability object to both nodes and links simultaneously, only the valid options for each type will be set.

```javascript
// setting all possible node editability options at once for the nodes with IDs 0, 1 and 2
instance.setEditability(
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


```javascript
// setting all possible link editability options at once for the link with ID 0-1 and 2-2
instance.setEditability(
    {
        deletable: true,
        labelEditable: false
    },
    ["0-1", "2-2"]    
)
```

```javascript
// setting some editability for all currently existing nodes and links
instance.setEditability(
    {
        deletable: false,
        labelEditable: false,
        fixedPosition: 
            {
                x: true,
                y: true
            },
    },
)
/*Deletable and labelEditable will be applied to both nodes and links, 
whereas fixedPosition will only be applied to nodes.*/
```


#### Appearance
##### Shape and Size

For changing both the shape and the size of nodes, we can use the convenience function named `setnodeProps`.

If we only want to update either the shape or the size individually, we can use `setNodeShape` and `setNodeSize`
for individual nodes.

The `setNodeProps` expects a node property object:
- `{shape: 'circle', radius: number}`
- `{shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
    - For rectangular properties a *width-to-height* ratio smaller than 1:10 is recommended
    - The corner radius should be between 0 and 4
    - Regarding the `reflexiveEdgeStart` property:
        - For movable reflexive edges use `MOVABLE`
        - An edge can also be fixed with one of the following SideType: `RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT`
        - For ratios up to 1:3, both movable and fixed edges are visually fine
        - For ratios between 1:3 and 1:10 prefer using fixed edges
        - Avoid higher ratios, if you still need to use them, use fixed edges and avoid placing them from the short to the long side


```javascript
//set node props for id 0, 1 and 2
instance.setNodeProps(
    {
        shape:'rect',
        width: 42,
        height: 24,
        cornerRadius: 4,
        reflexiveEdgeStart: 'MOVABLE'
    }, [0,1,2]
)
```

To just change the shape of the nodes, we can use `setNodeShape(shape)`, where shape
can be either `'circle'` or `'rect'`.


To change the **size** of the nodes, we can use `setNodeSize(size, sizeY?)`.
The behaviour depends on the shape of the nodes and the type of `size` provided.
We can either use a `number` or an `object` defining the node size.
For circular nodes if `size` is of type `number`, it is used as the _radius_,
for rectangular nodes it is used as the _width_ and also as the _height_ if `sizeY` is not provided.

If `size` is provided as an `object` it is
`{ radius: number }` for circular nodes and`{ width: number, height: number }` for rectangular nodes.


```javascript
//circle
instance.setNodeShape('circle')
instance.setNodeSize({radius: 42}, 2)
instance.setNodeSize(42, 2)
//rectangle
instance.setNodeShape('rect', [0,1])
instance.setNodeSize({width: 42, height:24}, [0,2])
```



##### Miscellaneous
If labels should be shown at all 
and if nodes should be auto sized by the label size 
is a configuration on graph level and not per individual element (see [Graph and Component/Labels](#labels)).
As well as if links should have a fixed distance and if
node should have physics (see [Graph and Component/Simulation Behaviour](#simulation-behaviour)).



### Custom Events
Various events are triggered by different interactions with the graph.

#### Create and Delete
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

#### Click
Event Names:
- `nodeclicked`
- `linkclicked`

In addition to the details provided for creation and deletion events,
the click events also include `detail.button`, indicating the button used for the click.


#### Labels
Event Name: `labeledited`

For label editing events, the following details are available:
- `detail.parent.id` : the ID of the node or link element whose label was edited
- `detail.label`: the updated label text


#### Listening for Events
Events are fired from the graph host. This is where we attach the event listener.

```javascript
// get the graph host
// w/o shadow root
const graphHost = document.getElementById('gc1').querySelector('.graph-controller__graph-host')
// with shadow root
//document.getElementById('gc1').shadowRoot.querySelector('.graph-controller__graph-host')

// add event listener for click on node
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


#### Run Component Tests with Playwright

#### Type-Check and Compile for Production

```sh
  npm run build
```
For more commands refer to the scripts section in [package.json](./package.json).

### Build Configuration

#### Custom Element and LaTeX
Depending on whether you want to build the **Custom Element** with *LaTeX* support
or without it, you have to choose the corresponding method in [main.ce.ts](src/main.ce.ts).

#### Styles
To choose between inline style or an external style.css file *(current default)*,
you have the option for *custom element mode* in [vite.config.ts](vite.config.ts).

