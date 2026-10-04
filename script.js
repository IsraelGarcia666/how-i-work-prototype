const state = {};

let currentStep = 0;

// ======================================================
// 1. HOW I WORK – INDIVIDUAL REFLECTION
// ======================================================

const zineScreens = [
  {
    title: "Welcome",

    render: () => `
      <h2>How I Work</h2>

      <p class="lead">
        A small zine about work, learning and strengths.
      </p>

      <div class="info-box">
        This prototype follows the existing “How I Work” material
        and the pair/group discussion flow.
      </div>

      <div class="note-box">
        <strong>You choose what you share.</strong>
      </div>

      <p>
        Complete the reflection pages first.
        After that, continue to the pair/group discussion cards
        and the shared summary.
      </p>
    `,
  },

  {
    title: "About me",

    render: () => `
      <h2>About me</h2>

      ${textArea("about_matters", "What matters to me…")}

      ${textArea("about_good", "I am good at…")}

      ${textArea("about_interested", "I am interested in…")}

      <div class="note-box">
        You choose what you share.
      </div>
    `,
  },

  {
    title: "How I learn best",

    render: () => `
      <h2>How I learn best</h2>

      <p class="lead">
        Tick, circle or write:
      </p>

      <div class="check-list">

        ${[
          "when I see an example",
          "when I get to try it myself",
          "when someone shows me",
          "when I get to listen",
          "when I can ask questions",
          "when I have enough time",
          "when the task is broken down into steps",
        ]
          .map((item, i) => checkbox(`learn_${i}`, item))
          .join("")}

      </div>

      ${textArea("learn_other", "Something else that helps me learn…")}

      <div class="note-box">
        Everyone learns in different ways,
        and that is completely okay.
      </div>
    `,
  },

  {
    title: "This helps me at work",

    render: () => `
      <h2>This helps me at work</h2>

      ${textArea("help_start", "When I start a new task, I need…")}

      ${textArea("help_instructions", "I need instructions that…")}

      ${textArea("help_feedback", "Feedback helps me when…")}

      <div class="note-box">
        Clarity, support and trust help me succeed.
      </div>
    `,
  },

  {
    title: "When work is hard",

    render: () => `
      <h2>When work is hard</h2>

      ${textArea("hard_work", "Work is harder for me when…")}

      ${textArea("hard_focus", "It is hard for me to focus when…")}

      ${textArea("hard_helps", "What usually helps is…")}
    `,
  },

  {
    title: "My strengths",

    render: () => `
      <h2>My strengths</h2>

      ${textArea("strength_use", "My strengths can be used in…")}

      ${textArea("strength_proud", "I am proud that…")}

      ${textArea("strength_others", "Other people describe me as…")}

      <div class="note-box">
        Everyone has strengths.
      </div>
    `,
  },

  {
    title: "How to work well with me",

    render: () => `
      <h2>How to work well with me</h2>

      ${textArea("well_unsure", "If I am unsure, I hope that…")}

      ${textArea("well_wrong", "If something goes wrong, it helps me when…")}

      ${textArea("well_ask", "You can ask me about…")}
    `,
  },

  {
    title: "My suggestion",

    render: () => `
      <h2>My suggestion</h2>

      ${textArea("suggest_demanding", "Work feels demanding when…")}

      ${textArea("suggest_energy", "Work gives me energy when…")}

      ${textArea(
        "suggest_main",
        "My suggestion for making learning at work easier is…",
      )}

      <div class="note-box">
        Take your suggestion to the pair discussion.
      </div>
    `,
  },
];

// ======================================================
// 2. PAIR / GROUP DISCUSSION CARDS
// ======================================================

const discussionThemes = [
  {
    number: 1,

    title: "Make strengths visible",

    questions: [
      "What strengths help people succeed at work?",

      "Which strengths in our workplace go unnoticed?",

      "How could we make better use of these strengths?",
    ],

    closing: "Different ways of working can be a strength.",
  },

  {
    number: 2,

    title: "How we learn at work",

    questions: [
      "What helps us learn a new task?",

      "What helps us practise and learn at our own pace?",

      "How could we make time for learning in everyday work?",
    ],

    closing: "People may need different ways to learn.",
  },

  {
    number: 3,

    title: "Clear instructions",

    questions: [
      "What makes instructions easy to understand?",

      "What makes instructions hard to follow?",

      "How could words, pictures and demonstrations support each other?",
    ],

    closing: "Clear instructions make everyday work easier.",
  },

  {
    number: 4,

    title: "Feedback and support",

    questions: [
      "What kind of feedback helps people succeed?",

      "What makes it easier to ask for and receive support?",

      "How can a manager or colleague check what support someone needs?",
    ],

    closing: "Good feedback and support build trust.",
  },
];

// ======================================================
// 3. SCREENS
// ======================================================

const screens = [
  ...zineScreens.map((screen) => ({
    type: "zine",
    title: screen.title,
    render: screen.render,
  })),

  ...discussionThemes.map((theme) => ({
    type: "discussion",
    title: theme.title,

    render: () => renderDiscussion(theme),
  })),

  {
    type: "summary",
    title: "Shared summary and next steps",
    render: renderSummary,
  },

  {
    type: "observer",
    title: "Immersion test notes",
    render: renderObserver,
  },
];

// ======================================================
// 4. MAIN ELEMENTS
// ======================================================

const app = document.getElementById("app");

const backBtn = document.getElementById("backBtn");

const nextBtn = document.getElementById("nextBtn");

const stepText = document.getElementById("stepText");

const progressBar = document.getElementById("progressBar");

// ======================================================
// 5. REUSABLE FORM ELEMENTS
// ======================================================

function textArea(key, label) {
  return `
    <label
      class="field-label"
      for="${key}"
    >
      ${label}
    </label>

    <textarea
      id="${key}"
      data-key="${key}"
    ></textarea>
  `;
}

function checkbox(key, label) {
  return `
    <label class="check-item">

      <input
        type="checkbox"
        data-key="${key}"
      />

      <span>
        ${label}
      </span>

    </label>
  `;
}

// ======================================================
// 6. DISCUSSION CARD SCREEN
// ======================================================

function renderDiscussion(theme) {
  const questionHTML = theme.questions
    .map(
      (question, index) => `
          <div class="question">

            <span class="qnum">
              ${index + 1}
            </span>

            ${question}

          </div>

          ${textArea(`d${theme.number}_q${index + 1}`, "Optional notes")}
        `,
    )
    .join("");

  return `
    <h2>
      ${theme.number}. ${theme.title}
    </h2>

    <div class="note-box">
      Share only what you choose from your zine.
    </div>

    <h3>
      Let's discuss:
    </h3>

    ${questionHTML}

    <div class="info-box">
      ${theme.closing}
    </div>

    <section class="pair-section">

      <h3>
        Our pair suggestion
      </h3>

      ${textArea(`d${theme.number}_works`, "1. What works well already?")}

      ${textArea(
        `d${theme.number}_change`,
        "2. What needs to change, and why?",
      )}

      ${textArea(`d${theme.number}_suggest`, "3. What change do we suggest?")}

      ${textArea(
        `d${theme.number}_need`,
        "What need does our suggestion address?",
      )}

      <p class="small">
        Agree on one suggestion from this theme
        to present to the group.
      </p>

    </section>
  `;
}

// ======================================================
// 7. SHARED SUMMARY SCREEN
// ======================================================

function renderSummary() {
  const themes = [
    "Make strengths visible",
    "How we learn at work",
    "Clear instructions",
    "Feedback and support",
  ];

  return `
    <h2>
      Our shared summary and next steps
    </h2>

    <p class="lead">
      Bring together the proposals from all pairs.
      Review them together and agree on what to try.
    </p>

    <div class="two-col">

      <div>

        <label
          class="field-label"
          for="sum_team"
        >
          Team or community
        </label>

        <input
          id="sum_team"
          type="text"
          data-key="sum_team"
        />

      </div>

      <div>

        <label
          class="field-label"
          for="sum_date"
        >
          Date
        </label>

        <input
          id="sum_date"
          type="text"
          data-key="sum_date"
        />

      </div>

    </div>

    <h3>
      1. Shared findings
    </h3>

    <table>

      <thead>

        <tr>

          <th>
            Theme
          </th>

          <th>
            What did we notice across the discussions?
          </th>

          <th>
            What needs to change?
          </th>

        </tr>

      </thead>

      <tbody>

        ${themes
          .map(
            (theme, index) => `
              <tr>

                <td>
                  ${theme}
                </td>

                <td>

                  <textarea
                    data-key="sum_find_${index}"
                  ></textarea>

                </td>

                <td>

                  <textarea
                    data-key="sum_change_${index}"
                  ></textarea>

                </td>

              </tr>
            `,
          )
          .join("")}

      </tbody>

    </table>

    <h3>
      2. Review and choose together
    </h3>

    <div class="info-box">

      <strong>
        What helps many people?
      </strong>

      <br />

      <strong>
        What is essential for someone?
      </strong>

      <br />

      Record all proposals.
      Combine similar proposals.
      Keep different needs visible.

    </div>

    <table>

      <thead>

        <tr>

          <th>#</th>

          <th>
            Shared proposal
          </th>

          <th>
            Votes
          </th>

          <th>
            Essential need?
          </th>

          <th>
            Our decision
          </th>

        </tr>

      </thead>

      <tbody>

        ${[1, 2, 3, 4]
          .map(
            (number) => `
              <tr>

                <td>
                  ${number}
                </td>

                <td>

                  <textarea
                    data-key="sum_prop_${number}"
                  ></textarea>

                </td>

                <td>

                  <input
                    type="text"
                    data-key="sum_votes_${number}"
                  />

                </td>

                <td>

                  <input
                    type="text"
                    data-key="sum_essential_${number}"
                    placeholder="Yes / No"
                  />

                </td>

                <td>

                  <textarea
                    data-key="sum_decision_${number}"
                  ></textarea>

                </td>

              </tr>
            `,
          )
          .join("")}

      </tbody>

    </table>

    <p class="small">

      Votes guide priorities.

      Essential support can still be agreed
      even if it receives few votes.

    </p>

    <h3>
      3. Agreed actions
    </h3>

    <table>

      <thead>

        <tr>

          <th>
            What will we try?
          </th>

          <th>
            Who is responsible?
          </th>

          <th>
            When will we start?
          </th>

          <th>
            When will we review it?
          </th>

        </tr>

      </thead>

      <tbody>

        ${[1, 2, 3]
          .map(
            (number) => `
              <tr>

                <td>

                  <textarea
                    data-key="act_try_${number}"
                  ></textarea>

                </td>

                <td>

                  <textarea
                    data-key="act_who_${number}"
                  ></textarea>

                </td>

                <td>

                  <input
                    type="text"
                    data-key="act_start_${number}"
                  />

                </td>

                <td>

                  <input
                    type="text"
                    data-key="act_review_${number}"
                  />

                </td>

              </tr>
            `,
          )
          .join("")}

      </tbody>

    </table>
  `;
}

// ======================================================
// 8. IMMERSION FEEDBACK SCREEN
// ======================================================

function renderObserver() {
  return `
    <h2>
      Immersion test notes
    </h2>

    <p class="lead">

      This final page is for your project team.

      It is not part of the original Eoliitto cards.

    </p>

    <div class="observer-box">

      ${textArea("obs_clear", "What was clear?")}

      ${textArea("obs_confusing", "What was confusing?")}

      ${textArea(
        "obs_personal",
        "Did anything feel uncomfortable or too personal?",
      )}

      ${textArea("obs_space", "Was there enough space and time to answer?")}

      ${textArea("obs_useful", "Did the process create useful discussion?")}

      ${textArea(
        "obs_format",
        "Which format would you prefer for this activity: paper, digital, or a mix? Why?",
      )}

      ${textArea("obs_change", "What would you change?")}

    </div>

    <div class="nav-row">

      <button
        class="btn btn-light"
        type="button"
        onclick="exportFullReportPDF()"
      >
        Export complete PDF report
      </button>

      <button
        class="btn btn-light"
        type="button"
        onclick="clearAll()"
      >
        Clear all answers
      </button>

    </div>
  `;
}

// ======================================================
// 9. SAVE / RESTORE ANSWERS WHILE NAVIGATING
// ======================================================

function captureCurrentInputs() {
  app.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.dataset.key;

    if (element.type === "checkbox") {
      state[key] = element.checked;
    } else {
      state[key] = element.value;
    }
  });
}

function restoreInputs() {
  app.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.dataset.key;

    if (!(key in state)) {
      return;
    }

    if (element.type === "checkbox") {
      element.checked = Boolean(state[key]);
    } else {
      element.value = state[key];
    }
  });
}

// ======================================================
// 10. RENDER SCREEN
// ======================================================

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

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ======================================================
// 11. NAVIGATION
// ======================================================

backBtn.addEventListener(
  "click",

  () => {
    captureCurrentInputs();

    if (currentStep > 0) {
      currentStep -= 1;

      render();
    }
  },
);

nextBtn.addEventListener(
  "click",

  () => {
    captureCurrentInputs();

    if (currentStep < screens.length - 1) {
      currentStep += 1;

      render();
    }
  },
);

// ======================================================
// 12. HTML SAFETY FOR REPORT
// ======================================================

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")

    .replaceAll("<", "&lt;")

    .replaceAll(">", "&gt;")

    .replaceAll('"', "&quot;")

    .replaceAll("'", "&#039;");
}

// ======================================================
// 13. COMPLETE PDF REPORT
// ======================================================

function exportFullReportPDF() {
  // Capture the final immersion page
  // before creating the report.

  captureCurrentInputs();

  // ------------------------------------------
  // Helper functions
  // ------------------------------------------

  function safe(value) {
    if (value === undefined || value === null || String(value).trim() === "") {
      return `
        <span class="empty">
          No answer provided.
        </span>
      `;
    }

    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function answerBlock(question, answer) {
    return `
      <div class="answer">

        <div class="question-label">
          ${escapeHtml(question)}
        </div>

        <div class="response">
          ${safe(answer)}
        </div>

      </div>
    `;
  }

  function section(number, title, content) {
    return `
      <section class="report-section">

        <div class="section-title">

          <span class="section-number">
            ${number}
          </span>

          <h2>
            ${title}
          </h2>

        </div>

        ${content}

      </section>
    `;
  }

  // ------------------------------------------
  // Learning-style checkboxes
  // ------------------------------------------

  const learningOptions = [
    "When I see an example",
    "When I get to try it myself",
    "When someone shows me",
    "When I get to listen",
    "When I can ask questions",
    "When I have enough time",
    "When the task is broken down into steps",
  ];

  const selectedLearning = learningOptions.filter(
    (option, index) => state[`learn_${index}`],
  );

  const learningList = selectedLearning.length
    ? `
        <ul class="learning-list">

          ${selectedLearning
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}

        </ul>
      `
    : `
        <span class="empty">
          No options selected.
        </span>
      `;

  // ====================================================
  // CHAPTER 1 – INDIVIDUAL REFLECTION
  // ====================================================

  const reflectionHTML = `

    ${section(
      1,
      "About me",

      `
        ${answerBlock("What matters to me…", state.about_matters)}

        ${answerBlock("I am good at…", state.about_good)}

        ${answerBlock("I am interested in…", state.about_interested)}
      `,
    )}

    ${section(
      2,
      "How I learn best",

      `
        <div class="answer">

          <div class="question-label">
            Selected ways of learning
          </div>

          <div class="response">
            ${learningList}
          </div>

        </div>

        ${answerBlock("Something else that helps me learn…", state.learn_other)}
      `,
    )}

    ${section(
      3,
      "This helps me at work",

      `
        ${answerBlock("When I start a new task, I need…", state.help_start)}

        ${answerBlock("I need instructions that…", state.help_instructions)}

        ${answerBlock("Feedback helps me when…", state.help_feedback)}
      `,
    )}

    ${section(
      4,
      "When work is hard",

      `
        ${answerBlock("Work is harder for me when…", state.hard_work)}

        ${answerBlock("It is hard for me to focus when…", state.hard_focus)}

        ${answerBlock("What usually helps is…", state.hard_helps)}
      `,
    )}

    ${section(
      5,
      "My strengths",

      `
        ${answerBlock("My strengths can be used in…", state.strength_use)}

        ${answerBlock("I am proud that…", state.strength_proud)}

        ${answerBlock("Other people describe me as…", state.strength_others)}
      `,
    )}

    ${section(
      6,
      "How to work well with me",

      `
        ${answerBlock("If I am unsure, I hope that…", state.well_unsure)}

        ${answerBlock(
          "If something goes wrong, it helps me when…",
          state.well_wrong,
        )}

        ${answerBlock("You can ask me about…", state.well_ask)}
      `,
    )}

    ${section(
      7,
      "My suggestion",

      `
        ${answerBlock("Work feels demanding when…", state.suggest_demanding)}

        ${answerBlock("Work gives me energy when…", state.suggest_energy)}

        ${answerBlock(
          "My suggestion for making learning at work easier is…",
          state.suggest_main,
        )}
      `,
    )}
  `;

  // ====================================================
  // CHAPTER 2 – PAIR / GROUP DISCUSSION
  // ====================================================

  const discussionHTML = discussionThemes
    .map((theme) => {
      const questionAnswers = theme.questions
        .map((question, index) =>
          answerBlock(question, state[`d${theme.number}_q${index + 1}`]),
        )
        .join("");

      return section(
        theme.number,
        theme.title,

        `
              ${questionAnswers}

              <div class="pair-report">

                <h3>
                  Our pair suggestion
                </h3>

                ${answerBlock(
                  "What works well already?",
                  state[`d${theme.number}_works`],
                )}

                ${answerBlock(
                  "What needs to change, and why?",
                  state[`d${theme.number}_change`],
                )}

                ${answerBlock(
                  "What change do we suggest?",
                  state[`d${theme.number}_suggest`],
                )}

                ${answerBlock(
                  "What need does our suggestion address?",
                  state[`d${theme.number}_need`],
                )}

              </div>
            `,
      );
    })
    .join("");

  // ====================================================
  // CHAPTER 3 – SHARED SUMMARY
  // ====================================================

  const summaryThemes = [
    "Make strengths visible",
    "How we learn at work",
    "Clear instructions",
    "Feedback and support",
  ];

  const sharedFindingsRows = summaryThemes
    .map(
      (theme, index) => `
          <tr>

            <td class="theme-cell">
              ${escapeHtml(theme)}
            </td>

            <td>
              ${safe(state[`sum_find_${index}`])}
            </td>

            <td>
              ${safe(state[`sum_change_${index}`])}
            </td>

          </tr>
        `,
    )
    .join("");

  const proposalRows = [1, 2, 3, 4]
    .map(
      (number) => `
          <tr>

            <td>
              ${number}
            </td>

            <td>
              ${safe(state[`sum_prop_${number}`])}
            </td>

            <td>
              ${safe(state[`sum_votes_${number}`])}
            </td>

            <td>
              ${safe(state[`sum_essential_${number}`])}
            </td>

            <td>
              ${safe(state[`sum_decision_${number}`])}
            </td>

          </tr>
        `,
    )
    .join("");

  const actionRows = [1, 2, 3]
    .map(
      (number) => `
          <tr>

            <td>
              ${safe(state[`act_try_${number}`])}
            </td>

            <td>
              ${safe(state[`act_who_${number}`])}
            </td>

            <td>
              ${safe(state[`act_start_${number}`])}
            </td>

            <td>
              ${safe(state[`act_review_${number}`])}
            </td>

          </tr>
        `,
    )
    .join("");

  const summaryHTML = `

    <section class="report-section">

      <div class="section-title">

        <span class="section-number">
          1
        </span>

        <h2>
          Shared findings
        </h2>

      </div>

      <div class="summary-meta">

        ${answerBlock("Team or community", state.sum_team)}

        ${answerBlock("Date", state.sum_date)}

      </div>

      <table>

        <thead>

          <tr>

            <th>
              Theme
            </th>

            <th>
              What did we notice?
            </th>

            <th>
              What needs to change?
            </th>

          </tr>

        </thead>

        <tbody>
          ${sharedFindingsRows}
        </tbody>

      </table>

    </section>

    <section class="report-section">

      <div class="section-title">

        <span class="section-number">
          2
        </span>

        <h2>
          Review and choose together
        </h2>

      </div>

      <div class="highlight">

        <strong>
          What helps many people?
        </strong>

        <span>
          •
        </span>

        <strong>
          What is essential for someone?
        </strong>

      </div>

      <table>

        <thead>

          <tr>

            <th>#</th>

            <th>
              Shared proposal
            </th>

            <th>
              Votes
            </th>

            <th>
              Essential need?
            </th>

            <th>
              Our decision
            </th>

          </tr>

        </thead>

        <tbody>
          ${proposalRows}
        </tbody>

      </table>

    </section>

    <section class="report-section">

      <div class="section-title">

        <span class="section-number">
          3
        </span>

        <h2>
          Agreed actions
        </h2>

      </div>

      <table>

        <thead>

          <tr>

            <th>
              What will we try?
            </th>

            <th>
              Who is responsible?
            </th>

            <th>
              When will we start?
            </th>

            <th>
              When will we review it?
            </th>

          </tr>

        </thead>

        <tbody>
          ${actionRows}
        </tbody>

      </table>

    </section>
  `;

  // ====================================================
  // CHAPTER 4 – IMMERSION FEEDBACK
  // ====================================================

  const immersionHTML = `

    ${answerBlock("What was clear?", state.obs_clear)}

    ${answerBlock("What was confusing?", state.obs_confusing)}

    ${answerBlock(
      "Did anything feel uncomfortable or too personal?",
      state.obs_personal,
    )}

    ${answerBlock(
      "Was there enough space and time to answer?",
      state.obs_space,
    )}

    ${answerBlock(
      "Did the process create useful discussion?",
      state.obs_useful,
    )}

    ${answerBlock(
      "Which format would you prefer: paper, digital, or a mix? Why?",
      state.obs_format,
    )}

    ${answerBlock("What would you change?", state.obs_change)}
  `;

  // ====================================================
  // CREATE REPORT WINDOW
  // ====================================================

  const reportWindow = window.open("", "_blank");

  if (!reportWindow) {
    alert("Please allow pop-ups to create the PDF report.");

    return;
  }

  // ====================================================
  // REPORT HTML
  // ====================================================

  reportWindow.document.write(`
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <title>
        How I Work – Complete Test Report
      </title>

      <style>

        :root {
          --purple: #3d3ea8;
          --blue: #16b5f3;
          --pink: #ff3f92;

          --light-blue: #dff2ff;
          --light-pink: #ffd9ea;

          --background: #eef1f6;
          --text: #202636;

          --border: #242424;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;

          padding: 32px;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          color: var(--text);

          background:
            var(--background);

          line-height: 1.5;
        }

        .print-note {
          max-width: 950px;

          margin:
            0 auto 18px;

          padding:
            12px 16px;

          text-align: center;

          background:
            var(--light-pink);

          border:
            2px solid var(--border);

          border-radius:
            12px;
        }

        .report {
          max-width: 950px;

          margin: auto;

          background: white;

          padding:
            42px;

          border-radius:
            18px;

          box-shadow:
            0 12px 30px
            rgba(
              0,
              0,
              0,
              0.08
            );
        }

        .main-header {
          padding-bottom:
            22px;

          margin-bottom:
            34px;

          border-bottom:
            6px solid
            var(--purple);
        }

        .main-header h1 {
          margin:
            0 0 4px;

          font-size:
            42px;

          color:
            var(--purple);

          letter-spacing:
            0.02em;
        }

        .main-header h2 {
          margin: 0;

          font-size:
            22px;

          color:
            #242424;
        }

        .main-header p {
          margin:
            12px 0 0;

          color:
            #666;
        }

        .chapter-title {
          margin:
            42px 0 24px;

          padding:
            14px 18px;

          color: white;

          background:
            var(--purple);

          border-radius:
            12px;

          font-size:
            24px;

          font-weight:
            bold;
        }

        .report-section {
          margin-bottom:
            32px;
        }

        .section-title {
          display: flex;

          align-items:
            center;

          gap: 12px;

          margin-bottom:
            16px;
        }

        .section-title h2 {
          margin: 0;

          font-size:
            21px;

          color:
            #111;
        }

        .section-number {
          flex:
            0 0 40px;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          width: 40px;
          height: 40px;

          border:
            2px solid
            var(--border);

          border-radius:
            50%;

          background:
            var(--light-pink);

          font-weight:
            bold;
        }

        .answer {
          margin-bottom:
            14px;

          break-inside:
            avoid;
        }

        .question-label {
          margin-bottom:
            6px;

          font-weight:
            bold;

          color:
            #111;
        }

        .response {
          min-height:
            42px;

          padding:
            11px 13px;

          background:
            #fafafa;

          border:
            1px solid #ddd;

          border-radius:
            9px;

          overflow-wrap:
            anywhere;
        }

        .empty {
          color:
            #888;

          font-style:
            italic;
        }

        .learning-list {
          margin:
            0;

          padding-left:
            22px;
        }

        .learning-list li {
          margin:
            4px 0;
        }

        .pair-report {
          margin-top:
            20px;

          padding:
            18px;

          background:
            var(--light-blue);

          border:
            2px solid
            var(--border);

          border-radius:
            14px;
        }

        .pair-report > h3 {
          margin:
            0 0 16px;

          color:
            var(--purple);

          font-size:
            19px;
        }

        .summary-meta {
          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            14px;

          margin-bottom:
            18px;
        }

        .highlight {
          display:
            flex;

          justify-content:
            center;

          align-items:
            center;

          flex-wrap:
            wrap;

          gap:
            12px;

          margin-bottom:
            16px;

          padding:
            12px;

          text-align:
            center;

          background:
            var(--light-pink);

          border-radius:
            10px;
        }

        table {
          width:
            100%;

          margin-top:
            10px;

          border-collapse:
            collapse;

          font-size:
            12px;
        }

        th,
        td {
          padding:
            8px;

          border:
            1px solid #999;

          vertical-align:
            top;

          overflow-wrap:
            anywhere;
        }

        th {
          background:
            var(--light-blue);

          color:
            #111;

          font-weight:
            bold;

          text-align:
            left;
        }

        .theme-cell {
          font-weight:
            bold;

          background:
            #fff7fb;
        }

        .footer {
          margin-top:
            45px;

          padding-top:
            16px;

          border-top:
            2px solid #ddd;

          color:
            #666;

          font-size:
            12px;
        }

        @media print {

          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            padding: 0;

            background:
              white;
          }

          .print-note {
            display:
              none;
          }

          .report {
            max-width:
              none;

            margin: 0;

            padding: 0;

            border-radius:
              0;

            box-shadow:
              none;
          }

          .chapter-title {
            break-after:
              avoid;
          }

          .section-title {
            break-after:
              avoid;
          }

          .answer,
          .pair-report {
            break-inside:
              avoid;
          }

          table {
            break-inside:
              auto;
          }

          tr {
            break-inside:
              avoid;
          }
        }

        @media
        (max-width: 650px) {

          body {
            padding:
              12px;
          }

          .report {
            padding:
              22px;
          }

          .summary-meta {
            grid-template-columns:
              1fr;
          }

          table {
            font-size:
              10px;
          }
        }

      </style>

    </head>

    <body>

      <div class="print-note">

        Your complete report is ready.

        Choose

        <strong>
          Save as PDF
        </strong>

        in the print window.

      </div>

      <main class="report">

        <header class="main-header">

          <h1>
            HOW I WORK
          </h1>

          <h2>
            Complete Prototype Test Report
          </h2>

          <p>
            Laurea Service Design Process
            – Group 3
          </p>

        </header>

        <div class="chapter-title">
          1. Individual Reflection
        </div>

        ${reflectionHTML}

        <div class="chapter-title">
          2. Pair / Group Discussion
        </div>

        ${discussionHTML}

        <div class="chapter-title">
          3. Shared Summary and Next Steps
        </div>

        ${summaryHTML}

        <div class="chapter-title">
          4. Immersion Feedback
        </div>

        ${immersionHTML}

        <footer class="footer">

          Digital prototype created for the
          Laurea Service Design Process project.

          <br /><br />

          The PDF is generated locally from
          the answers entered during this session.

          No answers are automatically
          transmitted by this prototype.

        </footer>

      </main>

      <script>

        window.onload =
          function () {

            setTimeout(
              function () {

                window.print();

              },

              400
            );

          };

      <\/script>

    </body>

    </html>
  `);

  reportWindow.document.close();
}

// ======================================================
// 14. CLEAR RESPONSES
// ======================================================

function clearAll() {
  const confirmed = window.confirm("Clear all answers from this prototype?");

  if (!confirmed) {
    return;
  }

  Object.keys(state).forEach((key) => delete state[key]);

  currentStep = 0;

  render();
}

// ======================================================
// 15. START APPLICATION
// ======================================================

render();
