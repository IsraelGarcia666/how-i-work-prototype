const state = {};
let currentStep = 0;

const zineScreens = [
  {
    title: "Welcome",
    render: () => `
      <h2>How I Work</h2>
      <p class="lead">A small zine about work, learning and strengths.</p>
      <div class="info-box">
        This prototype follows the existing “How I Work” material and the pair/group discussion flow.
      </div>
      <div class="note-box"><strong>You choose what you share.</strong></div>
      <p>Complete the reflection pages first. After that, continue to the pair/group discussion cards and the shared summary.</p>
    `
  },
  {
    title: "About me",
    render: () => `
      <h2>About me</h2>
      ${textArea("about_matters", "What matters to me…")}
      ${textArea("about_good", "I am good at…")}
      ${textArea("about_interested", "I am interested in…")}
      <div class="note-box">You choose what you share.</div>
    `
  },
  {
    title: "How I learn best",
    render: () => `
      <h2>How I learn best</h2>
      <p class="lead">Tick, circle or write:</p>
      <div class="check-list">
        ${[
          "when I see an example",
          "when I get to try it myself",
          "when someone shows me",
          "when I get to listen",
          "when I can ask questions",
          "when I have enough time",
          "when the task is broken down into steps"
        ].map((item, i) => checkbox(`learn_${i}`, item)).join("")}
      </div>
      ${textArea("learn_other", "Something else that helps me learn…")}
      <div class="note-box">Everyone learns in different ways, and that is completely okay.</div>
    `
  },
  {
    title: "This helps me at work",
    render: () => `
      <h2>This helps me at work</h2>
      ${textArea("help_start", "When I start a new task, I need…")}
      ${textArea("help_instructions", "I need instructions that…")}
      ${textArea("help_feedback", "Feedback helps me when…")}
      <div class="note-box">Clarity, support and trust help me succeed.</div>
    `
  },
  {
    title: "When work is hard",
    render: () => `
      <h2>When work is hard</h2>
      ${textArea("hard_work", "Work is harder for me when…")}
      ${textArea("hard_focus", "It is hard for me to focus when…")}
      ${textArea("hard_helps", "What usually helps is…")}
    `
  },
  {
    title: "My strengths",
    render: () => `
      <h2>My strengths</h2>
      ${textArea("strength_use", "My strengths can be used in…")}
      ${textArea("strength_proud", "I am proud that…")}
      ${textArea("strength_others", "Other people describe me as…")}
      <div class="note-box">Everyone has strengths.</div>
    `
  },
  {
    title: "How to work well with me",
    render: () => `
      <h2>How to work well with me</h2>
      ${textArea("well_unsure", "If I am unsure, I hope that…")}
      ${textArea("well_wrong", "If something goes wrong, it helps me when…")}
      ${textArea("well_ask", "You can ask me about…")}
    `
  },
  {
    title: "My suggestion",
    render: () => `
      <h2>My suggestion</h2>
      ${textArea("suggest_demanding", "Work feels demanding when…")}
      ${textArea("suggest_energy", "Work gives me energy when…")}
      ${textArea("suggest_main", "My suggestion for making learning at work easier is…")}
      <div class="note-box">Take your suggestion to the pair discussion.</div>
    `
  }
];

const discussionThemes = [
  {
    number: 1,
    title: "Make strengths visible",
    questions: [
      "What strengths help people succeed at work?",
      "Which strengths in our workplace go unnoticed?",
      "How could we make better use of these strengths?"
    ],
    closing: "Different ways of working can be a strength."
  },
  {
    number: 2,
    title: "How we learn at work",
    questions: [
      "What helps us learn a new task?",
      "What helps us practise and learn at our own pace?",
      "How could we make time for learning in everyday work?"
    ],
    closing: "People may need different ways to learn."
  },
  {
    number: 3,
    title: "Clear instructions",
    questions: [
      "What makes instructions easy to understand?",
      "What makes instructions hard to follow?",
      "How could words, pictures and demonstrations support each other?"
    ],
    closing: "Clear instructions make everyday work easier."
  },
  {
    number: 4,
    title: "Feedback and support",
    questions: [
      "What kind of feedback helps people succeed?",
      "What makes it easier to ask for and receive support?",
      "How can a manager or colleague check what support someone needs?"
    ],
    closing: "Good feedback and support build trust."
  }
];

const screens = [
  ...zineScreens.map((s, i) => ({ type: "zine", title: s.title, render: s.render })),
  ...discussionThemes.map(theme => ({
    type: "discussion",
    title: theme.title,
    render: () => renderDiscussion(theme)
  })),
  {
    type: "summary",
    title: "Shared summary and next steps",
    render: renderSummary
  },
  {
    type: "observer",
    title: "Immersion test notes",
    render: renderObserver
  }
];

const app = document.getElementById("app");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const stepText = document.getElementById("stepText");
const progressBar = document.getElementById("progressBar");

function textArea(key, label) {
  return `
    <label class="field-label" for="${key}">${label}</label>
    <textarea id="${key}" data-key="${key}"></textarea>
  `;
}

function checkbox(key, label) {
  return `
    <label class="check-item">
      <input type="checkbox" data-key="${key}" />
      <span>${label}</span>
    </label>
  `;
}

function renderDiscussion(theme) {
  const qHtml = theme.questions.map((q, i) => `
    <div class="question"><span class="qnum">${i + 1}</span>${q}</div>
    ${textArea(`d${theme.number}_q${i + 1}`, "Optional notes")}
  `).join("");

  return `
    <h2>${theme.number}. ${theme.title}</h2>
    <div class="note-box">Share only what you choose from your zine.</div>
    <h3>Let's discuss:</h3>
    ${qHtml}
    <div class="info-box">${theme.closing}</div>

    <section class="pair-section">
      <h3>Our pair suggestion</h3>
      ${textArea(`d${theme.number}_works`, "1. What works well already?")}
      ${textArea(`d${theme.number}_change`, "2. What needs to change, and why?")}
      ${textArea(`d${theme.number}_suggest`, "3. What change do we suggest?")}
      ${textArea(`d${theme.number}_need`, "What need does our suggestion address?")}
      <p class="small">Agree on one suggestion from this theme to present to the group.</p>
    </section>
  `;
}

function renderSummary() {
  const themes = [
    "Make strengths visible",
    "How we learn at work",
    "Clear instructions",
    "Feedback and support"
  ];

  return `
    <h2>Our shared summary and next steps</h2>
    <p class="lead">Bring together the proposals from all pairs. Review them together and agree on what to try.</p>

    <div class="two-col">
      <div>
        <label class="field-label" for="sum_team">Team or community</label>
        <input id="sum_team" type="text" data-key="sum_team" />
      </div>
      <div>
        <label class="field-label" for="sum_date">Date</label>
        <input id="sum_date" type="text" data-key="sum_date" />
      </div>
    </div>

    <h3>1. Shared findings</h3>
    <table>
      <thead>
        <tr>
          <th>Theme</th>
          <th>What did we notice across the discussions?</th>
          <th>What needs to change?</th>
        </tr>
      </thead>
      <tbody>
        ${themes.map((theme, i) => `
          <tr>
            <td>${theme}</td>
            <td><textarea data-key="sum_find_${i}"></textarea></td>
            <td><textarea data-key="sum_change_${i}"></textarea></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <h3>2. Review and choose together</h3>
    <div class="info-box">
      <strong>What helps many people?</strong><br />
      <strong>What is essential for someone?</strong><br />
      Record all proposals. Combine similar proposals. Keep different needs visible.
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Shared proposal</th>
          <th>Votes</th>
          <th>Essential need?</th>
          <th>Our decision</th>
        </tr>
      </thead>
      <tbody>
        ${[1, 2, 3, 4].map(i => `
          <tr>
            <td>${i}</td>
            <td><textarea data-key="sum_prop_${i}"></textarea></td>
            <td><input type="text" data-key="sum_votes_${i}" /></td>
            <td><input type="text" data-key="sum_essential_${i}" placeholder="Yes / No" /></td>
            <td><textarea data-key="sum_decision_${i}"></textarea></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <p class="small">Votes guide priorities. Essential support can still be agreed even if it receives few votes.</p>

    <h3>3. Agreed actions</h3>
    <table>
      <thead>
        <tr>
          <th>What will we try?</th>
          <th>Who is responsible?</th>
          <th>When will we start?</th>
          <th>When will we review it?</th>
        </tr>
      </thead>
      <tbody>
        ${[1, 2, 3].map(i => `
          <tr>
            <td><textarea data-key="act_try_${i}"></textarea></td>
            <td><textarea data-key="act_who_${i}"></textarea></td>
            <td><input type="text" data-key="act_start_${i}" /></td>
            <td><input type="text" data-key="act_review_${i}" /></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderObserver() {
  return `
    <h2>Immersion test notes</h2>
    <p class="lead">This final page is for your project team. It is not part of the original Eoliitto cards.</p>

    <div class="observer-box">
      ${textArea("obs_clear", "What was clear?")}
      ${textArea("obs_confusing", "What was confusing?")}
      ${textArea("obs_personal", "Did anything feel uncomfortable or too personal?")}
      ${textArea("obs_space", "Was there enough space and time to answer?")}
      ${textArea("obs_useful", "Did the process create useful discussion?")}
      ${textArea("obs_format", "Which format would you prefer for this activity: paper, digital, or a mix? Why?")}
      ${textArea("obs_change", "What would you change?")}
    </div>

    <div class="nav-row">
      <button class="btn btn-light" type="button" onclick="downloadTestNotes()">Export immersion notes</button>
      <button class="btn btn-light" type="button" onclick="clearAll()">Clear all answers</button>
    </div>
  `;
}

function captureCurrentInputs() {
  app.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (el.type === "checkbox") {
      state[key] = el.checked;
    } else {
      state[key] = el.value;
    }
  });
}

function restoreInputs() {
  app.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (!(key in state)) return;

    if (el.type === "checkbox") {
      el.checked = Boolean(state[key]);
    } else {
      el.value = state[key];
    }
  });
}

function render() {
  const screen = screens[currentStep];
  app.innerHTML = screen.render();
  restoreInputs();

  const total = screens.length;
  stepText.textContent = `Step ${currentStep + 1} of ${total} — ${screen.title}`;
  progressBar.style.width = `${((currentStep + 1) / total) * 100}%`;

  backBtn.disabled = currentStep === 0;
  nextBtn.disabled = currentStep === total - 1;
  nextBtn.textContent = currentStep === total - 1 ? "Finished ✓" : "Next →";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

backBtn.addEventListener("click", () => {
  captureCurrentInputs();
  if (currentStep > 0) {
    currentStep -= 1;
    render();
  }
});

nextBtn.addEventListener("click", () => {
  captureCurrentInputs();
  if (currentStep < screens.length - 1) {
    currentStep += 1;
    render();
  }
});

function downloadTestNotes() {
  captureCurrentInputs();

  const fields = [
    ["What was clear?", state.obs_clear || ""],
    ["What was confusing?", state.obs_confusing || ""],
    ["Did anything feel uncomfortable or too personal?", state.obs_personal || ""],
    ["Was there enough space and time to answer?", state.obs_space || ""],
    ["Did the process create useful discussion?", state.obs_useful || ""],
    ["Preferred format and why", state.obs_format || ""],
    ["What would you change?", state.obs_change || ""]
  ];

  const text = [
    "HOW I WORK – IMMERSION TEST NOTES",
    "==================================",
    "",
    ...fields.flatMap(([label, value]) => [label, value, ""])
  ].join("\\n");

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "immersion-test-notes.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  const confirmed = window.confirm("Clear all answers from this prototype?");
  if (!confirmed) return;

  Object.keys(state).forEach(key => delete state[key]);
  currentStep = 0;
  render();
}

render();
