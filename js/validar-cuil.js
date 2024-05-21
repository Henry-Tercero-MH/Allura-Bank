export default function esUnCuil(campo) {
  const cuil = campo.value.replace(/\-/g, "");
  if (!tieneNumerosRepetidos(cuil)) {
    if (validarPrimerosDigitosCUIT(cuil) && validarDigitoVerificador(cuil)) {
      // console.log("el Cuit existe");
    } else {
      campo.setCustomValidity("No es un código válido");
      // console.log("el Cuit NO existe");
    }
  } else {
    console.log("Números repetidos");
    campo.setCustomValidity("Son números repetidos");
  }
}

function tieneNumerosRepetidos(cuil) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];
  return numerosRepetidos.includes(cuil);
}

function validarPrimerosDigitos(cuil) {
  let primerosDigitos = cuil.substr(0, 2);
  let digitosValidos = ["20", "23", "24", "27", "30", "33", "34"];

  return digitosValidos.includes(primerosDigitos);
}

function validarDigitoVerificador(cuil) {
  let digitos = cuil.substr(0, 10).split("").map(Number);
  let acumulado = 0;
  const factores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 10; i++) {
    acumulado += parseInt(cuil[i], 10) * factores[i];
  }
  let validaorTeorico = 11 - (acumulado % 11);

  if (validaorTeorico == 11) {
    validaorTeorico = 0;
  } else if (validaorTeorico == 10) {
    validaorTeorico = 9;
  }
  const digitoVerificador = parseInt(cuil[10], 10);
  return digitoVerificador === validaorTeorico;
}
