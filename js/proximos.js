var fechaActual = []
var proximos = []
var val = []
var category = []
arrayCategory = []

async function capturaJSON(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") 
    .then(response => response.json())
    .then(json => val.push(json))
    fechaActual.push(val[0].fechaActual)
    console.log(fechaActual)
    proximos.push(...val[0].eventos.filter(fecha => fecha.date > fechaActual))
    console.log(proximos)


    category.push(...proximos.map(category => category.category))
    var clearCategory = new Set(category)
    arrayCategory = [...clearCategory]

    console.log(category)
    console.log(clearCategory)
    console.log(arrayCategory)

    displayCard(proximos)    

    var html=""
    var selector = document.querySelector("#select")
    arrayCategory.map(category => {
        html += `
        <option value="${category}">${category}</option>
        `
    })
    selector.innerHTML = html

}
capturaJSON()

function displayCard(filtrado){
    var toDisplay = []
    if(filtrado == undefined){
        toDisplay.push(...proximos)
    } else{
        toDisplay.push(...filtrado)
    }

    var html = ""
    toDisplay.map(evento =>{
        html +=`
        <div class="tarjeta">
                <img class="minilogos" src="${evento.image}" alt="">
                <h3>${evento.name}</h3></a>
                <p class="fecha">${evento.date}</p>
                <p><b>${evento.category}</b></p>
                <a class="vermas" href="detalle.html?id=${evento.id}">VER MÁS</a>
            </div>`

        document.querySelector(".tarjetas").innerHTML = html    
    })
}

var buscador = document.querySelector("#buscador")
buscador.addEventListener("keyup", filtrar)

function filtrar(event){
    var val = event.target.value
    var filtrado = proximos.filter(evento => evento.name.toLowerCase().includes(val.toLowerCase()))
    console.log(filtrado)
    displayCard(filtrado)
}

document.querySelector("#select").addEventListener("change",function(event){
    var data = proximos.filter(evento => evento.category == event.target.value)

    displayCard(data)
    console.log(data)
})

