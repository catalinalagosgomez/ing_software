var Fila = null;

// Esta función se ejecuta cuando la página se carga
window.onload = function() {
    // Cargar los productos desde localStorage al iniciar la página
    cargarProductosDesdeLocalStorage();
};

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

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
    } else {
        Actualizar(DataForm);
    }
    // Guardar los productos en localStorage después de cada operación
    guardarProductosEnLocalStorage();
    Vaciar();
}

function Leer() {
    let DataForm = {};
    DataForm["nom"] = document.getElementById("nom").value;
    DataForm["desc"] = document.getElementById("desc").value;
    DataForm["cant"] = parseInt(document.getElementById("cant").value);
    let precioValue = document.getElementById("pre").value;
    // Eliminar el símbolo "$" y los puntos antes de asignar el valor al objeto DataForm
    DataForm["pre"] = parseFloat(precioValue.replace(/\$|,/g, ''));
    return DataForm;
}

function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let Fila = table.insertRow(table.length);
    Fila.insertCell(0).innerHTML = data.nom;
    Fila.insertCell(1).innerHTML = data.desc;
    Fila.insertCell(2).innerHTML = data.cant;
    // Formatear el precio con puntos como separador de miles
    Fila.insertCell(3).innerHTML = '$' + numberWithCommas(data.pre);
    Fila.insertCell(4).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar">
                                    <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar">`;
}

function guardarProductosEnLocalStorage() {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let productos = [];
    for (let i = 0; i < table.rows.length; i++) {
        let producto = {
            nom: table.rows[i].cells[0].innerHTML,
            desc: table.rows[i].cells[1].innerHTML,
            cant: parseInt(table.rows[i].cells[2].innerHTML),
            pre: parseFloat(table.rows[i].cells[3].innerHTML.replace(/\$|,/g, ''))
        };
        productos.push(producto);
    }
    // Guardar los productos como cadena JSON en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
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
    document.getElementById("pre").value = parseFloat(Fila.cells[3].innerHTML.replace(/\$|,/g, ''));
}

function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nom;
    Fila.cells[1].innerHTML = DataForm.desc;
    Fila.cells[2].innerHTML = DataForm.cant;
    // Formatear el precio con puntos como separador de miles
    Fila.cells[3].innerHTML = '$' + numberWithCommas(DataForm.pre);
}

function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tabla").deleteRow(row.rowIndex);
        // Guardar los productos en localStorage después de eliminar
        guardarProductosEnLocalStorage();
        Vaciar();
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}