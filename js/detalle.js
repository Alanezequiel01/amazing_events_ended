var eventos = []

async function captura_JSON() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos") 
        .then(response => response.json())
        .then(json => eventos.push(...json.eventos))
     
    console.log(location)
    var id = location.search.split("?id=").filter(Number)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var evento = eventos.find(function(evento) {
        return evento.id == selectedId
        
    })
    var templateHtml =`

            <div class="detallesid">
                <h2 class="nameid">${evento.name}</h2>
                <h4 class="dateid">Fecha: ${evento.date}</h4>
                <p class="descriptionid">${evento.description}</p>
            <div class="textoid">
                <p> <b>CATEGORÍA: </b>${evento.category}</p>
                <p><b>LUGAR: </b>${evento.place}</p>
                <p><b>CAPACIDAD: </b>${evento.capacity}</p>
                <p><b>ASISTENCIA / ESTIMADO: </b>${evento.assistance}</p>
            </div>
            </div>
            <div class="imgyprecio">
                <img class="imgtarjeta" src="${evento.image}" alt="">
                <h3 class="precio">🛒$${evento.price}</h3>
            </div>`

        document.querySelector(".tarjetaid").innerHTML = templateHtml    
     
}

captura_JSON() //llamamos a la funcion getData para que sea inicializada


/* //- Eventos con mayor y menor porcentaje de audiencia
- Eventos con mayor capacidad
- Ingreso por categorias
- Porcentaje de asistencia por categoria */