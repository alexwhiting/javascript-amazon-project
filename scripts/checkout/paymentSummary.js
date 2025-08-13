import {cart, calculateCartQuantity, calculateCartPrice} from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
  
  let paymentSummaryHTML = '';

  const totalQuantity = calculateCartQuantity();

  const totalPriceCents = calculateCartPrice();

  const totalPrice = formatCurrency(totalPriceCents);

  let shippingCostCents = 0;

  let shippingCost = 0;

  cart.forEach((cartItem) => {
    const deliveryOption = cartItem.deliveryOptionId;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOption) {
        shippingCostCents += option.priceCents;
      }
    });

    shippingCost = formatCurrency(shippingCostCents);
  });

  const totalBeforeTax = formatCurrency(totalPriceCents + shippingCostCents);
  const taxPrice = formatCurrency((totalPriceCents + shippingCostCents) * 0.1);
  const orderTotal = formatCurrency((totalPriceCents + shippingCostCents) * 1.1);

  paymentSummaryHTML +=
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">$${totalPrice}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${shippingCost}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${taxPrice}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${orderTotal}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}

