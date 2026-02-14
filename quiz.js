document.addEventListener('DOMContentLoaded', () => {
    // Form handling: Personal Info -> Assessment
    const personalInfoForm = document.getElementById('personalInfoForm');
    const assessmentIntro = document.getElementById('assessmentIntro');
    const startAssessmentBtn = document.getElementById('startAssessment');
    const assessmentContainer = document.getElementById('assessmentContainer');
    const completionMessage = document.getElementById('completionMessage');

    personalInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        
        // Store user data if needed, e.g., in localStorage
        localStorage.setItem('userName', firstName);
        localStorage.setItem('userEmail', email);

        // Hide personal info form, show assessment intro
        personalInfoForm.style.display = 'none';
        assessmentIntro.style.display = 'block';
    });

    startAssessmentBtn.addEventListener('click', () => {
        assessmentIntro.style.display = 'none';
        assessmentContainer.style.display = 'block';
        displayQuestion(0); // Start the quiz
    });

    // Assessment Questions Data
    const questions = [
        {
            question: "Which of these activities do you enjoy most in your free time?",
            options: [
                { text: "Building something tangible (e.g., coding, woodworking, crafting)", value: "creator" },
                { text: "Organizing events, spaces, or data for efficiency", value: "organizer" },
                { text: "Helping and mentoring others to achieve their goals", value: "mentor" },
                { text: "Analyzing complex problems to find the optimal solution", value: "analyst" }
            ]
        },
        {
            question: "When working on a group project, what role do you naturally take on?",
            options: [
                { text: "The leader who sets the vision and delegates tasks", value: "leader" },
                { text: "The peacemaker who ensures everyone is heard and collaborates smoothly", value: "collaborator" },
                { text: "The expert who dives deep into the technical details", value: "specialist" },
                { text: "The innovator who brainstorms new, unconventional ideas", value: "innovator" }
            ]
        },
        {
            question: "What type of work environment brings out your best performance?",
            options: [
                { text: "A fast-paced, dynamic environment with changing priorities", value: "dynamic" },
                { text: "A stable, predictable environment with clear expectations", value: "stable" },
                { text: "A collaborative, team-focused environment with lots of interaction", value: "team-oriented" },
                { text: "An independent, autonomous environment where I can manage my own work", value: "autonomous" }
            ]
        },
        // ... add 7 more questions here to make a total of 10
    ];

    // Quiz Logic
    const assessmentForm = document.getElementById('assessmentForm');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const progressFill = document.getElementById('progressFill');
    const assessmentComplete = document.getElementById('assessmentComplete');
    let currentQuestionIndex = 0;
    let userAnswers = [];

    if(totalQuestionsSpan) totalQuestionsSpan.textContent = questions.length;

    function displayQuestion(index) {
        if (!assessmentForm || index >= questions.length) return;
        currentQuestionIndex = index;
        const question = questions[index];
        assessmentForm.innerHTML = ''; // Clear previous question

        const slide = document.createElement('div');
        slide.className = 'question-slide active';

        const title = document.createElement('h3');
        title.className = 'question-title';
        title.textContent = question.question;
        slide.appendChild(title);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'question-options';

        question.options.forEach((option, i) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question' + index;
            input.value = option.value;
            input.required = true;
            input.onchange = () => {
                // Store answer and move to next question
                userAnswers[index] = { question: question.question, answer: option.value };
                setTimeout(() => displayQuestion(index + 1), 300);
            };
            label.appendChild(input);
            label.append(` ${option.text}`);
            optionsDiv.appendChild(label);
        });

        slide.appendChild(optionsDiv);
        assessmentForm.appendChild(slide);

        updateProgress(index);
    }

    function updateProgress(index) {
        const percentage = ((index) / questions.length) * 100;
        if(progressFill) progressFill.style.width = percentage + '%';
        if(currentQuestionSpan) currentQuestionSpan.textContent = index + 1 > questions.length ? questions.length : index + 1;

        if (index >= questions.length) {
            showCompletion();
        }
    }

    function showCompletion() {
        assessmentContainer.style.display = 'none';
        assessmentComplete.style.display = 'block';
        const userName = localStorage.getItem('userName') || 'User';
        if(completionMessage) completionMessage.innerHTML = `<p>Thank you, ${userName}! We have received your assessment. A member of our team will review your results and contact you at ${localStorage.getItem('userEmail')} with personalized career matches.</p>`;
        // Here you would typically send userAnswers to a server
        console.log("Final Answers:", userAnswers);
    }

    // Country & State Dropdown Logic
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');

    const countryStateData = {
        "USA": ["New York", "California", "Texas", "Florida"],
        "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta"],
        "UK": ["London", "Manchester", "Scotland", "Wales"]
    };

    // Populate Countries
    if (countrySelect) {
        Object.keys(countryStateData).forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        // Event listener for country change
        countrySelect.addEventListener('change', () => {
            const selectedCountry = countrySelect.value;
            stateSelect.innerHTML = '<option value="">Select State/Province</option>'; // Reset states

            if (selectedCountry && countryStateData[selectedCountry]) {
                stateSelect.disabled = false;
                countryStateData[selectedCountry].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            } else {
                stateSelect.disabled = true;
            }
        });
    }

    // Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
