let rentalStart = ""
let rentalEnd = ""

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.className = `toast ${type} show`

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

async function confirmRental() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value
  const confirmBtn = document.getElementById("confirmBtn")

  // Show loading state
  confirmBtn.disabled = true
  confirmBtn.innerHTML = `
        <div style="display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite; margin-right: 8px;"></div>
        Processing...
    `

  // Add CSS animation for spinner
  const style = document.createElement("style")
  style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `
  document.head.appendChild(style)

  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  showToast(
    `🎉 Rental Confirmed!\nPayment Method: ${selectedMethod}\nDuration: ${formatDate(rentalStart)} to ${formatDate(rentalEnd)}`,
  )

  // Clear cart and rental dates
  localStorage.removeItem("cart")
  localStorage.removeItem("rentalStart")
  localStorage.removeItem("rentalEnd")

  // Redirect to home after a short delay
  setTimeout(() => {
    window.location.href = "home.html"
  }, 2000)
}

// Check authentication and load rental info
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser")
  if (!loggedUser) {
    window.location.href = "index.html"
    return
  }

  // Get rental dates from localStorage
  rentalStart = localStorage.getItem("rentalStart")
  rentalEnd = localStorage.getItem("rentalEnd")

  if (!rentalStart || !rentalEnd) {
    showToast("Missing rental information. Redirecting to cart...", "error")
    setTimeout(() => {
      window.location.href = "cart.html"
    }, 2000)
    return
  }

  // Display rental duration
  document.getElementById("rentalDuration").textContent = `${formatDate(rentalStart)} to ${formatDate(rentalEnd)}`
})

function logout() {
  localStorage.removeItem("loggedUser")
  localStorage.removeItem("cart")
  localStorage.removeItem("rentalStart")
  localStorage.removeItem("rentalEnd")
  window.location.href = "index.html"
}
