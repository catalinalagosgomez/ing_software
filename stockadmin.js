// Esta función se ejecuta cuando la página se carga
window.onload = function() {
    // Cargar productos desde localStorage al iniciar la página
    cargarProductosDesdeLocalStorage();
};

var Fila = null;

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        // En caso de nueva inserción
        InsertarDatos(DataForm);
    } else {
        // En caso de actualización
        Actualizar(DataForm);
    }
    // Guardar productos en localStorage después de cada operación
    guardarProductosEnLocalStorage();
    Vaciar();
}

function Leer() {
    let DataForm = {};
    DataForm["nom"] = document.getElementById("nom").value;
    DataForm["cant"] = parseInt(document.getElementById("cant").value); // Convertir a número
    return DataForm;
}

function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let Fila = table.insertRow(table.length);
    Fila.insertCell(0).innerHTML = data.nom;
    Fila.insertCell(1).innerHTML = data.cant;
    Fila.insertCell(2).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar">`;
    document.getElementById("nom").focus();
}

function guardarProductosEnLocalStorage() {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let productos = [];
    for (let i = 0; i < table.rows.length; i++) {
        let producto = {
            nom: table.rows[i].cells[0].innerHTML,
            cant: parseInt(table.rows[i].cells[1].innerHTML) // Convertir a número
        };
        productos.push(producto);
    }
    // Guardar productos como cadena JSON en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductosDesdeLocalStorage() {
    // Verificar si hay productos en localStorage
    if (localStorage.getItem('productos')) {
        let productos = JSON.parse(localStorage.getItem('productos'));
        productos.forEach(producto => {
            // Insertar cada producto en la tabla
            InsertarDatos(producto);
        });
    }
}

function Editarr(td) {
    Fila = td.parentElement.parentElement;
    document.getElementById("nom").value = Fila.cells[0].innerHTML;
    document.getElementById("cant").value = Fila.cells[1].innerHTML;
}

function Actualizar(DataForm) {
    Fila.cells[1].innerHTML = DataForm.cant;
}

function Vaciar() {
    document.getElementById("nom").value = "";
    document.getElementById("cant").value = "";
    Fila = null;
}