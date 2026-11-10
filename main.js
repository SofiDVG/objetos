
// ===============================
// Tienda de Máscaras - Majora's Mask
// Pre-Entrega 5: Instanciando Objetos
// ===============================

// 1. CLASE: cada máscara de la tienda (propiedades + métodos)
class Mascara {
    constructor(id, nombre, apariencia, habilidades, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.apariencia = apariencia;
        this.habilidades = habilidades; // array de strings
        this.precio = precio;
        this.stock = stock;
    }

    // Informa el estado de la máscara
    describir() {
        return `${this.nombre}\n` +
               `Apariencia: ${this.apariencia}\n` +
               `Habilidades: ${this.habilidades.join(", ")}\n` +
               `Precio: $${this.precio}\n` +
               `Stock: ${this.stock} unidades`;
    }

    // Modifica el stock. Devuelve true si la venta se pudo hacer
    vender(cantidad) {
        if (cantidad > 0 && cantidad <= this.stock) {
            this.stock -= cantidad;
            return true;
        }
        return false;
    }

    // Modifica el precio aplicando un descuento
    aplicarDescuento(porcentaje) {
        this.precio = this.precio - (this.precio * porcentaje / 100);
    }
}

// 2. INSTANCIAS: las 4 máscaras creadas con new y guardadas en constantes
const deku = new Mascara(1, "Máscara Deku", "verde y marrón, con hojas, ramas y ojos flameantes",
    ["caminar sobre agua", "planear entre flores", "disparar semillas pegajosas"], 1500, 5);
const goron = new Mascara(2, "Máscara Goron", "amarilla y marrón, gigante hecha de piedra y ojos diminutos",
    ["rodar a alta velocidad", "resistencia a la lava", "fuerza sobrehumana"], 2000, 3);
const zora = new Mascara(3, "Máscara Zora", "azul y verde, con escamas y ojos brillantes",
    ["nadar a gran velocidad", "respirar bajo el agua", "escudo eléctrico"], 2500, 4);
const majora = new Mascara(4, "Máscara de Majora", "roja y negra, con ojos brillantes",
    ["manipular el tiempo", "crear ilusiones", "traer el caos"], 5000, 1);

// Array con todas las máscaras y carrito de compras
const mascaras = [deku, goron, zora, majora];
let carrito = [];

// 3. FUNCIONES de la tienda

// Muestra el menú principal
function armarMenu() {
    let menu = "TIENDA DE MÁSCARAS\n\n";
    for (let i = 0; i < mascaras.length; i++) {
        menu += `${i + 1} - Ver ${mascaras[i].nombre}\n`;
    }
    menu += "5 - Ver carrito\n";
    menu += "0 - Salir";
    return menu;
}

// Muestra una máscara y ofrece comprarla
function verMascara(mascara) {
    alert(mascara.describir());

    const cantidad = parseInt(prompt(`¿Cuántas unidades de ${mascara.nombre} querés comprar? (0 para volver)`));

    if (cantidad > 0) {
        if (mascara.vender(cantidad)) {
            // Spread: copiamos el carrito y agregamos el nuevo producto
            carrito = [...carrito, {
                nombre: mascara.nombre,
                cantidad: cantidad,
                subtotal: mascara.precio * cantidad
            }];
            alert(`Agregaste ${cantidad} x ${mascara.nombre} al carrito.`);
        } else {
            alert("No hay stock suficiente o la cantidad no es válida.");
        }
    }
}

// Muestra el carrito con el total
function verCarrito() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let detalle = "TU CARRITO\n\n";
    let total = 0;

    for (const item of carrito) {
        // Destructuring del objeto
        const { nombre, cantidad, subtotal } = item;
        detalle += `${cantidad} x ${nombre} = $${subtotal}\n`;
        total += subtotal;
    }

    detalle += `\nTotal: $${total}`;
    alert(detalle);
    console.log("Carrito:", carrito, "Total:", total);
}

// Ciclo principal de la tienda
function iniciarTienda() {
    let opcion = parseInt(prompt(armarMenu()));

    while (opcion !== 0) {
        if (opcion >= 1 && opcion <= mascaras.length) {
            verMascara(mascaras[opcion - 1]);
        } else if (opcion === 5) {
            verCarrito();
        } else {
            alert("Opción inválida, probá de nuevo.");
        }
        opcion = parseInt(prompt(armarMenu()));
    }

    alert("¡Gracias por visitar la tienda!");
}

// 4. VERIFICACIÓN por consola
console.log("--- Máscaras en la tienda ---");
console.log(mascaras);

console.log("--- Probando métodos ---");
goron.aplicarDescuento(10);
console.log("Goron con 10% de descuento:", goron.precio);
zora.vender(2);
console.log("Stock de Zora después de vender 2:", zora.stock);

// 5. Arranca la tienda
iniciarTienda();