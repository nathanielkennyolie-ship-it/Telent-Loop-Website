// ================================
// Talent Loop - Assessment Quiz
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
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
    
    // ================================
    // STEP 1: Handle Personal Info Form Submission
    // ================================
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactInfoForm);
            contactInfo = Object.fromEntries(formData.entries());
            
            console.log('Contact Info Collected:', contactInfo);
            
            // Hide personal info form
            personalInfoForm.style.display = 'none';
            
            // Show assessment intro
            assessmentIntro.style.display = 'block';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ================================
    // STEP 2: Start Assessment Button
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
    // STEP 3: Quiz Navigation
    // ================================
    function showQuestion(questionNumber) {
        const slides = document.querySelectorAll('.question-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const currentSlide = document.querySelector(`[data-question="${questionNumber}"]`);
        if (currentSlide) {
            currentSlide.classList.add('active');
        }
        
        // Update navigation buttons
        if (questionNumber === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
        
        if (questionNumber === totalQuestions) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
        
        // Update progress
        currentQuestionSpan.textContent = questionNumber;
        updateProgress();
        
        // Scroll to top
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
    
    // Next Button
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
    
    // Previous Button
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
    
    // ================================
    // STEP 4: Form Submission
    // ================================
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateCurrentQuestion()) {
                alert('Please select an answer for the final question.');
                return;
            }
            
            // Store all answers
            const formData = new FormData(assessmentForm);
            formData.forEach((value, key) => {
                answers[key] = value;
            });
            
            console.log('Assessment Answers:', answers);
            
            // Check if user selected verification
            const verificationChoice = answers['q10'];
            
            // Hide the quiz
            assessmentContainer.style.display = 'none';
            
            // Show completion message
            assessmentComplete.style.display = 'block';
            
            const completionMessage = document.getElementById('completionMessage');
            
            if (verificationChoice === 'yes-verify') {
                completionMessage.innerHTML = `
                    <div class="priority-badge">⚡ Priority Status Selected</div>
                    <p style="margin-top: 1rem;"><strong>Excellent choice!</strong> You've chosen to verify your identity for priority placement.</p>
                    <p style="margin-top: 1rem;">In a real-world scenario, you would now be redirected to <strong>IdentityIQ</strong> to complete your verification process. This would give you:</p>
                    <ul style="text-align: left; margin: 1.5rem auto; max-width: 500px;">
                        <li>Priority placement in employer searches</li>
                        <li>Faster response times (within 24 hours)</li>
                        <li>Access to exclusive job opportunities</li>
                        <li>Dedicated account manager support</li>
                    </ul>
                    <p style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <strong>Demo Note:</strong> This is a demonstration website. In the production version, you would be automatically redirected to IdentityIQ's secure verification platform.
                    </p>
                `;
                
                // In production, redirect to IdentityIQ:
                // setTimeout(() => {
                //     window.location.href = 'https://identityiq.com/verify?partner=talent-loop';
                // }, 3000);
                
            } else {
                completionMessage.innerHTML = `
                    <p><strong>Thank you for completing the assessment!</strong></p>
                    <p style="margin-top: 1rem;">Your responses have been recorded and our team will review your profile. You'll remain in our standard candidate pool and are eligible for all opportunities.</p>
                    <p style="margin-top: 1rem; padding: 1rem; background: #d1ecf1; border-radius: 8px; border-left: 4px solid #0c5460;">
                        <strong>Tip:</strong> You can always upgrade to priority status later by completing the verification process through your candidate dashboard.
                    </p>
                `;
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Store all data
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
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (assessmentContainer.style.display === 'block') {
            if (e.key === 'ArrowRight' && currentQuestion < totalQuestions) {
                if (validateCurrentQuestion()) {
                    nextBtn.click();
                }
            } else if (e.key === 'ArrowLeft' && currentQuestion > 1) {
                prevBtn.click();
            } else if (e.key === 'Enter' && currentQuestion === totalQuestions) {
                if (validateCurrentQuestion()) {
                    submitBtn.click();
                }
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
