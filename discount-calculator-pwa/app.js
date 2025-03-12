function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const paymentType = document.getElementById('paymentType').value;
    const deliveryDate = new Date(document.getElementById('deliveryDate').value);
    const paymentDate = new Date(document.getElementById('paymentDate').value);

    if (isNaN(originalPrice) || !paymentType || !deliveryDate || !paymentDate) {
        document.getElementById('result').innerText = 'Please fill all fields correctly.';
        return;
    }

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