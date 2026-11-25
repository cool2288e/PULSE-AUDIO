const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const orderTotal = document.getElementById("order-total");
const orderForm = document.getElementById("order-form");
const lastNameInput = document.getElementById("last-name-input");
const firstNameInput = document.getElementById("first-name-input");
const phoneInput = document.getElementById("phone-input");
const cityInput = document.getElementById("city-input");
const orderFeedback = document.getElementById("order-feedback");

window.addEventListener("click", function (event) {
    const addBtn = event.target.closest("[data-add-cart]");
    if (!addBtn) {
        return;
    }

    const card = addBtn.closest(".item-card");
    const product = {
        code: card.dataset.code,
        name: card.querySelector(".item-name").textContent,
        price: parseInt(card.querySelector("[data-price]").dataset.price, 10),
        qty: parseInt(card.querySelector("[data-counter]").textContent, 10)
    };

    const existingEntry = cartList.querySelector(`[data-cart-code="${product.code}"]`);
    if (existingEntry) {
        const qtyEl = existingEntry.querySelector("[data-counter]");
        qtyEl.textContent = parseInt(qtyEl.textContent, 10) + product.qty;
    } else {
        const entryHTML = `
            <div class="cart-entry" data-cart-code="${product.code}" data-price="${product.price}">
                <div>
                    <div class="cart-entry-title">${product.name}</div>
                    <div class="cart-entry-price">${product.price} грн</div>
                </div>
                <div class="counter-box" data-counter-box>
                    <button type="button" class="counter-btn" data-action="minus">-</button>
                    <span class="counter-value" data-counter>${product.qty}</span>
                    <button type="button" class="counter-btn" data-action="plus">+</button>
                </div>
            </div>
        `;
        cartList.insertAdjacentHTML("beforeend", entryHTML);
    }

    card.querySelector("[data-counter]").textContent = "1";
    orderFeedback.classList.add("hidden");
    refreshCartEmpty();
    updateOrderTotal();
});

function refreshCartEmpty() {
    cartEmpty.classList.toggle("hidden", cartList.children.length > 0);
}

function updateOrderTotal() {
    const entries = cartList.querySelectorAll(".cart-entry");
    let total = 0;

    entries.forEach(function (entry) {
        const price = parseInt(entry.dataset.price, 10);
        const qty = parseInt(entry.querySelector("[data-counter]").textContent, 10);
        total += price * qty;
    });

    orderTotal.textContent = `${total} грн`;
}

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (cartList.children.length === 0) {
        orderFeedback.textContent = "Спочатку додайте товар у кошик";
        orderFeedback.classList.remove("hidden");
        return;
    }

    const lastName = lastNameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const city = cityInput.value.trim();
    const totalSum = orderTotal.textContent;

    orderFeedback.textContent = `Замовлення на суму ${totalSum} оформлено для ${lastName} ${firstName} (${city}). Зв'яжемося за номером ${phone}.`;
    orderFeedback.classList.remove("hidden");

    cartList.innerHTML = "";
    orderForm.reset();
    refreshCartEmpty();
    updateOrderTotal();
});