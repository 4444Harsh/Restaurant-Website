// Reservation Button Function
function reserveTable() {
    alert('Thank you for choosing us! Your reservation request has been received.');
}

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        validateForm();
    });
});

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (message === "") {
        alert("Please enter a message.");
        return false;
    }

    alert("Thank you for contacting us!");
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

let cart = [];
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
}
let total = 0;



// Open Cart
function openCart() {
    document.getElementById('cart-modal').style.display = 'flex';
    displayCartItems();
}

// Close Cart
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Add Item to Cart
function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
    displayCartItems();
    alert(`${itemName} has been added to your cart!`)
}
function increaseQuantity(itemName){
    const item = cart.find(item => item.name === itemName);
    if(item){
        item.quantity++;
        localStorage.setItem("cart",JSON.stringify(cart))
        updateCartCount();
        updateCartTotal();
        displayCartItems();
    }
}
function decreaseQuantity(itemName){
    const item = cart.find(item => item.name === itemName);
    if(item){
        item.quantity--;
        localStorage.setItem("cart",JSON.stringify(cart))
        if(item.quantity === 0){
            cart = cart.filter(cartItem => cartItem.name !== itemName);
        }
        updateCartCount();
        updateCartTotal();
        displayCartItems();
    }
}
function removeFromCart(itemName){
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if(itemIndex !== -1){
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0){
            cart.splice(itemIndex, 1);
            console.log(cart)
        }
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    updateCartCount();
    updateCartTotal();
    displayCartItems();
    alert(`${itemName} has been removed from your cart.`);
}
// Display Cart Items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    if(cart.length === 0){
        cartItemsDiv.innerHTML = '<p>Your cart is Empty!</p>';
        return;
    }
    cart.forEach(item => {
        console.log(item)
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ${item.price.toFixed(2)} x ${item.quantity}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });
}

// Update Cart Count
function updateCartCount() {
    let itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    document.getElementById('cart-count').innerText = itemsCount;
}
updateCartCount();

// Update Cart Total
function updateCartTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `${total.toFixed(2)} Rs`;
}
updateCartTotal()

// Checkout
function checkout() {
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'flex';
}

// Close Checkout Form
function closeCheckout() {
    document.getElementById('checkout-form').style.display = 'none';
}

function placeOrder() {
   localStorage.removeItem("cart");
   cart = [];
}
