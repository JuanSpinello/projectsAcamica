//Declaración de variables globales
var nombreUsuario = "Juan Spinello";
var saldoCuenta = 27500;
var limiteExtraccion = 3000;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML. (Estas funciones se mostrarán en pantalla)
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    iniciarSesion();
}

var sumarDinero = function(dineroEntrante) {
    saldoCuenta += dineroEntrante;
}

var restarDinero = function(dineroSaliente) {
    saldoCuenta -= dineroSaliente;
}


//Función cambiar limite de extracción
function cambiarLimiteDeExtraccion() {
    limiteExtraccion = parseInt(prompt("Ingrese nuevo limite de extracción: "));
    if (isNaN(limiteExtraccion)) {
        alert("No ha ingresado un limite o el mismo no es valido.");
        limiteExtraccion = parseInt(prompt("Por favor ingrese nuevamente un limite de extracción: "));
    } else {
    actualizarLimiteEnPantalla();
    alert("El nuevo limite de extracción es: $" + limiteExtraccion);
    }
}


//Función extracción de dinero en cuenta ----- (falta optimizar con sentencias booleanas)
function extraerDinero(dineroRetirado) {
    var saldoAnterior = saldoCuenta;
    var dineroRetirado = parseInt(prompt("Ingrese la cantidad de dinero que desea extraer de esta cuenta: "));
    if (isNaN(dineroRetirado)) {
        alert("Esta ingresando caracteres no validos o ha cancelado la acción.\nIntente nuevamente.");
    } else {
    if(dineroRetirado % 100 == 0) {
        if(dineroRetirado <= limiteExtraccion) {
            if(dineroRetirado <= saldoAnterior) {
                restarDinero(dineroRetirado);
                alert("Has retirado: $" + dineroRetirado + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
            } 

            else if(dineroRetirado > saldoAnterior) {
                alert("Lo sentimos...\nNo hay saldo disponible en tu cuenta para extraer ese monto de dinero.");
            }

            actualizarSaldoEnPantalla(saldoCuenta);

            } else {
                alert("Lo sentimos...\nLa cantidad de dinero supera el limite de extracción");
            } 

        } else { 
            alert("Solo pueden extraerse billetes de $100. \nIntente con montos de $500, $1000, $1700, etc.");
        }
    } //cierre if condiciones
} //cierre function

//Función deposito dinero en cuenta
function depositarDinero(dineroIngresado) {
    var saldoAnterior = saldoCuenta;
    var dineroIngresado = parseInt(prompt("Ingrese la cantidad de dinero que desea depositar en esta cuenta: "));
     if (isNaN(dineroIngresado)) {
        alert("Esta ingresando caracteres no validos o ha cancelado la acción.\nIntente nuevamente.");
        //dineroIngresado = parseInt(prompt("Por favor ingrese nuevamente un limite de extracción: "));
     } else {
         sumarDinero(dineroIngresado);
         actualizarSaldoEnPantalla(saldoCuenta);
         alert("Has depositado: $" + dineroIngresado + "\nSaldo anterior: $" + saldoAnterior + "\nSaldo actual: $" + saldoCuenta);
       }
}


 // Devuelve si se tiene al menor el valor indicado en la cuenta
 function haySaldoDisponible(valor) {
    var respuesta = true;
    
    if (parseInt(valor) > saldoCuenta) {
        respuesta = false;
    }
    return respuesta;
}

// descuenta saldo
function descontarSaldo(valor) {
    saldoCuenta = saldoCuenta - parseInt(valor);
}

function pagarServicio() {
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;

    var saldoAnterior = saldoCuenta;
    var servicioAPagar = prompt("Ingrese el número que corresponda con el servicio que querés pagar: \n1 - Agua \n2 - Luz \n3 - Internet \n4 - Teléfono");
    
    switch (servicioAPagar) {

        case '1':
            montoAPagar = agua;
            servicio = 'Agua';
            break;
        case '2':
            montoAPagar = luz;
            servicio = 'Luz';
            break;
        case '3':
            montoAPagar = internet;
            servicio = 'Internet';
            break;
        case '4':
            montoAPagar = telefono;
            servicio = 'Telefono';
            break;
        default:
            alert("El servicio ingresado es inválido");
            break;
    }
    
    if (haySaldoDisponible(montoAPagar)) {
        descontarSaldo(montoAPagar);
        actualizarSaldoEnPantalla();

        alert("Has pagado el servicio " + servicio + ".\n\nSaldo anterior: $" + saldoAnterior + "\nDinero descontado: $" + montoAPagar + "\nSaldo actual: $" + saldoCuenta);
        } else {
            alert("No posee suficiente saldo en la cuenta para pagar este servicio.\nIntente nuevamente cuando posea suficiente saldo");
        }
}

//Función transferencia a otras cuentas
function transferirDinero(transferenciaAmiga) {
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;
    var transferirMonto = prompt("¿Que monto desea transferir a la cuenta elegida?: ");
    var transferenciaAmiga = parseInt(transferirMonto);

    if(transferenciaAmiga<=saldoCuenta) {
        var numeroCuentaIngresado = prompt("Ingrese el número de cuenta a quien desea transferir dinero: ");
        var codigoCuenta = parseInt(numeroCuentaIngresado);
        if(codigoCuenta == cuentaAmiga1 || codigoCuenta == cuentaAmiga2) {
          restarDinero(transferenciaAmiga);
          alert("Se han transferido: $" + transferenciaAmiga + "\nCuenta de destino: " + codigoCuenta);

        } else {
            alert("Debe ingresar un número de una cuenta amiga autorizada.");
        }

    } else {
        alert("El dinero que desea transferir supera al monto disponible de la cuenta. Intente con un monto menor por favor.");
    }

  actualizarSaldoEnPantalla(saldoCuenta);
}

//Función inicio de sesión
function iniciarSesion() {
    var codigoVerificacion = 9876;
    var ingresoBanco = prompt("Ingrese el codigo de acceso a su Homebanking: ");
    var codigoHome = parseInt(ingresoBanco);

    if(codigoVerificacion == codigoHome) {
        alert("¡Bienvenido/a " + nombreUsuario + " ya puedes comenzar a realizar operaciones!");

    } else {
        alert("Esta ingresando un codigo incorrecto o no quiere ingresarlo. \nPor cuestiones de seguridad el dinero sera removido. \nLlame al banco para recuperar su acceso.");
        var vaciarCuenta = 0;
        saldoCuenta = vaciarCuenta;
    }
    actualizarSaldoEnPantalla(saldoCuenta);
}

//Funciones que actualizan el valor de las variables en el HTML (Manipulación del DOM)
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Recorda que tu límite de extracción es de $" + limiteExtraccion;
}