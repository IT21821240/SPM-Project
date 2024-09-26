const API_BASE_URL = "http://localhost:3000/api/plants";

import axios from "axios";

export const getAllPlants = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};

export const getPlantById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};

// export const createPlant = async (plantData) => {
//   const response = await fetch(API_BASE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(plantData),
//   });
//   return response.json();
// };

export const createPlant = async (plantData) => {
  try {
    const response = await axios.post(API_BASE_URL, plantData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlant = async (id, plantData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plantData),
  });
  return response.json();
};

export const deletePlant = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
