const formMateriaNueva = document.getElementById("nuevaMateria");


class Materia {
    constructor(codigo, nombre, creditos, hsSemanales, totalHs, correlativas, estado) {
        this.codigo = String(codigo),
            this.nombre = String(nombre),
            this.creditos = Number(creditos),
            this.hsSemanales = Number(hsSemanales),
            this.totalHs = Number(totalHs),
            this.correlativas = String(correlativas),
            this.estado = String(stringsEstadosMateria[estado] || stringsEstadosMateria.disponible)
    }

    set estadoMateria(estado) {
        this.estado = String(stringsEstadosMateria[estado] || stringsEstadosMateria.disponible);
    }
}


function agregarMateria(codigo, nombre, creditos, hsSemanales, totalHs, correlativas, estado) {

    //si el array tiene objetos chequeamos que el id de la materia no exista para no repetir
    const materiaExiste = (listaMaterias.length > 0 && listaMaterias.find(materia => materia.codigo === codigo));
    if (!materiaExiste) {

        listaMaterias.push(new Materia(codigo, nombre, creditos, hsSemanales, totalHs, correlativas, estado));

        //cada materia agregada refresca la copia en localstorage
        localStorage.setItem("listaMaterias", JSON.stringify(listaMaterias));

        Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Materia agregada correctamente'
        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ya existe una materia con el mismo ID',
        })
    }
}


//borra la materia solicitada en el array en memoria y en localstorage
function borrarMateria(index) {

    Swal.fire({
        icon: 'warning',
        title: 'Seguro?',
        text: 'Vas a borrar la materia seleccionada',
        showCancelButton: true
    }).then(resultado => {
        if (resultado.isConfirmed) {
            listaMaterias.splice(index, 1);
            localStorage.setItem("listaMaterias", JSON.stringify(listaMaterias));
            armarTablaMaterias();
        }
    }
    )
}

//la funcion es llamada al armar la tabla de materias, es pasada el index de la materia actual
function crearCeldaBorrar(index) {

    const anchorBorrar = document.createElement("a");
    anchorBorrar.innerHTML = "❌";

    //es un link, llama a la funcion borrarMateria y le pasa el index de la materia
    anchorBorrar.setAttribute("href", ("javascript: borrarMateria(" + index + ");"))


    const celda = document.createElement("td");
    celda.appendChild(anchorBorrar);

    return celda;
}

function armarTablaMaterias() {

    //buscamos la tabla de materias
    const tablaMaterias = document.querySelector("#tablaMateriasBody");

    //Si existe la armamos (solo existe si estamos en la pag de materias)
    if (tablaMaterias) {
        const bufferArmado = document.createElement("div");

        //por cada index del array listaMaterias
        for (const materia in listaMaterias) {


            const tableRow = document.createElement("tr");

            //llamamos al objeto del indice actual
            const materiaActual = listaMaterias[materia]

            //por cada propiedad del objeto se agrega una celda
            for (const infoMateria in materiaActual) {

                const tableData = document.createElement("td");
                tableData.innerHTML = String(materiaActual[infoMateria]);
                tableRow.appendChild(tableData);
            };

            //despues de los datos se agrega el boton de borrar para el objeto actual (se usa splice con el indice del objeto actual)
            tableRow.appendChild(crearCeldaBorrar(materia));

            //se agrega la fila actual de la materia al buffer
            bufferArmado.appendChild(tableRow);


        }
        //se reemplaza el contenido de la tabla por el nuevo computado
        tablaMaterias.innerHTML = bufferArmado.innerHTML;
    }
}

//agrega un eventListener para que el boton de submit no envie el formulario y js lea los contenido de las celdas

formMateriaNueva.addEventListener("submit", form => {
    form.preventDefault();
    //los valores son condicionados en el input (patrones y valores minimos)
    const codigo = formMateriaNueva.newID.value
    const nombre = formMateriaNueva.newMat.value;
    const creditos = formMateriaNueva.newCred.value;
    const hsSemanales = formMateriaNueva.newHsS.value;
    const totalH = formMateriaNueva.newHst.value;
    const correlativas = formMateriaNueva.newCor.value;
    const estado = formMateriaNueva.newEst.value;
    //agrega lo obtenido y refresca la tabla
    agregarMateria(codigo, nombre, creditos, hsSemanales, totalH, correlativas, estado);
    armarTablaMaterias();
});


inicializar("../js/datos.json", armarTablaMaterias);