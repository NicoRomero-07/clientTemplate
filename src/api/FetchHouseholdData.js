//const BASE_URL = "http://3.127.55.81:8002";
//const BASE_URL = "http://localhost:8002";
const BASE_URL = "https://server-template-api.fly.dev";

const getHouseholdNearbyByCoords = async (lat, lon, radius, startDate, endDate) => {
  
  const res = await fetch(`${BASE_URL}/households/search/nearby?lat=${lat}&lon=${lon}&radius=${radius}&start_date=${startDate}&end_date=${endDate}`);
  return res.json();
};

export { getHouseholdNearbyByCoords };