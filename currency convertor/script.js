document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const resultDiv = document.getElementById('result');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    const populateCurrencies = (currencies) => {
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });
    };

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            populateCurrencies(currencies);
        });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const fromCurrencyValue = fromCurrency.value;
        const toCurrencyValue = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrencyValue];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error fetching exchange rate. Please try again.';
            });
    });
});
