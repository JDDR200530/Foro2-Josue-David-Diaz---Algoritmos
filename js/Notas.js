let notas = []; // array que guarda las notas 

function notasAgregar(){  // Agrega la nota al array y las muestra en el DOM 
  const NuevaNota = prompt("Ingrese Una Nota ");
  if (NuevaNota !== null && NuevaNota.trim() !== ""){
    notas.push(NuevaNota);
    mostrarNotas();
    guardarNotasEnLocalStorage();
  }
  else {
    alert("El usuario no ingreso ninguna Nota");
  }
}
const ContenedordeNotas = document.getElementById("ContenedordeNotas"); // Dom que contiene notas

function mostrarNotas(){ // funcion que muestra las Notas del array
  ContenedordeNotas.innerHTML= "";
  notas.forEach((nota) => {
    const ElementoNota = document.createElement("div");
    ElementoNota.classList.add("nota");

  
    const textoNota = document.createElement("span");
    textoNota.textContent = nota;
    ElementoNota.appendChild(textoNota);

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.addEventListener("click", () =>{
      editarNota(nota);
    
    })
    ElementoNota.appendChild(botonEditar);
    
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click",()=>{
      eliminarNota(nota);
    })
    ElementoNota.appendChild(botonEliminar);

    ContenedordeNotas.appendChild(ElementoNota);
  }) 
}

function editarNota(nota){  // Edita la nota existente 
  const indiceNota = notas.indexOf(nota);
  if (indiceNota !== -1){
    const nuevaNota = prompt("Ingresa la Nueva Nota");
    if (nuevaNota !== null && nuevaNota.trim() !== ""){
      notas[indiceNota] = nuevaNota;
      mostrarNotas();
      guardarNotasEnLocalStorage();
    }
    else {
      alert("No se ha modificado la nota")
    }
  }else{
    console.error("No se encontro la nota para editar: ", nota);
  }
}

function eliminarNota(nota){ //Eliminar la nota existente 
  const indiceNota = notas.indexOf(nota);
 if (indiceNota !== -1){
  notas.splice(indiceNota, 1 );
  mostrarNotas();
  guardarNotasEnLocalStorage();
}
else{
  console.error("No se encontro la nota para eliminar: ", nota);
}  
}

function guardarNotasEnLocalStorage(){
  const notasJSON = JSON.stringify(notas); // se convierte el array notas a un string JSON
  localStorage.setItem("notas",notasJSON) // se guarda el string JSON en localstorage del navegador 
}

function cargarNotasDesdeLocalStorage(){
  const notasJSON = localStorage.getItem("notas");
  if(notasJSON){
    notas = JSON.parse(notasJSON);
    mostrarNotas();
  }
}

window.addEventListener("load", cargarNotasDesdeLocalStorage); // Cargar las notas del LocalStorage al array.

const botonAgregarNota= document.getElementById("botonAgregarNota"); // Se agrega el boton de añadir nota.
botonAgregarNota.addEventListener("click", notasAgregar)