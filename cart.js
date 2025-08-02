const allItems = [
  { id: 1, name: "Electric Drill", price: 1000 },
  { id: 2, name: "Ladder", price: 700 },
  { id: 3, name: "Hammer", price: 300 },
  { id: 4, name: "Chainsaw", price: 2500 },
  { id: 5, name: "Angle Grinder", price: 1800 },
]

let cartItems = []

function loadCart() {
  const cartIds = JSON.parse(localStorage.getItem("cart")) || []
  cartItems = cartIds.map((id) => allItems.find((item) => item.id === id)).filter(Boolean)

  const cartDiv = document.getElementById("cartItems")

  if (cartItems.length === 0) {
    cartDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <button class="btn-secondary" onclick="goToBrowse()" style="margin-top: 20px;">Browse Tools</button>
            </div>
        `
    return
  }

  cartDiv.innerHTML = ""
  cartItems.forEach((item) => {
    const div = document.createElement("div")
    div.className = "cart-item"
    div.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">Rs. ${item.price.toLocaleString()}/day</p>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
        `
    cartDiv.appendChild(div)
  })
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart = cart.filter((itemId) => itemId !== id)
  localStorage.setItem("cart", JSON.stringify(cart))

  const item = allItems.find((item) => item.id === id)
  showToast(`${item.name} removed from cart`)

  loadCart()
  calculateTotal()
}

function clearCart() {
  localStorage.removeItem("cart")
  cartItems = []
  loadCart()
  calculateTotal()
  showToast("Cart cleared")
}

function calculateTotal() {
  const startDate = document.getElementById("startDate").value
  const endDate = document.getElementById("endDate").value
  const summaryDiv = document.getElementById("rentalSummary")

  if (!startDate || !endDate || cartItems.length === 0) {
    summaryDiv.style.display = "none"
    return
  }

  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

  if (days <= 0) {
    summaryDiv.style.display = "none"
    return
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const total = subtotal * days

  document.getElementById("durationText").textContent = `${days} day${days !== 1 ? "s" : ""}`
  document.getElementById("itemCount").textContent = cartItems.length
  document.getElementById("totalPrice").textContent = total.toLocaleString()

  summaryDiv.style.display = "block"
}

function checkout() {
  const startDate = document.getElementById("startDate").value
  const endDate = document.getElementById("endDate").value

  if (!startDate || !endDate) {
    showToast("Please select both start and end dates.", "error")
    return
  }

  if (cartItems.length === 0) {
    showToast("Please add items to your cart before checkout.", "error")
    return
  }

  // Store dates temporarily before payment
  localStorage.setItem("rentalStart", startDate)
  localStorage.setItem("rentalEnd", endDate)

  // Redirect to payment page
  window.location.href = "payment.html"
}

function goToBrowse() {
  window.location.href = "browse.html"
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.className = `toast ${type} show`

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Set minimum date to today
function setMinDate() {
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("startDate").min = today
  document.getElementById("endDate").min = today
}

// Check authentication and load cart
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser")
  if (!loggedUser) {
    window.location.href = "index.html"
    return
  }

  setMinDate()
  loadCart()
})

function logout() {
  localStorage.removeItem("loggedUser")
  localStorage.removeItem("cart")
  localStorage.removeItem("rentalStart")
  localStorage.removeItem("rentalEnd")
  window.location.href = "index.html"
}
