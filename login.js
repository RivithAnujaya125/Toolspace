document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()
  const messageDiv = document.getElementById("loginMessage")

  // Clear previous error
  messageDiv.classList.remove("show")
  messageDiv.textContent = ""

  // Validate credentials
  if ((username === "admin" && password === "admin123") || (username === "customer" && password === "cust123")) {
    localStorage.setItem("loggedUser", username)
    window.location.href = "home.html"
  } else {
    messageDiv.textContent = "Invalid credentials. Please try again."
    messageDiv.classList.add("show")
  }
})

// Check if user is already logged in
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser")
  if (loggedUser) {
    window.location.href = "home.html"
  }
})
