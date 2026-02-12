const STORAGE_KEY = "traffQuizStateV1";
const CONTACT_EMAIL = "leads@example.com";

const qualificationQuiz = {
  id: "qualification",
  title: "Квалификационный тест",
  timePerQuestion: 15,
  description: "7 вопросов, чтобы определить твой профиль и выдать бонус.",
  questions: [
    {
      text: "Кто из этих стримеров попадал в скандалы из-за рекламы онлайн-казино?",
      options: ["Дима Масленников", "Мелстрой", "Юрий Дудь", "Влад А4"],
      weightMap: { 1: 2 },
    },
    {
      text: "Что тебе интереснее?",
      options: [
        "Гарантированно получить 1 000 ₽",
        "50% шанс получить 3 000 ₽",
        "10% шанс получить 15 000 ₽",
        "Я не люблю рисковать",
      ],
      weightMap: { 1: 2, 2: 2 },
    },
    {
      text: "Если в игре выпадает множитель x10 — это значит:",
      options: [
        "Приз увеличится в 10 раз",
        "Нужно сделать 10 действий",
        "Это уровень сложности",
        "Это просто число без значения",
      ],
      weightMap: { 0: 2 },
    },
    {
      text: "Ты чаще:",
      options: [
        "Долго анализируешь",
        "Действуешь по интуиции",
        "Любишь быстрые решения",
        "Избегаешь неопределенности",
      ],
      weightMap: { 1: 1, 2: 1 },
    },
    {
      text: "Что чаще всего пишут в чате, когда кто-то срывает крупный выигрыш?",
      options: ["Лаки", "GG", "Повезло", "Минус"],
      weightMap: { 0: 1, 1: 1 },
    },
    {
      text: "Вейджер — это:",
      options: [
        "Комиссия банка",
        "Количество прокруток бонуса",
        "Процент налога",
        "Ставка на спорт",
      ],
      weightMap: { 1: 3 },
    },
    {
      text: "Если ты проиграл 5 000 ₽, что ты сделаешь?",
      options: [
        "Прекращу",
        "Попробую отыграться",
        "Попробую позже",
        "Больше не буду играть",
      ],
      weightMap: { 1: 1, 2: 1 },
    },
  ],
};

const extraQuizzes = [
  {
    id: "intuition",
    title: "Насколько ты интуитивен?",
    timePerQuestion: 12,
    questions: [
      "Ты чаще выигрываешь в спорах на интуиции или логике?",
      "Часто ли ты делаешь импульсивные покупки?",
      "Бывает ли, что ты чувствуешь “сейчас повезёт”?",
      "Ты веришь в удачные дни?",
      "Что важнее — стратегия или момент?",
    ],
  },
  {
    id: "risk",
    title: "Твой риск-профиль",
    timePerQuestion: 12,
    questions: [
      "Ты бы вложил деньги в стартап?",
      "Любишь ли экстремальные развлечения?",
      "Ты часто участвуешь в конкурсах?",
      "Тебе интереснее высокая награда или стабильность?",
      "Если шанс 20%, ты попробуешь?",
    ],
  },
  {
    id: "speed",
    title: "Скоростной раунд",
    timePerQuestion: 7,
    questions: [
      "x5 — это больше или меньше x10?",
      "Что выше риск — 10% или 70% шанс?",
      "Что означает бонус?",
      "Если выигрыш 200% — это сколько?",
      "Что выгоднее — 1 ставка 1000 или 10 по 100?",
    ],
  },
  {
    id: "gaming-intuition",
    title: "Игровая интуиция",
    timePerQuestion: 12,
    questions: [
      "Что чаще даёт большой выигрыш — редкий бонус или частые мелкие?",
      "Ты предпочитаешь быстрые игры или длинные?",
      "Любишь ли наблюдать за чужой игрой?",
      "Доверяешь ли ты серии удач?",
      "Веришь ли в “горячие полосы”?",
    ],
  },
].map((quiz) => ({
  ...quiz,
  questions: quiz.questions.map((text) => ({
    text,
    options: ["Скорее да", "Скорее нет", "Зависит от ситуации", "Не знаю"],
    weightMap: { 0: 2, 2: 1 },
  })),
}));

const leaderboardSeed = Array.from({ length: 100 }, (_, idx) => {
  const names = [
    "LuckyFox",
    "RiskWolf",
    "NikaSpin",
    "TurboMax",
    "IceCherry",
    "ShadowBet",
    "Vega88",
    "FlashCat",
    "MoonDice",
    "GGplayer",
  ];
  return {
    nickname: `${names[idx % names.length]}${idx + 1}`,
    points: 2500 - idx * 11,
    avatar: names[idx % names.length][0],
  };
});

const defaultState = {
  qualificationDone: false,
  qualificationScore: 0,
  qualified: false,
  bonusCode: "MVP-LUCK-2026",
  contact: "",
  leaderboardEntry: null,
  completedExtra: [],
};

let state = loadState();
let timer = null;

const screen = document.querySelector("#screen");

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...defaultState, ...stored } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setScreen(html) {
  screen.innerHTML = html;
}

function startApp() {
  if (!state.qualificationDone) {
    renderLanding();
  } else {
    renderHub();
  }
}

function renderLanding() {
  clearTimer();
  setScreen(`
    <span class="badge">MVP • mobile-first</span>
    <h1>Тест на интуицию и удачу</h1>
    <p>Пройди быстрый квиз из 7 вопросов, узнай свой профиль и получи доступ к бонусу и всем дополнительным тестам.</p>
    <div class="stack">
      <button class="button button-primary" id="startQualification">Начать тест</button>
      <button class="button button-secondary" id="resumeProgress">Продолжить с сохранённым прогрессом</button>
    </div>
    <p class="small" style="margin-top: 14px;">Результат и место в рейтинге сохраняются локально в браузере.</p>
  `);
  document.querySelector("#startQualification").addEventListener("click", () => startQuiz(qualificationQuiz));
  document.querySelector("#resumeProgress").addEventListener("click", () => {
    state = loadState();
    startApp();
  });
}

function startQuiz(quiz) {
  const session = {
    quiz,
    index: 0,
    score: 0,
    answers: [],
    left: quiz.timePerQuestion,
  };
  renderQuestion(session);
}

function renderQuestion(session) {
  clearTimer();
  const { quiz, index } = session;
  const question = quiz.questions[index];
  const progress = Math.round((index / quiz.questions.length) * 100);

  setScreen(`
    <div class="progress-wrap">
      <div class="progress-meta">
        <span>${quiz.title}</span>
        <span>${index + 1}/${quiz.questions.length}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
    </div>
    <div class="timer">Осталось времени <strong id="timer">${session.left}с</strong></div>
    <h2>${question.text}</h2>
    <div class="stack" id="answers"></div>
  `);

  const answersNode = document.querySelector("#answers");
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "button button-outline option";
    button.textContent = option;
    button.addEventListener("click", () => choose(session, optionIndex));
    answersNode.appendChild(button);
  });

  timer = setInterval(() => {
    session.left -= 1;
    const timerNode = document.querySelector("#timer");
    if (timerNode) timerNode.textContent = `${session.left}с`;
    if (session.left <= 0) {
      choose(session, null);
    }
  }, 1000);
}

function choose(session, optionIndex) {
  clearTimer();
  const question = session.quiz.questions[session.index];
  const gain = optionIndex !== null ? question.weightMap[optionIndex] || 0 : 0;
  session.score += gain;
  session.answers.push(optionIndex);
  session.index += 1;
  session.left = session.quiz.timePerQuestion;

  if (session.index >= session.quiz.questions.length) {
    if (session.quiz.id === "qualification") {
      finishQualification(session.score);
    } else {
      finishExtraQuiz(session.quiz.id, session.score);
    }
    return;
  }

  renderQuestion(session);
}

function finishQualification(score) {
  const qualified = score >= 6;
  state.qualificationDone = true;
  state.qualificationScore = score;
  state.qualified = qualified;
  saveState();
  renderResult();
}

function finishExtraQuiz(quizId, score) {
  if (!state.completedExtra.includes(quizId)) {
    state.completedExtra.push(quizId);
  }
  if (state.leaderboardEntry) {
    state.leaderboardEntry.points += score * 10;
  }
  saveState();

  setScreen(`
    <h2>Квиз завершён</h2>
    <p>Ты получил <strong>${score}</strong> очков в этом раунде. Продолжай, чтобы подняться выше в недельном топе.</p>
    <div class="stack">
      <button class="button button-primary" id="toHub">К хабу квизов</button>
      <button class="button button-secondary" id="toBoard">Открыть лидерборд</button>
    </div>
  `);
  document.querySelector("#toHub").addEventListener("click", renderHub);
  document.querySelector("#toBoard").addEventListener("click", renderLeaderboard);
}

function renderResult() {
  const level = state.qualificationScore >= 9 ? "Risk Player" : "Intuitive Player";

  if (state.qualified) {
    setScreen(`
      <span class="badge">Ты прошёл квалификацию</span>
      <h2>Ты быстро принимаешь решения и хорошо чувствуешь игровые механики.</h2>
      <p>Уровень: <strong>${level}</strong></p>
      <p>Промокод: <strong>${state.bonusCode}</strong></p>
      <div class="stack">
        <button class="button button-primary" id="bonusBtn">Получить бонус</button>
        <button class="button button-secondary" id="continueBtn">Продолжить</button>
      </div>
      ${contactFormHtml()}
    `);
  } else {
    setScreen(`
      <h2>Ты больше опираешься на рациональность, чем на риск.</h2>
      <p>Доступ к остальным квизам уже открыт — попробуй улучшить позицию в рейтинге.</p>
      <div class="stack">
        <button class="button button-primary" id="continueBtn">Пройти другие квизы</button>
      </div>
      ${contactFormHtml()}
    `);
  }

  const bonusBtn = document.querySelector("#bonusBtn");
  if (bonusBtn) {
    bonusBtn.addEventListener("click", () => {
      navigator.clipboard?.writeText(state.bonusCode);
      bonusBtn.textContent = "Промокод скопирован";
    });
  }

  document.querySelector("#continueBtn").addEventListener("click", renderHub);
  attachContactHandler();
}

function contactFormHtml() {
  return `
    <div class="spacer"></div>
    <h3>Сохрани результат и место в рейтинге</h3>
    <p>Оставь Email или Telegram для участия в розыгрышах и сохранения результата.</p>
    <input id="contactInput" class="input" placeholder="Email или @telegram" value="${state.contact}" />
    <button class="button button-outline" id="saveContact">Сохранить контакт</button>
    <p id="contactStatus" class="small"></p>
  `;
}

function attachContactHandler() {
  const input = document.querySelector("#contactInput");
  const status = document.querySelector("#contactStatus");
  document.querySelector("#saveContact").addEventListener("click", async () => {
    const value = input.value.trim();
    if (!value) {
      status.textContent = "Введите Email или Telegram.";
      return;
    }

    state.contact = value;
    if (!state.leaderboardEntry) {
      state.leaderboardEntry = {
        nickname: value.includes("@") ? value.replace("@", "") : value,
        points: 1800 + state.qualificationScore * 20,
        avatar: value[0].toUpperCase(),
      };
    }
    saveState();

    const payload = {
      contact: value,
      score: state.qualificationScore,
      qualified: state.qualified,
      timestamp: new Date().toISOString(),
    };

    const sent = await sendContact(payload);
    status.textContent = sent
      ? "Контакт сохранён и отправлен."
      : "Контакт сохранён локально. Открылось письмо для ручной отправки.";
  });
}

async function sendContact(payload) {
  try {
    const formData = new FormData();
    formData.append("email", CONTACT_EMAIL);
    formData.append("_subject", "Новый лид Traffic Quiz MVP");
    formData.append("message", JSON.stringify(payload, null, 2));
    formData.append("_captcha", "false");

    const response = await fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("failed");
    return true;
  } catch {
    const body = encodeURIComponent(JSON.stringify(payload, null, 2));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Traffic%20Quiz%20lead&body=${body}`;
    return false;
  }
}

function renderHub() {
  setScreen(`
    <span class="badge">Квиз-хаб</span>
    <h2>Доступные квизы</h2>
    <p>Проходи дополнительные квизы и набирай очки для топ-100 недели.</p>
    <div class="stack" id="quizList"></div>
    <div class="spacer"></div>
    <button class="button button-secondary" id="boardBtn">Открыть лидерборд</button>
    <button class="button button-outline" id="restartBtn" style="margin-top:8px">Перезапустить MVP</button>
  `);

  const list = document.querySelector("#quizList");
  extraQuizzes.forEach((quiz) => {
    const done = state.completedExtra.includes(quiz.id);
    const button = document.createElement("button");
    button.className = "button button-outline option";
    button.innerHTML = `${quiz.title}<br><span class="small">${quiz.questions.length} вопросов · ${quiz.timePerQuestion}с на вопрос${
      done ? " · ✅ пройден" : ""
    }</span>`;
    button.addEventListener("click", () => startQuiz(quiz));
    list.appendChild(button);
  });

  document.querySelector("#boardBtn").addEventListener("click", renderLeaderboard);
  document.querySelector("#restartBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...defaultState };
    renderLanding();
  });
}

function renderLeaderboard() {
  const board = [...leaderboardSeed];
  if (state.leaderboardEntry) board.push(state.leaderboardEntry);
  board.sort((a, b) => b.points - a.points);

  const top100 = board.slice(0, 100);
  setScreen(`
    <h2>Топ-100 недели</h2>
    <p>Статический MVP-лидерборд + твоя позиция с реальными очками.</p>
    <div class="leaderboard" id="rows"></div>
    <div class="spacer"></div>
    <button class="button button-secondary" id="backBtn">Назад к квизам</button>
  `);

  const rows = document.querySelector("#rows");
  top100.forEach((entry, idx) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div class="small">#${idx + 1}</div>
      <div class="user"><span class="avatar">${entry.avatar}</span><span>${entry.nickname}</span></div>
      <div><strong>${entry.points}</strong> <span class="small">pts</span></div>
    `;
    rows.appendChild(row);
  });

  document.querySelector("#backBtn").addEventListener("click", renderHub);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

startApp();
