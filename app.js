const STORAGE_KEY = "traffQuizStateV1";
const CONTACT_EMAIL = "leads@example.com";
const BONUS_URL = "https://real1000.org/";

const IMAGE_ASSETS = {
  landing: "main.jpg",
  qualificationQuestions: [
    "1.webp",
    "2.jpeg",
    "3.png",
    "4.jpg",
    "5.avif",
    "6.jpg",
    "7.jpg",
  ],
  result: "end.png",
};

const qualificationQuiz = {
  id: "qualification",
  title: "Стартовый тест",
  timePerQuestion: 15,
  description: "7 вопросов, чтобы определить твой профиль и открыть доступ к квизам.",
  questions: [
    {
      text: "Кто из этих стримеров попадал в скандалы из-за рекламы онлайн-казино 🎰?",
      visualHint: "картинка",
      options: ["Дима Масленников", "Мелстрой", "Юрий Дудь", "Влад А4"],
      weightMap: { 1: 2 },
    },
    {
      text: "Что тебе интереснее? 🤔",
      visualHint: "картинка",
      options: [
        "Гарантированно получить 1 000 ₽",
        "50% шанс получить 3 000 ₽",
        "10% шанс получить 15 000 ₽",
        "Я не люблю рисковать",
      ],
      weightMap: { 1: 2, 2: 2 },
    },
    {
      text: "Если в игре выпадает множитель x1️⃣0️⃣ — это значит:",
      visualHint: "картинка",
      options: [
        "Приз увеличится в 10 раз",
        "Нужно сделать 10 действий",
        "Это уровень сложности",
        "Это просто число без значения",
      ],
      weightMap: { 0: 2 },
    },
    {
      text: "Ты чаще: 🧠",
      visualHint: "картинка",
      options: [
        "Долго анализируешь",
        "Действуешь по интуиции",
        "Любишь быстрые решения",
        "Избегаешь неопределенности",
      ],
      weightMap: { 1: 1, 2: 1 },
    },
    {
      text: "Что чаще всего пишут в чате, когда кто-то срывает крупный выигрыш? 💬 ",
      visualHint: "картинка",
      options: ["Лаки", "GG", "Повезло", "Минус"],
      weightMap: { 0: 1, 1: 1 },
    },
    {
      text: "Вейджер — это: 📚",
      visualHint: "картинка",
      options: [
        "Комиссия банка",
        "Количество прокруток бонуса",
        "Процент налога",
        "Ставка на спорт",
      ],
      weightMap: { 1: 3 },
    },
    {
      text: "Если ты проиграл 5 000 ₽, что ты сделаешь? 🎲 ",
      visualHint: "картинка",
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
    text: `${text} ❓`,
    visualHint: "картинка",
    options: ["Скорее да", "Скорее нет", "Зависит от ситуации", "Не знаю"],
    weightMap: { 0: 2, 2: 1 },
  })),
}));

const leaderboardSeed = Array.from({ length: 100 }, (_, idx) => {
  const names = ["LuckyFox", "RiskWolf", "NikaSpin", "TurboMax", "IceCherry", "ShadowBet", "Vega88", "FlashCat", "MoonDice", "GGplayer"];
  return {
    nickname: `${names[idx % names.length]}${idx + 1}`,
    points: 2500 - idx * 11,
    avatar: names[idx % names.length][0],
  };
});

const landingLeaders = [
  { place: 1, name: "Дима Лорд", points: "3 900 000" },
  { place: 2, name: "Стетхем", points: "3 720 000" },
  { place: 3, name: "Дуэйн Скала Джонсон", points: "3 480 000" },
  { place: 4, name: "Барак Обэма", points: "3 210 000" },
];

const resultLeaders = [
  { place: 1, name: "Дима Лорд", points: "3 980 000" },
  { place: 2, name: "NeoTiger", points: "3 760 000" },
  { place: 3, name: "Люся Flash", points: "3 540 000" },
  { place: 4, name: "Стетхем", points: "3 280 000" },
];

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

function imageBlockHtml(src, alt) {
  if (!src) {
    return '<div class="image-placeholder">🖼️ Картинка появится здесь</div>';
  }

  return `
    <div class="image-frame">
      <img src="${src}" alt="${alt}" class="image-fit-height" />
    </div>
  `;
}

function openBonusSite() {
  window.open(BONUS_URL, "_blank", "noopener,noreferrer");
}

function startApp() {
  renderLanding();
}

function quizCardHtml(quiz, { locked, completed }) {
  const lockIcon = locked ? '<span class="lock">🔒</span>' : "";
  const done = completed ? " · ✅ пройден" : "";
  return `
    <article class="quiz-card ${locked ? "locked" : ""}" ${locked ? 'data-tooltip="Станет доступно после прохождения первого теста"' : ""}>
      <div>
        <h3>${quiz.title} ${lockIcon}</h3>
        <p class="small">${quiz.questions.length} вопросов · ${quiz.timePerQuestion}с на вопрос${done}</p>
      </div>
      <button class="button ${locked ? "button-outline" : state.qualified ? "button-muted" : "button-primary"}" ${locked ? "disabled" : ""} data-quiz="${quiz.id}">
        ${locked ? "Недоступно" : "Начать"}
      </button>
    </article>
  `;
}

function renderLanding() {
  clearTimer();

  setScreen(`
    <section class="landing-hero">
      <h1>Проходи тесты и выигрывай призы</h1>
      <p>Тебе доступен первый стартовый тест из 7 вопросов. Сможешь выиграть приз на 5 000 000 монет?</p>
      ${imageBlockHtml(IMAGE_ASSETS.landing, "Главная иллюстрация квиза")}
      <article class="quiz-card featured">
        <div>
          <h3>${qualificationQuiz.title}</h3>
          <p class="small">${qualificationQuiz.questions.length} вопросов · ${qualificationQuiz.timePerQuestion}с на вопрос${
            state.qualificationDone ? " · ✅ пройден" : ""
          }</p>
        </div>
        <button class="button ${state.qualified ? "button-bonus" : "button-primary"}" id="startQualification">${state.qualified ? "Забрать бонус" : state.qualificationDone ? "Пройти снова" : "Начать тест"}</button>
      </article>
      <div class="stack" id="extraCards"></div>
      <p class="small">После первого теста откроются дополнительные квизы и новые награды.</p>
    </section>

    <section class="landing-board">
      <h2>🏆 Лидерборд недели</h2>
      <div class="leaderboard static-board" id="landingBoard"></div>
    </section>
  `);

  document.querySelector("#startQualification").addEventListener("click", () => {
    if (state.qualified) {
      openBonusSite();
      return;
    }
    startQuiz(qualificationQuiz);
  });

  const cards = document.querySelector("#extraCards");
  cards.innerHTML = extraQuizzes
    .map((quiz) =>
      quizCardHtml(quiz, {
        locked: !state.qualificationDone,
        completed: state.completedExtra.includes(quiz.id),
      }),
    )
    .join("");

  if (state.qualificationDone) {
    cards.querySelectorAll("button[data-quiz]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = extraQuizzes.find((quiz) => quiz.id === button.dataset.quiz);
        if (selected) startQuiz(selected);
      });
    });
  }

  const board = document.querySelector("#landingBoard");
  buildFirstTestLeaderboard(landingLeaders, { includePrizeButton: true }).forEach((entry) => {
    board.appendChild(createLeaderboardRow(entry));
  });
}

function buildFirstTestLeaderboard(baseLeaders, options = {}) {
  const { includePrizeButton = false } = options;
  const leaders = baseLeaders.map((entry) => ({
    ...entry,
    type: "default",
  }));

  if (!state.qualificationDone) {
    return leaders;
  }

  if (state.qualified) {
    const shifted = leaders.map((entry) => ({
      ...entry,
      place: entry.place + 1,
    }));
    return [
      {
        place: 1,
        name: "Вы",
        points: "5 000 000",
        type: "player",
        highlighted: true,
        prizeButton: includePrizeButton,
      },
      ...shifted,
    ];
  }

  return [
    ...leaders,
    {
      place: "...",
      name: "...",
      points: "...",
      type: "ellipsis",
    },
    {
      place: 1847,
      name: "Вы",
      points: "0",
      type: "player",
    },
  ];
}

function createLeaderboardRow(entry) {
  const row = document.createElement("div");
  row.className = `row${entry.highlighted ? " row-highlighted" : ""}`;
  const pointsLabel = entry.type === "ellipsis" ? "" : ' <span class="small">монет</span>';
  const prizeButton = entry.prizeButton
    ? '<button class="button button-bonus prize-claim" type="button">Забрать бонус</button>'
    : "";

  row.innerHTML = `
    <div class="small">#${entry.place}</div>
    <div class="user"><span>${entry.name}</span></div>
    <div class="leader-score"><strong>${entry.points}</strong>${pointsLabel}${prizeButton}</div>
  `;

  if (entry.prizeButton) {
    const claim = row.querySelector(".prize-claim");
    claim.addEventListener("click", () => {
      openBonusSite();
    });
  }

  return row;
}

function startQuiz(quiz) {
  const session = {
    quiz,
    index: 0,
    score: 0,
    answers: [],
    left: quiz.timePerQuestion,
    transitioning: false,
  };
  renderQuestion(session);
}

function renderQuestion(session) {
  clearTimer();
  const { quiz, index } = session;
  const question = quiz.questions[index];
  const progress = Math.round((index / quiz.questions.length) * 100);
  const ringProgress = (session.left / quiz.timePerQuestion) * 100;

  setScreen(`
    <section class="question-stage">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span>${quiz.title}</span>
          <div class="progress-status">
            <span>${index + 1}/${quiz.questions.length}</span>
            <div class="timer-circle" style="--progress:${ringProgress}%">
              <div class="timer-circle-inner">
                <strong id="timer">${session.left}с</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
      </div>
      ${imageBlockHtml(
        quiz.id === "qualification" ? IMAGE_ASSETS.qualificationQuestions[index] : null,
        `Изображение к вопросу ${index + 1}`,
      )}
      <h2>${question.text}</h2>
      <div class="stack" id="answers"></div>
    </section>
  `);

  const answersNode = document.querySelector("#answers");
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.className = "button button-outline option";
    button.textContent = option;
    button.addEventListener("click", () => choose(session, optionIndex));
    answersNode.appendChild(button);
  });

  const startedAt = performance.now();
  timer = setInterval(() => {
    const elapsedSeconds = (performance.now() - startedAt) / 1000;
    const leftSeconds = Math.max(quiz.timePerQuestion - elapsedSeconds, 0);
    session.left = Math.ceil(leftSeconds);
    const timerNode = document.querySelector("#timer");
    const timerWrap = document.querySelector(".timer-circle");
    if (timerNode) timerNode.textContent = `${session.left}с`;
    if (timerWrap) {
      const dynamicProgress = Math.max((leftSeconds / quiz.timePerQuestion) * 100, 0);
      timerWrap.style.setProperty("--progress", `${dynamicProgress}%`);
    }
    if (leftSeconds <= 0) {
      choose(session, null);
    }
  }, 80);
}

function choose(session, optionIndex) {
  if (session.transitioning) return;
  session.transitioning = true;
  clearTimer();
  const question = session.quiz.questions[session.index];
  const gain = optionIndex !== null ? question.weightMap[optionIndex] || 0 : 0;
  session.score += gain;
  session.answers.push(optionIndex);
  session.index += 1;
  session.left = session.quiz.timePerQuestion;

  const stage = document.querySelector(".question-stage");
  if (stage) stage.classList.add("is-leaving");

  setTimeout(() => {
    session.transitioning = false;
    if (session.index >= session.quiz.questions.length) {
      if (session.quiz.id === "qualification") {
        finishQualification(session.score);
      } else {
        finishExtraQuiz(session.quiz.id, session.score);
      }
      return;
    }

    renderQuestion(session);
  }, 220);
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
    <h2>Квиз завершён 🎉</h2>
    <p>Ты получил <strong>${score}</strong> очков в этом раунде. Продолжай, чтобы подняться выше в недельном топе.</p>
    <div class="stack">
      <button class="button button-primary" id="toMain">Вернуться на главную</button>
      <button class="button button-secondary" id="toBoard">Открыть лидерборд</button>
    </div>
  `);
  document.querySelector("#toMain").addEventListener("click", renderLanding);
  document.querySelector("#toBoard").addEventListener("click", renderLeaderboard);
}

function renderResult() {
  if (state.qualified) {
    setScreen(`
      <span class="badge">Ты прошёл квалификацию</span>
      <h2>🎉 Отличный старт! Ты быстро принимаешь решения и хорошо чувствуешь игровые механики.</h2>
      ${imageBlockHtml(IMAGE_ASSETS.result, "Финальный экран результатов")}
      <p class="prize-block">Ваш приз: <strong>5 000 000 🪙</strong></p>
      <p>Промокод: <strong>${state.bonusCode}</strong></p>
      <div class="stack">
        <button class="button button-bonus" id="bonusBtn">Забрать бонус</button>
        <button class="button button-secondary" id="homeBtn">Вернуться на главную</button>
      </div>
      <div class="spacer"></div>
      <h3>🏁 Лидерборд участников первого теста</h3>
      <div class="leaderboard static-board" id="resultBoard"></div>
      ${contactFormHtml()}
    `);
  } else {
    setScreen(`
      <h2>🙂 Хорошая попытка! Ты больше опираешься на рациональность, чем на риск.</h2>
      ${imageBlockHtml(IMAGE_ASSETS.result, "Финальный экран результатов")}
      <p>Доступ к остальным квизам уже открыт — попробуй улучшить позицию в рейтинге.</p>
      <div class="stack">
        <button class="button button-primary" id="homeBtn">Вернуться на главную</button>
      </div>
      <div class="spacer"></div>
      <h3>🏁 Лидерборд участников первого теста</h3>
      <div class="leaderboard static-board" id="resultBoard"></div>
      ${contactFormHtml()}
    `);
  }

  const resultBoard = document.querySelector("#resultBoard");
  buildFirstTestLeaderboard(resultLeaders).forEach((entry) => {
    resultBoard.appendChild(createLeaderboardRow(entry));
  });

  const bonusBtn = document.querySelector("#bonusBtn");
  if (bonusBtn) {
    bonusBtn.addEventListener("click", () => {
      openBonusSite();
    });
  }

  document.querySelector("#homeBtn").addEventListener("click", renderLanding);
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
    <button class="button button-secondary" id="backBtn">Вернуться на главную</button>
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

  document.querySelector("#backBtn").addEventListener("click", renderLanding);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

startApp();
