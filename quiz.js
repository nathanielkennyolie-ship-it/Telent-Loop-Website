// ================================
// Talent Loop - Assessment Quiz
// FINAL & WORKING w/ US-ONLY ADDRESSES
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // ADDRESS AUTOCOMPLETE (LIVE & US-ONLY)
    // ================================
    const addressInput = document.getElementById('address');
    const addressSuggestions = document.getElementById('addressSuggestions');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');
    const zipCodeInput = document.getElementById('zipCode');
    const countrySelect = document.getElementById('country');

    async function getRealAddressSuggestions(query) {
        // Updated URL to prioritize and restrict search to the United States
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=us`;

        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'TalentLoopApp/1.0' } });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Client-side filter to ensure we only show US results
            const usData = data.filter(item => item.address && item.address.country_code === 'us');

            return usData.map(item => {
                const addr = item.address;
                const houseNumber = addr.house_number || '';
                const street = addr.road || '';
                const city = addr.city || addr.town || addr.village || '';
                const state = addr.state || '';
                const postcode = addr.postcode || '';

                const fullStreet = `${houseNumber} ${street}`.trim();
                let display_parts = [fullStreet, city, state, postcode].filter(Boolean).join(', ');

                return {
                    street: fullStreet,
                    city: city,
                    state: state,
                    postcode: postcode,
                    country: "United States", // Hardcode to US
                    formatted: display_parts
                };
            });

        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            return [];
        }
    }

    if (addressInput) {
        addressInput.addEventListener('input', async function() {
            const query = this.value;
            if (query.length < 3) {
                addressSuggestions.innerHTML = '';
                addressSuggestions.style.display = 'none';
                return;
            }
            const suggestions = await getRealAddressSuggestions(query);
            if (suggestions.length > 0) {
                const suggestionsHTML = suggestions.map(s => {
                    const addressData = JSON.stringify(s).replace(/"/g, '&quot;');
                    return `<div class="suggestion-item" data-address='${addressData}'>${s.formatted}</div>`;
                }).join('');
                addressSuggestions.innerHTML = suggestionsHTML;
                addressSuggestions.style.display = 'block';
            } else {
                addressSuggestions.style.display = 'none';
            }
        });

        addressSuggestions.addEventListener('click', function(e) {
            let target = e.target.closest('.suggestion-item');
            if (target) {
                const addressData = JSON.parse(target.getAttribute('data-address'));
                
                addressInput.value = addressData.street;
                cityInput.value = addressData.city;
                zipCodeInput.value = addressData.postcode;
                
                // Set country and state dropdowns
                countrySelect.value = "United States";
                const event = new Event('change');
                countrySelect.dispatchEvent(event);
                
                setTimeout(() => {
                    stateSelect.value = addressData.state;
                }, 50); // Small delay to ensure state options are populated

                addressSuggestions.style.display = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (!addressInput.contains(e.target)) {
                addressSuggestions.style.display = 'none';
            }
        });
    }

    // ================================
    // COUNTRY & STATE DROPDOWN (US-ONLY)
    // ================================
    const statesByCountry = {
        'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    };

    function populateCountries() {
        if (!countrySelect) return;
        const countries = Object.keys(statesByCountry);
        countries.forEach(country => {
            let option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
        // Set default to United States
        countrySelect.value = "United States"; 
        // Trigger change to populate states
        countrySelect.dispatchEvent(new Event('change')); 
    }
    
    if (countrySelect && stateSelect) {
        countrySelect.addEventListener('change', function() {
            const country = this.value;
            // Always enable the state select
            stateSelect.disabled = false;
            stateSelect.innerHTML = ''; 

            const states = statesByCountry[country];
            if (states) {
                let option = document.createElement('option');
                option.value = '';
                option.textContent = 'Select State/Province';
                stateSelect.appendChild(option);
                
                states.forEach(state => {
                    let opt = document.createElement('option');
                    opt.value = state;
                    opt.textContent = state;
                    stateSelect.appendChild(opt);
                });
            }
        });
    }

    // Initialize country dropdown on page load
    populateCountries();

    // ================================
    // ASSESSMENT FORM LOGIC
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
    
    let currentQuestion = 1;
    const totalQuestions = 10;
    const answers = {};
    let contactInfo = {};
    const QUICKEN_URL = 'https://quicken.sjv.io/OemEbP';
    
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactInfoForm);
            contactInfo = Object.fromEntries(formData.entries());
            personalInfoForm.style.display = 'none';
            assessmentIntro.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            assessmentIntro.style.display = 'none';
            assessmentContainer.style.display = 'block';
            showQuestion(1);
        });
    }
    
    function showQuestion(num) {
        document.querySelectorAll('.question-slide').forEach(s => s.classList.remove('active'));
        const slide = document.querySelector(`[data-question="${num}"]`);
        if(slide) slide.classList.add('active');
        
        prevBtn.style.display = num === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = num === totalQuestions ? 'none' : 'inline-block';
        submitBtn.style.display = num === totalQuestions ? 'inline-block' : 'none';
        if(currentQuestionSpan) currentQuestionSpan.textContent = num;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateProgress() {
        if(progressFill) progressFill.style.width = ((currentQuestion -1) / totalQuestions * 100) + '%';
    }
    
    function validateQuestion() {
        const slide = document.querySelector(`[data-question="${currentQuestion}"]`);
        if(!slide) return true; // No slide, no validation needed
        const radios = slide.querySelectorAll('input[type="radio"]');
        if(radios.length === 0) return true; // No radios, no validation needed

        let valid = false;
        radios.forEach(r => {
            if (r.checked) {
                valid = true;
                answers[`q${currentQuestion}`] = r.value;
            }
        });
        return valid;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateQuestion()) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                alert('Please select an answer.');
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentQuestion--;
            showQuestion(currentQuestion);
        });
    }
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const currentSlide = radio.closest('.question-slide');
            const questionNumber = parseInt(currentSlide.dataset.question, 10);
            if (questionNumber < totalQuestions) {
                setTimeout(() => {
                    if (validateQuestion()) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    }
                }, 300);
            }
        });
    });
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateQuestion()) {
                alert('Please select an answer.');
                return;
            }
            
            const formData = new FormData(assessmentForm);
            formData.forEach((v, k) => { answers[k] = v; });
            
            localStorage.setItem('talent_loop_assessment', JSON.stringify({
                timestamp: new Date().toISOString(),
                contactInfo: contactInfo,
                answers: answers,
                status: answers.q10 === 'yes-verify' ? 'priority' : 'standard'
            }));
            
            assessmentContainer.style.display = 'none';
            assessmentComplete.style.display = 'block';
            
            const msg = document.getElementById('completionMessage');
            
            if (answers.q10 === 'yes-verify') {
                window.open(QUICKEN_URL, '_blank');
                msg.innerHTML = `
                    <div class="priority-badge">⚡ Priority Status - Verification in Progress</div>
                    <p style="margin-top: 1.5rem; font-size: 1.2rem;"><strong>Congratulations!</strong> You've taken the first step toward priority placement.</p>
                    <div style="background: #e7f3ff; padding: 2rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid var(--primary-color);">
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">📋 What's Happening Now:</h3>
                        <ol style="text-align: left; margin-left: 1.5rem; line-height: 1.8;">
                            <li>A new window has opened with our trusted partner, <strong>Quicken®</strong>, to begin the verification process.</li>
                            <li>To get priority status, you'll need to sign up for a <strong>free Quicken® trial</strong>—no payment is required to start.</li>
                            <li>Once you complete the short verification on their secure platform, your priority status will be activated.</li>
                        </ol>
                    </div>
                    <p style="margin-top: 1.5rem;"><strong>Don't see the window?</strong> 
                    <a href="${QUICKEN_URL}" target="_blank" style="color: var(--primary-color); text-decoration: underline;">Click here to continue to Quicken®</a></p>
                `;
            } else {
                msg.innerHTML = `
                    <p style="font-size: 1.2rem;"><strong>Thank you for completing the assessment!</strong></p>
                    <div style="background: #d1ecf1; padding: 2rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #0c5460;">
                        <h3 style="color: #0c5460; margin-bottom: 1rem;">📋 What Happens Next:</h3>
                        <ul style="text-align: left; margin-left: 1.5rem; color: #0c5460; line-height: 1.8;">
                            <li>Your assessment is saved in our candidate pool</li>
                            <li>Our team will review your profile within 48 hours</li>
                            <li>You'll get job matches via email</li>
                        </ul>
                    </div>
                `;
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
