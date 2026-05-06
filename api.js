// URL endpoint
const url_api = "https://rickandmortyapi.com/api/character";
/**
*requestData
*Send request to Endpoint
*@param {string} url_api
*/


async function requestData(url_api) {
    const response = await axios.get(url_api);
    let data = response.data;
    console.log(data)
    getElementButton(document, "set", data.info);
    getElementButtonPrev(document, "set", data.info);
    renderHtml(data);
}

/**
*loadMore
*Call @Function getElementButton */
function loadMore() {
    getElementButton(document, 'get');
}

function loadPrev() {
    getElementButtonPrev(document, 'get');
}

/**
*getElementButton
*@param {object} elementButton
*@param {object} button
*@param {string} operation
*/
function getElementButton(elementButton, operation = 'get', info = null)
{
    const button = elementButton.getElementById("loadMore");
    if(operation == 'get'){
    const next = button.getAttribute("data-next");
        if(next == "" || next == null){
            console.log("No hay url")
        }else {
            requestData(next);
        }
    }else {
        button.setAttribute("data-next", (info.next == null) ? '' : info.next)
    }
}

function getElementButtonPrev(elementButton, operation = 'get', info = null)
{
    const button = elementButton.getElementById("loadPrev");
    if(operation == 'get'){
    const prev = button.getAttribute("data-prev");
        if(prev == "" || prev == null){
            console.log("No hay url")
        }else {
            requestData(prev);
        }
    }else {
        if (info.prev == null) {
            button.style.display = "none"; 
        } else {
            button.style.display = "flex"; 
            button.setAttribute("data-prev", info.prev);
        }
    }
}

// function getPag(elementPag, operation = 'get', info = null)
// {
//     const pagNumber = elementPag.getElementById("pagNumber");
//     if(operation == 'get'){
//     const prev = pagNumber.getAttribute("data-prev");
//     const next = pagNumber.getAttribute("data-next");
//         if(prev == "" || prev == null){
//             pagNumber.textContent = "1";
//         }else{
            
//         }
//     } else {
//         pagNumber.setAttribute("data-next", (info.next == null) ? '' :
//         info.next)
//         pagNumber.setAttribute("data-prev", (info.prev == null) ? '' :
//         info.prev)    
//     }
// }
/**
*renderHtml
*@param {object} element
*@param {object} data
*/
function renderHtml(data){
    let element = document.getElementById("character");
    let resultCount = data.results.length;

    element.innerHTML = "";
    
    for (let index = 0; index < resultCount; index++) {
    let character = data.results[index];
    element.innerHTML += `<li>
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>
        <span>${character.gender}</span>
        </li>`;
    }
}
const response = requestData(url_api);