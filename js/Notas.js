let notas = [];

function notasAgregar(){
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
const ContenedordeNotas = document.getElementById("ContenedordeNotas");

function mostrarNotas(){
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

function editarNota(nota){
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

function eliminarNota(nota){
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
  const notasJSON = JSON.stringify(notas);
  localStorage.setItem("notas",notasJSON)
}

function cargarNotasDesdeLocalStorage(){
  const notasJSON = localStorage.getItem("notas");
  if(notasJSON){
    notas = JSON.parse(notasJSON);
    mostrarNotas();
  }
}

window.addEventListener("load", cargarNotasDesdeLocalStorage);

const botonAgregarNota= document.getElementById("botonAgregarNota");
botonAgregarNota.addEventListener("click", notasAgregar)