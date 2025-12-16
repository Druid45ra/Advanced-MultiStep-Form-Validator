🚀 Advanced Multi-Step Form Validator

### 💡 Demo Live
 https://druid45ra.github.io/Advanced-MultiStep-Form-Validator/


Formulă Multi-Pas cu Validare Robustă (Vanilla JS, Tailwind CSS)
🎯 Overview

Acest proiect reprezintă o implementare de nivel avansat a unui formular multi-pas (Multi-Step Registration Form) construit exclusiv pe baza tehnologiilor Front-End pure. Accentul a fost pus pe o validare detaliată și testabilă, o experiență de utilizator (UX) optimizată și respectarea strictă a standardelor de accesibilitate (A11Y).

Proiectul demonstrează expertiză în separarea responsabilităților, utilizarea design patterns-urilor (implicit Strategy Pattern pentru validare) și optimizarea performanței prin tehnici precum debounce.
✨ Caracteristici Tehnice de Nivel Avansat
Caracteristică	Implementare	Beneficiu
Validare Modulară	Regulile de validare sunt izolate în validationRules.js ca funcții pure, separate de DOM.	Permite Testare Unitară și reutilizare ușoară.
Validare "Live" cu Debounce	Logica de validare a evenimentului oninput este întârziată cu 500ms folosind o funcție debounce.	Îmbunătățește performanța prin prevenirea rulării excesive a logicii la fiecare apăsare de tastă.
Stare "Touched" (UX)	Erorile sunt afișate doar după prima interacțiune a utilizatorului (onblur), nu la încărcarea formularului.	Previne frustrarea utilizatorului și oferă feedback contextual.
Feedback Vizual (UX/UI)	Stilizare distinctivă (Tailwind CSS) pentru stările Valid (Verde), Invalid (Roșu) și Focus (Indigo).	Claritate imediată a stării câmpului.
Accesibilitate (A11Y)	Utilizarea atributelor aria-invalid, aria-describedby și aria-live="polite". Focusul este gestionat automat la schimbarea pasului.	Suport complet pentru cititoarele de ecran.
Arhitectură Curată	Separarea logică în trei straturi: Reguli, Utilități (utils.js), și Controler (formValidator.js).	Mentenanță ușoară și scalabilitate.
📂 Structura Proiectului

Advanced-MultiStep-Form-Validator/
├── index.html                  # Structura principală (HTML Semantic, Tailwind CDN)
├── assets/
│   └── js/
│       ├── formValidator.js    # Controler: Starea formularului, Navigare, Manipulare DOM.
│       ├── validationRules.js  # Regulile de validare (funcții pure, Regex).
│       └── utils.js            # Funcții utilitare (e.g., debounce).
├── __tests__/                  # Director dedicat pentru testare automată
│   └── validation.test.js      # Teste unitare pentru logica din validationRules.js.
├── package.json                # Pentru definirea scriptului de testare (Node.js).
└── README.md                   # Fișierul curent.

📋 Pașii Formularului

Formularul este împărțit în trei pași logici, cu validare strictă înainte de a permite utilizatorului să avanseze.
Pas	Titlu	Câmpuri și Reguli de Validare
1	Date personale	Nume: Obligatoriu, min. 2 caractere.
		Prenume: Obligatoriu.
		Email: Obligatoriu, format valid user@domain.com.
2	Securitate	Parolă: Obligatorie, min. 8 caractere, cel puțin o majusculă și o cifră (via Regex).
		Confirmare Parolă: Obligatorie, trebuie să coincidă cu Parola.
3	Confirmare	Recapitulare: Afișează datele introduse.
		Termeni & Condiții: Checkbox obligatoriu.
🛠️ Cum se Rulează Local

Proiectul nu necesită compilare și poate fi rulat direct în browser.

    Clonați Repozitoriul:
    Bash

    git clone https://github.com/Druid45ra/Advanced-MultiStep-Form-Validator.git
    cd Advanced-MultiStep-Form-Validator

    Rulare Front-End:

        Deschideți fișierul index.html direct în browserul dvs.

🧪 Testare Automată (Logică de Validare)

Logica de validare a fost separată pentru a permite testarea automată în mediul Node.js.

    Instalați Dependințele (Node.js):
    Bash

npm install

Rulați Testele:
Bash

    npm test

    Acest script execută testele unitare care validează corectitudinea funcțiilor din validationRules.js.

🤝 Contribuții

Sugestiile și îmbunătățirile sunt binevenite. Vă rugăm să deschideți un Issue sau să trimiteți un Pull Request.
# Advanced-MultiStep-Form-Validator

[![Node.js CI Status](https://github.com/Druid45ra/Advanced-MultiStep-Form-Validator/actions/workflows/main.yml/badge.svg)](https://github.com/Druid45ra/Advanced-MultiStep-Form-Validator/actions/workflows/main.yml)
