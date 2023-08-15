//no son const para despues asignarles el valor de lo cargado en la inicializacion, variables globales para no ser borradas de memoria
let listaMaterias = [];
let listaCarreras = [];
let stringsEstadosMateria = {};




async function inicializar(ruta, callback) {

    //accedemos al localstorage y si no existe da falsy
    const listM = JSON.parse(localStorage.getItem("listaMaterias"));
    const listC = JSON.parse(localStorage.getItem("listaCarreras"));
    const stringsE = JSON.parse(localStorage.getItem("stringsEstadosMaterias"));


    //si no existe es falsy y carga los defaults desde json, si la lista de materias esta vacia tambien
    if ((listM && listC) && (listM.length > 0 && listC.length > 0)) {
        listaMaterias = listM;
        listaCarreras = listC;
        stringsEstadosMateria = stringsE;
    } //fetchea los defaults.
    else {
        console.log(Boolean(listC))
        let respuestaJson = {};

        //fetchea el default de materias
        try {
            respuestaJson = await fetch(ruta).then(x => x.json()).then(x => x);
        }// si falla crea el objeto vacio
        catch {
            respuestaJson = {
                listaMaterias: [],
                listaCarreras: [],
                stringsEstadosMateria: {},
            }
        }

        listaMaterias = respuestaJson.listaMaterias ?? [];
        listaCarreras = respuestaJson.listaCarreras ?? [];
        stringsEstadosMateria = respuestaJson.stringsEstadosMateria ?? {};

        //guarda lo cargado en localstorage
        localStorage.setItem("listaMaterias", JSON.stringify(listaMaterias));
        localStorage.setItem("listaCarreras", JSON.stringify(listaCarreras));
        localStorage.setItem("stringsEstadosMaterias", JSON.stringify(stringsEstadosMateria));
    }

    //si hay una funcion definida para ser ejecutada despues, la ejecuta
    if (callback) {
        callback();
    }

}
