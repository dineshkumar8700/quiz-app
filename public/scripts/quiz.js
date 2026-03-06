import { createFragment, ELEMENTS } from "./dom.js";
import { questionBank } from "./question_bank.js";
let currentQuestionNumber = 0;

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, DIV, INPUT, LABEL, BUTTON } =
  ELEMENTS;

const fetchQuiz = async () => questionBank[currentQuestionNumber];

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
  attachListenrs(container);
};

const clearPreviousQuestion = (container) => {
  const article = container.querySelector("article");
  article.remove();
};

const attachListenrs = (section) => {
  const submitBtn = section.querySelector("form button");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearPreviousQuestion(section);
    displayQuiz(section);
  });
};

const displayQuiz = (container) => {
  fetchQuiz()
    .then((response) => createQuiz(response, container));

  currentQuestionNumber++;
};

globalThis.onload = () => {
  const section = document.querySelector("section");

  displayQuiz(section);
};
