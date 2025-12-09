const MESES_COMPLETOS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const calcularResultadoPeriodo = async (meta = {}, resultado) => {
    const {
        direccion = "desc",
        tipoMeta = "absoluta",
        valorMeta = 0,
        optimo = null,
        aceptable = null
    } = meta;

    // Si faltan los datos clave para metas relativas
    if (tipoMeta !== "absoluta" && (optimo === null || aceptable === null)) {
        return false;
    }

    const getResponse = (estado) => ({
        resultado,
        estadoResultado: estado
    });

    if (tipoMeta === "absoluta") {
        return resultado >= valorMeta
        ? getResponse("optimo")
        : getResponse("critico");
    }

    const isAsc = direccion === "asc";

    if (isAsc) {
        if (resultado >= optimo) return getResponse("optimo");
        if (resultado >= aceptable) return getResponse("aceptable");
        return getResponse("critico");
    } else {
        if (resultado <= optimo) return getResponse("optimo");
        if (resultado <= aceptable) return getResponse("aceptable");
        return getResponse("critico");
    }
};

export const getResultadoColor = (estado) => {
    switch (estado) {
        case "optimo":
        return "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100";
        case "aceptable":
        return "bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100";
        case "critico":
        return "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100";
        default:
        return "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
    }
};

export function formatPeriodo(registro) {
  const { frecuencia, anio, mes, trimestre, semestre, fechaLibre } = registro;

  switch (frecuencia) {
    case "mensual":
      return `${MESES_COMPLETOS[mes - 1]} ${anio}`;

    case "trimestral": {
      const inicio = (trimestre - 1) * 3;
      const fin = inicio + 2;
      return `${MESES_COMPLETOS[inicio]} – ${MESES_COMPLETOS[fin]} ${anio}`;
    }

    case "semestral": {
      const inicio = semestre === 1 ? 0 : 6;
      const fin = inicio + 5;
      return `${MESES_COMPLETOS[inicio]} – ${MESES_COMPLETOS[fin]} ${anio}`;
    }

    case "anual":
      return `${anio}`;

    case "libre":
      return fechaLibre
        ? new Date(fechaLibre).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        : "Fecha libre";

    default:
      return "-";
  }
}


export const etiquetasResultado = {
    optimo: "Óptimo",
    aceptable: "Aceptable",
    critico: "Crítico"
};