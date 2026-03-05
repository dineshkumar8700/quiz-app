import { createFragment, ELEMENTS } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, DIV, INPUT, LABEL, BUTTON } =
  ELEMENTS;

const createInput = (value, i) => [
  DIV,
  {},
  [INPUT, { type: "radio", name: "options", id: `option-${i}`, value }],
  [LABEL, { for: `option-${i}` }, value],
];

const createQuiz = (container) => {
  const question = "What is the capital of India";
  const options = ["Tokyo", "New Delhi", "Islamabad"];
  const questionNumber = 1;

  const fragment = createFragment(
    [
      ARTICLE,
      {},
      [FORM, {}, [FIELDSET, {}, [LEGEND, {}, [
        H2,
        {},
        `${questionNumber}. ${question}`,
      ]], ...options.map(createInput)], [BUTTON, {}, "Submit"]],
    ],
  );

  container.append(fragment);
};

globalThis.onload = () => {
  const section = document.querySelector("section");
  createQuiz(section);

  const submitBtn = document.querySelector("form button");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Hello World");
  });
};
