// Esta función se ejecuta cuando la página se carga
window.onload = function() {
    let producto1 = {
        nom: "producto",
        desc: "Descripcion de producto",
        cant: 10,
        pre: 13000 
    };
    let producto2 = {
        nom: "producto",
        desc: "Descripcion de producto",
        cant: 30  ,
        pre: 10000 
    };
    let producto3 = {
        nom: "producto",
        desc: "Descripcion de producto",
        cant: 24  ,
        pre: 15000 
    };


    InsertarDatos(producto1);
    InsertarDatos(producto2);
    InsertarDatos(producto3);
};



var Fila = null;

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
    } else {
        Actualizar(DataForm);
        Vaciar();
    }
}

function Leer() {
    let DataForm = {};
    DataForm["nom"] = document.getElementById("nom").value;
    DataForm["desc"] = document.getElementById("desc").value;
    DataForm["cant"] = document.getElementById("cant").value;
    let precioValue = document.getElementById("pre").value;
    // Eliminar el símbolo "$" y los puntos antes de asignar el valor al objeto DataForm
    DataForm["pre"] = parseFloat(precioValue.replace(/\$|,/g, ''));
    return DataForm;
}

function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let Fila = table.insertRow(table.length);
    columna1 = Fila.insertCell(0).innerHTML = data.nom;
    columna3 = Fila.insertCell(1).innerHTML = data.desc;
    columna2 = Fila.insertCell(2).innerHTML = data.cant;
  
    // Formatear el precio con puntos como separador de miles
    columna4 = Fila.insertCell(3).innerHTML = '$' + numberWithCommas(data.pre);
    columna4 = Fila.insertCell(4).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`;
    document.getElementById("nom").focus();
    Vaciar();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ",");
}

function Vaciar() {
    document.getElementById("nom").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("cant").value = "";
    document.getElementById("pre").value = "";
    Fila = null;
}

function Editarr(td) {
    Fila = td.parentElement.parentElement;
    document.getElementById("nom").value = Fila.cells[0].innerHTML;
    document.getElementById("desc").value = Fila.cells[1].innerHTML;
    document.getElementById("cant").value = Fila.cells[2].innerHTML;
    // Eliminar el símbolo "$" y los puntos antes de asignar el valor del precio al campo de precio
    document.getElementById("pre").value = parseFloat(Fila.cells[2].innerHTML.replace(/\$|,/g, ''));
}

function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nom;
    Fila.cells[1].innerHTML = DataForm.desc;
    Fila.cells[2].innerHTML = DataForm.cant;
    // Formatear el precio con puntos como separador de miles
    Fila.cells[3].innerHTML = '$' + numberWithCommas(DataForm.pre);
    document.getElementById("nom").focus();
}

function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tabla").deleteRow(row.rowIndex);
        Vaciar();
    }
}