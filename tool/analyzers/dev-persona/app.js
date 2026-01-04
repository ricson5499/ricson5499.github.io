let index = 0;
let score = {};

dimensions.forEach(d => score[d] = 0);

const titleEl = document.getElementById("question-title");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");

function renderQuestion() {
  const q = questions[index];
  titleEl.textContent = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary";
    btn.textContent = opt.text;
    btn.onclick = () => select(opt);
    optionsEl.appendChild(btn);
  });

  progressEl.style.width = `${(index / questions.length) * 100}%`;
}

function select(option) {
  Object.entries(option.score).forEach(([k, v]) => {
    score[k] += v;
  });

  index++;
  if (index < questions.length) {
    renderQuestion();
  } else {
    finish();
  }
}

function normalize(s) {
  const max = Math.max(...Object.values(s));
  Object.keys(s).forEach(k => s[k] = +(s[k] / max).toFixed(2));
  return s;
}

function finish() {
  normalize(score);
  const persona = personas.find(p => p.match(score)) || personas[personas.length - 1];

  document.getElementById("result-title").textContent = persona.title;
  document.getElementById("result-desc").textContent = persona.desc;

  new Chart(document.getElementById("chart"), {
    type: "radar",
    data: {
      labels: Object.keys(score),
      datasets: [{
        label: "Your Profile",
        data: Object.values(score),
        fill: true
      }]
    }
  });

  new bootstrap.Modal("#resultModal").show();
}

renderQuestion();
