# Graph-Component

> A simple tool that lets you quickly and interactively **create**, **modify** and **display graphs**.
>
> The focus lies on smaller graphs and manual creation.
 Available as a [standalone editor](https://graphtool.aig.fernuni-hagen.de/) or as a [component](#usage) to integrate into your own project.

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
![Static Badge](https://www.mathjax.org/badge/mj_logo_60x20.png)

## Usage

The Graph Component is provided as a **Custom Element** and as a **Vue Component**, 
available on [GitHub Packages](https://github.com/aig-hagen/aig_graph_component/pkgs/npm/graph-component).

You can install the npm package by running the following steps:
- configure your `.npmrc` by adding `@aig-hagen:registry=https://npm.pkg.github.com` and your token `//npm.pkg.github.com/:_authToken=TOKEN` 
because this package is hosted at GitHub packages, for more information see [GitHub Docs (npm registry)](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)
- install the graph-component via `npm install @aig-hagen/graph-component@latest`

For integration refer to the explanation below.


### Custom Element

Allows easy embedding into your *HTML-file*.

> [!NOTE]
> Npm is only needed to obtain the prebuilt Custom Element. 
> After that, just copy the necessary files into your project and include them in your HTML page.

- reference the `graph-component.js` script for the graph component functionality
- link to`graph-component.css`
- reference the `load-mathjax.js` script for LaTeX integration (optional)
- use the `<graph-component>` tag

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8' />
    <link rel='stylesheet' href='graph-component.css' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Graph Component</title>
    <!-- optional MathJax for TeX notation -->
    <script src='load-mathjax.js' async></script>
</head>
<body style='margin: 0; padding: 0'>
    <graph-component id='gc1'></graph-component>
    <script src='graph-component.js'></script>
</body>
</html>
```


### Vue Component
For integration in your *Vue project*.

- import the GraphComponent
- import the styles
- import the MathJax script for LaTeX integration (optional)
- use `<GraphComponent>`in your template

```vue

<script>
    import { GraphComponent } from '@aig-hagen/graph-component/lib'
    import '@aig-hagen/graph-component/lib/graph-component.css'
    // optional MathJax for Tex notation
    import '@aig-hagen/graph-component/lib/load-mathjax.js'
</script>
<template>
    <GraphComponent ref='graph-component'></GraphComponent>
</template>
```

### Further Examples
If you need further examples you can check out [application-examples](application-examples).


## API
You can create your graph using the GUI, or interact with it
and customize its behaviour via the API.

How the initial behaviour of the component is set, is described in
[setting defaults](#setting-defaults). This is the default behaviour of the graph
and its elements that takes place, if no individual properties for graph nodes and links is set.

Some properties can also be set for [individual elements](#individual-elements).

### Preparation

To be able to call the following functions, we need to get the graph-components instance first.
#### Custom Element
```javascript
// when it is included as a custom element in an html file (<graph-component id='gc1'>)
const instance = document.getElementById('gc1')._instance.exposed
```           
#### Vue Component
Use a template ref to access the component object where you can access the API from.


```vue
<script>
    import { GraphComponent } from '@aig-hagen/graph-component/lib'

    const graphComponent = useTemplateRef<typeof GraphComponent>('graph-component')

    onMounted(() => {
        //Example API usage on template ref
        graphComponent.value!.createNode()
        graphComponent.value!.toggleNodeAutoGrow(false)
    })
</script>
<template>
    <GraphComponent ref='graph-component'></GraphComponent>
</template>
``````

#### Development Mode
```javascript
// when you run the component in development mode
const instance = document.getElementById('app').__vue_app__._instance.exposed
``` 

> [!NOTE]
> When you run the app in development mode, this does not work after a hot-reload.
> It only works correctly on the initial run or after refreshing the site.

### Setting Defaults

We can configure the default behaviour of the graph component and its elements.
A detailed description, what every prop does, will be provided in the following sections.

#### Global vs. Individual Setting

There are props set at graph level, and some at an individual level.

> [!IMPORTANT]
> Props that are set at graph level apply to all elements, regardless of when they were created.
>
>For props that can also be set individually, the default behaviour will only apply
> to elements created after the default settings are set, and only if those elements do not have their own
> individual settings specified.

#### Graph-Level Props

- `zoomEnabled`
- `nodePhysicsEnabled`
- `fixedLinkDistanceEnabled`
- `showNodeLabels`
- `showLinkLabels`
- `allowNodeCreationViaGUI`
    - whether graph nodes can be created via double-clicking on the canvas
    - *for detailed element editability settings, see the [individual element level](#editability-1)*
- `nodeAutoGrowToLabelSize`
    - if set to true, the *nodes can grow dynamically* to match the labels size
        - words in the label will stay on a single line (no horizontal wrapping)
        - the *minimal size* is the set base node size ([individual node size](#shape-and-size))
    - if set to false, the nodes have a fixed size, and label words may wrap to the next line or potentially overflow

#### Individual-Element-Level Props

- `nodeProps`
    - expects a [node property object](#shape-and-size) with a different structure regarding the chosen shape
- `nodeGUIEditability`
    - defines how nodes can be edited via the GUI
    - expects a [node GUI editability object](#editability-convenience-function)
- `linkGUIEditability`
    - defines how links can be edited via the GUI
    - expects a [link GUI editability object](#editability-convenience-function)

#### Example config input object

Example of a complete configuration input object:

```typescript 
// full config input object with rectangular shaped nodes
instance.setDefaults(
    {
        zoomEnabled: false,
        nodePhysicsEnabled: false,
        fixedLinkDistanceEnabled: false,
        showNodeLabels: true,
        showLinkLabels: true,
        allowNodeCreationViaGUI: true,
        nodeAutoGrowToLabelSize: false,
        nodeProps: {
            shape: 'rect',
            width: 42,
            height: 24,
            cornerRadius: 4,
            reflexiveEdgeStart: 'MOVABLE'
        },
        nodeGUIEditability: {
            fixedPosition: { x: false, y: false },
            deletable: true,
            labelEditable: true,
            allowIncomingLinks: true,
            allowOutgoingLinks: true
        },
        linkGUIEditability: {
            deletable: true,
            labelEditable: true
        }
    }
)
```

Alternatively, we can simply specify the props we want to override:

```javascript
// partial config object with circular nodes and restricted GUI editability
instance.setDefaults({
    allowNodeCreationViaGUI: false,
    nodeProps: {
        shape: 'circle',
        radius: 42
    },
    nodeGUIEditability: {
        deletable: false,
        labelEditable: false,
        allowIncomingLinks: false,
        allowOutgoingLinks: false
    }
})
```

### Graph and Component

#### Graph Object

A graph that is displayed in the component can be represented as a **graph object** in _JSON-like_ format or a string in
_Trivial Graph Format (TGF)_.

##### JSON

```javascript
// graph as object with optional normal and LaTeX label, color and x- and y- position
let graphAsObject = {
    nodes: [
        { id: 0, label: "$a_0$", x: 24, y: 24 },
        { id: 1, label: "b", color: "lavenderblush", x: 222, y: 142 },
        { id: 2, label: "c" }
    ],
    links: [
        { sourceId: 0, targetId: 1, label: "$a_0\\ to\\ b$" },
        { sourceId: 2, targetId: 2, label: "c to c" }
    ]
}
```

In _JSON-like_ format the individual [editability options](#editability-1) can be directly passed in.

```javascript
// graph as object with some added editability options
let graphAsObjectWithEditability = {
    nodes: [
        { id: 0, label: "$a_0$", x: 24, fixedPosition: { x: true, y: false } },
        { id: 1, label: "b", color: "lavenderblush", x: 222, y: 142, labelEditable: false },
        { id: 2, label: "c", deletable: false, allowIncomingLinks: false, allowOutgoingLinks: false }
    ],
    links: [
        { sourceId: 0, targetId: 1, label: "$a_0\\ to\\ b}$", deletable: true },
        { sourceId: 2, targetId: 2, label: "c to c", labelEditable: false }
    ]
}
```

##### TGF

```javascript
//graph as tgf with optional normal and LaTeX label
let graphAsTgf = "0 $a_0$\n 1 b\n 2 c\n#\n 0 1 $a_0\\ to\\ b$\n 2 2 c to c"
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

In the JSON format (not available for TGF), you can pass additional parameters to control how much additional
information
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
Similar to [getting a graph](#getting-a-displayed-graph), we can pass optional parameters to determine how detailed this
should be.

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

Also, there is the possibility that the **nodes can grow dynamically** to match the labels size,
if the label exceeds the size of the node.
If this is set, words in the label will stay on a single line (no horizontal wrapping takes places) and the *minimal
size*
will be the ones set in the `nodeProps`.
If it is unset, the nodes have a fixed size, and label words may wrap to the next line or potentially overflow.

```javascript
instance.toggleNodeAutoGrow(true)
```

#### Editability

We can control whether users are allowed to create new nodes by double-clicking on the canvas using
`toggleNodeCreationViaGUI`.

```javascript
instance.toggleNodeCreationViaGUI(false)
```

More fine-granular editability options are also available at [individual element level](#editability-1).

> [!TIP]
> This can be useful, for example, when embedding the component to display a graph for users
> to interact with while limit their capabilities to edit something.

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

The general behaviour of the majority of the following functions is that you can set options based on ids,
where you can pass no, one, or multiple ids.
If the id parameter is skipped, it applies to all currently existing elements
(but not ones that are created in the future - for that, you should change default behaviour).

#### Actions

##### Creating Elements

We can create individual elements with `createNode` or `createLink`.

With `createNode` you can set the optional parameters (which are also explained in the following sections):
`props?: NodeProps,
x?: number,
y?: number,
importedId?: string | number,
label?: string,
nodeColor?: string,
hasFixedPosition?: FixedAxis ,
isDeletableViaGUI?: boolean, 
isLabelEditableViaGUI?: boolean,
allowIncomingLinks?: boolean, 
allowOutgoingLinks?: boolean`

With `createLink`you need to set the source nodes and target nodes id, and optionally you can set the label, color and
gui-editability:
`sourceId: number,
targetId: number,
label?: string,
linkColor?: string,
isDeletableViaGUI?: boolean,
isLabelEditableViaGUI?: boolean`

```javascript
//create a node
instance.createNode()
//create a link from source node with id 0 to target node with id 1
instance.createLink(0, 1)
```

_For a whole graph it is more convenient to use a [graph object](#graph-object) and the [`setGraph`](#display-a-graph)
function._

##### Labels and LaTeX

We can change the labels of existing nodes and links via their id with `setLabel`.

> [!NOTE]
> To use **LaTeX** inside labels you can enclose it in math delimiters `$$`.
*(Use only one pair of delimiters per label).*

```javascript
//setting a new label for the nodes with id 0 and 1 and the link between it
instance.setLabel("new label", [0, 1, "1-0"])
//setting node with id 2 with a latex label
instance.setLabel("$this\\ is\\ g_2$")
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
instance.setColor("#8FBC8F", [0, 1])
//setting the color for the link that originates from node with id 0 to node with id 1
instance.setColor("orangered", "0-1")

//setting the color for more nodes and links
instance.setColor("#FFDAB9", [1, "0-1", "2-2"])

//setting the color for all currently existing nodes and links using RBG and HSLA
instance.setColor("RGB(250,70,99)")
instance.setColor("HSL(212,92%,45%,0.5)")
```

##### Delete Elements

We can delete **nodes** and **links** by their id. A links id consists of the source nodes and target nodes id, joined
by a hyphen.

```javascript
// delete node with id 0
instance.deleteElement(0)
// delete node with id 4 and node with id 2
instance.deleteElement([4, 2])
// delete link that goes from node id 0 to node id 1
instance.deleteElement("0-1")
// delete node with id 0 and the link that goes from node id 1 to node id 2
instance.deleteElement([0, "1-2"])
// delete all currently existing nodes and links
instance.deleteElement()
```

#### Editability

We have precise control over **what can be edited through the GUI** using the IDs of the specific nodes and links.

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
instance.setNodesFixedPosition({ x: true, y: false }, 1)

// fix node 0 and 2 in y direction
instance.setNodesFixedPosition({ x: false, y: true }, [0, 2])

// completely fix all currently existing nodes
instance.setNodesFixedPosition({ x: true, y: true })
instance.setNodesFixedPosition(true)
```

Additionally, we can control whether certain nodes are allowed to have incoming and
outgoing links with `setNodesLinkPermission(bool, bool)`.
Existing links on the nodes are not affected.

```javascript
// only allow incoming links but no outgoing ones for the nodes with id 2 and 3
instance.setNodesLinkPermission(true, false, [2, 3])

// allow neither incoming, nor outgoing links for all currently existing nodes
instance.setNodesLinkPermission(false, false)
```

##### Editability Convenience Function

To set all the editability parameter at once, we can use `setEditability(editabilityObject, id(s))`
with an *editability-object* and the specific ids as parameters.

- Nodes editability object:`{deletable, labelEditable, fixedDistance: {x, y}, allowIncomingLinks, allowOutgoingLinks}`
- Links editability object:`{deletable, labelEditable}`

When applying the editability object to both nodes and links simultaneously, only the valid options for each type will
be set.

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

For changing both the shape and the base size of nodes, we can use the convenience function named `setnodeProps`.

If we only want to update either the shape or the size individually, we can use `setNodeShape` and `setNodeSize`
for individual nodes.

The `setNodeProps` expects a **node property object**:

- `{shape: 'circle', radius: number}`
- `{shape: 'rect', width: number, height: number, cornerRadius: number, reflexiveEdgeStart: SideType | 'MOVABLE'}`
    - For rectangular properties a *width-to-height* ratio smaller than 1:10 is recommended
    - The corner radius should be between 0 and 4
    - Regarding the `reflexiveEdgeStart` property:
        - For movable reflexive edges use `MOVABLE`
        - An edge can also be fixed with one of the following SideType:
          `RIGHT, BOTTOMRIGHT, BOTTOM, BOTTOMLEFT, LEFT, TOPLEFT, TOP, TOPRIGHT`
        - For ratios up to 1:3, both movable and fixed edges are visually fine
        - For ratios between 1:3 and 1:10 prefer using fixed edges
        - Avoid higher ratios, if you still need to use them, use fixed edges and avoid placing them from the short to
          the long side

```javascript
//set node props for id 0, 1 and 2
instance.setNodeProps(
    {
        shape: 'rect',
        width: 42,
        height: 24,
        cornerRadius: 4,
        reflexiveEdgeStart: 'MOVABLE'
    }, [0, 1, 2]
)
```

To just change the shape of the nodes, we can use `setNodeShape(shape, ids?)`, where shape
can be either `'circle'` or `'rect'`.

To change the **base size** of the nodes, we can use `setNodeSize(size, ids?)`,
where size can either be a `number` or an `object` with the following structure:

- `{radius: number}` for circular nodes
- `{width: number, height: number}` for rectangular nodes

```javascript
//circle
instance.setNodeShape('circle')
instance.setNodeSize({ radius: 42 }, 2)
instance.setNodeSize(42, 2)
//rectangle
instance.setNodeShape('rect', [0, 1, 2])
instance.setNodeSize({ width: 42, height: 24 }, [0, 2])
instance.setNodeSize(42, 1) //width and height will be set to 42 in this case
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

- `node-created`
- `node-deleted`
- `link-created`
- `link-deleted`

Additional information can be accessed which include `node: {id, label, x, y}` for nodes
and `link: {id, label}` for links.

#### Click

Event Names:

- `node-clicked`
- `link-clicked`

In addition to the details provided for creation and deletion events,
the click event also include `button`, indicating the button used for the click.
This results in `node: {id, label, x, y}, button` for nodes and `link: {id, label}, button` for links.

#### Labels

Event Name: `label-edited`

For this event the id of the node or link element whose label was edited is available as additional information
as well as the updated label text `parent: {id}, label`.

#### Node Rendered Size Change

Event Name: `node-rendered-size-change`

As additional information the nodes id, the new rendered size and the minimal size is provided,
as well as the previously rendered size `node: {id, renderedSize, baseSize}, previousRenderedSize`.

#### Listening for Events

##### Inside a Vue Library

```vue

<template>
    <graph-component
        @node-clicked="function(clickedNode, button){
            <!--change the color on left click-->
            if(button === 0){
                instance.setColor('#8FBC8F', clickedNode.id)
            }
        }"
    >
    </graph-component>
</template>
```

##### Inside a Custom Element

On the custom element, the events are dispatched as native CustomEvents
and the event arguments (payload) will be exposed as an array on the CustomEvent object as its detail property[^1].

[^1]: https://vuejs.org/guide/extras/web-components.html#events

```javascript
graphComponent.addEventListener('node-clicked', function(e) {
    if (e.detail[1] === 0) {
        //change the color on left click
        instance.setColor('#8FBC8F', e.detail[0].id)
    }
})
```

## Browser compatibility

For the best experience, please use **Firefox** or **Chromium-based browsers** and avoid WebKit-based ones. 

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

When running for the first time, browsers need to be installed by Playwright:

```sh
npx playwright install chromium firefox
```

After that the tests can be run with the following command:

```sh
npm run test-ct
```

To update the screenshots while running the tests, the following command can be used:

```sh
npm run test-ct:update-snapshots
```

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

To choose between inline style or an external graph-component.css file *(current default)*,
you have the option for *custom element mode* in [vite.config.ts](vite.config.ts).

