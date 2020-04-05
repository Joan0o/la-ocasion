import config from "config";
import { authHeader } from "../_helpers/auth-header";
import { handleResponse } from "../_helpers/handle-response";

export const Items = {
  getAll,
  newItem,
  newItemTest,
};

function getAll() {
  return fetch(`${config.apiUrl}/items`);
}

function newItem(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.apiUrl}/items`, requestOptions).then(handleResponse);
}
function newItemTest(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve({
      name: "tempera",
      price: 2000,
      brand: "pollito"
    })}, 1000)
  });
}
