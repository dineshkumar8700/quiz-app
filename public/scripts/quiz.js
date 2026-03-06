import { createFragment, ELEMENTS } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, DIV, INPUT, LABEL, BUTTON } =
  ELEMENTS;

const fetchQuiz = async () => {
  return {
    question: "What is the capital of India",
    options: ["Tokyo", "New Delhi", "Islamabad"],
    questionNumber: 1,
  };
};

const fetchNextQuiz = async () => {
  return {
    question: "What is the capital of Pakistan",
    options: ["Paris", "Tokyo", "Islamabad"],
    questionNumber: 2,
  };
};

const createInput = (value, i) => [
  DIV,
  {},
  [INPUT, { type: "radio", name: "options", id: `option-${i}`, value }],
  [LABEL, { for: `option-${i}` }, value],
];

const createQuiz = ({ question, options, questionNumber }, container) => {
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

const displayNextQuiz = (section) => {
  fetchNextQuiz()
    .then((response) => {
      section.firstElementChild.remove();
      createQuiz(response, section);
    })
    .then((_) => attachListenrs(section));
};

const attachListenrs = (section) => {
  const submitBtn = section.querySelector("form button");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayNextQuiz(section);
  });
};

globalThis.onload = () => {
  const section = document.querySelector("section");

  fetchQuiz()
    .then((response) => createQuiz(response, section))
    .then((_) => attachListenrs(section));
};
