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

function displayCarrera() {

    const seccionMaterias = document.querySelector(".seccionMaterias");
    seccionMaterias.innerHTML = "";
    const carreraElegidaenLista = document.getElementById("carreraElegida").value;
    const carreraElegida = listaCarreras[carreraElegidaenLista];


    let creditosConseguidos = 0;
    const infoCreditos = document.getElementById("infoCreditos");

    const infoProgreso = document.getElementById("infoProgreso");
    let materiasTotales = 0;
    let materiasAprobadas = 0;


    const tituloh4 = document.createElement("h4");
    tituloh4.innerHTML = carreraElegida.titulo;
    seccionMaterias.appendChild(tituloh4);

    facultadh4 = document.createElement("h4");
    facultadh4.innerHTML = carreraElegida.facultad;
    seccionMaterias.appendChild(facultadh4);

    const cuatrisElegidos = carreraElegida.cuatrimestres;

    for (const cuatrimestre of cuatrisElegidos) {

        const divisor = document.createElement("div");
        divisor.setAttribute("class", "cuatrimestre");

        const tituloCuatri = document.createElement("h4");
        tituloCuatri.innerHTML = cuatrimestre.titulo;
        tituloCuatri.className = "span4";
        divisor.appendChild(tituloCuatri);

        materiasParseadas = parsearMaterias(cuatrimestre.materias);

        for (const materia of materiasParseadas) {
            const materiaActual = listaMaterias.find(x => x.codigo === materia ? materia : false)
            materiasTotales++;
            if (materiaActual.estado === "Aprobado") { materiasAprobadas++ }


            const divisorMateria = document.createElement("div");
            divisorMateria.className = "materia";

            if (materiaActual) {
                creditosConseguidos += (materiaActual.estado === stringsEstadosMateria.aprobado) ? Number(materiaActual.creditos) : 0;
                divisorMateria.innerHTML = `
                                         <p class="idMateria">${materiaActual.codigo}<\/p>
                                         <p class="nombreMateria">${materiaActual.nombre}<\/p>
                                         <button class="btnProgresoMateria" id="materia${materiaActual.codigo}" onCLick="progresarMateria('${materiaActual.codigo}');">Cambiar estado<\/button>
                                         <div class="requerimientos">
                                             <p>Requerimientos<\/p>
                                             <p>${materiaActual.correlativas}<\/p>
                                         <\/div>
                                           <p>Creditos: ${materiaActual.creditos}<\/p>
                                           <p>Estado: ${materiaActual.estado}<\/p>`;
            } else {
                divisorMateria.className = "materia noexiste"
                divisorMateria.innerHTML = `
                                         <p class="idMateria">${materia}<\/p>
                                         <p class="nombreMateria">MATERIA SIN CARGAR<\/p>
                                         <button class="btnProgresoMateria")">🔒<\/button>
                                         <div class="requerimientos">
                                             <p>Requerimientos<\/p>
                                             <p><\/p>
                                         <\/div>
                                           <p>Creditos:<\/p>
                                           <p>Estado:<\/p>`;
            }

            infoCreditos.innerHTML = "Creditos: " + creditosConseguidos;

            infoProgreso.innerHTML = "Porcentaje Carrera: " + ((materiasAprobadas/materiasTotales)*100) + "%";


            divisor.appendChild(divisorMateria);

        }

        seccionMaterias.appendChild(divisor);



    }



}

function progresarMateria(idMateria) {
    const materiaProgresar = listaMaterias.find(x => x.codigo === idMateria);

    console.log(materiaProgresar);
    if (materiaProgresar.estado === "Aprobado") {
        materiaProgresar.estado = "Disponible";
    } else if (materiaProgresar.estado === "Disponible") {
        materiaProgresar.estado = "Cursando";
    } else if (materiaProgresar.estado === "Cursando") {
        materiaProgresar.estado = "Aprobado";
    }

    displayCarrera();



}

inicializar("../js/datos.json", armarListaCarreras);