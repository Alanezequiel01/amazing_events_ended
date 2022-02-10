////////////////////////VARIABLES GLOBALES//////////////////////////

var datos = [];
var capacidad = [];
var asistencia = [];
var precio = [];
var categorias = [];
var porcentajeAud = [];
var ingresoXCategorias = [];
var cate = document.querySelector("#categorias")
var ingr = document.querySelector("#ingresos")
var asist = document.querySelector("#asistencia")
var masAud = document.querySelector("#eventMayAud")
var menAud = document.querySelector("#eventMenAud")
var masCap = document.querySelector("#eventMayCap")
var mayEvent = [];
var menEvent = [];
var mayCapac = [];

/////////////FUNCION getData PARA TRAER LOS DATOS DEL JSON///////////

async function getData() {
  await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then((response) => response.json())
    .then((json) => datos.push(...json.eventos));

    categorias = datos.map(dato => dato.category)
    categorias = new Set(categorias)
    categorias = [...categorias]
    console.log(categorias); 
    capacidad = datos.map(dato => dato.capacity)
    asistencia = datos.map (dato => dato.assistance)
    //console.log(asistencia);
    asistYEstim = datos.map(dato => dato.assistance || dato.estimate)
    precio = datos.map(dato => dato.price)

    
    //////////////CALCULOS PARA LA REALIZACION DE LA TABLA/////////////
    
    mayorAsistencia(datos) 
    console.log(mayEvent);

    menorAsistencia(datos)
    console.log(menEvent);

    mayorCapacidad(datos)
    console.log(mayCapac);

    ingresoXCategorias = categorias.map(categoria => ingresoXCat(categoria,datos))
    console.log(ingresoXCategorias);
    
    porcAudXCategorias = categorias.map(categoria => porcAudXCat(categoria,datos))
    console.log(porcAudXCategorias);
    
    updateDisplay(datos)
  }

  ////////////////////////FUNCIONES /////////////////////////////
  
  function mayorAsistencia(dato){
    var numero = Math.max(...asistYEstim)
    var nombre = ""
    dato.forEach(data => {
      if ((data.assistance || data.estimate) == numero){
        numero = (data.assistance || data.estimate)
        nombre = data.name
        mayEvent.push(nombre)
      }
    })
    return nombre
  }

  function menorAsistencia(dato){
    var numero = Math.min(...asistYEstim)
    var nombre = ""
    dato.forEach(data => {
      if ((data.assistance || data.estimate) == numero){
        numero = (data.assistance || data.estimate)
        nombre = data.name
        menEvent.push(nombre)
      }
    })
    return nombre
  }

  function mayorCapacidad(dato){
    var numero = Math.max(...capacidad)
    var nombre = ""
    dato.forEach(data => {
      if((data.capacity) == numero){
        numero = (data.capacity)
        nombre = data.name
        mayCapac.push(nombre)
      }
    })
    return nombre
  }

  function ingresoXCat(categoria,dato){
    var total = 0
    dato.forEach(data => {
      if(categoria == data.category){
      total += (data.price * (data.assistance || data.estimate)) 
      } 
    })
    //console.log(cat)
    return total
  }

  function porcAudXCat(categoria,dato){
    let porcentaje = 0
    var sumaAsis = 0
    var sumaCap = 0
    dato.forEach(data => {
      if (categoria == data.category && data.assistance){
        sumaAsis += data.assistance
        sumaCap += data.capacity
      }
    })
    //console.log(sumaAsis);
    //console.log(sumaCap);

       porcentaje = ((sumaAsis * 100) / sumaCap)
       porcentajeAud.push(porcentaje.toFixed(2).toString("%"))
     

    console.log(porcentaje);
    return porcentaje 
  }

  getData()

function updateDisplay(datos){
  var html = ""

  categorias.map(categoria => {
    html += `
    <td>${categoria} </td>`  
    var cat = document.createElement("td")
    cate.append(cat)
    cat.append(categoria)
  })

  html = ""
  ingresoXCategorias.map(ingreso => {
    html += `
    <td>${ingreso}</td>` 
    var ing = document.createElement("td")
    ingr.append(ing)
    ing.append(ingreso)

  })

  html = ""
  porcentajeAud.map(porcentaje => {
    html += `
    <td>${porcentaje}</td>` 
    var porc = document.createElement("td")
    asist.append(porc)
    porc.append(porcentaje)
  })

  html = ""
  mayEvent.map(mayorAsistencia => {
    html += `
    <td>${mayorAsistencia}</td>` 
    var mayAsis = document.createElement("td")
    masAud.append(mayAsis)
    mayAsis.append(mayorAsistencia)
  })

  html = ""
  menEvent.map(menorAsistencia => {
    html += `
    <td>${menorAsistencia}</td>` 
    var menAsis = document.createElement("td")
    menAud.append(menAsis)
    menAsis.append(menorAsistencia)
  })

  html = ""
  mayCapac.map(mayorCapacidad => {
    html += `
    <td>${mayorCapacidad}</td>` 
    var masCapac = document.createElement("td")
    masCap.append(masCapac)
    masCapac.append(mayorCapacidad)
  })


}


  
  
  
  
  
  
  
  
  


    
