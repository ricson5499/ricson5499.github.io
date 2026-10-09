async function getJohorBahruAPI() {
    const url = 'https://eqms.doe.gov.my/api3/publicmapproxy/PUBLIC_DISPLAY/CAQM_MCAQM_Current_Reading/MapServer/0/query?' +
        new URLSearchParams({
            f: 'json',
            outFields: '*',
            returnGeometry: 'false',
            where: "STATION_ID='CA33J'"
        });

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const station = data.features?.[0]?.attributes;

    if (!station || station.API == null) {
        throw new Error('Larkin API data unavailable');
    }

    return {
        location: station.STATION_LOCATION,
        api: station.API,
        parameter: station.PARAM_SELECTED,
        status: station.CLASS,
        updatedAt: station.DATETIME
            ? new Date(station.DATETIME).toLocaleString('en-MY', {
                timeZone: 'Asia/Kuala_Lumpur'
            })
            : null
    };
}