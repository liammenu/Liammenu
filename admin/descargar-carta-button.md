---
boton: |
  <button onclick="descargarAhora()" style="background:#009ee3;color:#fff;border:none;padding:1rem 1.5rem;font-size:1.1rem;border-radius:6px;cursor:pointer;">📥 Descargar Carta Completa</button>
  <script>
    async function descargarAhora(){
      const secciones = [
        {nombre:'OFERTAS',carpeta:'data/ofertas',lista:'data/ofertas-lista.json'},
        {nombre:'PIZZAS',carpeta:'data/pizzas',lista:'data/pizzas-lista.json'},
        {nombre:'LOMOS',carpeta:'data/lomos',lista:'data/lomos-lista.json'},
        {nombre:'MILANESAS',carpeta:'data/milanesas',lista:'data/milanesas-lista.json'},
        {nombre:'ZAPPIN Y PAPAS',carpeta:'data/zappin',lista:'data/zappin-lista.json'},
        {nombre:'PATYS',carpeta:'data/patys',lista:'data/patys-lista.json'}
      ];
      let texto = 'CARTA LIAM BURGER - ACTUALIZADA AL ' + new Date().toLocaleString('es-AR') + '\n\n';
      for(const sec of secciones){
        texto += '▶ ' + sec.nombre + '\n';
        try{
          const listaRes = await fetch(sec.lista);
          if(!listaRes.ok) throw new Error('No lista');
          const archivos = await listaRes.json();
          for(const file of archivos){
            const prodRes = await fetch(sec.carpeta + '/' + file);
            if(!prodRes.ok) continue;
            const p = await prodRes.json();
            if(!p.disponible) continue;
            texto += '  • ' + p.title + ': $' + p.price.toLocaleString('es-AR') + (p.description ? ' - ' + p.description : '') + '\n';
          }
        }catch(e){
          texto += '  (sin productos)\n';
        }
        texto += '\n';
      }
      const blob = new Blob([texto],{type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'carta-liam-burger.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  </script>
---
Hacé clic en el botón de abajo para descargar un archivo .txt con toda la carta actualizada (productos + precios).
