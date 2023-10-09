/*DECLARACIÓN DE CONSTANTES*/
const iva = 0.19;
const tarifaBase = 3500;

alert("Bienvenido a mi portal");

let nombre = prompt("favor ingresar tu nombre");
alert(`${nombre}, estamos en nuestra primera etapa de desarrollo del sitio`)
alert(`por lo que la experiencia de usuario, no será la mejor, pero ten fé que todo mejorará!`)

let datosFiscales=false;
let repLegal=false;
let tarifa=false;
let factura=false;
let salir=false;
let razonSocial="";
let volIng=0;

do {
    let op=prompt(`Registro de Nuevo Cliente | LogisticaJMN

        1.- Datos Fiscales | ${datosFiscales}
        2.- Representante Legal | ${repLegal}
        3.- Tarifario | ${tarifa}
        4.- Facturación | ${factura}
        5.- Salir

    Favor ingrese una opción
    `);

    switch (op) {
        case "1":
            if (datosFiscales==false) {
                let rut = prompt("Favor ingresar el rut de la empresa");
                razonSocial = prompt("Favor ingresar Razón Social de la empresa");
                datosFiscales=true;
            } else {
                alert(`Los datos fiscales de ${razonSocial} ya fueron ingresados`);
            }
            break;
        case "2":
            if (datosFiscales==false) {
                alert(`Los datos fiscales deben ser ingresados priemro`);
                break;
            }

            if (repLegal==false) {
                let runRepLegal = prompt(`Favor ingresar el run del Rep. Legal de ${razonSocial}`);
                let nomRepLegal = prompt(`Favor ingresar el nombre del Rep. Legal de ${razonSocial}`);
                repLegal=true;
            } else {
                alert(`Los datos del representante legal de ${razonSocial}, ya fueron ingresados`);
            }
            break;
        case "3":
            if (datosFiscales==false) {
                alert(`Los datos fiscales deben ser ingresados priemro`);
                break;
            }

            volIng = Number(prompt(`Favor ingresar el volumen comprometido por ${razonSocial}`));
            let tipoEmpresa = clasificar(volIng);
            let valorTarifa = calcularTarifaNeta(tipoEmpresa);
            alert(`El tarifario asignado a ${razonSocial} es de $${valorTarifa} CLP + IVA`);
            tarifa=true;
            break;
        case "4":
            if (datosFiscales==true && tarifa==true) {
                alert(`                
                    Total Pedidos: ${volIng}
                    Tipo de Cliente: ${clasificar(volIng)}
                    Tarifario Asignado: $${calcularTarifaNeta(clasificar(volIng))} CLP

                    Proyección de Facturación: $${calcularFacturacion(volIng,calcularTarifaNeta(clasificar(volIng)))} CLP
                `);
            } else {
                alert(`Para revisar la facturación, es necesario que los datos fiscales y el tarifario sean completados primero`);
                break;
            }
            break;
        case "5":
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

function calcularFacturacion(volumen, tarifaAsig) {
    return (volumen*tarifaAsig)*(1+iva);
}
