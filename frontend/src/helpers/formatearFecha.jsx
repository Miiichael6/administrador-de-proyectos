
const formatearFecha = (fecha) => {
   const fechaArreglada= fecha.slice(0, 10).split("-")

  const nuevaFecha = new Date(fechaArreglada)

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  
  return nuevaFecha.toLocaleDateString("es-ES", opciones)
}

export default formatearFecha