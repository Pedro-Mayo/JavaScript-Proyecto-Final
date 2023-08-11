// incompleto, crea un array desde un str con codigos de materias para asi crear una carrera

const formCarreraNueva = document.getElementById("nuevaCarrera");
const listaCuatrimestres = document.getElementById("listaCuatrimestres");



const regexMaterias = new RegExp(/(electiva)|((\d+)(\.\d+)?)/, "g");


function parsearMaterias(strMaterias) {
    return strMaterias.match(regexMaterias).filter(largoStr => largoStr > 0);
}

function nuevoCuatri(){
    const agregarCuatri = document.getElementById("agregarCuatri");
    agregarCuatri.remove();
}



formCarreraNueva.addEventListener("submit", form => {
    form.preventDefault();
    //los valores son condicionados en el input (patrones y valores minimos)
    const codigo   = formMateriaNueva.newID.value
    const nombre   = formMateriaNueva.newMat.value;
    const creditos = formMateriaNueva.newCred.value;
    const hsSemanales  = formMateriaNueva.newHsS.value;
    const totalH       = formMateriaNueva.newHst.value;
    const correlativas = formMateriaNueva.newCor.value;
    const estado   = formMateriaNueva.newEst.value;
    //agrega lo obtenido y refresca la tabla
    agregarMateria(codigo, nombre, creditos, hsSemanales, totalH, correlativas, estado);
    armarTablaMaterias();
});


inicializar("../js/datos.json");
