// ================================
// Talent Loop - Assessment Quiz
// ================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz script loaded successfully!');
    
    // Personal Information Form Elements
    const personalInfoForm = document.getElementById('personalInfoForm');
    const personalDetailsForm = document.getElementById('personalDetailsForm');
    const assessmentIntro = document.getElementById('assessmentIntro');
    
    console.log('Form elements found:', {
        personalInfoForm: !!personalInfoForm,
        personalDetailsForm: !!personalDetailsForm,
        assessmentIntro: !!assessmentIntro
    });
    
    // Assessment Elements
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
    let personalInfo = {};
    let debounceTimer;
    
    // ================================
    // Address Autocomplete Setup
    // ================================
    function initAddressAutocomplete() {
        const addressInput = document.getElementById('address');
        const suggestionsDiv = document.getElementById('addressSuggestions');
        
        console.log('Initializing address autocomplete...');
        console.log('Address input found:', !!addressInput);
        console.log('Suggestions div found:', !!suggestionsDiv);
        
        if (!addressInput || !suggestionsDiv) {
            console.error('Missing address elements!');
            return;
        }
        
        console.log('Address autocomplete initialized successfully!');
        
        // Listen for typing in address field
        addressInput.addEventListener('input', function() {
            const query = this.value.trim();
            console.log('Address input:', query);
            
            // Clear previous timer
            clearTimeout(debounceTimer);
            
            // Hide suggestions if query is too short
            if (query.length < 3) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            
            // Debounce API calls (wait 500ms after user stops typing)
            debounceTimer = setTimeout(() => {
                console.log('Searching for address:', query);
                searchAddress(query);
            }, 500);
        });
        
        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!addressInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
                suggestionsDiv.style.display = 'none';
            }
        });
    }
    
    async function searchAddress(query) {
        const suggestionsDiv = document.getElementById('addressSuggestions');
        
        try {
            console.log('Fetching addresses from Nominatim...');
            
            // Using Nominatim (OpenStreetMap) - completely free, no API key!
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?` +
                `format=json&` +
                `q=${encodeURIComponent(query)}&` +
                `addressdetails=1&` +
                `limit=5`,
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            
            const results = await response.json();
            console.log('Found addresses:', results.length);
            
            if (results.length === 0) {
                suggestionsDiv.innerHTML = '<div class="address-suggestion-item" style="color: #999; cursor: default;">No addresses found</div>';
                suggestionsDiv.style.display = 'block';
                return;
            }
            
            // Display suggestions
            displaySuggestions(results);
            
        } catch (error) {
            console.error('Address search error:', error);
            suggestionsDiv.innerHTML = '<div class="address-suggestion-item" style="color: #999; cursor: default;">Error loading addresses. Please enter manually.</div>';
            suggestionsDiv.style.display = 'block';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                suggestionsDiv.style.display = 'none';
            }, 3000);
        }
    }
    
    function displaySuggestions(results) {
        const suggestionsDiv = document.getElementById('addressSuggestions');
        
        console.log('Displaying suggestions...');
        
        // Clear previous suggestions
        suggestionsDiv.innerHTML = '';
        
        // Create suggestion items
        results.forEach((result, index) => {
            const item = document.createElement('div');
            item.className = 'address-suggestion-item';
            item.textContent = result.display_name;
            
            console.log(`Suggestion ${index + 1}:`, result.display_name);
            
            // Click handler to fill in the form
            item.addEventListener('click', function() {
                console.log('Selected address:', result.display_name);
                fillAddressFields(result);
                suggestionsDiv.style.display = 'none';
            });
            
            suggestionsDiv.appendChild(item);
        });
        
        // Show suggestions
        suggestionsDiv.style.display = 'block';
    }
    
    function fillAddressFields(addressData) {
        const addr = addressData.address;
        
        console.log('Filling address fields with:', addr);
        
        // Extract address components
        const streetNumber = addr.house_number || '';
        const street = addr.road || addr.street || '';
        const city = addr.city || addr.town || addr.village || addr.municipality || '';
        const state = addr.state || addr.province || addr.region || '';
        const zipcode = addr.postcode || '';
        const countryCode = addr.country_code ? addr.country_code.toUpperCase() : '';
        
        // Fill in the form fields
        document.getElementById('address').value = (streetNumber + ' ' + street).trim() || addressData.display_name.split(',')[0];
        document.getElementById('city').value = city;
        document.getElementById('state').value = state;
        document.getElementById('zipcode').value = zipcode;
        
        // Set country dropdown
        const countrySelect = document.getElementById('country');
        for (let i = 0; i < countrySelect.options.length; i++) {
            if (countrySelect.options[i].value === countryCode) {
                countrySelect.selectedIndex = i;
                break;
            }
        }
        
        console.log('Address filled successfully:', {
            address: document.getElementById('address').value,
            city: city,
            state: state,
            zipcode: zipcode,
            country: countryCode
        });
    }
    
    // Initialize address autocomplete
    initAddressAutocomplete();
    
    // ================================
    // Handle Personal Information Form Submission
    // ================================
    if (personalDetailsForm) {
        console.log('Adding submit handler to personal details form');
        
        personalDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Personal details form submitted!');
            
            // Validate resume upload
            const resumeFile = document.getElementById('resumeUpload').files[0];
            if (!resumeFile) {
                alert('Please upload your resume to continue.');
                return;
            }
            
            // Validate file size (5MB max)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (resumeFile.size > maxSize) {
                alert('Resume file size must be less than 5MB. Please upload a smaller file.');
                return;
            }
            
            // Validate file type
            const allowedTypes = ['.pdf', '.doc', '.docx'];
            const fileName = resumeFile.name.toLowerCase();
            const isValidType = allowedTypes.some(type => fileName.endsWith(type));
            
            if (!isValidType) {
                alert('Please upload a valid resume file (PDF, DOC, or DOCX).');
                return;
            }
            
            // Collect personal information
            const formData = new FormData(personalDetailsForm);
            personalInfo = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipcode: formData.get('zipcode'),
                country: formData.get('country'),
                linkedinUrl: formData.get('linkedinUrl') || '',
                agreeTerms: formData.get('agreeTerms') === 'on',
                resumeFileName: resumeFile.name,
                resumeFileSize: resumeFile.size,
                resumeFileType: resumeFile.type
            };
            
            console.log('Personal info collected:', personalInfo);
            
            // Store personal info in localStorage
            try {
                localStorage.setItem('talentloop_personal_info', JSON.stringify(personalInfo));
                console.log('Personal information saved to localStorage');
            } catch (error) {
                console.error('Error saving personal information:', error);
            }
            
            // Hide personal info form
            console.log('Hiding personal info form...');
            personalInfoForm.style.display = 'none';
            
            // Show assessment intro (not repeating the form)
            console.log('Showing assessment intro...');
            assessmentIntro.style.display = 'block';
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('Transition complete! Assessment intro should be visible.');
        });
    } else {
        console.error('personalDetailsForm not found!');
    }
    
    // ================================
    // Start Assessment
    // ================================
    if (startButton) {
        console.log('Adding click handler to start button');
        
        startButton.addEventListener('click', function() {
            console.log('Start Assessment button clicked!');
            
            // Hide intro
            console.log('Hiding assessment intro...');
            assessmentIntro.style.display = 'none';
            
            // Show assessment container
            console.log('Showing assessment container...');
            assessmentContainer.style.display = 'block';
            
            // Initialize first question
            showQuestion(1);
            updateProgress();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log('Assessment started! Quiz should be visible.');
        });
    } else {
        console.error('Start button not found!');
    }
    
    // ================================
    // Question Navigation
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
    
    // Auto-advance on selection (optional enhancement)
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Small delay for better UX
            setTimeout(() => {
                if (currentQuestion < totalQuestions && validateCurrentQuestion()) {
                    // Auto-advance disabled for question 10 (verification question)
                    if (currentQuestion !== 10) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    }
                }
            }, 300);
        });
    });
    
    // ================================
    // Form Submission
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
            
            // Store assessment data (in production, this would be sent to a server)
            storeAssessmentData(answers);
        });
    }
    
    function storeAssessmentData(data) {
        // In production, this would send data to your backend server
        // For demo purposes, we'll store in localStorage
        try {
            // Get personal info from localStorage
            const storedPersonalInfo = localStorage.getItem('talentloop_personal_info');
            const personalData = storedPersonalInfo ? JSON.parse(storedPersonalInfo) : {};
            
            const assessmentData = {
                timestamp: new Date().toISOString(),
                personalInfo: personalData,
                assessmentAnswers: data,
                status: data.q10 === 'yes-verify' ? 'priority' : 'standard'
            };
            
            localStorage.setItem('talentloop_assessment', JSON.stringify(assessmentData));
            console.log('Complete assessment data stored:', assessmentData);
            
            // In production, send to server:
            // fetch('/api/submit-assessment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(assessmentData)
            // });
            
        } catch (error) {
            console.error('Error storing assessment data:', error);
        }
    }
    
    // ================================
    // Keyboard navigation
    // ================================
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
    
    // ================================
    // Prevent accidental page refresh
    // ================================
    window.addEventListener('beforeunload', function(e) {
        if (assessmentContainer.style.display === 'block' && currentQuestion > 1) {
            e.preventDefault();
            e.returnValue = 'You have an assessment in progress. Are you sure you want to leave?';
            return e.returnValue;
        }
    });
});
