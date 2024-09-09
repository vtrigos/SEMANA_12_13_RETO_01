// VARIABLES
const pantallaBienvenida = document.getElementById('pantallaBienvenida');
const pantallaDni = document.getElementById('pantallaDni');
const pantallaAviso = document.getElementById('pantallaAviso');
const pantallaOperaciones = document.getElementById('pantallaOperaciones');
const pantallaPassword = document.getElementById('pantallaPassword');
const pantallaSaldo = document.getElementById('pantallaSaldo');
const pantallaDeposito = document.getElementById('pantallaDeposito');
const pantallaRetiro = document.getElementById('pantallaRetiro');
const pantallaResultadoDeposito = document.getElementById('pantallaResultadoDeposito');
const pantallaResultadoRetiro = document.getElementById('pantallaResultadoRetiro');
const pantallaWait = document.getElementById('pantallaWait');
const pantallaPassOk = document.getElementById('pantallaPassOk');

const dniInput = document.getElementById('dniInput');
const passwordInput = document.getElementById('passwordInput');
const montoDeposito = document.getElementById('montoDeposito');
const montoRetiro = document.getElementById('montoRetiro');

const mensajeErrorDni = document.getElementById('mensajeErrorDni');
const mensajeErrorPassword = document.getElementById('mensajeErrorPassword');

const btnContinuarBienvenida = document.getElementById('btnContinuarBienvenida');
const formIngreso = document.getElementById('formIngreso');

const btnContinuarAviso = document.getElementById('btnContinuarAviso');

const opConsultarSaldo = document.getElementById('opConsultarSaldo');
const opDepositarMonto = document.getElementById('opDepositarMonto');
const opRetirarMonto = document.getElementById('opRetirarMonto');

const volverBienvenidaDni = document.getElementById('volverBienvenidaDni');
const volverOperacionesDesdePassword = document.getElementById('volverOperacionesDesdePassword');
const volverPantallaBienvenida = document.getElementById('volverPantallaBienvenida');
const volverOperaciones = document.getElementById('volverOperaciones');
const volverOperacionesDesdeRetiro = document.getElementById('volverOperacionesDesdeRetiro');
const volverOperacionesDesdeSaldo = document.getElementById('volverOperacionesDesdeSaldo');
const volverOperacionesDesdeDeposito = document.getElementById('volverOperacionesDesdeDeposito');
const volverOperacionesDesdeResultadoRetiro = document.getElementById('volverOperacionesDesdeResultadoRetiro');

const salirDesdeSaldo = document.getElementById('salirDesdeSaldo');
const salirDesdeDeposito = document.getElementById('salirDesdeDeposito');
const salirDesdeRetiro = document.getElementById('salirDesdeRetiro');

const btnIngresarPassword = document.getElementById('btnIngresarPassword');
const realizarDeposito = document.getElementById('realizarDeposito');
const realizarRetiro = document.getElementById('realizarRetiro');
const retiro20 = document.getElementById('retiro20');
const retiro50 = document.getElementById('retiro50');
const retiro100 = document.getElementById('retiro100');
const retiro200 = document.getElementById('retiro200');


const cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", dni: 44788834 },
    { nombre: "Gera", saldo: 150, password: "5678", dni: 10247439 },
    { nombre: "Sabi", saldo: 60, password: "9102", dni: 98005362 }
];

let cuentaSeleccionada = null;
let operacionActual = null;

// LISTENERS

btnContinuarBienvenida.addEventListener('click', () => mostrarPantalla('pantallaDni'));

formIngreso.addEventListener('submit', (e) => {
    e.preventDefault();
    const dni = dniInput.value;
    seleccionarCuentaPorDni(dni);
});

btnContinuarAviso.addEventListener('click', () => mostrarPantalla('pantallaOperaciones'));
opConsultarSaldo.addEventListener('click', () => {
    operacionActual = 'consultar';
    mostrarPantalla('pantallaPassword');
});

opDepositarMonto.addEventListener('click', () => {
    operacionActual = 'depositar';
    mostrarPantalla('pantallaPassword');
});

opRetirarMonto.addEventListener('click', () => {
    operacionActual = 'retirar';
    mostrarPantalla('pantallaPassword');
});

volverBienvenidaDni.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaBienvenida');
});

volverOperacionesDesdePassword.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

volverPantallaBienvenida.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaBienvenida');
});

volverOperaciones.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

volverOperacionesDesdeRetiro.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

volverOperacionesDesdeSaldo.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

volverOperacionesDesdeDeposito.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

volverOperacionesDesdeResultadoRetiro.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaOperaciones');
});

salirDesdeSaldo.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaBienvenida');
});

salirDesdeDeposito.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaBienvenida');
});

salirDesdeRetiro.addEventListener('click', () => {
    limpiarCampos();
    mostrarPantalla('pantallaBienvenida');
});

btnIngresarPassword.addEventListener('click', () => verificarPassword());

realizarDeposito.addEventListener('click', () => depositarMonto());
realizarRetiro.addEventListener('click', () => retirarMonto());
retiro20.addEventListener('click', () => retiroRapido(20));
retiro50.addEventListener('click', () => retiroRapido(50));
retiro100.addEventListener('click', () => retiroRapido(100));
retiro200.addEventListener('click', () => retiroRapido(200));


// FUNCIONES
function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(pantalla => pantalla.classList.add('pantallOff'));
    document.getElementById(idPantalla).classList.remove('pantallOff');
    document.getElementById(idPantalla).classList.add('pantallOn');
}

function limpiarCampos() {
    dniInput.value = '';
    passwordInput.value = '';
    montoDeposito.value = '';
    montoRetiro.value = '';
    mensajeErrorDni.textContent = '';
    mensajeErrorPassword.textContent = '';
}

function esNumeroValido(eData) {
    const regex = /^\d+$/;
    return regex.test(eData);
}

function seleccionarCuentaPorDni(dni) {

    if (!esNumeroValido(dni)) {
        mensajeErrorDni.textContent = 'DNI incorrecto';
        dniInput.addEventListener('focus', function () {
            mensajeErrorDni.textContent = '';
            dniInput.value = '';
        });
        cuentaSeleccionada = null;
        return;
    }

    cuentaSeleccionada = cuentas.find(cuenta => cuenta.dni === parseInt(dni));

    if (cuentaSeleccionada) {
        mensajeErrorDni.textContent = '';
        mostrarPantalla('pantallaWait');
        setTimeout(() => {
            mostrarPantalla('pantallaAviso');
        }, 3000);

    } else {
        mensajeErrorDni.textContent = 'DNI incorrecto';
        dniInput.addEventListener('focus', function () {
            mensajeErrorDni.textContent = '';
            dniInput.value = '';
        });
    }

}

function verificarPassword() {
    const password = passwordInput.value;

    if (password === cuentaSeleccionada.password) {
        if (operacionActual === 'consultar') {
            mostrarPantalla('pantallaPassOk');
            setTimeout(() => {
                mostrarPantalla('pantallaSaldo');
            }, 3000);
            document.getElementById('resultadoSaldo').textContent = `Saldo actual: S/ ${cuentaSeleccionada.saldo}`;
        } else if (operacionActual === 'depositar') {
            mostrarPantalla('pantallaPassOk');
            setTimeout(() => {
                mostrarPantalla('pantallaDeposito');
            }, 3000);
        } else if (operacionActual === 'retirar') {
            mostrarPantalla('pantallaPassOk');
            setTimeout(() => {
                mostrarPantalla('pantallaRetiro');
            }, 3000);
        }
    } else {
        mensajeErrorPassword.textContent = 'Clave incorrecta';
        passwordInput.addEventListener('focus', function () {
            mensajeErrorPassword.textContent = '';
            passwordInput.value = '';
        });
    }
}

function depositarMonto() {
    const monto = parseInt(montoDeposito.value);

    if (monto > 0) {

        cuentaSeleccionada.saldo += monto;
        document.getElementById('mensajeResultadoDeposito').textContent = `Monto depositado: S/ ${monto} - Efectivo disponible: S/ ${cuentaSeleccionada.saldo}`;

        mostrarPantalla('pantallaWait');
        setTimeout(() => {
            mostrarPantalla('pantallaResultadoDeposito');
        }, 3000);
    }
    else {

        document.getElementById('resultadoDeposito').textContent = 'Monto no válido, vuelva a intentarlo.';
        montoDeposito.addEventListener('focus', function () {
            document.getElementById('resultadoDeposito').textContent = '';
            montoDeposito.value = '';
        });
    }
}

function retiroRapido(monto) {

    if (monto > 0 && monto <= cuentaSeleccionada.saldo) {
        cuentaSeleccionada.saldo -= monto;
        document.getElementById('mensajeResultadoRetiro').textContent = `Monto retirado: S/ ${monto} - Efectivo disponible: S/ ${cuentaSeleccionada.saldo}`;

        mostrarPantalla('pantallaWait');
        setTimeout(() => {
            mostrarPantalla('pantallaResultadoRetiro');
        }, 3000);

    } else {
        document.getElementById('resultadoRetiro').textContent = 'Monto no disponible';
    }
}

function retirarMonto() {
    const monto = parseInt(montoRetiro.value);

    if (monto > 0 && monto <= cuentaSeleccionada.saldo) {
        cuentaSeleccionada.saldo -= monto;
        mensaje = `Monto retirado: S/ ${monto} - Efectivo disponible: S/ ${cuentaSeleccionada.saldo}`;
        document.getElementById('mensajeResultadoRetiro').textContent = mensaje;

        mostrarPantalla('pantallaWait');
        setTimeout(() => {
            mostrarPantalla('pantallaResultadoRetiro');
        }, 3000);

    } else {

        document.getElementById('resultadoRetiro').textContent = 'Monto no disponible';
        montoRetiro.addEventListener('focus', function () {
            document.getElementById('resultadoRetiro').textContent = '';
            montoRetiro.value = '';
        });
    }

}
