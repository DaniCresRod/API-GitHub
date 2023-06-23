const APIURL = 'https://api.github.com/users/';


document.getElementById("search").addEventListener("blur", async()=>{

    document.getElementById("main").innerHTML="";
    
    let userName = document.getElementById("search").value;

    const respuesta = await fetch("https://api.github.com/users/"+userName);

    const datos=await respuesta.json();        

    console.log(datos);

    document.getElementById("main").classList.add("card");
    
    let avatar=document.getElementById("main").appendChild(document.createElement("img"));
    avatar.classList.add("avatar");
    avatar.src=datos.avatar_url;

    let masInfo=document.getElementById("main").appendChild(document.createElement("div"));
    masInfo.classList.add("user-info");

    masInfo.appendChild(document.createElement("h2")).textContent=datos.name;
    masInfo.appendChild(document.createElement("p")).textContent=datos.bio;
    let masInfoUl=masInfo.appendChild(document.createElement("ul"));

    masInfoUl.appendChild(document.createElement("li")).innerHTML=`<strong>${datos.followers}</strong>&nbsp;Followers`;
    masInfoUl.appendChild(document.createElement("li")).innerHTML=`<strong>${datos.following}</strong>&nbsp;Following`;
    masInfoUl.appendChild(document.createElement("li")).innerHTML=`<strong>${datos.public_repos}</strong>&nbsp;Repos`;

    const repos = await fetch(datos.repos_url);
    const datosRepo = await repos.json();

    let susRepositorios=masInfo.appendChild(document.createElement("ul"));    

    for(let i=0; i<datosRepo.length; i++){
        let unRepo=susRepositorios.appendChild(document.createElement("li"));
        unRepo.textContent=datosRepo[i].name;
        unRepo.classList.add("repo");
    }

});