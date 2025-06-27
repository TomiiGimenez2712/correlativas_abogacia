// Los parámetros de cada materia son incluidos de la siguiente forma y orden:
// ID de la materia (número), 
// Nombre (String),
// Año y Cuatrimestre de la materia (Array de dos números [año, cuatrimestre]),
// Condiciones: Cada materia tiene dos codiciones, una para ser cursada y otra para ser aprobada.
// Condiciones: Cada condicion consta de un array con pares de enteros, donde el primer entero corresponde a un ID de una materia y el segundo entero a un estado requisito de dicha materia.
// Estado actual del alumno en cada materia: 0 = Sin cursar, 1 = Regular, 2 = Aprobada.

window.onload = () => {
    const subjects = [
        // Primer año
        { code: "1", name: "Introducción al derecho", year: 1, term: 1, correlatives: [] },
        { code: "2", name: "Historia constitucional", year: 1, term: 1, correlatives: [] },
        { code: "3", name: "Economía política", year: 1, term: 1, correlatives: [] },
        { code: "4", name: "Sociología", year: 1, term: 2, correlatives: ["1", "3"] },
        { code: "5", name: "Teoría y derechos constitucionales", year: 1, term: 2, correlatives: ["1", "2"] },
        { code: "6", name: "Derecho privado parte general", year: 1, term: 2, correlatives: ["1", "3"] },

        // Segundo año
        { code: "7", name: "Derecho constitucional de los poderes", year: 2, term: 1, correlatives: ["5"] },
        { code: "8", name: "Derecho de las obligaciones", year: 2, term: 1, correlatives: ["6"] },
        { code: "9", name: "Derecho penal parte general", year: 2, term: 1, correlatives: ["5", "6"] },
        { code: "10", name: "Derecho público provincial y municipal", year: 2, term: 2, correlatives: ["7"] },
        { code: "11", name: "Derecho de daños", year: 2, term: 2, correlatives: ["8"] },
        { code: "12", name: "Derecho político", year: 2, term: 2, correlatives: ["4", "7"] },

        // Tercer año
        { code: "13", name: "Derecho internacional público", year: 3, term: 1, correlatives: ["7", "12"] },
        { code: "14", name: "Derecho de los contratos", year: 3, term: 1, correlatives: ["11"] },
        { code: "15", name: "Derecho penal parte especial", year: 3, term: 1, correlatives: ["9"] },
        { code: "16", name: "Derechos reales", year: 3, term: 2, correlatives: ["14"] },
        { code: "17", name: "Derecho empresario y del mercado", year: 3, term: 2, correlatives: ["14"] },
        { code: "18", name: "Derecho administrativo", year: 3, term: 2, correlatives: ["13", "14"] },

        // Cuarto año
        { code: "19", name: "Derecho financiero y tributario", year: 4, term: 1, correlatives: ["18"] },
        { code: "20", name: "Derecho societario", year: 4, term: 1, correlatives: ["17"] },
        { code: "21", name: "Derecho procesal civil y comercial", year: 4, term: 1, correlatives: ["13", "14"] },
        { code: "22", name: "Derecho de las familias y sucesorio", year: 4, term: 2, correlatives: ["16"] },
        { code: "23", name: "Derecho de los concursos y quiebras", year: 4, term: 2, correlatives: ["20"] },
        { code: "24", name: "Derecho agrario y ambiental", year: 4, term: 2, correlatives: ["16", "20"] },

        // Quinto año
        { code: "25", name: "Derecho del trabajo y la seguridad social", year: 5, term: 1, correlatives: ["19", "23"] },
        { code: "26", name: "Derecho de la navegación y aeronáutico", year: 5, term: 1, correlatives: ["23"] },
        { code: "27", name: "Derecho procesal penal", year: 5, term: 1, correlatives: ["15","21"] },
        { code: "28", name: "Derecho internacional privado", year: 5, term: 2, correlatives: ["22", "23"] },
        { code: "29", name: "Derechos humanos", year: 5, term: 2, correlatives: ["25"] },
        { code: "30", name: "Filosofía del derecho", year: 5, term: 2, correlatives: ["25"] },

        // Sexto año - Obligatorias
        { code: "31", name: "Derecho procesal laboral", year: 6, term: 1, correlatives: ["25"] },
        { code: "32", name: "Derecho procesal y procedimental administrativo", year: 6, term: 1, correlatives: ["29"] },
        { code: "33", name: "Derecho procesal constitucional", year: 6, term: 1, correlatives: ["29"] },
        { code: "34", name: "Metodología de la ciencia jurídica", year: 6, term: 1, correlatives: ["30"] },
        { code: "35", name: "Ética profesional", year: 6, term: 1, correlatives: ["30"] },

        // Sexto año - Optativas por orientación
        { code: "36A", name: "Defensa del Estado en juicio", year: 6, term: 2, correlatives: ["29"],isOptional: true },
        { code: "37A", name: "Diseño jurídico de políticas públicas", year: 6, term: 2, correlatives: ["29"],isOptional: true },

        { code: "36B", name: "Procesos civiles especiales", year: 6, term: 2, correlatives: ["28"],isOptional: true },
        { code: "37B", name: "Asesoramiento empresario", year: 6, term: 2, correlatives: ["28"],isOptional: true },

        { code: "36C", name: "Ejecución penal", year: 6, term: 2, correlatives: ["27"],isOptional: true },
        { code: "37C", name: "Litigación penal oral", year: 6, term: 2, correlatives: ["27"],isOptional: true },

        { code: "36D", name: "Mediación", year: 6, term: 2, correlatives: ["25"],isOptional: true },
        { code: "37D", name: "Arbitraje y conciliación", year: 6, term: 2, correlatives: ["25"],isOptional: true },

        { code: "36E", name: "Interpretación judicial y jurisprudencia", year: 6, term: 2, correlatives: ["29"],isOptional: true },
        { code: "37E", name: "Gestión judicial", year: 6, term: 2, correlatives: ["29"],isOptional: true }
    ];


    // Usar clase Subject y sistema de desbloqueo
    window.initSubjects(subjects);

};
