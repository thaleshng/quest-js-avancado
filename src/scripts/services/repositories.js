import { baseUrl, repositoriesQuantity } from "../variables.js";

async function getRepositories(userName) {
    const url = `${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`;
    const response = await fetch(url);
    const repositories = await response.json();

    if(repositories.message === "Not Found"){
        return
    }

    const repositoriesWithLanguages = await Promise.all(repositories.map(async (repository) => {
        const languagesUrl = `https://api.github.com/repos/${userName}/${repository.name}/languages`;
        const languagesResponse = await fetch(languagesUrl);
        const languagesData = await languagesResponse.json();
        repository.languages = languagesData;
        return repository;
    }));

    return repositoriesWithLanguages;
}

export { getRepositories }