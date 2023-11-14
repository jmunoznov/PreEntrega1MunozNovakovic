//CONSTANTES DEL PROYECTO
const iva = 0.19;
const tarifaBase = 3500;

//DECLARACIÓN DE OBJETOS
class Usuario {
    constructor(info) {
        this.usuario = info.usuario;
        this.clave = info.clave;
    }
}

class Empresa {
    constructor(info) {
        this.rut = info.rut;
        this.razonSocial = info.razonSocial;
        this.industria = info.industria;
        this.direccion = info.direccion;
        this.run = info.run;
        this.nombreRepLegal = info.nombreRepLegal;
        this.contacto = info.contacto;
        this.volumen = info.volumen;
        this.tipoEmpresa = clasificar(this.volumen);
        this.tarifa = calcularTarifaNeta(this.tipoEmpresa);
        this.estado = "Activo";
    }
    bloquear() {
        this.estado="Bloqueado";
    }
    desBloquear() {
        this.estado="Activo";
    }
}

//GENERAR UN LOCAL STORAGE PARA SIMULAR "CUENTAS" DE USUARIO DEL SISTEMA...shhh, esto no ocurrió! jejeje
localStorage.clear();
const usuarios = [
    { id:1, usuario: "jmunozn", nombre: "Jorge Muñoz N.", clave: "5237"},
    { id:2, usuario: "avelasquez", nombre: "Andrés Velásquez", cclave: "5237"},
    { id:3, usuario: "eachar", nombre: "Emanuel Achar", cclave: "5237"},
];
localStorage.setItem("usuarios", JSON.stringify(usuarios));

const arregloEmpresas = [
    { 
        rut:"16.207.549-7", 
        razonSocial: "Kokuko SPA", 
        industria: "Tecnología (Electrónica)", 
        direccion: "Fray Camilo Henríquez 660, Bodega 1119, Santiago, Santiago, RM",
        run: "16.207.549-7",
        nombreRepLegal: "Jorge Muñoz N.",
        contacto: "979662315",
        volumen: 2800,
        tipoEmpresa: clasificar(2800),
        tarifa: calcularTarifaNeta(clasificar(2800)),
        estado: "Activo"
    },

    { 
        rut:"7.361.220-9", 
        razonSocial: "Lussani SPA", 
        industria: "Alimento & Bebidas", 
        direccion: "Guardi 8980, Bodega V7, Peñalolen, Santiago, RM",
        run: "7.361.220-9",
        nombreRepLegal: "Luis Muñoz Firinguetti",
        contacto: "992256721",
        volumen: 4500,
        tipoEmpresa: clasificar(4500),
        tarifa: calcularTarifaNeta(clasificar(4500)),
        estado: "Activo"
    },
];
localStorage.setItem("empresas", JSON.stringify(arregloEmpresas));

let usuarioAlmacenados;
let sesionIniciada;
let usuario;
let empresas;

//Traemos los usuarios almacenados y la sesión iniciada
usuarioAlmacenados = JSON.parse(localStorage.getItem("usuarios"));
sesionIniciada = sessionStorage.getItem("usuario");
console.log(usuarioAlmacenados);
console.log(sesionIniciada);

if (sesionIniciada) {
    usuario = sesionIniciada;
    const logUser = usuarioAlmacenados.find((item) => item.usuario === usuario);
    let saludo = document.getElementById("saludo");
    saludo.innerHTML=`Bienvenid@ ${logUser.nombre}`;
} else {
    usuario = prompt("Ingrese Usuario");
    const logUser = usuarioAlmacenados.find((item) => item.usuario === usuario);
    console.log(logUser);
    if (logUser !== undefined) {
        let saludo = document.getElementById("saludo");
        saludo.innerHTML=`Bienvenid@ ${logUser.nombre}`;
        sessionStorage.setItem("usuario",logUser.usuario);
    } else {
        let formulario = document.getElementById("main");
        formulario.remove();
        let saludo = document.getElementById("saludo");
        saludo.innerHTML=`NO TIENES PERMISO PARA ACCEDER ${usuario}!, GO AWAY!`;
    };
};

empresas = JSON.parse(localStorage.getItem("empresas"));

if (empresas) {
    let cont = 1;
    empresas.forEach(empresa => {
        let ficha = document.createElement("div");
        ficha.className="fichaEmpresas";
        ficha.innerHTML = `
            <h1>${cont}
            <h2>RUT: ${empresa.rut}</h2>
            <h3>Razon Social: ${empresa.razonSocial}</h3>
            <h3>Tipo de Empresa: ${empresa.tipoEmpresa}</h3>
        `;
        cont++;
        listaEmpresas.append(ficha);
    });
} else {
    let seccion = document.getElementById("listaEmpresas");
    seccion.innerHTML = "Sin Empresas Registradas hasta el momento";
};

const cerrarSesion = () => {
    sessionStorage.clear();
    location. reload();
}

let logOut = document.getElementById("salir");
logOut.addEventListener("click", () => cerrarSesion());

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let inputs = e.target;
    const nuevaEmpresa = new Empresa(
        {
            rut: inputs[0].value, 
            razonSocial: inputs[1].value, 
            industria: inputs[2].value, 
            direccion: inputs[3].value,
            run: inputs[4].value,
            nombreRepLegal: inputs[5].value,
            contacto: inputs[6].value,
            volumen: inputs[7].value
        }
    )
    empresas.push(nuevaEmpresa);
    localStorage.clear();
    localStorage.setItem("empresas", JSON.stringify(empresas));

    renderizar(empresas);
    formulario.reset();
});

//FUNCIONES DEL CÓDIGO

function clasificar(volumen) {
    /*Funcion que clasifica al cliente, segun el volumen de pedidos que se compromete a entregarnos*/
    if (volumen<=100) {
        return "Micro Empresa";
    }
    
    if (volumen<=1000) {
        return "Pequeña Empresa";
    }
    if (volumen<=5000) {
        return "Mediana Empresa";
    }
    if (volumen<=20000) {
        return "Empresa Grande";
    } else {
        return "Empresa Nacional";
    }
}
function calcularTarifaNeta(tipoCliente) {
    /*FUNCIÓN QUE RETORNA EL TARIFARIO NETO DE UN CLIENTE*/
    switch (tipoCliente) {
        case "Empresa Nacional":
            return tarifaBase * 0.70;
            break;
        case "Empresa Grande":
            return tarifaBase * 0.80;
            break;
        case "Mediana Empresa":
            return tarifaBase * 0.90;
            break;
        case "Pequeña Empresa":
            return tarifaBase * 0.95;
            break;
        default:
            return tarifaBase;
            break;
    }
}
function tarifaIvaIncluido(tarifaBase) {
    return tarifaBase * (1 + iva);
}

const validarCI = (rut) => {
    rut = rut.replaceAll(".", "");
    rut = rut.replaceAll(",", "");
    rut = rut.replaceAll("-", "");

    if (rut.length == 8) {
        rut = rut.substring(0, 1) + "." + rut.substring(1,4) + "." + rut.substring(4,7) + "-" + rut.substring(7,8);
        return rut;
    } else if (rut.length == 9) {
        rut = rut.substring(0, 2) + "." + rut.substring(2,5) + "." + rut.substring(5,8) + "-" + rut.substring(8,9);
        return rut;
    } else {
        return "NAN";
    };
};

const renderizar = (empresas) => {
    let contendorEmpresas = document.getElementById("listaEmpresas");
    contendorEmpresas.innerHTML="";
    let cont = 1;
    empresas.forEach(empresa => {
        let ficha = document.createElement("div");
        ficha.className="fichaEmpresas";
        ficha.innerHTML = `
            <h1>${cont}
            <h2>RUT: ${empresa.rut}</h2>
            <h3>Razon Social: ${empresa.razonSocial}</h3>
            <h3>Tipo de Empresa: ${empresa.tipoEmpresa}</h3>
        `;
        cont++;
        listaEmpresas.append(ficha);
    });
};