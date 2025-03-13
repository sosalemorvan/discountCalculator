function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const paymentType = document.getElementById('paymentType').value;
    const deliveryDateInput = document.getElementById('deliveryDate').value;
    const paymentDateInput = document.getElementById('paymentDate').value;

    if (isNaN(originalPrice) || !paymentType || !deliveryDateInput || !paymentDateInput) {
        document.getElementById('result').innerText = 'Please fill all fields correctly.';
        return;
    }

    // Parse the date inputs (dd/mm/aaaa)
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    };

    const deliveryDate = parseDate(deliveryDateInput);
    const paymentDate = parseDate(paymentDateInput);

    // Calculate the difference in days between payment and delivery
    const timeDifference = paymentDate - deliveryDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Determine the payment type discount
    let paymentDiscountRate = 0;
    let paymentDiscountName = '';
    switch (paymentType) {
        case 'bolivares':
            paymentDiscountRate = 0;
            paymentDiscountName = 'Bolivares (0%)';
            break;
        case 'efectivo_dolares':
            paymentDiscountRate = 0.20;
            paymentDiscountName = 'Efectivo Dolares (20%)';
            break;
        case 'zelle':
            paymentDiscountRate = 0.24;
            paymentDiscountName = 'Zelle (24%)';
            break;
        default:
            paymentDiscountRate = 0;
            paymentDiscountName = 'None';
    }

    // Determine the days difference discount
    let daysDiscountRate = 0;
    let daysDiscountName = '';
    if (daysDifference >= 0 && daysDifference <= 3) {
        daysDiscountRate = 0.10;
        daysDiscountName = '0-3 Days (10%)';
    } else if (daysDifference >= 4 && daysDifference <= 25) {
        daysDiscountRate = 0.05;
        daysDiscountName = '4-25 Days (5%)';
    } else if (daysDifference >= 26) {
        daysDiscountRate = 0;
        daysDiscountName = '26+ Days (0%)';
    }

    // Calculate the discount amounts
    const paymentDiscountAmount = originalPrice * paymentDiscountRate;
    const daysDiscountAmount = (originalPrice - paymentDiscountAmount) * daysDiscountRate;

    // Calculate the final price
    const finalPrice = originalPrice - paymentDiscountAmount - daysDiscountAmount;

    // Display the result and discount details
    const resultText = `
        Original Price: $${originalPrice.toFixed(2)}
        <br>
        ${paymentDiscountName}: -$${paymentDiscountAmount.toFixed(2)}
        <br>
        ${daysDiscountName}: -$${daysDiscountAmount.toFixed(2)}
        <br>
        <strong>Final Price: $${finalPrice.toFixed(2)}</strong>
    `;
    document.getElementById('result').innerHTML = resultText;
}

// Initialize Flatpickr for date inputs
flatpickr("#deliveryDate", {
    dateFormat: "d/m/Y", // Set the date format to dd/mm/aaaa
    allowInput: true, // Allow manual input
});

flatpickr("#paymentDate", {
    dateFormat: "d/m/Y", // Set the date format to dd/mm/aaaa
    allowInput: true, // Allow manual input
});

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
  
        // Listen for updates to the service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
  
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New content is available; prompt the user to refresh
                showUpdateAlert();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
  
  // Function to show an update alert
  function showUpdateAlert() {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '20px';
    alertBox.style.right = '20px';
    alertBox.style.padding = '10px';
    alertBox.style.backgroundColor = '#28a745';
    alertBox.style.color = 'white';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    alertBox.style.zIndex = '1000';
    alertBox.innerHTML = `
      A new version is available! 
      <button onclick="window.location.reload()" style="margin-left: 10px; padding: 5px 10px; background: white; color: #28a745; border: none; border-radius: 3px; cursor: pointer;">
        Refresh
      </button>
    `;
    document.body.appendChild(alertBox);
  }