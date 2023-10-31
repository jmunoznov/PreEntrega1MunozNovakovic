//if (isNaN(Number("aaaa"))) {
//  console.log(true);
//else {
//  console.log(false);
//

///*DECLARACIÓN DE CONSTANTES*/
const iva = 0.19;
const tarifaBase = 3500;

//alert("Bienvenido a mi portal");

//let nombre = prompt("favor ingresar tu nombre");
//alert(`${nombre}, estamos en nuestra segunda etapa de desarrollo del sitio, por lo que la experiencia de usuario, no será la mejor, pero ten fé que todo mejorará! `)

let salir=false;
let empresaCreada=false;
const empresas=[];

class Empresa {
    constructor(info) {
        this.rut = info.rut;
        this.razonSocial = info.razonSocial;
        //this.nombreFantasia = info.nombreFantasia;
        this.giroComercial = info.giroComercial;
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

//Propuesta de Menú Inicial - Por Mejorar
//1.- Registrar Nuevo Cliente
//2.- Modificar información de Clientes Actuales
//3.- Facturación
//4.- Habilitar/Deshabilitar Cliente(s)
//5.- Salir

do {
    let op=prompt(`Clients Managements | LogisticaJMN

        1.- Registrar Nuevo Cliente
        2.- Ver información de Cliente(s)
        3.- Proyección de Facturación
        4.- Habilitar/Deshabilitar Cliente(s)
        5.- Eliminar Clientes
        6.- Salir

    Favor ingrese una opción
    `);

    let listadoEmpresas = "";
    switch (op) {
        case "1":
            const nuevaEmpresa = new Empresa(
                {
                    rut: prompt("Favor ingresar el rut de la empresa"),
                    razonSocial: prompt("Favor ingresar razón social de la empresa"),
                    giroComercial: prompt("Favor ingresar el giro comercial de la empresa"),
                    direccion: prompt("Favor ingresar dirección de la empresa"),
                    run: prompt("Favor ingresar el run del representante legal"),
                    nombreRepLegal: prompt("Favor ingresar el nombre del representante legal"),
                    contacto: prompt("Favor ingresar el número de contacto del representante legal"),
                    volumen: prompt("Favor ingresar el volumen comprometido de pedidos a procesar al mes por LogísticaJMN")
                }
            )
            empresas.push(nuevaEmpresa);
            empresaCreada=true;
            break;
        case "2":
            if (empresaCreada==false) {
                alert(`Favor registrar al menos un cliente`);
                break;
            }
            listadoEmpresas = "";

            for (let index=0; index<empresas.length; index++){
                listadoEmpresas = listadoEmpresas + "\n" + (index+1) + ".- " + "RUT: " + empresas[index].rut + " | Razón Social: " + empresas[index].razonSocial + " | Estado: " + empresas[index].estado;
            }
            alert(`Empresas registradas: \n\n${listadoEmpresas}`);
            break;
        case "3":
            if (empresaCreada==false) {
                alert(`Favor registrar al menos un cliente`);
                break;
            }
            const empresasFiltradas = empresas.filter((item) => item.estado=="Activo");
            const totalFacturacion = empresasFiltradas.reduce((acum,item) => acum + (item.tarifa * item.volumen), 0);
            const totalClientes = empresasFiltradas.length;
            alert(`La proyección de facturación con ${totalClientes} cliente(s) registrado(s) y habilitado(s), es de: $${totalFacturacion} + IVA`);
            break;
        case "4":
            if (empresaCreada==false) {
                alert(`Favor registrar al menos un cliente`);
                break;
            }
            listadoEmpresas = "";

            for (let index=0; index<empresas.length; index++){
                listadoEmpresas = listadoEmpresas + "\n" + (index+1) + ".- " + empresas[index].razonSocial;
            }
            let nombreEmpresa = prompt(`Empresas registradas: \n${listadoEmpresas} \n\nFavor ingrese la empresa que desea habilitar/deshabilitar en el sistema`);
            const findEmpresa = empresas.find((item) => item.razonSocial === nombreEmpresa);
            if (findEmpresa) {
                const listaEmpresas = empresas.map((item) => item.razonSocial);
                let index = listaEmpresas.indexOf(findEmpresa.razonSocial);
                if (findEmpresa.estado=="Activo") {
                    empresas[index].bloquear();
                    alert(`Empresa ${findEmpresa.razonSocial} ha sido bloqueada`);
                } else {
                    empresas[index].desBloquear();
                    alert(`Empresa ${findEmpresa.razonSocial} ha sido desbloqueada`);
                }
            } else {
                alert("Empresa no encontrada");
            }
            break;
        case "5":
            if (empresaCreada==false) {
                alert(`Favor registrar al menos un cliente`);
                break;
            }
            listadoEmpresas = "";

            for (let index=0; index<empresas.length; index++){
                listadoEmpresas = listadoEmpresas + "\n" + (index+1) + ".- " + empresas[index].razonSocial;
            }
            let eliminarEmpresa = prompt(`Empresas registradas: \n${listadoEmpresas} \n\nFavor ingrese la empresa que desea elimar del sistema`);
            const existeEmpresa = empresas.find((item) => item.razonSocial === eliminarEmpresa);
            if (existeEmpresa) {
                const listaEmpresas = empresas.map((item) => item.razonSocial);
                let index = listaEmpresas.indexOf(existeEmpresa.razonSocial);
                empresas.splice(index,1);
                alert(`Empresa ${existeEmpresa.razonSocial} fue eliminada con éxito de la base de datos`);
            } else {
                alert("Empresa no encontrada");
            }

            if (empresas.length==0) {
                empresaCreada = false;
            }
            break;
        case "6":
            salir=true;
            alert(`Hasta pronto!`);
            break;
        default:
            alert(`Opción Ingresada NO es válida!, intentalo de nuevo`);
            break;
    } 
} while (salir==false);



/*FUNCIONES DEL CÓDIGO*/
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
