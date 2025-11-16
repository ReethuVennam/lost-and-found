// ========== Main Script ========== 

// Breed data for different pet types
const breedData = {
    dog: ['Labrador', 'German Shepherd', 'Beagle', 'Golden Retriever', 'Bulldog', 'Poodle', 'Boxer', 'Husky'],
    cat: ['Persian', 'Siamese', 'Bengal', 'Maine Coon', 'Ragdoll', 'British Shorthair', 'Scottish Fold', 'Tabby']
};

// ========== Hamburger Menu Toggle ========== 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ========== Pet Data Management ========== 
const PetDataManager = {
    // Get all lost pets from localStorage
    getLostPets: function() {
        const data = localStorage.getItem('lostPets');
        return data ? JSON.parse(data) : [];
    },

    // Get all found pets from localStorage
    getFoundPets: function() {
        const data = localStorage.getItem('foundPets');
        return data ? JSON.parse(data) : [];
    },

    // Add a new lost pet
    addLostPet: function(petData) {
        const lostPets = this.getLostPets();
        petData.id = Date.now();
        lostPets.push(petData);
        localStorage.setItem('lostPets', JSON.stringify(lostPets));
        return petData;
    },

    // Add a new found pet
    addFoundPet: function(petData) {
        const foundPets = this.getFoundPets();
        petData.id = Date.now();
        foundPets.push(petData);
        localStorage.setItem('foundPets', JSON.stringify(foundPets));
        return petData;
    }
    
};

// ========== Display Pet Cards ========== 
function displayPetCards() {
    displayLostPets();
    displayFoundPets();
}

// ========== Search & Filter State and Helpers ==========
let searchQuery = '';
let typeFilter = 'all';

function initFilters() {
    const searchInput = document.getElementById('search-input');
    const typeSelect = document.getElementById('filter-type');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            displayPetCards();
        });
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', (e) => {
            typeFilter = e.target.value;
            displayPetCards();
        });
    }
}

function matchesFilters(pet) {
    if (!pet) return false;

    // Type filter (petType may be undefined for some entries)
    if (typeFilter && typeFilter !== 'all') {
        if (!pet.petType || pet.petType.toLowerCase() !== typeFilter.toLowerCase()) return false;
    }

    if (!searchQuery) return true;

    const fields = [pet.petName, pet.breed, pet.color, pet.location, pet.description, pet.tagId, pet.contact];
    return fields.some(f => f && f.toString().toLowerCase().includes(searchQuery));
}

function displayLostPets() {
    const lostPetsGrid = document.getElementById('lost-pets-grid');
    const lostEmpty = document.getElementById('lost-empty');

    if (!lostPetsGrid) return;

    const lostPets = PetDataManager.getLostPets().filter(matchesFilters);

    if (lostPets.length === 0) {
        lostPetsGrid.innerHTML = '';
        lostEmpty.style.display = 'block';
        return;
    }

    lostEmpty.style.display = 'none';
    
    lostPetsGrid.innerHTML = lostPets.map(pet => createPetCard(pet, 'lost')).join('');
}

function displayFoundPets() {
    const foundPetsGrid = document.getElementById('found-pets-grid');
    const foundEmpty = document.getElementById('found-empty');

    if (!foundPetsGrid) return;

    const foundPets = PetDataManager.getFoundPets().filter(matchesFilters);

    if (foundPets.length === 0) {
        foundPetsGrid.innerHTML = '';
        foundEmpty.style.display = 'block';
        return;
    }

    foundEmpty.style.display = 'none';
    
    foundPetsGrid.innerHTML = foundPets.map(pet => createPetCard(pet, 'found')).join('');
}

function createPetCard(pet, type) {
    const dateLabel = type === 'lost' ? 'Date Lost' : 'Date Found';
    const locationLabel = type === 'lost' ? 'Lost' : 'Found';
    const truncatedDescription = truncateDescription(pet.description);

    return `
        <div class="pet-card">
            <img src="${pet.image}" alt="${pet.petName || 'Pet'}" class="pet-card-image">
            <div class="pet-card-content">
                <h3>${pet.petName || 'Found Pet'}</h3>
                <div class="pet-info">
                    <div class="info-item">
                        <i class="fas fa-${pet.petType === 'dog' ? 'dog' : pet.petType === 'cat' ? 'cat' : 'paw'}"></i>
                        <span>${pet.breed || pet.petType}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-palette"></i>
                        <span>${pet.color}</span>
                    </div>
                </div>
                <div class="pet-info">
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${dateLabel}: ${pet.dateLost || pet.dateFound}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${locationLabel}: ${(pet.location || '').substring(0, 15)}...</span>
                    </div>
                </div>
                <p class="pet-description">${truncatedDescription}</p>
                <div class="pet-info" style="margin-top: 0.5rem;">
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${pet.contact}</span>
                    </div>
                </div>
                
            </div>
        </div>
    `;
}

// ========== Edit / Delete Handlers ==========
// Edit/Delete features removed — UI no longer exposes these actions.

function truncateDescription(description, lines = 2) {
    if (!description) return '';
    const descLines = description.split('\n');
    if (descLines.length > lines) {
        return descLines.slice(0, lines).join('\n') + '...';
    }
    return description;
}

// ========== Display on Page Load ========== 
document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    displayPetCards();
});

// Add sample data for demo purposes (optional - comment out if not needed)
function addSampleData() {
    const lostPets = PetDataManager.getLostPets();
    if (lostPets.length === 0) {
        // Add sample lost pets
        PetDataManager.addLostPet({
            petName: 'Max',
            petType: 'dog',
            breed: 'Golden Retriever',
            color: 'Golden',
            size: 'Large',
            gender: 'Male',
            tagId: '123456',
            dateLost: '2025-11-10',
            location: 'Central Park, New York',
            description: 'Missing since last week. Very friendly and responds to "Max". Has a red collar with a bell.',
            contact: '5551234567',
            image: 'https://images.unsplash.com/photo-1633722715463-d30628519e8f?w=400&h=250&fit=crop'
        });

        PetDataManager.addLostPet({
            petName: 'Whiskers',
            petType: 'cat',
            breed: 'Persian',
            color: 'White',
            size: 'Small',
            gender: 'Female',
            tagId: '',
            dateLost: '2025-11-12',
            location: 'Downtown District',
            description: 'Orange eyes, very shy. Last seen near the grocery store on 5th Avenue.',
            contact: '5559876543',
            image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=250&fit=crop'
        });
    }

    const foundPets = PetDataManager.getFoundPets();
    if (foundPets.length === 0) {
        // Add sample found pets
        PetDataManager.addFoundPet({
            petType: 'dog',
            breed: 'Beagle',
            color: 'Brown',
            size: 'Medium',
            dateFound: '2025-11-11',
            location: 'Near the riverside',
            description: 'Found a friendly beagle with no collar. Looking for its owner. Loves treats!',
            contact: '5551119999',
            image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=250&fit=crop'
        });
    }
}

// Uncomment the line below to add sample data on first load
// addSampleData();
