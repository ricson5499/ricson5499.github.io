async function getJohorBahruAPI() {
    const url = 'https://psi.ricson5499.workers.dev/';

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.api == null) {
        throw new Error('Larkin API data unavailable');
    }

    const api = data.api;

    switch (true) {
        case api > 300:
          data.status = "Hazardous";
          break;
        case api >= 201:
          data.status = "Very Unhealthy";
          break;
        case api >= 101:
          data.status = "Unhealthy";
          break;
        case api >= 51:
          data.status = "Moderate";
          break;
        default:
          data.status = "Good";
    }

    return {
        location:data.location,
        stationId:data.stationId,
        api: api,
        updatedAt: data.updatedAt,
        status: data.status
    };
}

function renderPSI(data) {
  const value = document.getElementById("psi-value");
  const status = document.getElementById("psi-status");
  const updated = document.getElementById("psi-updated");

  value.textContent = data.api ?? "--";
  status.className = "psi-badge";

  const levels = {
    "Good": ["GOOD", "psi-good"],
    "Moderate": ["MODERATE", "psi-moderate"],
    "Unhealthy": ["UNHEALTHY", "psi-unhealthy"],
    "Very Unhealthy": ["VERY UNHEALTHY", "psi-very-unhealthy"],
    "Hazardous": ["HAZARDOUS", "psi-hazardous"]
  };

  const level = levels[data.status];

  status.textContent = level?.[0] ?? data.status ?? "UNKNOWN";

  if (level) {
    status.classList.add(level[1]);
  }

  updated.textContent = data.updatedAt
  ? "Updated " + new Date(data.updatedAt).toLocaleString(
      "en-MY",
      {
        timeZone: "Asia/Kuala_Lumpur",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    ) + " · Malaysia time"
  : "Update time unavailable";
}

async function showPSI() {
  try {
    const data = await getJohorBahruAPI();
    renderPSI(data);
  } catch (error) {
    console.error("Failed to load PSI:", error);
  }
}

showPSI();