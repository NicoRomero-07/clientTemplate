//const BASE_URL = "http://3.127.55.81:8002";
//const BASE_URL = "http://localhost:8002";
const BASE_URL = "https://server-parada-api.fly.dev";

const getDataNearbyByCoords = async (lat, lon, radius) => {
  
  const res = await fetch(`${BASE_URL}/parada/search/nearby?lat=${lat}&lon=${lon}&radius=${radius}`);
  return res.json();
};

const postData = async (data) => {
  const res = await fetch(`${BASE_URL}/parada/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const getData = async () => {
  const res = await fetch(`${BASE_URL}/parada/`);
  return res.json();
};

const getDataById = async (id) => {
  const res = await fetch(`${BASE_URL}/parada/${id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      },
      }
      );
  return res.json();
};

const deleteDataById = async (id) => {
  const res = await fetch(`${BASE_URL}/parada/${id}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      },
      }
      );
  return res;
};

const updateDataById = async (id, data) => {
  const res = await fetch(`${BASE_URL}/parada/${id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      }
      );
  return res.json();
};

const getParadasByCodLineaAndSentido = async (codLinea, sentido) => {
  const res = await fetch(`${BASE_URL}/parada/search/codLinea?codLinea=${codLinea}?sentido=${sentido}`);
  return res.json();
};

export { getDataNearbyByCoords, postData, getData, getDataById, deleteDataById, updateDataById, getParadasByCodLineaAndSentido };