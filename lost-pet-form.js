// ========== Lost Pet Form Script ========== 

let editingPetId = null;
let isEditMode = false;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lost-pet-form');

    if (!form) return;

    // Check if editing
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit')) {
        editingPetId = parseInt(urlParams.get('edit'));
        isEditMode = true;
        loadPetDataForEditing();
        document.querySelector('.form-wrapper h1').textContent = 'Edit Lost Pet Report';
        document.querySelector('.form-subtitle').textContent = 'Update pet information';
    }

    // Initialize dynamic fields
    initializeConditionalFields();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLostPetSubmission();
    });

    // Image preview
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', handleImagePreview);
    }
});

// ========== Load Pet Data for Editing ========== 
function loadPetDataForEditing() {
    const petData = sessionStorage.getItem('editingPetData');
    if (!petData) return;

    const pet = JSON.parse(petData);
    
    // Populate form fields
    document.getElementById('pet-name').value = pet.petName || '';
    document.getElementById('pet-type').value = pet.petType || '';
    handlePetTypeChange(); // Trigger breed dropdown
    document.getElementById('breed').value = pet.breed || '';
    
    if (pet.color === 'other' || !['black', 'white', 'brown', 'golden', 'gray'].includes(pet.color)) {
        document.getElementById('color').value = 'other';
        handleColorChange();
        document.getElementById('custom-color').value = pet.color || '';
    } else {
        document.getElementById('color').value = pet.color || '';
    }

    if (pet.size === 'other' || !['small', 'medium', 'large'].includes(pet.size)) {
        document.getElementById('size').value = 'other';
        handleSizeChange();
        document.getElementById('custom-size').value = pet.size || '';
    } else {
        document.getElementById('size').value = pet.size || '';
    }

    document.getElementById('gender').value = pet.gender || '';
    document.getElementById('tag-id').value = pet.tagId || '';
    document.getElementById('date-lost').value = pet.dateLost || '';
    document.getElementById('location').value = pet.location || '';
    document.getElementById('contact').value = pet.contact || '';
    document.getElementById('description').value = pet.description || '';

    // Show image preview
    if (pet.image) {
        document.getElementById('image-preview').innerHTML = `<img src="${pet.image}" alt="Pet Preview">`;
    }

    // Clean up session storage
    sessionStorage.removeItem('editingPetData');
    sessionStorage.removeItem('editingPetId');
    sessionStorage.removeItem('editingPetType');
}

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

// ========== Handle Lost Pet Submission ========== 
function handleLostPetSubmission() {
    const form = document.getElementById('lost-pet-form');
    const contactInput = document.getElementById('contact');

    // Validate phone number before submission
    const phoneDigits = contactInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Validate image (only if not editing with existing image)
    const imageInput = document.getElementById('image');
    if (!isEditMode && !imageInput.files.length) {
        alert('Please upload a pet image.');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const petName = formData.get('petName');
    const petType = formData.get('petType');
    const breed = document.getElementById('breed').value || petType;
    const color = formData.get('color');
    const customColor = formData.get('customColor');
    const finalColor = color === 'other' ? customColor : color;
    const size = formData.get('size');
    const customSize = formData.get('customSize');
    const finalSize = size === 'other' ? customSize : size;
    const gender = formData.get('gender');
    const tagId = formData.get('tagId');
    const dateLost = formData.get('dateLost');
    const location = formData.get('location');
    const contact = phoneDigits;
    const description = formData.get('description');

    // If editing and no new image, use existing one
    if (isEditMode && !imageInput.files.length) {
        const existingPet = PetDataManager.getLostPetById(editingPetId);
        const petData = {
            petName,
            petType,
            breed,
            color: finalColor,
            size: finalSize,
            gender,
            tagId,
            dateLost,
            location,
            contact,
            description,
            image: existingPet.image
        };

        PetDataManager.updateLostPet(editingPetId, petData);
        alert('Lost pet report updated successfully!');
        window.location.href = 'index.html#lost-pets';
        return;
    }

    // Convert image to base64 (new image or edit with new image)
    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const petData = {
            petName,
            petType,
            breed,
            color: finalColor,
            size: finalSize,
            gender,
            tagId,
            dateLost,
            location,
            contact,
            description,
            image: event.target.result
        };

        if (isEditMode) {
            // Update existing pet
            PetDataManager.updateLostPet(editingPetId, petData);
            alert('Lost pet report updated successfully!');
        } else {
            // Add new pet
            PetDataManager.addLostPet(petData);
            alert('Lost pet report submitted successfully!');
        }

        window.location.href = 'index.html#lost-pets';
    };

    reader.readAsDataURL(imageFile);
}
