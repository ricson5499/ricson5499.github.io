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

    return {
        location:data.location,
        stationId:data.stationId,
        api: data.api,
        updatedAt: data.updatedAt
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
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }
      ) + " · Malaysia time"
    : "Update time unavailable";
}

const data = await getJohorBahruAPI();
renderPSI(data);