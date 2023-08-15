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

function displayCarrera() {

    const seccionMaterias = document.querySelector(".seccionMaterias");
    const carreraElegidaenLista = document.getElementById("carreraElegida").value;

    let creditosConseguidos = 0;

    const carreraElegida = listaCarreras[carreraElegidaenLista];

    const tituloh4 = document.createElement("h4");
    tituloh4.innerHTML = carreraElegida.titulo;
    seccionMaterias.appendChild(tituloh4);

    facultadh4 = document.createElement("h4");
    facultadh4.innerHTML = carreraElegida.facultad;
    seccionMaterias.appendChild(facultadh4);

    const cuatrisElegidos = carreraElegida.cuatrimestres;

    for (cuatrimestre of cuatrisElegidos) {
        const divisor = document.createElement("div");
        divisor.setAttribute("class", "cuatrimestre");

        const tituloCuatri = document.createElement("h4");
        tituloCuatri.innerHTML = cuatrimestre.titulo;
        tituloCuatri.className = "span5";
        divisor.appendChild(tituloCuatri);
        seccionMaterias.appendChild(divisor);

        materiasParseadas = parsearMaterias(cuatrimestre.materias);

        for (materia of materiasParseadas) {
            const materiaActual = listaMaterias.find(x => x.codigo === materia? materia:false)


            const divisorMateria = document.createElement("div");
            divisorMateria.className = "materia";

            if (materiaActual){
            divisorMateria.innerHTML = `
                                         <p class="idMateria">${materiaActual.codigo}<\/p>
                                         <p class="nombreMateria">${materiaActual.nombre}<\/p>
                                         <button class="btnProgresoMateria" href="javascript:progresarMateria("${materiaActual.codigo}")">🔒<\/button>
                                         <div class="requerimientos">
                                             <p>Requerimientos<\/p>
                                             <p>${materiaActual.correlativas}<\/p>
                                         <\/div>
                                         <div class="creditos">
                                           <p>Creditos: ${materiaActual.creditos}<\/p>
                                         <\/div>`
            }
            divisor.appendChild(divisorMateria);

        }



    }



}

inicializar("../js/datos.json", armarListaCarreras);