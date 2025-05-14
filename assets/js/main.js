// Cotizador interactivo y WhatsApp API
function openCotizador(servicio) {
  document.getElementById('servicio').value = servicio;
  document.getElementById('cotizador').scrollIntoView({behavior: 'smooth'});
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-cotizador');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const servicio = document.getElementById('servicio').value;
    const variante = document.getElementById('variante').value;
    const cantidad = document.getElementById('cantidad').value;
    if (!servicio || !variante || !cantidad) return;
    // Estimación simple (puedes personalizar por servicio)
    let valor = 10000 * parseInt(cantidad); // Valor base referencial
    Swal.fire({
      title: 'Cotización estimada',
      html: `<b>Servicio:</b> ${servicio}<br><b>Detalle:</b> ${variante}<br><b>Cantidad:</b> ${cantidad}<br><b>Valor estimado:</b> $${valor.toLocaleString('es-CL')}`,
      icon: 'info',
      confirmButtonText: 'Cotizar por WhatsApp'
    }).then((result) => {
      if (result.isConfirmed) {
        const mensaje = `Hola, quiero cotizar el servicio: ${servicio}. Detalle: ${variante}. Cantidad: ${cantidad}. Valor estimado: $${valor.toLocaleString('es-CL')}`;
        window.open(`https://wa.me/56912345678?text=${encodeURIComponent(mensaje)}`,'_blank');
      }
    });
  });
});
