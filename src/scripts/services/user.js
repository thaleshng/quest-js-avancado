import { baseUrl } from "../variables.js";

async function getUser(userName) {
    const url = `${baseUrl}/${userName}`;
    const response = await fetch(url);
    return await response.json();
}

export { getUser }