async function getJohorBahruAPI() {
    const url = 'https://psi.ricson5499.workers.dev/';

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.API == null) {
        throw new Error('Larkin API data unavailable');
    }

    return {
        location:data.location,
        stationId:data.stationId,
        api: data.api,
        updatedAt: data.updatedAt
    };
}