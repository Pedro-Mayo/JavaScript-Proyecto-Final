async function inicializar(ruta, callback) {

    //accedemos al localstorage y si no existe da falsy
    const listM = JSON.parse(localStorage.getItem("listaMaterias"));
    const stringsE = JSON.parse(localStorage.getItem("stringsEstadosMaterias"));

    //si no existe es falsy y carga los defaults desde json, si la lista de materias esta vacia tambien
    if ((listM && stringsE) && (listM.length > 0)) {
        listaMaterias = listM;
        stringsEstadosMateria = stringsE;
    } //fetchea los defaults.
    else {
        let respuestaJson = {};

        //fetchea el default de materias
        try {
            respuestaJson = await fetch(ruta).then(x => x.json()).then(x => x);
        }// si falla crea el objeto vacio
        catch {
            respuestaJson = {
                listaMaterias: [],
                stringsEstadosMateria: {},
            }
        }

        listaMaterias = respuestaJson.listaMaterias;
        stringsEstadosMateria = respuestaJson.stringsEstadosMateria;

        //guarda lo cargado en localstorage
        localStorage.setItem("listaMaterias", JSON.stringify(listaMaterias));
        localStorage.setItem("stringsEstadosMaterias", JSON.stringify(stringsEstadosMateria));
    }

    //si hay una funcion definida para ser ejeutada despues, la ejecuta
    if (callback) {
        callback();
    }

}

//no son const para despues asignarles el valor de lo cargado en la inicializacion, variables globales para no ser borradas de memoria
let listaMaterias = [];
let stringsEstadosMateria = {};
