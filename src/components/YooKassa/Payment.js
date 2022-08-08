const YooKassa = require('yookassa');

const yooKassa = new YooKassa({
  shopId: '912799',
  secretKey: 'test_garbo-TWSpOPtuQuvy8YjdAgWUPa0DFt10VJNPmnTJM'
});

const payment = await yooKassa.createPayment({
  amount: {
    value: "2.00",
    currency: "RUB"
  },
  payment_method_data: {
    type: "bank_card"
  },
  confirmation: {
    type: "redirect",
    return_url: "https://www.merchant-website.com/return_url"
  },
  description: "Заказ №72"
}, "12");

