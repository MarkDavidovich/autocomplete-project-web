import { AutoCompleteTrie } from "./model.js";

const trie = new AutoCompleteTrie(" ");

const addButton = document.querySelector("#add-word-btn");
const inputWord = document.querySelector("#add-word-field");
const wordAmount = document.querySelector("#word-amount");
const inputSuggestion = document.querySelector("#suggestion-field");
const suggestionMenu = document.querySelector("#suggestions-menu");

addButton.addEventListener("click", () => {
  const word = inputWord.value;
  if (!checkInput(word)) {
    showMessage(false, " ✗ Cannot add empty words");
    return;
  }
  wordAmount.innerText++;
  trie.addWord(word);
  showMessage(true, `✓ Added '${word}' to dictionary`);
  inputWord.value = "";
});

inputSuggestion.addEventListener("input", () => {
  if (inputSuggestion.value) {
    suggestionMenu.classList.add("visible");
    const word = inputSuggestion.value;
    const suggestions = trie.predictWords(word);
    const typedLength = word.length;
    suggestionMenu.innerHTML = "";

    for (let suggestion of suggestions) {
      const li = createSuggestionItem(suggestion, typedLength);
      suggestionMenu.appendChild(li);
    }
  } else {
    suggestionMenu.classList.remove("visible");
  }
});

function createSuggestionItem(suggestion, typedLength) {
  const li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");

  span1.textContent = suggestion.slice(0, typedLength);
  span1.classList.add("highlight");
  span2.textContent = suggestion.slice(typedLength);

  li.appendChild(span1);
  li.appendChild(span2);
  return li;
}

const showMessage = (success, info) => {
  const messageContainer = document.querySelector("#message-container");
  messageContainer.classList.remove("hidden");
  messageContainer.textContent = info;

  if (success) {
    messageContainer.classList.add("success");
  } else {
    messageContainer.classList.add("fail");
  }

  setTimeout(() => {
    messageContainer.classList.add("hidden");
  }, 1700);
};

const validateWord = (word) => /^[a-zA-Z]+$/.test(word);

const checkInput = (word) => {
  if (!word) return null;

  if (!validateWord(word)) {
    printMessage(false, `${word} word is invalid!`);
    return null;
  }

  return word;
};
