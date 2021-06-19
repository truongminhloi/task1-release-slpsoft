import {
  Diagram,
  NodeModel,
  UndoRedo,
  ConnectorModel,
  PointPortModel,
  SymbolPalette,
  SymbolInfo,
  GridlinesModel,
  PaletteModel,
  BasicShapes 
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
Diagram.Inject(UndoRedo);

//Create and add ports for node.
function getPorts(): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}

//Sets the default values of a node
function getNodeDefaults(node: NodeModel): NodeModel {
  let obj: NodeModel = {};
  if (obj.width === undefined) {
    obj.width = 145;
  } else {
    let ratio: number = 100 / obj.width;
    obj.width = 100;
    obj.height *= ratio;
  }
  obj.annotations = [{ style: { color: 'black', fill: 'transparent' } }];
  //Set ports
  obj.ports = getPorts();
  return obj;
}

//Sets the default values of a connector
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
  if (obj.id.indexOf('connector') !== -1) {
    obj.type = 'Orthogonal';
    obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
  }
  return obj;
}

function getBasicShape(id: string, shapeType: BasicShapes): NodeModel {
  let basicshape: NodeModel = {
    id: id,
    width: 100,
    height: 100,
    shape: { type: 'Basic', shape: shapeType }
  };
  return basicshape;
}

function getSymbolInfo(symbol: NodeModel): SymbolInfo {
  return { fit: true };
}

// tslint:disable-next-line:max-func-body-length

let bounds: ClientRect = document
  .getElementById('diagram-space')
  .getBoundingClientRect();
let centerX: number = bounds.width / 2;
let interval: number[] = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75
];

let gridlines: GridlinesModel = {
  lineColor: '#e0e0e0',
  lineIntervals: interval
};
// Initializes the nodes for the diagram
var offsetx = 200;
var offsety = 100;
let nodes: NodeModel[] = [
  {
    id: 'shape1',
    width: 160,
    height: 100,
    offsetX: offsetx,
    offsetY: offsety,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id: 'shape2',
    width: 50,
    height: 50,
    offsetX: offsetx,
    offsetY: offsety,
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id: 'shape3',
    width: 200,
    height: 120,
    offsetX: offsetx + 300,
    offsetY: offsety,
    shape: { type: 'Basic', shape: 'Rectangle' }
  },
  {
    id: 'shape4',
    width: 50,
    height: 50,
    offsetX: offsetx + 280,
    offsetY: offsety,
    shape: { type: 'Basic', shape: 'RightTriangle' }
  },
  {
    id: 'shape5',
    width: 100,
    height: 50,
    offsetX: offsetx,
    offsetY: offsety + 210,
    shape: { type: 'Basic', shape: 'Ellipse' }
  },
  {
    id: 'shape6',
    width: 100,
    height: 100,
    offsetX: offsetx,
    offsetY: offsety + 300,
    shape: { type: 'Basic', shape: 'Rectangle' }
  }
];

//Initializes diagram control
let diagram: Diagram = new Diagram({
  width: '100%',
  height: '700px',
  nodes: nodes,
  snapSettings: {
    horizontalGridlines: gridlines,
    verticalGridlines: gridlines
  },
  //Sets the default values of a node
  getNodeDefaults: getNodeDefaults,
  //Sets the default values of a connector
  getConnectorDefaults: getConnectorDefaults
});
diagram.appendTo('#diagram');

//Initialize the My Library 1 for the symbol palatte
let MyLibrary1: NodeModel[] = [
  getBasicShape('Rectangle', 'Rectangle'),
  getBasicShape('Ellipse', 'Ellipse'),
  getBasicShape('RightTriangle', 'RightTriangle')
];

//Initialize the My Library 2 for the symbol palatte
let MyLibrary2: NodeModel[] = [
  {
    id: 'rectangle1',
    offsetX: 100,
    offsetY: 100,
    width: 150,
    height: 100
  },
  {
    id: 'or',
    shape: { type: 'Basic', shape: 'Ellipse' },
    offsetX: 100,
    offsetY: 100,
    width: 60,
    height: 60
  },
  {
    id: 'group1',
    children: ['rectangle1', 'or']
  },
  {
    id: 'or2',
    shape: { type: 'Flow', shape: 'Extract' },
    offsetX: 80,
    offsetY: 50,
    width: 60,
    height: 60
  },
  {
    id: 'group2',
    children: ['rectangle1', 'or2']
  },
  {
    id: 'rectangle3',
    offsetX: 272,
    offsetY: 372,
    width: 150,
    height: 100
  },
  {
    id: 'or3',
    shape: { type: 'Basic', shape: 'Ellipse' },

    offsetX: 272,
    offsetY: 272,
    width: 60,
    height: 60
  },
  {
    id: 'group3',
    children: ['rectangle3', 'or3']
  },
  {
    id: 'rectangle4',
    offsetX: 100,
    offsetY: 100,
    width: 150,
    height: 100
  },
  {
    id: 'Data',
    shape: { type: 'Flow', shape: 'Data' },
    offsetX: 100,
    offsetY: 100,
    width: 60,
    height: 60
  },
  {
    id: 'group1',
    children: ['rectangle4', 'Data']
  }
];
//Initializes connector symbols for the symbol palette
var connectorSymbols = [
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#757575' },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#757575', fill: '#757575' }
    }
  },
  {
    id: 'link3',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeColor: '#757575' }
  },
  {
    id: 'Link21',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    style: { strokeWidth: 1, strokeColor: '#757575' },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#757575', fill: '#757575' }
    }
  },
  {
    id: 'link23',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeColor: '#757575' }
  },
  {
    id: 'link33',
    type: 'Bezier',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: { shape: 'None' },
    style: { strokeWidth: 1, strokeColor: '#757575' }
  }
];
let palettes: PaletteModel[] = [
  {
    id: 'MyLibrary1',
    expanded: true,
    symbols: MyLibrary1,
    iconCss: 'e-ddb-icons e-basic',
    title: 'My Libary 1'
  },
  {
    id: 'MyLibrary2',
    expanded: true,
    symbols: MyLibrary2,
    iconCss: 'e-ddb-icons e-basic',
    title: 'My Libary 2'
  },
  {
    id: 'connectorSymbols',
    expanded: true,
    symbols: connectorSymbols,
    iconCss: 'e-ddb-icons e-connector',
    title: 'Connectors'
  }
];
//Initializes the symbol palette
let palette: SymbolPalette = new SymbolPalette({
  expandMode: 'Multiple',
  palettes: palettes,
  width: '100%',
  height: '700px',
  symbolHeight: 60,
  symbolWidth: 100,
  symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
  getSymbolInfo: getSymbolInfo
});
palette.appendTo('#symbolpalette');

addEvents();
