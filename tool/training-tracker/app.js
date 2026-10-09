const STORAGE_KEYS = {
  PROFILE: "training-profile",
  PROGRESS: "training-progress"
};

const state = {
  trainingItems: [],
  selectedItems: [],
  progress: {},
  currentDate: getDateKey(new Date()),
  modal: null
};

const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    const response = await fetch("training.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to load training.json (${response.status})`);
    }

    const data = await response.json();
    state.trainingItems = Array.isArray(data.trainingItems)
      ? data.trainingItems
      : [];

    loadStorage();

    if (!state.selectedItems.length) {
      render();
      openTrainingSelector(true);
      return;
    }

    render();
  } catch (error) {
    console.error(error);
    app.innerHTML = `
      <div class="empty-state card">
        <div class="empty-icon">${icon("triangle-alert")}</div>
        <h2>Unable to load training data</h2>
        <p>Make sure this page is served together with <strong>training.json</strong>.</p>
      </div>
    `;
  }
}

function loadStorage() {
  try {
    const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || "null");
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || "{}");

    state.selectedItems = Array.isArray(profile?.selectedItems)
      ? profile.selectedItems
      : [];

    state.progress = progress && typeof progress === "object"
      ? progress
      : {};
  } catch (error) {
    console.warn("LocalStorage data could not be parsed.", error);
    state.selectedItems = [];
    state.progress = {};
  }

  state.selectedItems = state.selectedItems.filter(id =>
    state.trainingItems.some(item => item.id === id)
  );
}

function render() {
  const items = getSelectedTrainingItems();
  const completedIds = getCompletedIds();
  const completedCount = items.filter(item => completedIds.has(item.id)).length;
  const total = items.length;
  const percentage = total ? Math.round((completedCount / total) * 100) : 0;

  app.innerHTML = `
    <header class="header">
      <div class="brand">
        <div class="brand-mark">${icon("activity", 21)}</div>
        <div>
          <h1>Training Tracker</h1>
          <p>Simple. Local. Yours.</p>
        </div>
      </div>

      <button class="icon-button" type="button" data-action="settings" aria-label="Training settings">
        ${icon("settings", 19)}
      </button>
    </header>

    <main>
      <section class="hero card">
        <div class="date-nav">
          <button class="nav-button" type="button" data-action="previous-day" aria-label="Previous day">
            ${icon("chevron-left", 19)}
          </button>

          <div class="date-center">
            <span class="weekday">${formatWeekday(state.currentDate)}</span>
            <span class="date">${formatDate(state.currentDate)}</span>
          </div>

          <button class="nav-button" type="button" data-action="next-day" aria-label="Next day">
            ${icon("chevron-right", 19)}
          </button>
        </div>

        <button class="today-button" type="button" data-action="today">Back to today</button>

        <div class="progress-row">
          <div>
            <div class="progress-number">${completedCount} / ${total}</div>
            <div class="progress-label">training items completed</div>
          </div>
          <div class="progress-percent">${percentage}%</div>
        </div>

        <div class="progress-track" aria-label="${percentage}% complete">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>

        ${total > 0 && completedCount === total ? `
          <div class="complete-banner">
            ${icon("circle-check", 18)}
            All training completed for this day!
          </div>
        ` : ""}
      </section>

      <div class="section-title">Today's training</div>

      ${
        total
          ? `<section class="training-list">
              ${items.map(item => renderTrainingCard(item, completedIds.has(item.id))).join("")}
             </section>`
          : `
            <section class="empty-state card">
              <div class="empty-icon">${icon("list-plus", 23)}</div>
              <h2>No training selected</h2>
              <p>Choose the training items you want to track.</p>
              <button class="primary-button" type="button" data-action="settings">
                Choose Training
              </button>
            </section>
          `
      }
    </main>

    <div id="modal-root"></div>
    <div id="toast" class="toast"></div>
  `;

  bindMainEvents();
  refreshIcons();
}

function renderTrainingCard(item, completed) {
  return `
    <button
      class="training-card ${completed ? "completed" : ""}"
      type="button"
      data-action="toggle-training"
      data-training-id="${escapeAttribute(item.id)}"
      aria-pressed="${completed}"
    >
      <span class="check">
        ${completed ? icon("check", 17) : ""}
      </span>

      <span class="training-content">
        <span class="training-name">${escapeHtml(item.name)}</span>
        <span class="training-description">${escapeHtml(item.description || "")}</span>
      </span>

      ${
        item.target !== undefined && item.target !== null && item.target !== ""
          ? `<span class="training-target">${escapeHtml(String(item.target))} ${escapeHtml(item.unit || "")}</span>`
          : ""
      }
    </button>
  `;
}

function bindMainEvents() {
  app.querySelectorAll("[data-action]").forEach(element => {
    element.addEventListener("click", handleMainAction);
  });
}

function handleMainAction(event) {
  const action = event.currentTarget.dataset.action;

  if (action === "toggle-training") {
    toggleTraining(event.currentTarget.dataset.trainingId);
  }

  if (action === "previous-day") {
    state.currentDate = shiftDate(state.currentDate, -1);
    render();
  }

  if (action === "next-day") {
    state.currentDate = shiftDate(state.currentDate, 1);
    render();
  }

  if (action === "today") {
    state.currentDate = getDateKey(new Date());
    render();
  }

  if (action === "settings") {
    openTrainingSelector(false);
  }
}

function toggleTraining(trainingId) {
  if (!state.progress[state.currentDate]) {
    state.progress[state.currentDate] = {};
  }

  const current = Boolean(state.progress[state.currentDate][trainingId]);
  state.progress[state.currentDate][trainingId] = !current;

  saveProgress();
  render();

  showToast(!current ? "Training completed ✓" : "Training marked as incomplete");
}

function openTrainingSelector(firstRun) {
  state.modal = {
    firstRun,
    selected: new Set(state.selectedItems),
    search: ""
  };

  renderModal();
}

function renderModal() {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot || !state.modal) return;

  const filteredItems = state.trainingItems.filter(item => {
    const query = state.modal.search.trim().toLowerCase();
    if (!query) return true;

    return [
      item.name,
      item.description,
      item.unit
    ].filter(Boolean).some(value =>
      String(value).toLowerCase().includes(query)
    );
  });

  modalRoot.innerHTML = `
    <div class="modal-backdrop" data-modal-backdrop>
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="selector-title">
        <div class="modal-header">
          <div>
            <h2 id="selector-title">
              ${state.modal.firstRun ? "Choose your training" : "Training settings"}
            </h2>
            <p>
              ${state.modal.firstRun
                ? "Select the items you want to track."
                : "Change the training items shown on your daily checklist."}
            </p>
          </div>

          ${
            state.modal.firstRun
              ? ""
              : `<button class="icon-button" type="button" data-modal-action="close" aria-label="Close">
                  ${icon("x", 19)}
                 </button>`
          }
        </div>

        <div class="modal-body">
          <input
            class="search"
            type="search"
            placeholder="Search training..."
            value="${escapeAttribute(state.modal.search)}"
            data-modal-search
          >

          <div class="selection-list">
            ${filteredItems.map(item => `
              <label class="selection-item">
                <input
                  type="checkbox"
                  value="${escapeAttribute(item.id)}"
                  ${state.modal.selected.has(item.id) ? "checked" : ""}
                  data-training-checkbox
                >
                <span class="selection-info">
                  <span class="selection-name">${escapeHtml(item.name)}</span>
                  <span class="selection-description">${escapeHtml(item.description || "")}</span>
                </span>
                ${
                  item.target !== undefined && item.target !== null && item.target !== ""
                    ? `<span class="selection-target">${escapeHtml(String(item.target))} ${escapeHtml(item.unit || "")}</span>`
                    : ""
                }
              </label>
            `).join("")}
          </div>
        </div>

        <div class="modal-footer">
          ${
            state.modal.firstRun
              ? ""
              : `<button class="secondary-button" type="button" data-modal-action="close">Cancel</button>`
          }
          <button
            class="primary-button ${state.modal.firstRun ? "full-button" : ""}"
            type="button"
            data-modal-action="save"
          >
            ${state.modal.firstRun ? "Start Tracking" : "Save Changes"}
          </button>
        </div>
      </section>
    </div>
  `;

  bindModalEvents();
  refreshIcons();
}

function bindModalEvents() {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return;

  modalRoot.querySelectorAll("[data-training-checkbox]").forEach(checkbox => {
    checkbox.addEventListener("change", event => {
      const id = event.currentTarget.value;

      if (event.currentTarget.checked) {
        state.modal.selected.add(id);
      } else {
        state.modal.selected.delete(id);
      }
    });
  });

  const search = modalRoot.querySelector("[data-modal-search]");
  search?.addEventListener("input", event => {
    state.modal.search = event.currentTarget.value;
    renderModal();

    const newSearch = document.querySelector("[data-modal-search]");
    newSearch?.focus();
    if (newSearch) {
      newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
    }
  });

  modalRoot.querySelectorAll("[data-modal-action]").forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.modalAction;

      if (action === "close") {
        closeModal();
      }

      if (action === "save") {
        saveSelectedTraining();
      }
    });
  });

  modalRoot.querySelector("[data-modal-backdrop]")?.addEventListener("click", event => {
    if (!state.modal.firstRun && event.target === event.currentTarget) {
      closeModal();
    }
  });
}

function saveSelectedTraining() {
  const selected = [...state.modal.selected];

  if (!selected.length) {
    showToast("Select at least one training item");
    return;
  }

  state.selectedItems = selected;
  localStorage.setItem(
    STORAGE_KEYS.PROFILE,
    JSON.stringify({ selectedItems: state.selectedItems })
  );

  closeModal();
  render();
  showToast("Training settings saved");
}

function closeModal() {
  state.modal = null;
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    modalRoot.innerHTML = "";
  }
}

function getSelectedTrainingItems() {
  return state.selectedItems
    .map(id => state.trainingItems.find(item => item.id === id))
    .filter(Boolean);
}

function getCompletedIds() {
  return new Set(
    Object.entries(state.progress[state.currentDate] || {})
      .filter(([, completed]) => completed)
      .map(([id]) => id)
  );
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(state.progress));
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function shiftDate(dateKey, amount) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + amount);
  return getDateKey(date);
}

function formatWeekday(dateKey) {
  return parseDateKey(dateKey).toLocaleDateString(undefined, {
    weekday: "long"
  });
}

function formatDate(dateKey) {
  return parseDateKey(dateKey).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function icon(name, size = 18) {
  return `<i data-lucide="${name}" width="${size}" height="${size}"></i>`;
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
