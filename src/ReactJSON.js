import Reconciler from "react-reconciler";

const createHostConfig = () => ({
  now: Date.now,
  getRootHostContext: () => {
    let rootContext = {};
    return rootContext;
  },
  getChildHostContext: (parentContext, fiberType) => {
    let context = { type: fiberType };
    return context;
  },
  shouldSetTextContent: () => {
    return false;
  },
  createTextInstance: newText => {
    return { type: "text", value: newText };
  },
  createInstance: (type, newProps) => {
    return Object.keys(newProps)
      .filter(key => key !== "children")
      .reduce(
        (acc, key) => {
          acc[key] = newProps[key];
          return acc;
        },
        { type }
      );
  },
  appendChildToContainer: (parent, child) => {
    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push(child);
  },
  finalizeInitialChildren: () => {
    return false;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  commitMount: () => {},
  appendInitialChild: (parent, child) => {
    if (!parent.children) {
      parent.children = [];
    }

    parent.children.push(child);
  },
  supportsMutation: true,
  removeChildFromContainer: (container, child) => {
    if (container.children) {
      container.children.splice(container.children.indexOf(child), 1);
    }
  },
  prepareUpdate: () => {},
  commitTextUpdate: (textInstance, oldText, newText) => {
    textInstance.value = newText;
  },
  commitUpdate: () => {},
  appendChild: (parentInstance, child) => {
    parentInstance.children.push(child);
  },
  removeChild: (parentInstance, child) => {
    parentInstance.children.splice(parentInstance.children.indexOf(child), 1);
  },
  resetTextContent: () => {},
  shouldDeprioritizeSubtree: () => {
    return false;
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.children.splice(
      container.children.indexOf(beforeChild) - 1,
      0,
      child
    );
  },
  insertBefore: (parentInstance, child, beforeChild) => {
    parentInstance.children.splice(
      parentInstance.children.indexOf(beforeChild) - 1,
      0,
      child
    );
  }
});

const ReactJSON = {
  mount(element, renderDom, callback) {
    const isAsync = false;
    const reconcilerInstance = Reconciler(createHostConfig());
    const container = reconcilerInstance.createContainer(renderDom, isAsync);

    const parentComponent = null;
    reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
      callback
    );
  }
};

export default ReactJSON;
