# Armario Inteligente — App del producto

Esta es la app que reciben las clientas después de comprar en el checkout del quiz
("Tu Armario Inteligente" / "150 Looks con 15 Prendas"). Multi-página, sin login (v1).

## Páginas
- `index.html` — Dashboard / inicio
- `prendas.html` — Las 15 prendas del armario cápsula, con link de búsqueda para comprarlas
- `looks.html` — Generador de looks: combina las 15 prendas en vivo (130 combinaciones calculadas), filtrable por ocasión
- `ajustes-visuales.html` — Guía de styling por tipo de cuerpo
- `colores.html` — Guía de colores (bono de lanzamiento)

## Antes de producción
- Los links de "comprar" en `prendas.html` van a una búsqueda de Google Shopping (no inventamos URLs de producto reales) — si tenés links de tiendas específicas, reemplazalos en `app-data.js` (`buyLink`).
- v1 no tiene login: cualquiera con la URL puede entrar. Si querés restringir el acceso solo a compradoras (vía email que llega por webhook de Hotmart), avisame y lo sumamos.

## Correr local
```bash
npm start
```
Sirve en `http://localhost:3000`.
