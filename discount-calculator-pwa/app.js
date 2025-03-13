// Initialize Flatpickr for date inputs
flatpickr("#deliveryDate", {
  dateFormat: "d/m/Y",
  allowInput: true,
});

flatpickr("#paymentDate", {
  dateFormat: "d/m/Y",
  allowInput: true,
});

flatpickr("#reverseDeliveryDate", {
  dateFormat: "d/m/Y",
  allowInput: true,
});

flatpickr("#reversePaymentDate", {
  dateFormat: "d/m/Y",
  allowInput: true,
});

// Tab Switching Function
function switchTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach((tab) => {
      tab.classList.remove('active');
  });

  // Show the selected tab content
  document.getElementById(tabName).classList.add('active');

  // Update tab button styles
  document.querySelectorAll('.tab-button').forEach((button) => {
      button.classList.remove('active');
  });
  document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Discount Calculator Logic
function calculateDiscount() {
  const originalPrice = parseFloat(document.getElementById('originalPrice').value);
  const paymentType = document.getElementById('paymentType').value;
  const deliveryDateInput = document.getElementById('deliveryDate').value;
  const paymentDateInput = document.getElementById('paymentDate').value;

  if (isNaN(originalPrice) || !paymentType || !deliveryDateInput || !paymentDateInput) {
      document.getElementById('result').innerText = 'Por favor, complete todos los campos correctamente.';
      return;
  }

  // Parse the date inputs (dd/mm/aaaa)
  const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day);
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
          paymentDiscountName = 'Bolívares (0%)';
          break;
      case 'efectivo_dolares':
          paymentDiscountRate = 0.20;
          paymentDiscountName = 'Efectivo Dólares (20%)';
          break;
      case 'zelle':
          paymentDiscountRate = 0.24;
          paymentDiscountName = 'Zelle (24%)';
          break;
      default:
          paymentDiscountRate = 0;
          paymentDiscountName = 'Ninguno';
  }

  // Determine the days difference discount
  let daysDiscountRate = 0;
  let daysDiscountName = '';
  if (daysDifference >= 0 && daysDifference <= 3) {
      daysDiscountRate = 0.10;
      daysDiscountName = '0-3 Días (10%)';
  } else if (daysDifference >= 4 && daysDifference <= 25) {
      daysDiscountRate = 0.05;
      daysDiscountName = '4-25 Días (5%)';
  } else if (daysDifference >= 26) {
      daysDiscountRate = 0;
      daysDiscountName = '26+ Días (0%)';
  }

  // Calculate the discount amounts
  const paymentDiscountAmount = originalPrice * paymentDiscountRate;
  const daysDiscountAmount = (originalPrice - paymentDiscountAmount) * daysDiscountRate;

  // Calculate the final price
  const finalPrice = originalPrice - paymentDiscountAmount - daysDiscountAmount;

  // Display the result and discount details
  const resultText = `
      Precio Original: $${originalPrice.toFixed(2)}
      <br>
      ${paymentDiscountName}: -$${paymentDiscountAmount.toFixed(2)}
      <br>
      ${daysDiscountName}: -$${daysDiscountAmount.toFixed(2)}
      <br>
      <strong>Precio Final: $${finalPrice.toFixed(2)}</strong>
  `;
  document.getElementById('result').innerHTML = resultText;
}

// Reverse Calculator Logic
function calculateReverse() {
  const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
  const paymentType = document.getElementById('reversePaymentType').value;
  const deliveryDateInput = document.getElementById('reverseDeliveryDate').value;
  const paymentDateInput = document.getElementById('reversePaymentDate').value;

  if (isNaN(paymentAmount) || !paymentType || !deliveryDateInput || !paymentDateInput) {
      document.getElementById('reverseResult').innerText = 'Por favor, complete todos los campos correctamente.';
      return;
  }

  // Parse the date inputs (dd/mm/aaaa)
  const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(year, month - 1, day);
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
          paymentDiscountName = 'Bolívares (0%)';
          break;
      case 'efectivo_dolares':
          paymentDiscountRate = 0.20;
          paymentDiscountName = 'Efectivo Dólares (20%)';
          break;
      case 'zelle':
          paymentDiscountRate = 0.24;
          paymentDiscountName = 'Zelle (24%)';
          break;
      default:
          paymentDiscountRate = 0;
          paymentDiscountName = 'Ninguno';
  }

  // Determine the days difference discount
  let daysDiscountRate = 0;
  let daysDiscountName = '';
  if (daysDifference >= 0 && daysDifference <= 3) {
      daysDiscountRate = 0.10;
      daysDiscountName = '0-3 Días (10%)';
  } else if (daysDifference >= 4 && daysDifference <= 25) {
      daysDiscountRate = 0.05;
      daysDiscountName = '4-25 Días (5%)';
  } else if (daysDifference >= 26) {
      daysDiscountRate = 0;
      daysDiscountName = '26+ Días (0%)';
  }

  // Calculate the initial amount
  const initialAmount = paymentAmount / (1 - paymentDiscountRate) / (1 - daysDiscountRate);

  // Display the result and discount details
  const resultText = `
      Monto del Pago: $${paymentAmount.toFixed(2)}
      <br>
      ${paymentDiscountName}: ${(paymentDiscountRate * 100).toFixed(0)}%
      <br>
      ${daysDiscountName}: ${(daysDiscountRate * 100).toFixed(0)}%
      <br>
      <strong>Monto Inicial: $${initialAmount.toFixed(2)}</strong>
  `;
  document.getElementById('reverseResult').innerHTML = resultText;
}