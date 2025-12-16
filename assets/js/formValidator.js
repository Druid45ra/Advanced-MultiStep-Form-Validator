/**
 * assets/js/formValidator.js
 * Logica de Control și Validare Principală (Vanilla JS ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const stepContents = document.querySelectorAll('.step-content');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const stepCounter = document.getElementById('step-counter');
    const stepName = document.getElementById('step-name');
    const recapitulareDate = document.getElementById('recapitulare-date');

    const TOTAL_STEPS = stepContents.length;
    let currentStep = 1;
    let formData = {}; // Starea globală a formularului
    let formTouched = {}; // Starea de 'touch' pentru a afișa erori doar după interacțiune

    // Numele pașilor pentru indicatorul de progres
    const stepTitles = {
        1: "Date Personale",
        2: "Securitate",
        3: "Confirmare"
    };

    /**
     * Utilitar: Implementarea Debounce
     * Limitează frecvența cu care se execută o funcție.
     * @param {function} func - Funcția de executat.
     * @param {number} delay - Întârzierea în milisecunde.
     * @returns {function} Funcția debounced.
     */
    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    /**
     * Funcții de Manipulare DOM (UX/UI)
     */
    
    // Funcție de afișare/ascundere a mesajului de eroare
    const displayError = (fieldId, message) => {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`error-${fieldId}`);
        
        // Stilizare și Atribute ARIA pentru Eroare
        if (message) {
            input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.remove('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', `error-${fieldId}`);
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        } else {
            input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            input.setAttribute('aria-invalid', 'false');
            errorElement.classList.add('hidden');
            
            // Stilizare Succes (Opțional, doar dacă s-a interacționat cu câmpul)
            if (formTouched[fieldId]) {
                 input.classList.add('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
                 input.classList.remove('border-gray-300'); // Curățare stil implicit
            }
        }
    };
    
    // Funcție de resetare a stilurilor de eroare/succes
    const resetFieldStyles = (fieldId) => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.remove('border-green-500', 'focus:border-green-500', 'focus:ring-green-500');
            input.classList.add('border-gray-300'); // Stilizare default
            input.setAttribute('aria-invalid', 'false');
            const errorElement = document.getElementById(`error-${fieldId}`);
            if (errorElement) {
                 errorElement.classList.add('hidden');
            }
        }
    }

    /**
     * Logică de Validare Principală
     * @param {string} fieldId - ID-ul câmpului de validat.
     * @returns {string|null} Mesajul de eroare sau null.
     */
    const validateField = (fieldId) => {
        const input = document.getElementById(fieldId);
        
        // Câmpurile care nu există (ex: Pasul 3 nu are toate câmpurile)
        if (!input) return null;

        const value = input.type === 'checkbox' ? input.checked : input.value;
        let errorMessage = null;
        
        // 1. Validare Standard (Nume, Email etc.)
        if (validationRules[fieldId]) {
            errorMessage = validationRules[fieldId](value);
        }

        // 2. Validare Specială (Confirmare Parolă)
        if (fieldId === 'confirmare-parola' && !errorMessage) {
            const passwordValue = document.getElementById('parola').value;
            errorMessage = validatePasswordConfirmation(passwordValue, value);
        }
        
        // 3. Stilizare și Afișare (doar dacă a fost interacționat)
        if (formTouched[fieldId]) {
            displayError(fieldId, errorMessage);
        }
        
        return errorMessage;
    };
    
    /**
     * Validează toate câmpurile dintr-un pas curent.
     * @returns {boolean} True dacă toate câmpurile sunt valide, False altfel.
     */
    const validateCurrentStep = () => {
        const currentStepContainer = document.querySelector(`.step-content[data-step="${currentStep}"]`);
        const inputs = currentStepContainer.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            // Marchează toate câmpurile ca 'touch' înainte de validare forțată
            formTouched[input.id] = true; 
            const error = validateField(input.id);
            if (error) {
                isValid = false;
            }
        });

        return isValid;
    };


    /**
     * Funcții de Control al Pașilor
     */

    // Actualizează elementele vizuale ale formularului (progress bar, titlu, butoane)
    const updateUI = () => {
        // Ascunde toate pașii
        stepContents.forEach(step => step.classList.add('hidden'));
        
        // Afișează pasul curent
        const currentContent = document.querySelector(`.step-content[data-step="${currentStep}"]`);
        currentContent.classList.remove('hidden');

        // Actualizează Indicatorul de Progres
        const progress = (currentStep / TOTAL_STEPS) * 100;
        progressBar.style.width = `${progress}%`;
        stepCounter.textContent = `${currentStep} din ${TOTAL_STEPS}`;
        stepName.textContent = `Pasul ${currentStep}: ${stepTitles[currentStep]}`;
        
        // Controlul Butoanelor
        prevBtn.disabled = currentStep === 1;
        
        if (currentStep === TOTAL_STEPS) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
            updateRecap(); // Actualizează recapitularea la ultimul pas
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    };
    
    // Extrage datele și le salvează în starea globală
    const collectStepData = (step) => {
        const stepContainer = document.querySelector(`.step-content[data-step="${step}"]`);
        const inputs = stepContainer.querySelectorAll('input:not([type="submit"]), select, textarea');
        
        inputs.forEach(input => {
            const value = input.type === 'checkbox' ? input.checked : input.value;
            formData[input.id] = value;
        });
    }

    // Navigare la Pasul Următor
    const nextStep = () => {
        if (validateCurrentStep()) {
            collectStepData(currentStep); // Salvează datele pasului curent
            
            // Curăță stilurile de succes de pe pasul precedent înainte de a avansa
            const prevStepInputs = document.querySelector(`.step-content[data-step="${currentStep}"]`).querySelectorAll('input');
            prevStepInputs.forEach(input => resetFieldStyles(input.id)); 
            
            if (currentStep < TOTAL_STEPS) {
                currentStep++;
                updateUI();
            }
        } else {
            // Dacă validarea eșuează, focus pe primul câmp invalid
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    };

    // Navigare la Pasul Anterior
    const prevStep = () => {
        if (currentStep > 1) {
            // Curăță stilurile de pe pasul curent înainte de a reveni
            const currentStepInputs = document.querySelector(`.step-content[data-step="${currentStep}"]`).querySelectorAll('input');
            currentStepInputs.forEach(input => resetFieldStyles(input.id));
            
            currentStep--;
            updateUI();
        }
    };
    
    // Injectează datele salvate în Pasul 3 (Recapitulare)
    const updateRecap = () => {
        recapitulareDate.innerHTML = ''; // Curăță
        
        // Obiectul cu etichetele afișate
        const displayLabels = {
            nume: 'Nume', prenume: 'Prenume', email: 'Email',
            parola: 'Parola', // Nu ar trebui afișată, dar o vom marca ca 'Securizată'
        };

        for (const [key, value] of Object.entries(formData)) {
            if (key === 'termeni') continue; // Termenii sunt separat

            const label = displayLabels[key] || key;
            const displayValue = key === 'parola' ? '******** (Securizat)' : value;
            
            const div = document.createElement('div');
            div.className = 'flex justify-between border-b last:border-b-0 py-1';
            div.innerHTML = `<span class="font-medium">${label}:</span> <span class="text-gray-900">${displayValue}</span>`;
            recapitulareDate.appendChild(div);
        }
    }

    // Simulare de Trimitere Finală
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateCurrentStep()) {
            collectStepData(currentStep); // Asigură-te că Pasul 3 este colectat
            
            // Simulare AJAX / Fetch
            console.log('Formular trimis (simulare)! Datele finale:', formData);
            
            // Afișează mesajul de succes
            form.classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        } else {
             // Dacă validarea eșuează la final, focus pe termenii neacceptați
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    };


    /**
     * Inițializare și Ascultători de Evenimente (Listeners)
     */
     
    // Inițializează vizualizarea (Pasul 1)
    updateUI(); 

    // Navigare
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    form.addEventListener('submit', handleSubmit);
    
    // Validare 'Live' cu Debounce & Blur
    stepContents.forEach(stepContainer => {
        const inputs = stepContainer.querySelectorAll('input:not([type="submit"]), select, textarea');
        
        inputs.forEach(input => {
            // 1. Pe 'blur': validare imediată și marcare ca 'touch'
            input.addEventListener('blur', () => {
                formTouched[input.id] = true;
                validateField(input.id);
            });
            
            // 2. Pe 'input': validare debounced (pentru performanță la tastare)
            const debouncedValidate = debounce(() => {
                // Validează doar dacă a fost 'touched' pentru a nu arăta erori la încărcare
                if (formTouched[input.id]) {
                    validateField(input.id);
                }
            }, 500); // 500ms debounce
            
            input.addEventListener('input', debouncedValidate);
            
            // 3. Stilizare Focus
            input.addEventListener('focus', () => {
                 input.classList.add('ring-2', 'ring-offset-2', 'ring-indigo-500');
            });
            input.addEventListener('blur', () => {
                 input.classList.remove('ring-2', 'ring-offset-2', 'ring-indigo-500');
            });
        });
    });

});
