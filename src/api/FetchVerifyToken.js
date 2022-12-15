const API_BASE_URL = "http://3.127.55.81:8002";

const verifyToken = async (verifyToken) => {
  const res = await fetch(`${API_BASE_URL}/api/private`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ verifyToken })
    });
    
  const data = await res.json();
  return data;
};