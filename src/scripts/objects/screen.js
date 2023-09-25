const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto de Perfil do Usuário" />
                                            <div class="data">
                                                <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                                                <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p><br>
                                                <span>${user.followers}<br>Seguidores</span>
                                                <span>${user.following}<br>Seguindo</span>
                                            </div>
                                    </div>`;

        let repositoriesItens = "";
        user.repositories.forEach(repo => {
            const languagesList = Object.keys(repo.languages).map(language => `<span>${language}</span>`).join(' | ');
            if(languagesList !== ""){
                repositoriesItens += `
                    <li>
                        <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                        <br>
                        <div class="icon fork">
                            <i class="fa-solid fa-code-fork"></i>
                            <span>${repo.forks}</span>
                        </div>
                        <div class="icon star">
                            <i class="fa-solid fa-star"></i>
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="icon eye">
                            <i class="fa-regular fa-eye"></i>
                            <span>${repo.watchers}</span>
                        </div>
                        <br>
                        <div class="icon language">
                            <i class="fa-solid fa-laptop-code"></i>
                            <span>${languagesList ?? "Não possui descrição 😥"}</span>
                        </div>
                        </a>
                    </li>`;
            }else{
                repositoriesItens += `
                    <li>
                        <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                        <br>
                        <div class="icon fork">
                            <i class="fa-solid fa-code-fork"></i>
                            <span>${repo.forks}</span>
                        </div>
                        <div class="icon star">
                            <i class="fa-solid fa-star"></i>
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="icon eye">
                            <i class="fa-regular fa-eye"></i>
                            <span>${repo.watchers}</span>
                        </div>
                        <br>
                        </a>
                    </li>`;
            }
        });
        
        if (user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                        </div>`;
        } 

        let eventsItens = ""
        user.events.forEach(event => {
            if (event.type === "CreateEvent"){
            eventsItens += `<li class="events"><span>${event.repo.name}</span> - ${event.payload.description ?? "Não possui descrição 😥"}</li>`
            }else{
                eventsItens += `<li class="events"><span>${event.repo.name}</span> - ${event.payload.commits[0].message}</li>`
            }
        })

        if (user.events.length > 0){
            this.userProfile.innerHTML += `<div class="section events">
                                            <h2>Atividade</h2>
                                            <ul>${eventsItens}</ul>
                                        </div>`;
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }