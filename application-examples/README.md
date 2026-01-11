# Application Example

This directory provides integration and application examples of the component as a Custom Element and as a Vue Library.

## Custom Element
### What you need
In your html you need to:
  * use the `<graph-component>` tag
  * reference the `graph-component.js` script for the graph component functionality
  * reference the `load-mathjax.js` script for LaTeX integration
  * link to `style.css`

Look at [this index file](./Menu/index.ce.html) for a minimal integration example
or at [this one](./API/index.ce.html) if you also want an example of two integrated
components as well as the programmatic interaction with the component.
## Vue Library
### What you need
In your Vue App you need to:   
* import the Graph Component
* mount it as a component and use it in the template as `<graph-component>`

## Which graph-editor.js to choose?
### API Directory
* __Programmatic__ interaction possible
* __LaTex__ Support
* No menu bar

### Menu Directory
_Still V3.0, will be updated with V3.3_
* Ideal for __GUI__ Usage with __Menu Bar__
* No programmatic interaction possible
* No LaTeX support
