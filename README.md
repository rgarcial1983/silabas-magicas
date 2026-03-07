# 🦉 Sílabas Mágicas

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

Una aplicación interactiva y divertida para que los niños aprendan a clasificar palabras según su acentuación (agudas, llanas y esdrújulas). Diseñada como **Progressive Web App (PWA)** para funcionar en dispositivos móviles, tablets y navegadores web.

## ✨ Características

- 🎮 **Juego interactivo** — Identifica sílabas tónicas y clasifica palabras por tipo
- 📱 **PWA Installable** — Instálala en tu móvil, tablet o navegador como app nativa
- 🔌 **Funciona offline** — Una vez cargada, funciona sin conexión a internet
- 📊 **Gamificación** — Sistema de puntos y retroalimentación visual
- 🎨 **Interfaz colorida** — Diseño atractivo para niños con animaciones suaves
- 📚 **Modal educativo** — Repasa las reglas de acentuación en cualquier momento
- 🌐 **Totalmente responsive** — Compatible con cualquier tamaño de pantalla
- ⚡ **Rápida y ligera** — Carga al instante

## 🚀 Cómo usar

### En el navegador
1. Abre [https://rgarcial1983.github.io/silabas-magicas/](https://rgarcial1983.github.io/silabas-magicas/)
2. Ingresa tu nombre y selecciona cuántas preguntas quieres responder
3. ¡Comienza a jugar!

### Instalar como app

#### En Android/Chrome
1. Abre la app en Chrome
2. Toca el menú ⋮ (tres puntos)
3. Selecciona "Instalar aplicación"
4. ¡La app se agregará a tu pantalla de inicio!

#### En iPhone/Safari
1. Abre la app en Safari
2. Toca el botón Compartir
3. Selecciona "Añadir a Pantalla de Inicio"
4. ¡La app estará disponible como icono en tu home!

#### En Escritorio (Chrome, Edge, etc.)
1. Abre la app en tu navegador
2. Busca el icono de instalación (generalmente en la barra de direcciones)
3. Haz clic en "Instalar"

## 📋 Cómo jugar

### Paso 1: Separa las sílabas
Haz clic en cada sílaba para resaltar la **sílaba tónica** (la que suena más fuerte)

### Paso 2: Clasifica la palabra
Selecciona si es una palabra:
- 🔴 **Aguda** — Acento en la última sílaba
- 🔵 **Llana** — Acento en la penúltima sílaba  
- 🟣 **Esdrújula** — Acento en la antepenúltima sílaba

### Obtén puntos
- ✅ Clasificación correcta: **+10 puntos**
- ❌ Clasificación incorrecta: **+0 puntos**

## 🛠️ Estructura del proyecto

```
silabas-magicas/
├── index.html           # Estructura HTML
├── estilos.css          # Estilos visuales
├── scripts.js           # Lógica del juego
├── words.json           # Base de datos de palabras
├── manifest.json        # Configuración PWA
├── service-worker.js    # Cache y funcionalidad offline
├── .nojekyll            # Configuración GitHub Pages
├── README.md            # Este archivo
└── .git/                # Control de versión
```

## 📝 Editar las palabras

Las palabras del juego se encuentran en `words.json`. Puedes editarlas directamente sin tocar el código:

```json
{
  "word": "CAFÉ",
  "syllables": ["CA", "FÉ"],
  "stressed": 1,
  "type": "aguda",
  "hasTilde": true
}
```

### Propiedades:
- **word** — Palabra en mayúsculas
- **syllables** — Array de sílabas
- **stressed** — Índice de la sílaba tónica (comienza en 0)
- **type** — "aguda", "llana" o "esdrujula"
- **hasTilde** — true/false según requiera tilde

## 🔧 Tecnologías utilizadas

- **HTML5** — Estructura semántica
- **CSS3** — Estilos modernos con variables CSS y animaciones
- **JavaScript Vanilla** — Sin dependencias externas
- **Service Workers** — Para funcionalidad offline
- **Web App Manifest** — Para instalación como PWA

## 🌐 Compatibilidad

| Navegador | Desktop | Mobile |
|-----------|---------|--------|
| Chrome | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Opera | ✅ | ✅ |

## 📱 Requisitos del sistema

- Navegador moderno con soporte para:
  - Service Workers
  - Web App Manifest
  - CSS Grid/Flexbox
  - ES6 JavaScript

## 🚀 Despliegue en GitHub Pages

El proyecto está configurado automáticamente para GitHub Pages:

1. La rama `main` se despliega automáticamente
2. Los archivos se sirven desde la raíz del repositorio
3. El archivo `.nojekyll` previene procesamiento innecesario

Para cambiar la URL de despliegue, edita `start_url` en `manifest.json`.

## 👨‍💻 Desarrollo local

1. Clona el repositorio
```bash
git clone https://github.com/rgarcial1983/silabas-magicas.git
cd silabas-magicas
```

2. Abre con un servidor local (importante para Service Workers):
```bash
# Opción 1: Python 3
python -m http.server 8000

# Opción 2: Node.js (http-server)
npx http-server

# Opción 3: VS Code Live Server extension
```

3. Abre [http://localhost:8000](http://localhost:8000)

## 📚 Reglas de acentuación

### Palabras Agudas 🔴
- **Definición** — Acento en la última sílaba
- **Regla** — Llevan tilde si terminan en **vocal, -n o -s**
- **Ejemplos** — café ✓, canción ✓, reloj ✗

### Palabras Llanas 🔵
- **Definición** — Acento en la penúltima sílaba
- **Regla** — Llevan tilde si **NO** terminan en vocal, -n o -s
- **Ejemplos** — casa ✗, lápiz ✓, árbol ✓

### Palabras Esdrújulas 🟣
- **Definición** — Acento en la antepenúltima sílaba
- **Regla** — **Siempre llevan tilde**
- **Ejemplos** — música ✓, médico ✓, pájaro ✓

## 🎨 Personalización

Puedes personalizar la app editando:

- **Colores** — Variables CSS en `estilos.css` (línea 1)
- **Fuentes** — En `index.html` y `estilos.css`
- **Palabras** — En `words.json`
- **Nombres de la app** — En `manifest.json`

## 📞 Soporte

Si encuentras algún problema:

1. Asegúrate de usar un navegador moderno
2. Borra el caché del navegador (Ctrl+Shift+Supr)
3. Si aún tienes problemas, [abre un issue](https://github.com/rgarcial1983/silabas-magicas/issues)

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

## ❤️ Agradecimientos

Proyecto creado pensando en el aprendizaje interactivo de la acentuación en español para niños.

---

**¿Te gusta el proyecto?** ⭐ Dale una estrella en GitHub si te resultó útil.

