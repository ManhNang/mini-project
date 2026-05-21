const memberCountInput = document.getElementById('member-count');
const earlyBirdCheck = document.getElementById('early-bird');
const promoCodeInput = document.getElementById('promo-code');
const totalFeeSpan = document.getElementById('total-fee');

const registrationForm = document.getElementById('registration-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

function calculateFee() {
    const orginalFee = 200000;
    let numMembers = parseInt(memberCountInput.value) || 0;
    
    if (numMembers < 1) numMembers = 1;
    if (numMembers > 5) numMembers = 5;

    let sumFee = 0;
    for (let i = 1; i <= numMembers; i++) {
        sumFee += orginalFee;
    }

    if (earlyBirdCheck.checked) {
        sumFee = sumFee * 0.8;
    }

    const promoCode = promoCodeInput.value.trim().toUpperCase();
    if (promoCode === "TECHBUGS10") {
        sumFee = sumFee * 0.9;
    } else if (promoCode === "FREESHIP") {
        sumFee = Math.max(0, sumFee - 50000);
    }

    totalFeeSpan.textContent = sumFee.toLocaleString('vi-VN');
}

memberCountInput.addEventListener('input', calculateFee);
earlyBirdCheck.addEventListener('change', calculateFee);
promoCodeInput.addEventListener('input', calculateFee);

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    successModal.classList.add('active');
});

closeModalBtn.addEventListener('click', function() {
    successModal.classList.remove('active');
    registrationForm.reset();
    calculateFee();
});