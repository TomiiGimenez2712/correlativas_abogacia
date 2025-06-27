window.addEventListener("DOMContentLoaded", () => {
    // Carga las materias desde load_subjects_abogacia.js
    // El array "subjects" debe estar definido en ese archivo
    if (typeof window.initSubjects === "function" && Array.isArray(subjects)) {
        window.initSubjects(subjects);
    } else {
        console.error("No se pudo inicializar: faltan datos o funciones");
    }
});
