// ========== Found Pet Form Script ========== 

// Edit mode removed — form only supports creating new reports

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('found-pet-form');

    if (!form) return;

    // No edit mode: form always creates a new found pet report

    // Initialize dynamic fields
    initializeConditionalFields();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFoundPetSubmission();
    });

    // Image preview
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
});

// Edit mode removed — no load function

// ========== Initialize Conditional Fields ========== 
function initializeConditionalFields() {
    const petTypeSelect = document.getElementById('pet-type');
    const colorSelect = document.getElementById('color');
    const sizeSelect = document.getElementById('size');
    const contactInput = document.getElementById('contact');

    if (petTypeSelect) {
        petTypeSelect.addEventListener('change', handlePetTypeChange);
    }

    if (colorSelect) {
        colorSelect.addEventListener('change', handleColorChange);
    }

    if (sizeSelect) {
        sizeSelect.addEventListener('change', handleSizeChange);
    }

    if (contactInput) {
        contactInput.addEventListener('input', validatePhoneNumber);
    }
}

// ========== Handle Pet Type Change ========== 
function handlePetTypeChange() {
    const petType = document.getElementById('pet-type').value;
    const breedGroup = document.getElementById('breed-group');
    const breedSelect = document.getElementById('breed');

    if (!petType) {
        breedGroup.style.display = 'none';
        return;
    }

    if (breedData[petType]) {
        breedGroup.style.display = 'block';
        populateBreedDropdown(petType);
    } else {
        breedGroup.style.display = 'none';
    }
}

// ========== Populate Breed Dropdown ========== 
function populateBreedDropdown(petType) {
    const breedSelect = document.getElementById('breed');
    const breeds = breedData[petType] || [];

    breedSelect.innerHTML = '<option value="">-- Select Breed --</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.toLowerCase();
        option.textContent = breed;
        breedSelect.appendChild(option);
    });
}

// ========== Handle Color Change ========== 
function handleColorChange() {
    const color = document.getElementById('color').value;
    const customColorGroup = document.getElementById('custom-color-group');
    const customColorInput = document.getElementById('custom-color');

    if (color === 'other') {
        customColorGroup.style.display = 'block';
        customColorInput.required = true;
    } else {
        customColorGroup.style.display = 'none';
        customColorInput.required = false;
        customColorInput.value = '';
    }
}

// ========== Handle Size Change ========== 
function handleSizeChange() {
    const size = document.getElementById('size').value;
    const customSizeGroup = document.getElementById('custom-size-group');
    const customSizeInput = document.getElementById('custom-size');

    if (size === 'other') {
        customSizeGroup.style.display = 'block';
        customSizeInput.required = true;
    } else {
        customSizeGroup.style.display = 'none';
        customSizeInput.required = false;
        customSizeInput.value = '';
    }
}

// ========== Validate Phone Number ========== 
function validatePhoneNumber() {
    const contactInput = document.getElementById('contact');
    const contactError = document.getElementById('contact-error');

    const value = contactInput.value.replace(/\D/g, '');
    contactInput.value = value;

    if (value.length > 0 && value.length !== 10) {
        contactError.textContent = 'Phone number must be exactly 10 digits';
    } else {
        contactError.textContent = '';
    }
}

// ========== Handle Image Preview ========== 
function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('image-preview');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(event) {
            preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        };

        reader.readAsDataURL(file);
    }
}

// ========== Handle Found Pet Submission ========== 
function handleFoundPetSubmission() {
    const form = document.getElementById('found-pet-form');
    const contactInput = document.getElementById('contact');

    // Validate phone number before submission
    const phoneDigits = contactInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Validate image
    const imageInput = document.getElementById('image');
    if (!imageInput.files.length) {
        alert('Please upload a pet image.');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const petType = formData.get('petType');
    const breed = document.getElementById('breed').value || petType;
    const color = formData.get('color');
    const customColor = formData.get('customColor');
    const finalColor = color === 'other' ? customColor : color;
    const size = formData.get('size');
    const customSize = formData.get('customSize');
    const finalSize = size === 'other' ? customSize : size;
    const dateFound = formData.get('dateFound');
    const location = formData.get('location');
    const contact = phoneDigits;
    const description = formData.get('description');

    // Convert image to base64
    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const petData = {
            petType,
            breed,
            color: finalColor,
            size: finalSize,
            dateFound,
            location,
            contact,
            description,
            image: event.target.result
        };

        // Add new pet
        PetDataManager.addFoundPet(petData);
        alert('Found pet report submitted successfully!');
        window.location.href = 'index.html#found-pets';
    };

    reader.readAsDataURL(imageFile);
}
