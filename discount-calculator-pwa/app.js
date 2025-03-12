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
    let paymentDiscount = 0;
    switch (paymentType) {
        case 'bolivares':
            paymentDiscount = 0;
            break;
        case 'efectivo_dolares':
            paymentDiscount = 0.20;
            break;
        case 'zelle':
            paymentDiscount = 0.24;
            break;
        default:
            paymentDiscount = 0;
    }

    // Determine the days difference discount
    let daysDiscount = 0;
    if (daysDifference >= 0 && daysDifference <= 3) {
        daysDiscount = 0.10;
    } else if (daysDifference >= 4 && daysDifference <= 25) {
        daysDiscount = 0.05;
    } else if (daysDifference >= 26) {
        daysDiscount = 0;
    }

    // Calculate the final price
    const finalPrice = originalPrice * (1 - paymentDiscount) * (1 - daysDiscount);

    // Display the result
    document.getElementById('result').innerText = `Final Price: $${finalPrice.toFixed(2)}`;
}