# Credicorp · Proyecto LED 3D

Editor del montaje para **Credicorp IA, Data & Ciberseguridad Summit 2026**, el 19 de noviembre de 2026, en el Centro de Convenciones de Lima, piso 8, salas Naciones 1, 2 y 3.

## Abrir el proyecto

En Windows, haz doble clic en **iniciar.cmd**. El servidor local abre el editor en `http://127.0.0.1:8765`. Mantén abierta la ventana del lanzador; pulsa **Ctrl+C** para detenerlo.

El lanzador busca Node.js en el runtime de Codex y después en el PATH. No instala programas. También puedes ejecutar `node server.cjs` desde esta carpeta y abrir la dirección indicada. Evita abrir `dist/index.html` directamente: el visor usa módulos JavaScript y necesita el servidor local.

## Trabajar con el montaje

- Usa la vista general para revisar las 34 piezas y la vista enfocada para ajustar una pieza.
- Selecciona una pieza para cambiar posición, giro, medidas y visibilidad.
- Selecciona un LED para editar su color, intensidad visual, encendido y geometría. Los cambios son una simulación; no envían señal a controladores físicos.
- Guarda una copia del proyecto en **JSON** y vuelve a importarla para continuar o compartir los ajustes. El guardado en el navegador depende del navegador y del origen utilizado.
- Exporta **GLB** para llevar la geometría a un programa 3D, **CSV** para revisar el listado de LEDs y **PNG** para una captura. El JSON conserva los ajustes del editor; el GLB es la geometría exportada.

## Alcance incluido

| Elemento | Cantidad | Medidas documentadas |
| --- | ---: | --- |
| Túnel | 1 | 5 m de fondo; dos paredes de 10 × 5 módulos |
| Innovation Partner | 12 | 4 × 2 m; altura máxima 2,50 m |
| Presenting Partner | 5 | 6 × 3 m; altura máxima 3,10 m |
| Alimentos | 8 | Toldo de 3,10 m de ancho × 2,20 m de alto |
| MR Analityc | 1 | Tarima circular de 1,80 m de diámetro |
| Tótems | 5 | Base de 0,40 × 0,40 m; LED superior |
| Escenario grande | 1 | 16,50 × 4,88 m |
| Escenario secundario | 1 | 12,20 × 4,88 m |
| **Total** | **34** | |

Los dos arcos de Innovation son concéntricos y quedan recortados al nivel del piso. El túnel reproduce los relieves de 5, 10, 15 y 20 cm de sus dos planos. Los colores de esos planos indican profundidad, no colores LED obligatorios.

## Medidas y decisiones pendientes

La planta de **42 × 40 m** y las ubicaciones de las piezas son una propuesta de distribución para trabajar en 3D. No representan un levantamiento del recinto ni una distribución aprobada.

- **Túnel:** los planos indican 2,40 m de alto y la presentación 2,60 m. El ancho del pasillo no está acotado; el modelo parte de 2,80 m.
- **Presenting:** la presentación solicita 5 stands y 5 credenzas; el plano de distribución dibuja 4 módulos. Se usa la cantidad solicitada de 5. Las dimensiones de su credenza son propuestas.
- **Alimentos:** faltan cotas de la máscara MDF, del arco y del fondo del toldo.
- **MR Analityc:** la cantidad, separación y alturas de barras LED son aproximaciones de la referencia visual.
- **Tótems y escenarios:** faltan alturas. La imagen de escenarios muestra frente curvo; la geometría rectangular inicial es un esquema basado en las dimensiones escritas.
- Los colores y diámetros visuales de los LEDs son editables y no especificaciones de luminarias.

Las longitudes LED calculadas corresponden a los recorridos del modelo. No incluyen cables de alimentación, retornos, conectores, reservas, cortes ni desperdicio. El proyecto no contiene todavía un patch de control, cálculo eléctrico ni validación de potencia o estructura.

## Fuentes

Correo de Sonny Sotomayor: **“Requerimiento 19Nov Credicorp IA”**, recibido el 20 de octubre de 2026. Adjuntos utilizados:

- `Informacion Lightman Credicorp 19Nov.pptx`
- `Stand Innovation.pdf`
- `plano tunel (1).pdf`
- `plano tunel (3).pdf`
- `Plano Presenting Credicorp (1).pdf`
- `Plano Presenting Credicorp (2).pdf`
- `Plano Presenting Credicorp (3).pdf`
- `Plano Presenting Credicorp (4).pdf`

Fechas indicadas: montaje del **16 al 18 de noviembre, de 08:00 a 23:00**; evento el **19 de noviembre, de 08:00 a 18:00**; desmontaje el **20 de noviembre, de 08:00 a 23:00**. Horario de Lima.
