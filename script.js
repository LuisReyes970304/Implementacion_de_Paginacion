
// const body = document.querySelector("body");



// async function callCharacter(url) {
//     const response = await fetch(url_api);
//     const data = await response.json();
//     console.log(data);
    
//     data.results.forEach(personaje => {
//         const newElement = document.createElement("div");
//         newElement.innerHTML = `<img src="${personaje.image}"> <p>${personaje.name}</p>`;
//         body.appendChild(newElement);
//     })
// }

// callCharacter(url_api);

// async function callCharacter(url_api) {
//     const response = await fetch(url_api);
//     let data = await response.json();
//     console.log(data.results);

//     let index = 0;
//     addCharacter.addEventListener("click", () => {
//         let name = data.results[index].name;
//         let gender = data.results[index].gender;
//         let image = data.results[index].image;
//         unList.innerHTML += `<li>
//         <img src="${image}">
//         <h2>${name}</h2>
//         <p>${gender}<p>
//         </li>`;
//         index +=1;
//     });
// };

const url_api = "https://rickandmortyapi.com/api/character";


callCharacter(url_api);

async function callCharacter(url_api) {
    const addnext = document.getElementById("loadMore");
    const response = await fetch(url_api);
    const unList = document.querySelector(".unList");
    let data = await response.json();
    let info = data.info;
    addnext.setAttribute("data-next", info.next) ? "": info.next;
    addnext.setAttribute("data-prev", info.prev) ? "": info.prev;
    console.log(data.results);

    for (let index=0; index < data.results.length; index++) {
        let name = data.results[index].name;
        let gender = data.results[index].gender;
        let image = data.results[index].image;
        let status = data.results[index].status;
        console.log(name);
        unList.innerHTML += `<li>
        <img src="${image}">
        <h2>${name}</h2>
        <p>${gender}<p>
        </li>`;
    };
};

function loadMore() {
    const addnext = document.getElementById("loadMore");
    const next = addnext.getAttribute("data-next");
    if(next == "" || next == null){
        console.log("There is not URL");
    } else {
        callCharacter(next);
    }
}

