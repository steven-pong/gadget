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
        'first-name', 'last-name', 'address', 'city', 'province', 
        'postal-code', 'email', 'employment-income', 'pension-income', 
        'investment-income', 'other-income', 'rrsp-deduction', 
        'union-dues', 'child-care-expenses', 'support-payments'
    ];

    fields.forEach(field => {
        if (data[field] !== undefined) {
            document.getElementById(field).value = data[field];
        }
    });
}

document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = '';

    for (const [key, value] of data.entries()) {
        const p = document.createElement('p');
        p.textContent = `${key.replace(/-/g, ' ')}: ${value}`;
        summaryContent.appendChild(p);
    }

    document.getElementById('tax-form').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
});
