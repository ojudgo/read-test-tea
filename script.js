let sentences = [
  {
    id: 1,
    sentence: 'The cat sat on the mat.',
    questions: `
      <p><strong>a) Where did the cat sit?</strong><br>
      On the mat. <label> Lit <input type="checkbox"></label></p>

      <p><strong>b) What might the cat do next?</strong><br>
      Get up or any reasonable suggestion.
      <label> Inf <input type="checkbox"></label></p>

      <p><strong>c) What word in the sentence means the same as mat?</strong><br>
      Mat <label> Voc <input type="checkbox"></label></p>
    `
  },
  {
    id: 2,
    sentence: 'Park in front of the shop.',
    questions: `
      <p><strong>a) Where should you park?</strong><br>
      In front of the shop. <label> Lit <input type="checkbox"></label></p>

      <p><strong>b) What might you do next?</strong><br>
      Go into the shop or any reasonable suggestion.
      <label> Inf <input type="checkbox"></label></p>

      <p><strong>c) What word in the sentence means the same as store?</strong><br>
      Shop <label> Voc <input type="checkbox"></label></p>
    `
  },
  {
    id: 3,
    sentence: 'It is a truth universally acknowledged.',
    questions: `
      <p><strong>a) What is the truth?</strong><br>
      Universally acknowledged.
      <label> Lit <input type="checkbox"></label></p>

      <p><strong>b) What might the truth be?</strong><br>
      Universally acknowledged or any reasonable suggestion.
      <label> Inf <input type="checkbox"></label></p>

      <p><strong>c) What word in the sentence means the same as fact?</strong><br>
      Truth <label> Voc <input type="checkbox"></label></p>
    `
  }
];

let currentQuestion = 0;  // 0-based index
let cumulativeTotal = 0;

// Helper to generate word buttons
function makeButtons(sentence) {
  const words = sentence.split(' ');
  return words.map((word, i) => 
    `<button type="button" class="word" id="word${i}">${word}</button>`
  ).join('');  
}

// Render a question
function renderQuestion() {
  const question = sentences[currentQuestion];
  const sentenceButtons = makeButtons(question.sentence);

  // Update static HTML containers
  document.getElementById('question-title').textContent = `Question ${currentQuestion + 1}`;
  document.getElementById('sentenceContainer').innerHTML = sentenceButtons;
  document.getElementById('wordsInSentence').textContent = `Words in sentence: ${question.sentence.split(' ').length}`;
  cumulativeTotal += question.sentence.split(' ').length;
  document.getElementById('cumulativeTotal').textContent = `Cumulative total: ${cumulativeTotal}`;
  document.getElementById('questionsContainer').innerHTML = question.questions;
}

// Event delegation for sentence buttons
const selectedWords = new Set();
document.getElementById('sentenceContainer').addEventListener('click', (e) => {
  if (!e.target.classList.contains('word')) return;

  const btn = e.target;
  const id = btn.id;

  if (selectedWords.has(id)) {
    selectedWords.delete(id);
    btn.classList.remove('selected');
  } else {
    selectedWords.add(id);
    btn.classList.add('selected');
  }
});

// Next button
document.getElementById('next-button').addEventListener('click', () => {
  
  if (currentQuestion < sentences.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    alert('All questions completed!');
  }
});

// Initial render
renderQuestion();
