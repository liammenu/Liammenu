const fs = require('fs');
const path = require('path');

const secciones = [
  { carpeta: 'data/pizzas', lista: 'data/pizzas-lista.json' },
  { carpeta: 'data/lomos', lista: 'data/lomos-lista.json' },
  { carpeta: 'data/milanesas', lista: 'data/milanesas-lista.json' },
  { carpeta: 'data/zappin', lista: 'data/zappin-lista.json' },
  { carpeta: 'data/patys', lista: 'data/patys-lista.json' },
  { carpeta: 'data/ofertas', lista: 'data/ofertas-lista.json' }
];

secciones.forEach(({ carpeta, lista }) => {
  if (!fs.existsSync(carpeta)) return;

  const archivos = fs
    .readdirSync(carpeta)
    .filter(file => file.endsWith('.json') && !file.includes('-lista.json'))
    .sort();

  fs.writeFileSync(lista, JSON.stringify(archivos, null, 2));
  console.log(`✅ Actualizada ${lista} con ${archivos.length} archivos`);
});
