const formCarreraNueva = document.getElementById("nuevaCarrera");
const listaCuatrimestres = document.getElementById("listaCuatrimestres");

//*********************************************************************************************************************
// clase de la carrera, es una clase por si se quiere agregr algun metodo
class Carrera {
    constructor(titulo, facultad, cuatrimestres) {
        this.titulo = String(titulo),
            this.facultad = String(facultad),
            this.cuatrimestres = cuatrimestres
    }

}


//*********************************************************************************************************************
// las carreras no se arman directo con la clase, se arman a traves de esta funcion para poder tratar los datos correctamente


function agregarCarrera(titulo, facultad, cuatrimestres) {

    const carreraExiste = (listaCarreras.length > 0 && listaCarreras.find(carrera => carrera.titulo === titulo));
    if (!carreraExiste) {

        //el objeto cuatrimestres no viene parseado, se parse cada lista de materias
        for (let cuatri of cuatrimestres) {
            cuatri.materias = parsearMaterias(cuatri.materias).join(", ")
        }

        //cada carrera creada es anonima y esta guardada en el array central. actualiza localstorage
        listaCarreras.push(new Carrera(titulo, facultad, cuatrimestres));
        localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));

        //refresca la lista despues de la creacion
        armarListaCarreras();

        //alerta confirmando
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
//lee la cantidad de hijos del form de carrera y hace un array con un objeto x cada cuatrimestre
// por la disposicion del html el 1er hijo es el titulo y el segundo el strin de materias


function armarCuatrimestres() {
    const cuatrimestres = [];
    for (const cuatri of (listaCuatrimestres.children)) {
        cuatrimestres.push({ titulo: cuatri.children[0].value, materias: cuatri.children[1].value })
    }
    return cuatrimestres
};




//*********************************************************************************************************************
//agrega una fila de cuatrimestre mas al form de carreras
function nuevoCuatri() {
    
    //borra el boton actual (asi solo la ultima instancia lo posee)
    document.getElementById("agregarCuatri").remove();

    //la lista de cuatrimestres del form es una lista, se agrega un item nuevo por cada cuatrimestre nuevo
    const elementoLista = document.createElement("li");


    //el numero de elemento nuevo, numero actual mas uno, padeado
    let indiceElementoNuevo = String(listaCuatrimestres.childElementCount + 1).padStart(2, "0");

    //nuevo item que incluye el boton que llama a esta funcion, para seguir agregando cuatrimestres
    elementoLista.innerHTML = `
    <input type="text" name="nombreCuatri${indiceElementoNuevo}" placeholder="Porcion de la carrera, ej CBC o 1er Cuatrimestre" required>
    <input type="text" name="cuatri${indiceElementoNuevo}" required>
    <button type="button" onclick="nuevoCuatri()" id="agregarCuatri">+<\/button>
    `;
    // se agrega el cuatri
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
// se llama cuando se selecciona una carrera y se pide armar la tabla con esta



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

        for (const cuatrimestre of arrayCuatrimestres) {
            const nuevoRow = document.createElement("tr");
            nuevoRow.innerHTML = `<td>${cuatrimestre.titulo}<\/td><td>${cuatrimestre.materias}<\/td>`;
            bufferArmado.appendChild(nuevoRow);
        }

        tablaCarreras.innerHTML = bufferArmado.innerHTML;
    }
}

//*********************************************************************************************************************
// crea las opciones del dropdown de carreras

function armarListaCarreras() {
    const listaTabla = document.getElementById("carreraElegida");
    listaTabla.innerHTML = "";

    for (const indiceCarrera in listaCarreras) {

        const opcion = document.createElement("option");
        opcion.innerHTML = listaCarreras[indiceCarrera].titulo;
        opcion.setAttribute("value", indiceCarrera)
        listaTabla.appendChild(opcion);
    }
}

//*********************************************************************************************************************
// llama a prompt, si es confirmado borra la carrera elegida


function borrarCarrera() {

    //obtiene la materia seleccionada
    const carreraElegidaenLista = document.getElementById("carreraElegida").value;

    //pregunta
    Swal.fire({
        icon: 'warning',
        title: 'Seguro?',
        text: 'Vas a borrar la carrera seleccionada',
        showCancelButton: true
    })
    //ejecuta si confirmado
    .then(resultado => {
        if (resultado.isConfirmed){

            //elimina del array, actualiza el localstorage y la lista para elegir las carreras que existen
            listaCarreras.splice(carreraElegidaenLista,1);
            localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));
            armarListaCarreras();

        }

    })
    
 


}





inicializar("../js/datos.json", armarListaCarreras);