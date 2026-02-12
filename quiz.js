// ================================
// Talent Loop - Assessment Quiz
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // ================================
    // COUNTRY & STATE DROPDOWN DATA
    // ================================
    const statesByCountry = {
        'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        'Canada': ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
        'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
        'Australia': ['New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia', 'Australian Capital Territory', 'Northern Territory'],
        'Germany': ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
        'India': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
        'Mexico': ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City', 'Mexico State', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
        'Brazil': ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins']
    };

    // Elements
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    
    // Populate state dropdown based on selected country
    if (countrySelect && stateSelect) {
        countrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            
            // Clear existing options
            stateSelect.innerHTML = '<option value="">Select State/Province</option>';
            
            if (statesByCountry[selectedCountry]) {
                // Populate with states for selected country
                statesByCountry[selectedCountry].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            } else {
                // For countries without predefined states
                stateSelect.innerHTML = '<option value="">Enter in State field below</option>';
                // Convert to text input for other countries
                const textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.id = 'state';
                textInput.name = 'state';
                textInput.required = true;
                textInput.placeholder = 'Enter State/Province/Region';
                textInput.className = stateSelect.className;
                stateSelect.parentNode.replaceChild(textInput, stateSelect);
            }
        });
    }

    // Rest of quiz code
    const personalInfoForm = document.getElementById('personalInfoForm');
    const contactInfoForm = document.getElementById('contactInfoForm');
    const assessmentIntro = document.getElementById('assessmentIntro');
    const startButton = document.getElementById('startAssessment');
    const assessmentContainer = document.getElementById('assessmentContainer');
    const assessmentComplete = document.getElementById('assessmentComplete');
    const assessmentForm = document.getElementById('assessmentForm');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    
    let currentQuestion = 1;
    const totalQuestions = 10;
    const answers = {};
    let contactInfo = {};
    
    // Handle Personal Info Form
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactInfoForm);
            contactInfo = Object.fromEntries(formData.entries());
            console.log('Contact Info:', contactInfo);
            personalInfoForm.style.display = 'none';
            assessmentIntro.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Start Assessment
    if (startButton) {
        startButton.addEventListener('click', function() {
            assessmentIntro.style.display = 'none';
            assessmentContainer.style.display = 'block';
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Quiz Navigation Functions
    function showQuestion(questionNumber) {
        const slides = document.querySelectorAll('.question-slide');
        slides.forEach(slide => slide.classList.remove('active'));
        
        const currentSlide = document.querySelector(`[data-question="${questionNumber}"]`);
        if (currentSlide) currentSlide.classList.add('active');
        
        prevBtn.style.display = questionNumber === 1 ? 'none' : 'inline-block';
        
        if (questionNumber === totalQuestions) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
        
        currentQuestionSpan.textContent = questionNumber;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateProgress() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = progress + '%';
    }
    
    function validateCurrentQuestion() {
        const currentSlide = document.querySelector(`[data-question="${currentQuestion}"]`);
        const radioInputs = currentSlide.querySelectorAll('input[type="radio"]');
        let isValid = false;
        
        radioInputs.forEach(input => {
            if (input.checked) {
                isValid = true;
                answers[`q${currentQuestion}`] = input.value;
            }
        });
        
        return isValid;
    }
    
    // Navigation Buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentQuestion()) {
                if (currentQuestion < totalQuestions) {
                    currentQuestion++;
                    showQuestion(currentQuestion);
                }
            } else {
                alert('Please select an answer before proceeding.');
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 1) {
                currentQuestion--;
                showQuestion(currentQuestion);
            }
        });
    }
    
    // Auto-advance
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            setTimeout(() => {
                if (currentQuestion < totalQuestions && validateCurrentQuestion()) {
                    if (currentQuestion !== 10) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    }
                }
            }, 300);
        });
    });
    
    // Form Submission
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateCurrentQuestion()) {
                alert('Please select an answer for the final question.');
                return;
            }
            
            const formData = new FormData(assessmentForm);
            formData.forEach((value, key) => {
                answers[key] = value;
            });
            
            const verificationChoice = answers['q10'];
            assessmentContainer.style.display = 'none';
            assessmentComplete.style.display = 'block';
            
            const completionMessage = document.getElementById('completionMessage');
            
            if (verificationChoice === 'yes-verify') {
                completionMessage.innerHTML = `
                    <div class="priority-badge">⚡ Priority Status Selected</div>
                    <p style="margin-top: 1rem;"><strong>Excellent choice!</strong> You've chosen to verify your identity for priority placement.</p>
                    <p style="margin-top: 1rem;">In a real-world scenario, you would now be redirected to <strong>IdentityIQ</strong> to complete your verification process.</p>
                    <ul style="text-align: left; margin: 1.5rem auto; max-width: 500px;">
                        <li>Priority placement in employer searches</li>
                        <li>Faster response times (within 24 hours)</li>
                        <li>Access to exclusive job opportunities</li>
                        <li>Dedicated account manager support</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <strong>Demo Note:</strong> This is a demonstration. In production, you would be redirected to IdentityIQ.
                    </p>
                `;
            } else {
                completionMessage.innerHTML = `
                    <p><strong>Thank you for completing the assessment!</strong></p>
                    <p style="margin-top: 1rem;">Your responses have been recorded. You'll remain in our standard candidate pool.</p>
                    <p style="margin-top: 1rem; padding: 1rem; background: #d1ecf1; border-radius: 8px; border-left: 4px solid #0c5460;">
                        <strong>Tip:</strong> You can upgrade to priority status later through your candidate dashboard.
                    </p>
                `;
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            storeAssessmentData({ contactInfo, answers });
        });
    }
    
    function storeAssessmentData(data) {
        try {
            const assessmentData = {
                timestamp: new Date().toISOString(),
                contactInfo: data.contactInfo,
                answers: data.answers,
                status: data.answers.q10 === 'yes-verify' ? 'priority' : 'standard'
            };
            localStorage.setItem('talent_loop_assessment', JSON.stringify(assessmentData));
            console.log('Assessment data stored:', assessmentData);
        } catch (error) {
            console.error('Error storing assessment data:', error);
        }
    }
});
