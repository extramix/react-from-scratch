const createTextElement = (text) => {
  return {
    text: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
};

const render = (element, container) => {
  const dom =
    element.text === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  //filter out non-children and assign element props to the node
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
};

const Didact = {
  createElement,
  render,
};

/** @jsx Didact.createElement */
const element = (
  <div id='foo'>
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById('root');
Didact.render(element, container);
