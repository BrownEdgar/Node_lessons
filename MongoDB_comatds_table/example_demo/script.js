'use strict'

const questions = [
  {
    id: 1,
    question: `Ստեղծել ֆունկցիա, որը կտպի տառային զանգվածի այն տարերը, որոնց մեջ կա տիվ (Օր․ const strings = ['Javascript', 'C++', 'Python(1)', 'PHP', 'Java(2)', 'Ruby', 'C#(3)']; function printStringsWithNumbers(strings)-- > Python(1) Java(2) C#(3))`,
    answer: `
function printStringsWithNumbers(array) {
  array.forEach(element => {
    if (/\d/g.test(element)) {
      console.log(element);
    }
  });
}
printStringsWithNumbers(strings)`
  },
  {
    id: 2,
    question: `Ստեղծել ֆունկցիա, որը ստանալով 2 տարբեր բառեր, կտպի մի այնպիսի նոր բար, որը ստացվել է ամեն բառի հերթական տառը իրար կողք դնելով (Օր․՝  function getStrsConcat('Hello', 'World !!!') --> HWeolrllod !!!)`,
    answer: `
const str = "Hello";
const str2 = "World !!!";

function getStrsConcat(str1, str2) {
  let newStr = "";
  let maxLengthStr = str1.length > str2.length ? str1 : str2; 

  for (let i = 0; i < maxLengthStr.length; i++) {
    if (str1[i] && str2[i]) {
      newStr += str[i] + str2[i];
    } else {
      newStr += maxLengthStr[i];
    }
  }
  console.log(newStr);
}
getStrsConcat(str, str2)`
  },
  {
    id: 3,
    question: `Ստեղծել ֆունկցիա, որը կտպի տառային զանգվածի այն տարերը, որոնց մեջ կա տիվ (Օր․ const strings = ['Javascript', 'C++', 'Python(1)', 'PHP', 'Java(2)', 'Ruby', 'C#(3)']; function printStringsWithNumbers(strings)-- > Python(1) Java(2) C#(3))`,
    answer: `
function printStringsWithNumbers(array) {
  array.forEach(element => {
    if (/\d/g.test(element)) {
      console.log(element);
    }
  });
}
printStringsWithNumbers(strings)`
  },
  {
    id: 4,
    question: `Ստեղծել ֆունկցիա, որը կտպի տառային զանգվածի այն տարերը, որոնց մեջ կա տիվ (Օր․ const strings = ['Javascript', 'C++', 'Python(1)', 'PHP', 'Java(2)', 'Ruby', 'C#(3)']; function printStringsWithNumbers(strings)-- > Python(1) Java(2) C#(3))`,
    answer: `
function printStringsWithNumbers(array) {
  array.forEach(element => {
    if (/\d/g.test(element)) {
      console.log(element);
    }
  });
}
printStringsWithNumbers(strings)`
  },
  {
    id: 5,
    question: `Ստեղծել ֆունկցիա, որը կտպի տառային զանգվածի այն տարերը, որոնց մեջ կա տիվ (Օր․ const strings = ['Javascript', 'C++', 'Python(1)', 'PHP', 'Java(2)', 'Ruby', 'C#(3)']; function printStringsWithNumbers(strings)-- > Python(1) Java(2) C#(3))`,
    answer: `
function printStringsWithNumbers(array) {
  array.forEach(element => {
    if (/\d/g.test(element)) {
      console.log(element);
    }
  });
}
printStringsWithNumbers(strings)`
  },
]

const tableContainer = document.createDocumentFragment();
const tableBody = document.querySelector('table tbody');

function replacertoTags(elem, array) {
  let newAnswer = elem.answer ? elem.answer : elem;

  array.forEach(word => {
    newAnswer = newAnswer.replaceAll(word,
      `<span class=${'tag__' + word} style="${word === ')' ||
        word === '(' || word === ']' || word === '[' || word === "||" ||
        word === '&&' || word === '{' ||
        word === '}' || word === ';' ? "color: dodgerblue" : ""}">${word}</span>`)
  })

  return newAnswer;
}

questions.forEach(elem => {
  const newAnswer = replacertoTags(elem, ['const', 'let', 'function', 'console', 'log', '(', ')', 'if', 'else', '[', ']', '||', '&&', '?', '{', '}', ';']);

  const content = document.createElement('tr');
  content.innerHTML = `<tr>
      <td class="count">
        <p><span>${elem.id}</span></p>
      </td>
      <td class="question">
        <code>
          <pre>${elem.question}</pre>
          <div class="icon-copy">
            <i class="fa-solid fa-copy"></i>
          </div>
        </code>
      </td>
      <td class="answer hidden">
        <code>
          <span class="code-circle-1 code-circle hidden"></span>
          <span class="code-circle-2 code-circle hidden"></span>
          <span class="code-circle-3 code-circle hidden"></span>
          <l-ring class="download-rotate" size="45" stroke="5" bg-opacity="0" speed="2" color="gold"></l-ring>
          <h2 class="show">Show code </h2>
          <pre>
            ${newAnswer}
          </pre>
          <textarea class="answer-text">${elem.answer}</textarea>
          <div class="icon-copy">
            <i class="fa-solid fa-copy"></i>
          </div>

          <i class="fa-solid fa-hammer"></i>
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-check"></i>
        </code>
      </td>
    </tr>`

  tableContainer.append(content);
})
tableBody.append(tableContainer);

// Buttons
const copyBtn = document.querySelectorAll('.fa-copy');
const hammerBtn = document.querySelectorAll('.fa-hammer');
const showBtn = document.querySelectorAll('.show');
const checkBtn = document.querySelectorAll('.fa-check');
const heartBtn = document.querySelectorAll('.fa-heart');

const code = document.querySelector('.answer > code > pre');

// Button for show code
showBtn.forEach(button => {
  let buttonParent = button.closest('code');
  const arrowRotate = buttonParent.querySelector('.download-rotate');
  const codeCircles = buttonParent.querySelectorAll('.code-circle');

  button.addEventListener("click", () => {
    button.style.display = 'none';
    arrowRotate.classList.add('animate');

    setTimeout(() => {
      button.closest('.answer').classList.remove('hidden');
      arrowRotate.classList.remove('animate');
      codeCircles.forEach(circle => circle.classList.remove('hidden'));
    }, 800);
  })
})

// Button for copy code
copyBtn.forEach(button => {
  let buttonParent = button.closest('code');

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(buttonParent.querySelector('pre').innerText);
    button.classList.add('copied');

    setTimeout(() => {
      button.classList.remove('copied');
    }, 1000);
  })
})

// Button for change code
hammerBtn.forEach(button => {
  let buttonParent = button.closest('code');

  button.addEventListener("click", () => {
    buttonParent.querySelector('.answer-text').classList.toggle('changing');
    buttonParent.querySelector('.answer-text').focus();
    buttonParent.classList.toggle('hidden');
  });
})

// Button heart
heartBtn.forEach(button => {
  let buttonParent = button.closest('code');
  const heart = buttonParent.querySelector('.fa-heart');

  button.addEventListener("click", () => {
    heart.classList.toggle('liked');
    if (heart.classList.contains('liked')) {
      heart.classList.replace('fa-regular', 'fa-solid');
    } else {
      heart.classList.replace('fa-solid', 'fa-regular');
    }
  })
})

// Button check
checkBtn.forEach(button => {
  let buttonParent = button.closest('code');

  button.addEventListener("click", () => {
    buttonParent.querySelector('.answer-text').classList.remove('changing');
    buttonParent.classList.toggle('hidden');

    const upDateCode = buttonParent.querySelector('.answer-text').value;
    const newAnswer = replacertoTags(upDateCode, ['const', 'let', 'function', 'console', 'log', '(', ')', 'if', 'else', '[', ']', '||', '&&', '?'])
    buttonParent.querySelector('pre').innerHTML = '\n' + newAnswer;
  })
})