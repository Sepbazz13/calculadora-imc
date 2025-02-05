function calcularIndiceMasaCorporal() {
    const datosUsuario = obtenerDatosUsuario();
    const contenedorResultado = document.getElementById("contenedor");

    if (!sonDatosValidos(datosUsuario)) {
        mostrarError(contenedorResultado);
        return;
    }

    const resultado = calcularResultado(datosUsuario);
    mostrarResultado(contenedorResultado, resultado);
}

function obtenerDatosUsuario() {
    return {
        peso: parseFloat(prompt("Introduce tu peso en kg:")),
        altura: parseFloat(prompt("Introduce tu altura en metros:"))
    };
}

function sonDatosValidos(datos) {
    return !isNaN(datos.peso) && !isNaN(datos.altura) && 
           datos.peso > 0 && datos.altura > 0;
}

function calcularResultado(datos) {
    const imc = datos.peso / (datos.altura * datos.altura);
    return determinarCategoria(imc);
}

function determinarCategoria(imc) {
    const categorias = {
        bajoPeso: { limite: 18.5, mensaje: "Bajo peso", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH9P0i5KsDb1fxsDRyvs5VTpZe0mIKGkDuZa9isPmTf0rAtZWpisJdNEjsqmhjnvmK64M&usqp=CAU", color: "#f4c542" },
        normal: { limite: 24.9, mensaje: "Peso normal", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGFKusmrB9h_CjobgJTEDbD79ax03fAHRqKd8eOUi33q3qAxxQq9zGmXQwT-9ZWMD1qoA&usqp=CAU", color: "#24e085" },
        sobrepeso: { limite: 29.9, mensaje: "Sobrepeso", imagen: "https://static.vecteezy.com/system/resources/previews/020/294/481/non_2x/fat-obese-woman-and-measuring-tape-oversize-fatty-girl-obesity-weight-control-concept-overweight-female-cartoon-character-full-length-illustration-vector.jpg", color: "#f4a742" },
        obesidad: { limite: Infinity, mensaje: "Obesidad", imagen: "https://i.pinimg.com/736x/9c/e7/34/9ce7345ae4e4858ebfcc2f9c82d1d76a.jpg", color: "#e0245c" }
    };

    for (const categoria in categorias) {
        if (imc < categorias[categoria].limite) {
            return {
                imc: imc,
                ...categorias[categoria]
            };
        }
    }
    return {
        imc: imc,
        ...categorias.obesidad
    };
}

function mostrarError(contenedor) {
    contenedor.innerHTML = `
        <h1>⚠️ Datos incorrectos</h1>
        <p>Ingresa valores correctos.</p>
        <button onclick="reiniciarCalculo()">Reintentar</button>
    `;
    contenedor.style.backgroundColor = "#e0245c";
}

function mostrarResultado(contenedor, resultado) {
    contenedor.innerHTML = `
        <h1>Tu IMC es <b>${resultado.imc.toFixed(2)}</b></h1>
        <p>${resultado.mensaje}</p>
        <img src="${resultado.imagen}" alt="IMC">
        <button onclick="reiniciarCalculo()">Reintentar</button>
    `;
    contenedor.style.backgroundColor = resultado.color;
}

function reiniciarCalculo() {
    document.getElementById("contenedor").innerHTML = '';
    calcularIndiceMasaCorporal();
}

calcularIndiceMasaCorporal();