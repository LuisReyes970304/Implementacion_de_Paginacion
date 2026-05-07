// URL endpoint
const url_api = "https://rickandmortyapi.com/api/character";
/**
*requestData
*Send request to Endpoint
*@param {string} url_api
*/

let loading = false

document.addEventListener("DOMContentLoaded", () => {
    requestData(url_api);
});

async function requestData(url_api) {
    if(loading) return;
        loading = true;
    const response = await axios.get(url_api);
    let data = response.data;
    console.log(data);

    getElementButton(document, "set", data.info);
    getElementButtonPrev(document, "set", data.info);
    
    getPag(document, "set", data.info);
    getPag(document, "get");
    renderHtml(data);

    loading = false
}

/**
*loadMore
*Call @Function getElementButton 
*/
function loadMore() {
    const button = document.getElementById("loadMore");
    const nextUrl = button.getAttribute("data-next");
    
    // REINICIO: Limpiamos el filtro antes de pedir la siguiente página
    const cleanUrl = removeFilters(nextUrl);
    
    if (cleanUrl) {
        requestData(cleanUrl);
    }
}

function loadPrev() {
    const button = document.getElementById("loadPrev");
    const prevUrl = button.getAttribute("data-prev");
    
    // REINICIO: Limpiamos el filtro antes de pedir la página anterior
    const cleanUrl = removeFilters(prevUrl);
    
    if (cleanUrl) {
        requestData(cleanUrl);
    }
}
/**
*getElementButton
*@param {object} elementButton
*@param {object} button
*@param {string} operation
*/
function getElementButton(elementButton, operation = "get", info = null)
{
    const button = elementButton.getElementById("loadMore");
    if(operation == "get"){
    const next = button.getAttribute("data-next");
        if(next == "" || next == null){
            console.log("No hay url")
        }else {
            requestData(next);
        }
    }else {
        button.setAttribute("data-next", (info.next == null) ? "" : info.next)
    }
}

/**
 * getElementButtonPrev
 * @param {object} elementButton 
 * @param {string} operation 
 * @param {object} info 
 */
function getElementButtonPrev(elementButton, operation = "get", info = null)
{
    const button = elementButton.getElementById("loadPrev");
    if(operation == "get"){
    const prev = button.getAttribute("data-prev");
        if(prev == "" || prev == null){
            console.log("There is not URL")
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

/**
 * getPageNumber
 * @param {string} url 
 * @returns {number} params
 */
function getPageNumber(url) {
    if (!url) {
        return null
    } else {const params = new URL(url).searchParams;
        return parseInt(params.get("page"));
    };
}

/**
 * 
 * @param {object} elementPag 
 * @param {string} operation 
 * @param {object} info 
 */
function getPag(elementPag, operation = "get", info = null) {
    const pagNumber = elementPag.getElementById("pagNumber");
    if (operation == "get") {
        const prev = pagNumber.getAttribute("data-prev");
        if (prev == "" || prev == null) {
            pagNumber.textContent = "Page 1 of 42";
        } else {
            const page = getPageNumber(prev) + 1;
            pagNumber.textContent = "Page " + page + " of 42";
        }
    } else {
        // Guardamos la URL previa para saber en qué página estamos luego
        pagNumber.setAttribute("data-prev", (info.prev == null) ? "" : info.prev);    
    }
}
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

function removeFilters(url) {
    if (!url) return null;
    const newUrl = new URL(url);
    const page = newUrl.searchParams.get("page") || 1;
    // Retornamos la URL base pero manteniendo el número de página
    return `${url_api}/?page=${page}`;
}

function filterByGender(gender) {
    const pagNumberElement = document.getElementById("pagNumber");
    const prevUrl = pagNumberElement.getAttribute("data-prev");
    
    // 1. Averiguamos en qué página estamos. 
    // Si prevUrl existe, la página actual es la de prev + 1. Si no, es la 1.
    let currentPage = 1;
    if (prevUrl) {
        currentPage = getPageNumber(prevUrl) + 1;
    }

    // 2. Construimos la URL manteniendo la página Y agregando el filtro
    // Ejemplo: .../character/?page=5&gender=male
    let filterUrl = `${url_api}/?page=${currentPage}`;
    
    if (gender) {
        filterUrl += `&gender=${gender}`;
    }
    
    // 3. Pedimos los datos
    requestData(filterUrl);
}





// function characterFilter(character){
//     const genderFilter = character.querySelector("span");
//     if(genderFilter && genderFilter.textContent === "Male"){
//         character.style.display = "flex";
//     } else {
//         character.style.display = "none";
//     }
// }