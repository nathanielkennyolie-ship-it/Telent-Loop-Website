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

    // ================================
    // STATE DROPDOWN POPULATION - FIXED
    // ================================
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    
    if (countrySelect && stateSelect) {
        countrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;
            
            // Clear existing options
            stateSelect.innerHTML = '';
            
            if (statesByCountry[selectedCountry]) {
                // Country has predefined states - populate dropdown
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select State/Province';
                stateSelect.appendChild(defaultOption);
                
                statesByCountry[selectedCountry].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
                
            } else if (selectedCountry && selectedCountry !== '') {
                // Other country - allow free text input
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'Enter your state/province below';
                stateSelect.appendChild(option);
                
                // Make it non-required and add instruction
                stateSelect.removeAttribute('required');
                
            } else {
                // No country selected
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Select Country First';
                stateSelect.appendChild(defaultOption);
            }
        });
    }

    // ================================
    // ASSESSMENT FORM ELEMENTS
    // ================================
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
    
    // Quicken affiliate URL
    const QUICKEN_VERIFICATION_URL = 'https://quicken.sjv.io/OemEbP';
    
    // ================================
    // HANDLE PERSONAL INFO FORM
    // ================================
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
    
    // ================================
    // START ASSESSMENT
    // ================================
    if (startButton) {
        startButton.addEventListener('click', function() {
            assessmentIntro.style.display = 'none';
            assessmentContainer.style.display = 'block';
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ================================
    // QUIZ NAVIGATION FUNCTIONS
    // ================================
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
    
    // ================================
    // NAVIGATION BUTTONS
    // ================================
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
    
    // ================================
    // AUTO-ADVANCE ON SELECTION
    // ================================
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
    
    // ================================
    // FORM SUBMISSION
    // ================================
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateCurrentQuestion()) {
                alert('Please select an answer for the final question.');
                return;
            }
            
            const formData = new FormData(assessmentForm);
            formData.forEach((value, key) => {
                answers[ke
