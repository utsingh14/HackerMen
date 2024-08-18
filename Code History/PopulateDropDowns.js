document.addEventListener('DOMContentLoaded', () => {
    // Function to populate states dropdown
    async function populateStates() {
        const response = await fetch('http://localhost:3000/states');
        const states = await response.json();
        const stateSelect = document.getElementById('state');
        
        stateSelect.innerHTML = '<option value="">Select a state</option>'; // Default option
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.state;
            option.textContent = state.state;
            stateSelect.appendChild(option);
        });
    }

    // Function to populate cities dropdown based on selected state
    async function populateCities(state) {
        const response = await fetch(`http://localhost:3000/cities/${state}`);
        const cities = await response.json();
        const citySelect = document.getElementById('city');

        citySelect.innerHTML = '<option value="">Select a city</option>'; // Default option
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.city;
            option.textContent = city.city;
            citySelect.appendChild(option);
        });
    }

    // Fetch and populate states on page load
    populateStates();

    // Event listener to populate cities when a state is selected
    document.getElementById('state').addEventListener('change', (event) => {
        const selectedState = event.target.value;
        if (selectedState) {
            populateCities(selectedState);
        } else {
            // Clear cities dropdown if no state is selected
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = '<option value="">Select a city</option>';
        }
    });
});
