const formCarreraNueva = document.getElementById("nuevaCarrera");
const listaCuatrimestres = document.getElementById("listaCuatrimestres");

//*********************************************************************************************************************
class Carrera {
    constructor(titulo, facultad, cuatrimestres) {
        this.titulo = String(titulo),
            this.facultad = String(facultad),
            this.cuatrimestres = cuatrimestres
    }

}


function agregarCarrera(titulo, facultad, cuatrimestres) {

    const carreraExiste = (listaCarreras.length > 0 && listaCarreras.find(carrera => carrera.titulo === titulo));
    if (!carreraExiste) {

        for (cuatri of cuatrimestres) {
            cuatri.materias = parsearMaterias(cuatri.materias).join(", ")
        }

        listaCarreras.push(new Carrera(titulo, facultad, cuatrimestres));
        localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));

        armarListaCarreras();

        Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Carrera agregada correctamente'
        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Ups',
            text: 'Ya existe una carrera con el mismo nombre'
        })
    }
}


//*********************************************************************************************************************
// regex del codigo de materias, devuelve los strings con el formato numero o numero.numero
const regexMaterias = new RegExp(/electiva|\d+(\.\d+)?/, "g");
function parsearMaterias(strMaterias) {
    return strMaterias.match(regexMaterias).filter(largoStr => largoStr > 0);
}



//*********************************************************************************************************************
//lee la cantidad de hijos del form de carrera y hace un array con un objeto x cada cuatrimestre

function armarCuatrimestres() {
    const cuatrimestres = [];
    for (cuatri of (listaCuatrimestres.children)) {
        cuatrimestres.push({ titulo: cuatri.children[0].value, materias: cuatri.children[1].value })
    }
    return cuatrimestres
};




//*********************************************************************************************************************
//agrega una fila de cuatrimestre mas al form de carreras
function nuevoCuatri() {

    document.getElementById("agregarCuatri").remove();


    const elementoLista = document.createElement("li");

    //el numero de elemento nuevo, numero actual mas uno, padeado
    let indiceElementoNuevo = String(listaCuatrimestres.childElementCount + 1).padStart(2, "0");

    elementoLista.innerHTML = `
    <input type="text" name="nombreCuatri${indiceElementoNuevo}" placeholder="Porcion de la carrera, ej CBC o 1er Cuatrimestre" required>
    <input type="text" name="cuatri${indiceElementoNuevo}" required>
    <button type="button" onclick="nuevoCuatri()" id="agregarCuatri">+<\/button>
    `;
    listaCuatrimestres.appendChild(elementoLista);
}




//*********************************************************************************************************************
//escucha el intento de subir el form de materia nueva, y parsea los datos

formCarreraNueva.addEventListener("submit", form => {
    form.preventDefault();
    const titulo = formCarreraNueva.newCarrera.value;
    const facultad = formCarreraNueva.newFac.value;
    const cuatrimestres = armarCuatrimestres();

    agregarCarrera(titulo, facultad, cuatrimestres);
})

//*********************************************************************************************************************
//
function armarTablaCarreras() {

    //buscamos la tabla de carreras
    const tablaCarreras = document.querySelector("#tablaCarrerasBody");
    const carreraElegidaenLista = document.getElementById("carreraElegida").value;

    //Si existe la armamos (solo existe si estamos en la pag de materias)
    if (tablaCarreras) {
        const bufferArmado = document.createElement("div");

        const carreraElegida = listaCarreras[carreraElegidaenLista];

        const filaDatosCarrera = document.createElement("tr");
        filaDatosCarrera.innerHTML = `<td>${carreraElegida.titulo}<\/td><td>${carreraElegida.facultad}<\/td>`;
        bufferArmado.appendChild(filaDatosCarrera);

        const filaHeadersCuatrimestres = document.createElement("tr");
        filaHeadersCuatrimestres.innerHTML = `<th>Cuatrimestre<\/th><th>Materias<\/th>`;
        bufferArmado.appendChild(filaHeadersCuatrimestres);

        const arrayCuatrimestres = carreraElegida.cuatrimestres;

        for (cuatrimestre of arrayCuatrimestres) {
            const nuevoRow = document.createElement("tr");
            nuevoRow.innerHTML = `<td>${cuatrimestre.titulo}<\/td><td>${cuatrimestre.materias}<\/td>`;
            bufferArmado.appendChild(nuevoRow);
        }

        tablaCarreras.innerHTML = bufferArmado.innerHTML;
    }
}

//*********************************************************************************************************************

function armarListaCarreras() {
    const listaTabla = document.getElementById("carreraElegida");
    listaTabla.innerHTML = "";

    for (indiceCarrera in listaCarreras) {

        const opcion = document.createElement("option");
        opcion.innerHTML = listaCarreras[indiceCarrera].titulo;
        opcion.setAttribute("value", indiceCarrera)
        listaTabla.appendChild(opcion);
    }
}

//*********************************************************************************************************************

function borrarCarrera() {
    const carreraElegidaenLista = document.getElementById("carreraElegida").value;

    Swal.fire({
        icon: 'warning',
        title: 'Seguro?',
        text: 'Vas a borrar la carrera seleccionada',
        showCancelButton: true
    })
    .then(resultado => {
        if (resultado.isConfirmed){
            listaCarreras.splice(carreraElegidaenLista,1);
            localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));
            localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));
            armarListaCarreras();

        }

    })
    
 


}





inicializar("../js/datos.json", armarListaCarreras);