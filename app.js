// CU Internal Marks Calculator
// Formulas based on the official Excel sheet

const SUBJECT_TEMPLATES = {
    hybrid: {
        label: 'Hybrid Subject',
        badgeClass: 'badge-hybrid',
        components: [
            { name: 'MST-1', maxMarks: 20, formula: (obt) => obt * 0.25 },
            { name: 'MST-2', maxMarks: 20, formula: (obt) => obt * 0.25 },
            { name: 'Experiment 1', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 2', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 3', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 4', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 5', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 6', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 7', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 8', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 9', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Experiment 10', maxMarks: 30, formula: (obt) => obt * (2 / 30) },
            { name: 'Assignment/PBL', maxMarks: 10, formula: (obt) => obt * (6 / 10) },
            { name: 'Quiz', maxMarks: 4, formula: (obt) => obt },
            { name: 'Surprise Test', maxMarks: 12, formula: (obt) => obt * (4 / 12) },
            { name: 'Lab MST', maxMarks: 10, formula: (obt) => obt * (4 / 10) },
            { name: 'Attendance', maxMarks: 2, formula: (obt) => obt },
            { name: 'EST Practical', maxMarks: 40, formula: (obt) => obt * (20 / 40) },
            { name: 'EST Theory', maxMarks: 60, formula: (obt) => obt / 2 },
        ]
    },
    theory: {
        label: 'Theory Subject',
        badgeClass: 'badge-theory',
        components: [
            { name: 'Assignment/PBL', maxMarks: 10, formula: (obt) => obt },
            { name: 'MST-1', maxMarks: 20, formula: (obt) => obt / 2 },
            { name: 'MST-2', maxMarks: 20, formula: (obt) => obt / 2 },
            { name: 'Quiz', maxMarks: 4, formula: (obt) => obt },
            { name: 'Surprise Test', maxMarks: 12, formula: (obt) => obt / 3 },
            { name: 'Attendance', maxMarks: 2, formula: (obt) => obt },
            { name: 'EST Theory', maxMarks: 60, formula: (obt) => obt },
        ]
    },
    practical: {
        label: 'Practical Subject',
        badgeClass: 'badge-practical',
        components: [
            { name: 'Experiment 1', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 2', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 3', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 4', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 5', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 6', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 7', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 8', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 9', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Experiment 10', maxMarks: 30, formula: (obt) => obt * (4.5 / 30) },
            { name: 'Lab MST', maxMarks: 15, formula: (obt) => obt },
            { name: 'Lab EST', maxMarks: 40, formula: (obt) => obt },
        ]
    },
    specialization: {
        label: 'Specialization',
        badgeClass: 'badge-specialization',
        components: [
            { name: 'Assignment - 1', maxMarks: 20, formula: (obt) => obt * (6 / 20) },
            { name: 'Assignment - 2', maxMarks: 20, formula: (obt) => obt * (6 / 20) },
            { name: 'Assignment - 3', maxMarks: 20, formula: (obt) => obt * (6 / 20) },
            { name: 'Surprise Test Score', maxMarks: 12, formula: (obt) => obt * (5 / 12) },
            { name: 'Practical Test - 1', maxMarks: 30, formula: (obt) => obt * (7.5 / 30) },
            { name: 'Practical Test - 2', maxMarks: 30, formula: (obt) => obt * (7.5 / 30) },
            { name: 'Practical Test - 3', maxMarks: 30, formula: (obt) => obt * (7.5 / 30) },
            { name: 'Mid Term', maxMarks: 15, formula: (obt) => obt / 2 },
            { name: 'Mini Project Implementation', maxMarks: 40, formula: (obt) => obt / 2 },
            { name: 'Mini Project Design', maxMarks: 50, formula: (obt) => obt / 2 },
            { name: 'Attendance', maxMarks: 2, formula: (obt) => obt },
        ]
    }
};

// State
let subjects = [];
let subjectIdCounter = 0;

// DOM Elements
const addSubjectBtn = document.getElementById('addSubjectBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const subjectTypeSelect = document.getElementById('subjectType');
const subjectNameInput = document.getElementById('subjectName');
const subjectsContainer = document.getElementById('subjectsContainer');
const summarySection = document.getElementById('summarySection');
const summaryCards = document.getElementById('summaryCards');
const grandTotalEl = document.getElementById('grandTotal');

// Confirmation modal
const confirmModal = document.getElementById('confirmModal');
const confirmMessage = document.getElementById('confirmMessage');
const confirmOkBtn = document.getElementById('confirmOk');
const confirmCancelBtn = document.getElementById('confirmCancel');
let pendingConfirmAction = null;

// SGPA calculator
const sgpaModal = document.getElementById('sgpaModal');
const sgpaRowsEl = document.getElementById('sgpaRows');
const sgpaCreditsEl = document.getElementById('sgpaCredits');
const sgpaValueEl = document.getElementById('sgpaValue');
const openSgpaBtn = document.getElementById('openSgpaBtn');
const addSgpaRowBtn = document.getElementById('addSgpaRow');
const sgpaResetBtn = document.getElementById('sgpaReset');
const sgpaCloseBtn = document.getElementById('sgpaClose');

// Add subject
addSubjectBtn.addEventListener('click', () => {
    const type = subjectTypeSelect.value;
    const name = subjectNameInput.value.trim() || SUBJECT_TEMPLATES[type].label;
    addSubject(type, name);
    subjectNameInput.value = '';
    subjectNameInput.focus();
});

subjectNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addSubjectBtn.click();
    }
});

clearAllBtn.addEventListener('click', () => {
    if (subjects.length === 0) {
        showToast('No subjects to clear', 'info');
        return;
    }

    const count = subjects.length;
    openConfirmModal(
        `This will clear the marks you entered for ${count} subject${count === 1 ? '' : 's'}. This action cannot be undone.`,
        clearAllSubjects
    );
});

// --- Confirmation modal handlers ---
let modalOpenedAt = 0;
let modalBackdropMouseDown = false;

function openConfirmModal(message, onConfirm) {
    confirmMessage.textContent = message;
    pendingConfirmAction = onConfirm;
    modalOpenedAt = Date.now();
    confirmModal.classList.remove('hidden');
    requestAnimationFrame(() => confirmModal.classList.add('show'));
    confirmCancelBtn.focus();
}

function closeConfirmModal() {
    confirmModal.classList.remove('show');
    pendingConfirmAction = null;
    setTimeout(() => confirmModal.classList.add('hidden'), 200);
}

confirmOkBtn.addEventListener('click', () => {
    const action = pendingConfirmAction;
    closeConfirmModal();
    if (action) action();
});

confirmCancelBtn.addEventListener('click', closeConfirmModal);

// Only treat it as a backdrop click if the press BOTH started and ended on the
// backdrop, and the modal has been open long enough. This stops the very
// click that opened the modal from immediately closing it again.
confirmModal.addEventListener('mousedown', (e) => {
    modalBackdropMouseDown = (e.target === confirmModal);
});

confirmModal.addEventListener('click', (e) => {
    const isBackdropClick =
        e.target === confirmModal &&
        modalBackdropMouseDown &&
        (Date.now() - modalOpenedAt) > 300;

    modalBackdropMouseDown = false;

    if (isBackdropClick) {
        closeConfirmModal();
    }
});

// Escape cancels
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!confirmModal.classList.contains('hidden')) {
        closeConfirmModal();
    } else if (!sgpaModal.classList.contains('hidden')) {
        closeSgpaModal();
    }
});

function addSubject(type, name) {
    const template = SUBJECT_TEMPLATES[type];
    const id = ++subjectIdCounter;

    const subject = {
        id,
        type,
        name,
        components: template.components.map(c => ({
            name: c.name,
            maxMarks: c.maxMarks,
            formula: c.formula,
            obtained: null
        }))
    };

    subjects.push(subject);
    renderSubjectCard(subject);
    updateSummary();
}

function renderSubjectCard(subject) {
    const template = SUBJECT_TEMPLATES[subject.type];

    const card = document.createElement('div');
    card.className = 'subject-card';
    card.dataset.id = subject.id;

    const rowsHtml = subject.components.map((comp, idx) => `
        <tr>
            <td>${comp.name}</td>
            <td class="max-marks">${comp.maxMarks}</td>
            <td>
                <input type="number" min="0" max="${comp.maxMarks}" step="0.01"
                       data-subject="${subject.id}" data-index="${idx}"
                       placeholder="0"
                       value="${comp.obtained !== null ? comp.obtained : ''}">
            </td>
            <td class="internal-score" id="score-${subject.id}-${idx}">0.00</td>
        </tr>
    `).join('');

    card.innerHTML = `
        <div class="subject-header">
            <div class="subject-title">
                <h3>${escapeHtml(subject.name)}</h3>
                <span class="subject-type-badge ${template.badgeClass}">${template.label}</span>
            </div>
            <div class="subject-actions">
                <button class="btn btn-clear" onclick="clearSubject(${subject.id})">Clear</button>
                <button class="btn btn-danger" onclick="removeSubject(${subject.id})">Remove</button>
            </div>
        </div>
        <div class="subject-body">
            <table class="marks-table">
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Max</th>
                        <th>Obtained</th>
                        <th>Internal</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
        <div class="subject-total">
            <span>Total Internal Marks</span>
            <span class="total-value" id="total-${subject.id}">0.00</span>
        </div>
    `;

    subjectsContainer.appendChild(card);

    // Scroll the new card into view
    requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
    });

    // Add input listeners
    card.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', (e) => handleInput(e, subject));
    });
}

function handleInput(e, subject) {
    const idx = parseInt(e.target.dataset.index);
    const maxMarks = subject.components[idx].maxMarks;
    let value = parseFloat(e.target.value);

    // Clear previous invalid state
    e.target.classList.remove('invalid');

    if (isNaN(value) || value < 0) {
        subject.components[idx].obtained = null;
    } else if (value > maxMarks) {
        // Cap at maximum marks and show warning
        value = maxMarks;
        e.target.value = maxMarks;
        subject.components[idx].obtained = value;
        e.target.classList.add('invalid');
        showToast(`"${subject.components[idx].name}" capped at maximum marks (${maxMarks})`, 'warning');
    } else {
        subject.components[idx].obtained = value;
    }

    recalculateSubject(subject);
    updateSummary();
}

function recalculateSubject(subject) {
    let total = 0;

    subject.components.forEach((comp, idx) => {
        const scoreEl = document.getElementById(`score-${subject.id}-${idx}`);
        let score = 0;

        if (comp.obtained !== null) {
            score = comp.formula(comp.obtained);
        }

        scoreEl.textContent = score.toFixed(2);
        total += score;
    });

    const totalEl = document.getElementById(`total-${subject.id}`);
    totalEl.textContent = total.toFixed(2);
}

function updateSummary() {
    if (subjects.length === 0) {
        summarySection.classList.add('hidden');
        return;
    }

    summarySection.classList.remove('hidden');

    let grandTotal = 0;
    const cardsHtml = subjects.map(subject => {
        let subjectTotal = 0;
        subject.components.forEach(comp => {
            if (comp.obtained !== null) {
                subjectTotal += comp.formula(comp.obtained);
            }
        });
        grandTotal += subjectTotal;

        return `
            <div class="summary-card">
                <div class="label">${escapeHtml(subject.name)}</div>
                <div class="value">${subjectTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    summaryCards.innerHTML = cardsHtml;
    grandTotalEl.textContent = grandTotal.toFixed(2);
}

function removeSubject(id) {
    // dataset.id is a string, subject.id is a number — normalise before comparing
    const numericId = Number(id);
    subjects = subjects.filter(s => s.id !== numericId);
    const card = document.querySelector(`.subject-card[data-id="${numericId}"]`);
    if (card) {
        card.remove();
    }
    updateSummary();
}

// Clear all marks entered in a single subject (keeps the subject itself)
function clearSubject(id) {
    const numericId = Number(id);
    const subject = subjects.find(s => s.id === numericId);
    if (!subject) return;

    // Reset the data model
    subject.components.forEach(comp => {
        comp.obtained = null;
    });

    // Reset the inputs
    const card = document.querySelector(`.subject-card[data-id="${id}"]`);
    if (card) {
        card.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
            input.classList.remove('invalid');
        });
    }

    recalculateSubject(subject);
    updateSummary();
    showToast(`Cleared marks for "${subject.name}"`, 'info');
}

// Clear marks for every subject at once
function clearAllSubjects() {
    if (subjects.length === 0) {
        showToast('No subjects to clear', 'info');
        return;
    }

    subjects.forEach(subject => {
        subject.components.forEach(comp => {
            comp.obtained = null;
        });

        const card = document.querySelector(`.subject-card[data-id="${subject.id}"]`);
        if (card) {
            card.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = '';
                input.classList.remove('invalid');
            });
        }

        recalculateSubject(subject);
    });

    updateSummary();
    showToast('Cleared all subjects', 'info');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto-remove after 2.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Expose handlers to global scope for onclick
window.removeSubject = removeSubject;
window.clearSubject = clearSubject;
window.clearAllSubjects = clearAllSubjects;

// ==========================================
// SGPA CALCULATOR
// SGPA = Σ(Credit × Grade Point) / Σ(Credits)
// ==========================================

const GRADE_POINTS = [
    { label: 'O / O+ / A+', points: 10 },
    { label: 'A', points: 9 },
    { label: 'B+', points: 8 },
    { label: 'B', points: 7 },
    { label: 'C+', points: 6 },
    { label: 'C', points: 5 },
    { label: 'D', points: 4 },
    { label: 'E / F / G / H / I', points: 0 }
];

let sgpaOpenedAt = 0;
let sgpaBackdropMouseDown = false;

openSgpaBtn.addEventListener('click', openSgpaModal);
addSgpaRowBtn.addEventListener('click', addSgpaRow);
sgpaCloseBtn.addEventListener('click', closeSgpaModal);

sgpaResetBtn.addEventListener('click', () => {
    sgpaRowsEl.innerHTML = '';
    addSgpaRow();
    showToast('SGPA calculator reset', 'info');
});

// Live recalculation on any input change
sgpaRowsEl.addEventListener('input', recalcSgpa);
sgpaRowsEl.addEventListener('change', recalcSgpa);

// Remove a row (event delegation)
sgpaRowsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.sgpa-remove');
    if (!btn) return;
    btn.closest('.sgpa-row').remove();
    if (!sgpaRowsEl.children.length) {
        addSgpaRow();
    }
    recalcSgpa();
});

// Backdrop click closes, but only if the press started AND ended on the overlay
sgpaModal.addEventListener('mousedown', (e) => {
    sgpaBackdropMouseDown = (e.target === sgpaModal);
});

sgpaModal.addEventListener('click', (e) => {
    const isBackdropClick =
        e.target === sgpaModal &&
        sgpaBackdropMouseDown &&
        (Date.now() - sgpaOpenedAt) > 300;

    sgpaBackdropMouseDown = false;

    if (isBackdropClick) {
        closeSgpaModal();
    }
});

function openSgpaModal() {
    sgpaOpenedAt = Date.now();
    sgpaModal.classList.remove('hidden');
    requestAnimationFrame(() => sgpaModal.classList.add('show'));
    if (!sgpaRowsEl.children.length) {
        addSgpaRow();
    }
    const firstInput = sgpaRowsEl.querySelector('input');
    if (firstInput) firstInput.focus();
}

function closeSgpaModal() {
    sgpaModal.classList.remove('show');
    setTimeout(() => sgpaModal.classList.add('hidden'), 200);
}

function addSgpaRow() {
    const row = document.createElement('div');
    row.className = 'sgpa-row';

    const options = GRADE_POINTS
        .map(g => `<option value="${g.points}">${g.label} (${g.points})</option>`)
        .join('');

    row.innerHTML = `
        <input type="text" class="sgpa-name" placeholder="Subject (optional)">
        <input type="number" class="sgpa-credits" min="0" step="0.5" placeholder="0">
        <select class="sgpa-grade">${options}</select>
        <button class="btn btn-danger sgpa-remove" type="button" title="Remove subject">&times;</button>
    `;

    sgpaRowsEl.appendChild(row);
    recalcSgpa();
}

function recalcSgpa() {
    let totalCredits = 0;
    let weightedPoints = 0;

    sgpaRowsEl.querySelectorAll('.sgpa-row').forEach(row => {
        const credits = parseFloat(row.querySelector('.sgpa-credits').value);
        const points = parseFloat(row.querySelector('.sgpa-grade').value);

        if (!isNaN(credits) && credits > 0) {
            totalCredits += credits;
            weightedPoints += credits * points;
        }
    });

    sgpaCreditsEl.textContent = Number.isInteger(totalCredits) ? totalCredits : totalCredits.toFixed(1);
    sgpaValueEl.textContent = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '0.00';
}
