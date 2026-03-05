export const createFragment = ([tag, attrs, ...content]) => {
  const element = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    element.setAttribute(key, val);
  }

  if (content.length === 1 && !Array.isArray(content[0])) {
    element.textContent = content;
    return element;
  }

  element.append(...content.map(createFragment));
  return element;
};

export const ELEMENTS = {
  ARTICLE: "article",
  FORM: "form",
  FIELDSET: "fieldset",
  LEGEND: "legend",
  H2: "h2",
  DIV: "div",
  INPUT: "input",
  LABEL: "label",
  BUTTON: "button",
};
