// ================================
// Talent Loop - Assessment Quiz
// FINAL & WORKING w/ US-ONLY ADDRESSES & ROBUST DROPDOWNS
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // Element Selectors
    // ================================
    const addressInput = document.getElementById('address');
    const addressSuggestions = document.getElementById('addressSuggestions');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');
    const zipCodeInput = document.getElementById('zipCode');
    const countrySelect = document.getElementById('country');
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

    // ================================
    // State & Constants
    // ================================
    let currentQuestion = 1;
    const totalQuestions = 10;
    const answers = {};
    let contactInfo = {};
    const QUICKEN_URL = 'https://quicken.sjv.io/OemEbP';
    const statesByCountry = {
        'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    };

    // ================================
    // COUNTRY & STATE DROPDOWN LOGIC
    // ================================
    function populateStates(country) {
        if (!stateSelect) return;

        const states = statesByCountry[country];
        stateSelect.innerHTML = ''; // Clear existing options
        stateSelect.disabled = true; // Disable until populated

        if (states) {
            stateSelect.disabled = false;
            let placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Select State/Province';
            stateSelect.appendChild(placeholder);

            states.forEach(state => {
                let opt = document.createElement('option');
                opt.value = state;
                opt.textContent = state;
                stateSelect.appendChild(opt);
            });
        } else {
            let placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Select Country First';
            stateSelect.appendChild(placeholder);
        }
    }

    function initializeDropdowns() {
        if (!countrySelect) return;
        
        // Populate Countries
        const countries = Object.keys(statesByCountry);
        countrySelect.innerHTML = ''; // Clear existing
        countries.forEach(country => {
            let option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        // Set default to United States and populate states
        countrySelect.value = "United States";
        populateStates("United States");

        // Add event listener for changes
        countrySelect.addEventListener('change', function() {
            populateStates(this.value);
        });
    }

    // ================================
    // ADDRESS AUTOCOMPLETE (LIVE & US-ONLY)
    // ================================
    async function getRealAddressSuggestions(query) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=us`;
        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'TalentLoopApp/1.0' } });
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            const usData = data.filter(item => item.address && item.address.country_code === 'us');

            return usData.map(item => {
                const addr = item.address;
                const fullStreet = `${addr.house_number || ''} ${addr.road || ''}`.trim();
                return {
                    street: fullStreet,
                    city: addr.city || addr.town || addr.village || '',
                    state: addr.state || '',
                    postcode: addr.postcode || '',
                    formatted: [fullStreet, addr.city, addr.state, addr.postcode].filter(Boolean).join(', ')
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
                addressSuggestions.style.display = 'none';
                return;
            }
            const suggestions = await getRealAddressSuggestions(query);
            if (suggestions.length > 0) {
                addressSuggestions.innerHTML = suggestions.map(s => 
                    `<div class="suggestion-item" data-address='${JSON.stringify(s).replace(/"/g, '&quot;')}'>${s.formatted}</div>`
                ).join('');
                addressSuggestions.style.display = 'block';
            } else {
                addressSuggestions.style.display = 'none';
            }
        });

        addressSuggestions.addEventListener('click', function(e) {
            const target = e.target.closest('.suggestion-item');
            if (target) {
                const addr = JSON.parse(target.getAttribute('data-address'));
                addressInput.value = addr.street;
                cityInput.value = addr.city;
                zipCodeInput.value = addr.postcode;
                countrySelect.value = "United States";
                populateStates("United States"); // Ensure states are populated
                stateSelect.value = addr.state;
                addressSuggestions.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!addressInput.contains(e.target)) addressSuggestions.style.display = 'none';
        });
    }

    // ================================
    // ASSESSMENT FLOW & NAVIGATION
    // ================================
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
        if (slide) slide.classList.add('active');

        if (prevBtn) prevBtn.style.display = num === 1 ? 'none' : 'inline-block';
        if (nextBtn) nextBtn.style.display = num === totalQuestions ? 'none' : 'inline-block';
        if (submitBtn) submitBtn.style.display = num === totalQuestions ? 'inline-block' : 'none';
        if (currentQuestionSpan) currentQuestionSpan.textContent = num;
        updateProgress();
    }

    function updateProgress() {
        if (progressFill) progressFill.style.width = ((currentQuestion - 1) / totalQuestions * 100) + '%';
    }

    function validateQuestion(questionNumber) {
        const slide = document.querySelector(`[data-question="${questionNumber}"]`);
        if (!slide) return false;
        const radios = slide.querySelectorAll('input[type="radio"]');
        const isAnswered = Array.from(radios).some(r => r.checked);
        if (isAnswered) {
            answers[`q${questionNumber}`] = slide.querySelector('input[type="radio"]:checked').value;
        }
        return isAnswered;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateQuestion(currentQuestion)) {
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

    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateQuestion(currentQuestion)) {
                alert('Please select your verification choice.');
                return;
            }

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

    // ================================
    // INITIALIZATION
    // ================================
    initializeDropdowns();
});
