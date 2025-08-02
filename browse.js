const tools = [
  { id: 1, name: "Electric Drill", price: 1000, icon: "🔌", category: "Power Tools" },
  { id: 2, name: "Ladder", price: 700, icon: "🪜", category: "Access Equipment" },
  { id: 3, name: "Hammer", price: 300, icon: "🔨", category: "Hand Tools" },
  { id: 4, name: "Chainsaw", price: 2500, icon: "🪚", category: "Cutting Tools" },
  { id: 5, name: "Angle Grinder", price: 1800, icon: "⚡", category: "Power Tools" },
]

let cart = []

function loadTools() {
  const grid = document.getElementById("toolsGrid")
  grid.innerHTML = ""

  tools.forEach((tool) => {
    const isInCart = cart.includes(tool.id)

    const toolCard = document.createElement("div")
    toolCard.className = "tool-card"
    toolCard.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <div class="category-badge" style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-bottom: 15px; display: inline-block;">${tool.category}</div>
            <p class="tool-description">Professional grade ${tool.name.toLowerCase()} available for daily rental</p>
            <div class="tool-footer">
                <div>
                    <span class="price">Rs. ${tool.price.toLocaleString()}</span>
                    <span style="color: #6b7280; font-size: 14px;">/day</span>
                </div>
                <button class="btn-secondary ${isInCart ? "disabled" : ""}" 
                        onclick="addToCart(${tool.id})" 
                        ${isInCart ? "disabled" : ""}>
                    ${isInCart ? "In Cart" : "Reserve"}
                </button>
            </div>
        `
    grid.appendChild(toolCard)
  })
}

function addToCart(toolId) {
  if (!cart.includes(toolId)) {
    cart.push(toolId)
    localStorage.setItem("cart", JSON.stringify(cart))

    const tool = tools.find((t) => t.id === toolId)
    showToast(`${tool.name} added to cart!`)

    updateCartCount()
    loadTools() // Refresh to show updated button states
  } else {
    showToast("Item already in cart.", "error")
  }
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length
}

function goToCart() {
  window.location.href = "cart.html"
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.className = `toast ${type} show`

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Check authentication and load cart
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser")
  if (!loggedUser) {
    window.location.href = "index.html"
    return
  }

  // Load cart from localStorage
  cart = JSON.parse(localStorage.getItem("cart")) || []
  updateCartCount()
  loadTools()
})

function logout() {
  localStorage.removeItem("loggedUser")
  localStorage.removeItem("cart")
  localStorage.removeItem("rentalStart")
  localStorage.removeItem("rentalEnd")
  window.location.href = "index.html"
}
