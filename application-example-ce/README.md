# Custom Element Example

This directory provides the Graph Component as a Custom Element and 
demonstrates the integration of it.

## What you need
In your html you need to:
  * uses the `<graph-component>` tag
  * reference the `graph-editor.js` script for the graph component functionality
  * reference the `load-mathjax.js` script for LaTeX integration
  * link to `style.css`

Look at [this index file](./Menu/index.ce.html) for a minimal integration example
or at [this one](./CLI/index.ce.html) if you also want an example of two integrated
components as well as the programmatic interaction with the component.

## Which graph-editor.js to choose?
### CLI
* __Programmatic__ interaction possible
* __LaTex__ Support
* No menu bar

### Menu
* Ideal for __GUI__ Usage with __Menu Bar__
* No programmatic interaction possible
* No LaTeX support
