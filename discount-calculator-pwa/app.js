function calculateDiscount() {
    const originalPrice = parseFloat(document.getElementById('originalPrice').value);
    const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);

    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        document.getElementById('result').innerText = 'Por favor ingresa valores validos';
        return
    }

    const discountAmount = (originalPrice*discountPercentage)/100;
    const finalPrice = originalPrice - discountAmount

    document.getElementById('result').innerText = `Precio Final: $${finalPrice.toFixed(2)}`;
}