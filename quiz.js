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
            
            if (selectedCountry && statesByCountry[selectedCountry]) {
                // Enable dropdown and populate with states for selected country
                stateSelect.disabled = false;
                statesByCountry[selectedCountry].forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            } else if (selectedCountry) {
                // For countries without predefined states, provide N/A option
                stateSelect.disabled = false;
                const option = document.createElement('option');
                option.value = 'N/A';
                option.textContent = 'N/A';
                stateSelect.appendChild(option);
                // Auto-select N/A for countries without state lists
                stateSelect.value = 'N/A';
            } else {
                // No country selected - disable state dropdown
                stateSelect.disabled = true;
                stateSelect.innerHTML = '<option value="">Select Country First</option>';
            }
        });
        
        // Initialize state dropdown as disabled
        stateSelect.disabled = true;
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
    
    // Quicken affiliate URL
    const QUICKEN_VERIFICATION_URL = 'https://quicken.sjv.io/OemEbP';
    
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
    
    // Auto-advance on selection (disabled for question 10)
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
            
            // Store all data first
            storeAssessmentData({ contactInfo, answers });
            
            // Hide the quiz
            assessmentContainer.style.display = 'none';
            
            // Show completion message
            assessmentComplete.style.display = 'block';
            
            const completionMessage = document.getElementById('completionMessage');
            const prioritySuccessMessage = document.getElementById('prioritySuccessMessage');
            
            if (verificationChoice === 'yes-verify') {
                // Show the priority success message section
                if (prioritySuccessMessage) {
                    prioritySuccessMessage.style.display = 'block';
                }
                
                // Open Quicken in NEW TAB
                window.open(QUICKEN_VERIFICATION_URL, '_blank');
                
                // Show congratulatory message on current page
                completionMessage.innerHTML = `
                    <div class="priority-badge">⚡ Priority Status - Verification in Progress</div>
                    <p style="margin-top: 1.5rem; font-size: 1.2rem;"><strong>Congratulations!</strong> You've taken the first step toward priority placement.</p>
                    
                    <div style="background: #e7f3ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid var(--primary-color);">
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">📋 What's Happening Now:</h3>
                        <ol style="text-align: left; margin-left: 1.5rem; line-height: 1.8;">
                            <li>A new window has opened with <strong>Quicken's verification platform</strong></li>
                            <li>Complete the quick verification process there</li>
                            <li>Once verified, you'll receive <strong>priority status</strong> in our system</li>
                        </ol>
                    </div>

                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #ffc107;">
                        <h3 style="color: #856404; margin-bottom: 1rem;">📞 Next Steps:</h3>
                        <p style="color: #856404; margin-bottom: 0.5rem;">Once you've completed the Quicken verification:</p>
                        <ul style="text-align: left; margin-left: 1.5rem; color: #856404; line-height: 1.8;">
                            <li>Our team will be notified of your priority status</li>
                            <li>A career consultant will <strong>contact you via phone</strong> within 24 hours</li>
                            <li>You'll receive exclusive access to premium job opportunities</li>
                        </ul>
                    </div>

                    <p style="margin-top: 1.5rem; font-size: 0.95rem; color: var(--text-secondary);">
                        <strong>Don't see the verification window?</strong> 
                        <a href="${QUICKEN_VERIFICATION_URL}" target="_blank" style="color: var(--primary-color); text-decoration: underline;">Click here to open it manually</a>
                    </p>
                `;
                
            } else {
                // Hide priority success message for standard users
                if (prioritySuccessMessage) {
                    prioritySuccessMessage.style.display = 'none';
                }
                
                // Standard application message
                completionMessage.innerHTML = `
                    <p style="font-size: 1.2rem;"><strong>Thank you for completing the assessment!</strong></p>
                    
                    <div style="background: #d1ecf1; padding: 2rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #0c5460;">
                        <h3 style="color: #0c5460; margin-bottom: 1rem;">📋 What Happens Next:</h3>
                        <ul style="text-align: left; margin-left: 1.5rem; color: #0c5460; line-height: 1.8;">
                            <li>Your assessment has been saved in our standard candidate pool</li>
                            <li>Our team will review your profile within 48 hours</li>
                            <li>You'll receive job matches via email when suitable positions become available</li>
                        </ul>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; border-left: 4px solid #ffc107;">
                        <p style="color: #856404; margin-bottom: 0;">
                            <strong>💡 Tip:</strong> Want faster results? You can upgrade to priority status anytime through your candidate dashboard by completing the Quicken verification.
                        </p>
                    </div>
                `;
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    function storeAssessmentData(data) {
        try {
            const assessmentData = {
                timestamp: new Date().toISOString(),
                contactInfo: data.contactInfo,
                answers: data.answers,
                status: data.answers.q10 === 'yes-verify' ? 'priority' : 'standard',
                quickenVerificationSent: data.answers.q10 === 'yes-verify'
            };
            localStorage.setItem('talent_loop_assessment', JSON.stringify(assessmentData));
            console.log('Assessment data stored:', assessmentData);
            
            // In production, send to your server:
            // fetch('/api/save-assessment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(assessmentData)
            // });
            
        } catch (error) {
            console.error('Error storing assessment data:', error);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (assessmentContainer.style.display === 'block') {
            if (e.key === 'ArrowRight' && currentQuestion < totalQuestions) {
                if (validateCurrentQuestion()) {
                    nextBtn.click();
                }
            } else if (e.key === 'ArrowLeft' && currentQuestion > 1) {
                prevBtn.click();
            }
        }
    });
    
    // Prevent accidental page refresh
    window.addEventListener('beforeunload', function(e) {
        if (assessmentContainer.style.display === 'block' && currentQuestion > 1) {
            e.preventDefault();
            e.returnValue = 'You have an assessment in progress. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
});
