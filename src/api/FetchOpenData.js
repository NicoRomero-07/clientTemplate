const API_BASE_URL = "http://3.127.55.81:8003";



const getCoords = async (address) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2&countrycodes=es&polygon_geojson=1`
  );
  const data = await res.json();
  const { lat, lon, geojson } = data[0];
  return { lat: lat, lon: lon, geojson: geojson };
};
 


export { getCoords};
