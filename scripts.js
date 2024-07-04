document.getElementById('json-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                prefillForm(data);
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
});

function prefillForm(data) {
    const fields = [
        'first-name', 'last-name', 'sin', 'address', 'city', 'province',
        'postal-code', 'email', 'employment-income', 'pension-income',
        'investment-income', 'other-income', 'rrsp-deduction', 'union-dues',
        'child-care-expenses', 'support-payments'
    ];

    fields.forEach(field => {
        if (data[field] !== undefined) {
            document.getElementById(field).value = data[field];
        }
    });
}
// Update submit handler to gather form data and display summary
document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Function to generate and display summary
    function displaySummary(formData) {
        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = '<h3>Summary</h3>';

        for (const [key, value] of formData.entries()) {
            const p = document.createElement('p');
            p.textContent = `${key.replace(/-/g, ' ')}: ${value}`;
            summaryContent.appendChild(p);
        }

        // Show the summary section
        document.getElementById('tax-form').style.display = 'none';
        document.getElementById('summary').style.display = 'block';
    }

    // Validate SIN (if needed)
    if (!validateSIN()) {
        alert('Invalid SIN. Please enter a valid SIN.');
        return;
    }

    // Gather form data
    const formData = new FormData(event.target);

    // Display summary
    displaySummary(formData);
});

// Function to validate SIN (if needed)
function validateSIN() {
    const sin = document.getElementById('sin').value;
    // Implement SIN validation logic if required
    return true; // Replace with actual validation logic
}


// Function to add T4 slip amounts to employment income
function addT4SlipAmount(amount) {
    const employmentIncomeInput = document.getElementById('employment-income');
    let currentValue = parseFloat(employmentIncomeInput.value);
    currentValue += parseFloat(amount);
    employmentIncomeInput.value = currentValue;
}
