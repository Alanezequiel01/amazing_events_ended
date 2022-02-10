var eventos = []
async function capturaJSON(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => eventos.push(...json.eventos))
    console.log(eventos)
    displayCard()

    var id = 1
        eventos.map(evento =>evento.id = id++)
    console.log(eventos)
    displayCard(eventos)
}

function displayCard(filtrado){
    var toDisplay = []
    if(filtrado == undefined){
        toDisplay.push(...eventos)
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
capturaJSON()

//<a href="detalle.html?id=${evento.id}">

var buscador = document.querySelector("#buscador")
buscador.addEventListener("keyup", filtrar)

function filtrar(event){
    var val = event.target.value
    var filtrado = eventos.filter(evento => evento.name.toLowerCase().includes(val.toLowerCase()))
    console.log(filtrado)
    displayCard(filtrado)
}