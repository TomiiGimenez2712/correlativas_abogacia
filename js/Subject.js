class Subject {
    constructor(code, name, correlatives = [], isOptional = false) {
        this.code = code;
        this.name = name;
        this.correlatives = correlatives;
        this.approved = false;
        this.button = null;
        this.isOptional = isOptional;
    }

    createButton(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const button = document.createElement("button");
        button.className = "subject status_00";
        button.textContent = this.name;
        button.dataset.code = this.code;
        button.disabled = true;

        button.addEventListener("click", () => {
            if (!button.disabled) {
                this.toggle();
                updateSubjectsStatus();
                updateProgress();
                saveToLocalStorage();
            }
        });

        container.appendChild(button);
        this.button = button;
    }

    canUnlock(subjects) {
        return this.correlatives.every(code => subjects[code]?.approved);
    }

    toggle() {
        this.approved = !this.approved;
        this.updateClass();
        if (!this.approved) {
            cascadeUnapprove(this.code);
        }
    }

    updateClass() {
        if (!this.button) return;
        this.button.classList.remove("status_00", "status_01", "status_02");
        if (this.approved) {
            this.button.classList.add("status_02");
        } else {
            this.button.classList.add("status_01");
        }
    }

    lock() {
        if (!this.button) return;
        this.button.classList.remove("status_01", "status_02");
        this.button.classList.add("status_00");
        this.button.disabled = true;
    }

    unlock() {
        if (!this.button) return;
        this.button.disabled = false;
        if (!this.approved) {
            this.button.classList.remove("status_00");
            this.button.classList.add("status_01");
        }
    }
}

const subjects = {}; // key: code, value: Subject

function updateSubjectsStatus() {
    Object.values(subjects).forEach(subject => {
        if (subject.approved) {
            subject.updateClass();
            subject.button.disabled = false;
        } else if (subject.canUnlock(subjects)) {
            subject.unlock();
        } else {
            subject.lock();
        }
    });
}

function saveToLocalStorage() {
    const state = {};
    Object.entries(subjects).forEach(([code, subject]) => {
        state[code] = subject.approved;
    });
    localStorage.setItem("abogacia_subjects", JSON.stringify(state));
}

function loadFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem("abogacia_subjects")) || {};
    Object.entries(state).forEach(([code, approved]) => {
        if (subjects[code]) {
            subjects[code].approved = approved;
        }
    });
}

function updateProgress() {
    let total = 0;
    let completed = 0;

    let optionalTotal = 0;
    let optionalCompleted = 0;

    Object.values(subjects).forEach(s => {
        if (s.isOptional) {
            optionalTotal++;
            if (s.approved) optionalCompleted++;
        } else {
            total++;
            if (s.approved) completed++;
        }
    });

    const optContribution = Math.min(optionalCompleted, 2);
    const totalWithOpt = total + 2;
    const finalCompleted = completed + optContribution;

    const percent = ((finalCompleted / totalWithOpt) * 100).toFixed(1);

    const progress = document.getElementById("abogacia_degree");
    const text = document.getElementById("abogacia_degree_text");
    if (progress && text) {
        progress.max = totalWithOpt;
        progress.value = finalCompleted;
        text.textContent = `${percent} %`;
    }
}

function clearAllSubjects() {
    Object.values(subjects).forEach(subject => {
        subject.approved = false;
        subject.updateClass();
    });
    updateSubjectsStatus();
    updateProgress();
    saveToLocalStorage();
}

function cascadeUnapprove(code) {
    Object.values(subjects).forEach(subject => {
        if (subject.correlatives.includes(code)) {
            if (subject.approved) {
                subject.approved = false;
                subject.updateClass();
                cascadeUnapprove(subject.code);
            }
        }
    });
}

window.initSubjects = function (subjectList) {
    subjectList.forEach(s => {
        const sub = new Subject(s.code, s.name, s.correlatives, s.isOptional);
        subjects[s.code] = sub;
        const containerId = `subject_column_${s.year}_${s.term}`;
        sub.createButton(containerId);
    });

    // Agregar botón de limpiar
    const footer = document.querySelector("footer");
    if (footer) {
        const clearButton = document.createElement("button");
        clearButton.textContent = "Limpiar selección";
        clearButton.style.marginLeft = "10px";
        clearButton.onclick = clearAllSubjects;
    }

    loadFromLocalStorage();
    updateSubjectsStatus();
    updateProgress();
};

function clearAllSubjects() {
    const confirmed = window.confirm("¿Estás seguro que querés desmarcar todas las materias?");
    if (!confirmed) return;

    Object.values(subjects).forEach(subject => {
        subject.approved = false;
        subject.updateClass();
    });
    updateSubjectsStatus();
    updateProgress();
    saveToLocalStorage();
}

