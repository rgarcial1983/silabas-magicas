// ─── DATA ───────────────────────────────────────────────────────
let allWords = [];

// ─── STATE ───────────────────────────────────────────────────────
let playerName = "";
let totalQuestions = 20;
let questions = [];
let current = 0;
let score = 0;
let selectedType = null;
let selectedStressed = null;

// ─── LOAD WORDS FROM JSON ─────────────────────────────────────
fetch("words.json")
  .then(response => response.json())
  .then(data => {
    allWords = data;
  })
  .catch(error => console.error("Error loading words:", error));

// ─── STARS BG ───────────────────────────────────────────────────
const starEmojis = ["⭐","✨","🌟","💫","🔮","🎵","📚","🌈"];
const container = document.getElementById("starsContainer");
for (let i = 0; i < 20; i++) {
  const s = document.createElement("div");
  s.className = "star";
  s.textContent = starEmojis[Math.floor(Math.random()*starEmojis.length)];
  s.style.left = Math.random()*100 + "vw";
  s.style.animationDuration = (12 + Math.random()*20) + "s";
  s.style.animationDelay = (Math.random()*20) + "s";
  s.style.fontSize = (0.8 + Math.random()*1.2) + "rem";
  container.appendChild(s);
}

// ─── GAME FLOW ──────────────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function startGame() {
  const inp = document.getElementById("playerName").value.trim();
  if (!inp) {
    document.getElementById("playerName").focus();
    document.getElementById("playerName").style.borderColor = "var(--aguda)";
    setTimeout(() => document.getElementById("playerName").style.borderColor = "", 1000);
    return;
  }
  playerName = inp;
  totalQuestions = parseInt(document.getElementById("numQuestions").value);
  questions = shuffle(allWords).slice(0, totalQuestions);
  current = 0;
  score = 0;
  selectedType = null;
  selectedStressed = null;

  showScreen("game");
  document.getElementById("displayName").textContent = "👤 " + playerName;
  loadQuestion();
}

function loadQuestion() {
  selectedType = null;
  selectedStressed = null;

  const q = questions[current];
  document.getElementById("questionCounter").textContent = (current + 1) + " / " + totalQuestions;
  document.getElementById("scoreDisplay").textContent = score;
  document.getElementById("progressBar").style.width = ((current / totalQuestions) * 100) + "%";

  // Word display
  document.getElementById("wordDisplay").textContent = q.word;

  // Syllables — rebuild completely
  const area = document.getElementById("syllableArea");
  area.innerHTML = "";
  q.syllables.forEach((syl, i) => {
    const btn = document.createElement("button");
    btn.className = "syllable-bubble";
    btn.textContent = syl;
    btn.dataset.index = i;
    btn.addEventListener("click", function() { markStressed(i); });
    area.appendChild(btn);
  });

  // Reset type buttons — remove selected class AND re-attach onclick cleanly
  document.querySelectorAll(".type-btn").forEach(b => {
    b.classList.remove("selected");
    b.disabled = false;
  });

  // Reset confirm button fully
  const confirmBtn = document.getElementById("confirmBtn");
  confirmBtn.classList.remove("ready");
  confirmBtn.disabled = false;

  // Animate card in
  const card = document.getElementById("wordCard");
  card.style.animation = "none";
  void card.offsetWidth; // force reflow
  card.style.animation = "cardIn 0.4s cubic-bezier(.68,-0.55,.27,1.55)";
}

function markStressed(idx) {
  document.querySelectorAll(".syllable-bubble").forEach((b, i) => {
    b.classList.toggle("stressed", i === idx);
  });
  selectedStressed = idx;
  tryEnableConfirm();
}

function selectType(type) {
  selectedType = type;
  document.querySelectorAll(".type-btn").forEach(b => {
    b.classList.toggle("selected", b.dataset.type === type);
  });
  tryEnableConfirm();
}

function tryEnableConfirm() {
  const btn = document.getElementById("confirmBtn");
  if (selectedType && selectedStressed !== null) {
    btn.classList.add("ready");
  }
}

function checkAnswer() {
  const q = questions[current];
  const correct = selectedType === q.type;
  const pts = correct ? 10 : 0;
  score += pts;

  // Show feedback
  const overlay = document.getElementById("feedbackOverlay");
  overlay.classList.add("show");

  if (correct) {
    document.getElementById("feedbackEmoji").textContent = ["🎉","🏆","⭐","🌟","✨"][Math.floor(Math.random()*5)];
    document.getElementById("feedbackTitle").textContent = ["¡Correcto! 🎊","¡Genial! 🔥","¡Exacto! 💪","¡Así se hace! 🌟"][Math.floor(Math.random()*4)];
    document.getElementById("feedbackTitle").className = "feedback-title correct";
    document.getElementById("feedbackExplanation").innerHTML = getExplanation(q, true);
  } else {
    document.getElementById("feedbackEmoji").textContent = ["😅","🤔","💡","🧐"][Math.floor(Math.random()*4)];
    document.getElementById("feedbackTitle").textContent = "¡Casi! Sigue intentando 💪";
    document.getElementById("feedbackTitle").className = "feedback-title wrong";
    document.getElementById("feedbackExplanation").innerHTML = getExplanation(q, false);
  }
}

function getExplanation(q, correct) {
  const typeNames = { aguda: "AGUDA 🔴", llana: "LLANA 🔵", esdrujula: "ESDRÚJULA 🟣" };
  const stressed = q.syllables.map((s, i) => i === q.stressed ? `<strong>[${s}]</strong>` : s).join(" - ");
  let txt = `<strong>${q.word}</strong> es una palabra <strong>${typeNames[q.type]}</strong><br>`;
  txt += `Sílabas: ${stressed}<br>`;
  if (q.hasTilde) txt += `✅ Lleva tilde.`;
  else txt += `❌ No lleva tilde.`;
  return txt;
}

function nextQuestion() {
  document.getElementById("feedbackOverlay").classList.remove("show");
  current++;
  if (current >= totalQuestions) {
    showResults();
  } else {
    loadQuestion();
  }
}

function showResults() {
  showScreen("results");
  const maxScore = totalQuestions * 10;
  document.getElementById("scoreBig").textContent = score;
  document.getElementById("scoreLabel").textContent = "puntos de " + maxScore;

  const pct = score / maxScore;
  let mascot, msg, stars;

  if (pct === 1) {
    mascot = "🏆"; stars = "⭐⭐⭐⭐⭐";
    msg = `¡PERFECTO, ${playerName}! ¡Eres un auténtico campeón de las sílabas! 🎊`;
  } else if (pct >= 0.9) {
    mascot = "🦸"; stars = "⭐⭐⭐⭐⭐";
    msg = `¡Increíble, ${playerName}! ¡Casi perfecto! Eres un superhéroe de las palabras 💪`;
  } else if (pct >= 0.8) {
    mascot = "🌟"; stars = "⭐⭐⭐⭐";
    msg = `¡Muy bien, ${playerName}! ¡Lo has hecho genial! Sigue practicando 🚀`;
  } else if (pct >= 0.6) {
    mascot = "😊"; stars = "⭐⭐⭐";
    msg = `¡Buen trabajo, ${playerName}! Con un poco más de práctica serás el mejor 🌈`;
  } else if (pct >= 0.4) {
    mascot = "🐣"; stars = "⭐⭐";
    msg = `¡Ánimo, ${playerName}! Estás aprendiendo. Repasa las reglas y vuelve a intentarlo 📚`;
  } else {
    mascot = "🌱"; stars = "⭐";
    msg = `¡No te rindas, ${playerName}! Todos empezamos desde el principio. ¡Repasa y vuelve! 💡`;
  }

  document.getElementById("resultMascot").textContent = mascot;
  document.getElementById("resultName").textContent = playerName;
  document.getElementById("resultMessage").textContent = msg;
  document.getElementById("starsRow").textContent = stars;
}

function resetGame() {
  showScreen("welcome");
  document.getElementById("playerName").value = playerName;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ─── MODAL ──────────────────────────────────────────────────────
function openModal() {
  document.getElementById("modalOverlay").classList.add("show");
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("show");
}
function closeModalOnBg(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}

// Enter key on name input
document.getElementById("playerName").addEventListener("keydown", e => {
  if (e.key === "Enter") startGame();
});
