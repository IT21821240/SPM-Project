const API_BASE_URL = "http://127.0.0.1:3000";

export const detectPlantDisease = async (plantData) => {
  console.log("✌️plantData --->", plantData);
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plantData),
  });
  console.log("✌️response --->", response);

  return response.json();
};
