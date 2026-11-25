window.addEventListener("click", function (event) {
    const action = event.target.dataset.action;
    if (action !== "plus" && action !== "minus") {
        return;
    }

    const box = event.target.closest("[data-counter-box]");
    if (!box) {
        return;
    }

    const counterEl = box.querySelector("[data-counter]");
    let value = parseInt(counterEl.textContent, 10);

    if (action === "plus") {
        value += 1;
        counterEl.textContent = value;
    } else if (action === "minus") {
        if (value > 1) {
            value -= 1;
            counterEl.textContent = value;
        } else if (event.target.closest("#cart-list")) {
            event.target.closest(".cart-entry").remove();
            refreshCartEmpty();
        }
    }

    if (typeof updateOrderTotal === "function") {
        updateOrderTotal();
    }
});