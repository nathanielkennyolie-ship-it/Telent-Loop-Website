// ================================
// Talent Loop - Assessment Quiz
// FINAL & WORKING w/ POPUP WARNING & CORRECTED MESSAGING
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // ADDRESS AUTOCOMPLETE (LIVE)
    // ================================
    const addressInput = document.getElementById('address');
    const addressSuggestions = document.getElementById('addressSuggestions');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');
    const zipCodeInput = document.getElementById('zipCode');
    const countrySelect = document.getElementById('country');

    async function getRealAddressSuggestions(query) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`;
        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'TalentLoopApp/1.0' } });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.map(item => {
                const addr = item.address;
                const houseNumber = addr.house_number || '';
                const street = addr.road || '';
                const city = addr.city || addr.town || addr.village || '';
                const state = addr.state || '';
                const postcode = addr.postcode || '';
                const country = addr.country || '';
                const fullStreet = `${houseNumber} ${street}`.trim();
                let display_parts = [fullStreet, city, state, postcode].filter(Boolean).join(', ');
                return {
                    street: fullStreet, city: city, state: state,
                    postcode: postcode, country: country, formatted: display_parts
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
                addressSuggestions.innerHTML = '';
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
                const countryOption = Array.from(countrySelect.options).find(option => option.text === addressData.country);
                if (countryOption) {
                    countrySelect.value = countryOption.value;
                    countrySelect.dispatchEvent(new Event('change'));
                    setTimeout(() => {
                        const stateOption = Array.from(stateSelect.options).find(option => option.value === addressData.state || option.text === addressData.state);
                        if (stateOption) stateSelect.value = stateOption.value;
                    }, 100);
                }
                addressSuggestions.innerHTML = '';
                addressSuggestions.style.display = 'none';
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target.id !== 'address') {
                addressSuggestions.innerHTML = '';
                addressSuggestions.style.display = 'none';
            }
        });
    }

    // ================================
    // STATE DROPDOWN
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
    
    if (countrySelect && stateSelect) {
        countrySelect.addEventListener('change', function() {
            const country = this.value;
            stateSelect.innerHTML = '';
            let defaultOption = document.createElement('option');
            defaultOption.value = '';
            stateSelect.appendChild(defaultOption);
            if (statesByCountry[country]) {
                defaultOption.textContent = 'Select State/Province';
                statesByCountry[country].forEach(state => {
                    let opt = document.createElement('option');
                    opt.value = state; opt.textContent = state;
                    stateSelect.appendChild(opt);
                });
            } else {
                defaultOption.textContent = country ? 'Enter your state/province' : 'Select Country First';
            }
        });
    }

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
    const standardWarning = document.getElementById('standardApplicationWarning');
    
    let currentQuestion = 1;
    const totalQuestions = 10;
    const answers = {};
    let contactInfo = {};
    const QUICKEN_URL = 'https://quicken.sjv.io/OemEbP';
    
    if (contactInfoForm) {
        contactInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactInfo = Object.fromEntries(new FormData(contactInfoForm).entries());
            personalInfoForm.style.display = 'none';
            assessmentIntro.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            assessmentIntro.style.display = 'none';
            assessmentContainer.style.display = 'block';
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    function showQuestion(num) {
        document.querySelectorAll('.question-slide').forEach(s => s.classList.remove('active'));
        document.querySelector(`[data-question="${num}"]`).classList.add('active');
        prevBtn.style.display = num === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = num === totalQuestions ? 'none' : 'inline-block';
        submitBtn.style.display = num === totalQuestions ? 'inline-block' : 'none';
        currentQuestionSpan.textContent = num;
        if (standardWarning) standardWarning.style.display = 'none'; // Hide warning by default
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateProgress() {
        progressFill.style.width = (currentQuestion / totalQuestions * 100) + '%';
    }
    
    function validateQuestion() {
        const slide = document.querySelector(`[data-question="${currentQuestion}"]`);
        const radios = slide.querySelectorAll('input[type="radio"]');
        let valid = false;
        radios.forEach(r => {
            if (r.checked) {
                valid = true;
                answers[`q${currentQuestion}`] = r.value;
            }
        });
        if (!valid) alert('Please select an answer.');
        return valid;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateQuestion()) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentQuestion--;
            showQuestion(currentQuestion);
        });
    }
    
    document.querySelectorAll('input[name="q10"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'no-standard') {
                if (standardWarning) standardWarning.style.display = 'block';
            } else {
                if (standardWarning) standardWarning.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        const questionNumber = parseInt(radio.closest('.question-slide').dataset.question, 10);
        if (questionNumber < 10) {
            radio.addEventListener('change', function() {
                setTimeout(() => {
                    if (validateQuestion()) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    }
                }, 300);
            });
        }
    });
    
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateQuestion()) return;
            
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
                    <p style="font-size: 1.2rem;"><strong>Thank you for completing the assessment.</strong></p>
                    <div style="background: #d1ecf1; padding: 2rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #0c5460;">
                        <h3 style="color: #0c5460; margin-bottom: 1rem;">📋 What Happens Next:</h3>
                        <ul style="text-align: left; margin-left: 1.5rem; color: #0c5460; line-height: 1.8;">
                            <li>Your assessment has been added to our standard applicant pool.</li>
                            <li>Our team will review your profile in <strong>7-10 business days</strong>.</li>
                            <li>You will receive job matches via email as suitable opportunities become available.</li>
                        </ul>
                    </div>
                `;
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
