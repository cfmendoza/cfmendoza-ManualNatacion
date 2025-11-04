marked.setOptions({ breaks: true, gfm: true, mangle: false, headerIds: false });

document.addEventListener("DOMContentLoaded", async () => {
  const flipbook = document.getElementById("flipbook");

  const capitulos = [
    "00-portada.md",
    "01-introduccion.md",
    "02-antecedentes.md", 
    "03-bases-teoricas.md",
    "04-dificultades.md",
    "05-estrategias.md",
    "06-planificacion.md",
    "07-recomendaciones.md"
  ];

  for (let archivo of capitulos) {
    try {
      const respuesta = await fetch(`content/${archivo}`);
      if (!respuesta.ok) throw new Error(`Archivo no encontrado: ${archivo}`);
      const markdown = await respuesta.text();
      const html = marked.parse(markdown.replace(/^---[\s\S]*?---/, "").trim());

      const pagina = document.createElement("div");
      pagina.classList.add("page");
      pagina.innerHTML = html;

      pagina.style.width = "100%";
      pagina.style.height = "600px";
      pagina.style.overflowY = "auto";
      pagina.style.position = "relative";
      pagina.style.boxSizing = "border-box";
      pagina.style.padding = "20px";

      flipbook.appendChild(pagina);
    } catch (error) {
      console.error(error);
    }
  }

  // Inicializar Turn.js
  $("#flipbook").turn({
    width: 900,
    height: 600,
    autoCenter: true,
    elevation: 50,
    duration: 1000
  });

  // 🎯 CAMBIO 1: Botones del menú horizontal
  document.querySelectorAll(".nav-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      $("#flipbook").turn("page", index + 1);
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });

  // 🎯 CAMBIO 2: Activar portada por defecto en menú horizontal
  document.querySelector(".nav-btn[data-ch='1']").classList.add("activo");
});