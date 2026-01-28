export class AutoCompleteTrie {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
    let currentNode = this;
    let isNew = false;

    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new AutoCompleteTrie(char);
        isNew = true;
      }
      currentNode = currentNode.children[char];
    }
    if (!currentNode.endOfWord) {
      currentNode.endOfWord = true;
      isNew = true;
    }

    return isNew;
  }

  findWord(word) {
    let currentNode = this;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }
    return currentNode.endOfWord;
  }

  predictWords(prefix) {
    try {
      const node = this._getRemainingTree(prefix);
      const allWords = [];

      if (!node) {
        return [];
      }

      this._allWordsHelper(prefix, node, allWords);
      return allWords;
    } catch (err) {
      console.error(`Error in predictWords: ${err.message}`);
      return [];
    }
  }

  _getRemainingTree(prefix, node = this) {
    let currentNode = node;
    for (let char of prefix) {
      if (!currentNode.children[char]) {
        return null;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode;
  }

  _allWordsHelper(prefix, node, allWords) {
    try {
      if (node.endOfWord) {
        allWords.push(prefix);
      }

      for (let char in node.children) {
        let childNode = node.children[char];

        this._allWordsHelper(prefix + char, childNode, allWords);
      }
    } catch (err) {
      console.error(`Error in _allWordsHelper: ${err.message}`);
    }
  }
}
