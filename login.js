document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageDiv = document.getElementById("loginMessage");

  // Clear previous error
  messageDiv.classList.remove("show");
  messageDiv.textContent = "";

  // Validate credentials
  if ((username === "admin" && password === "admin123") || (username === "customer" && password === "cust123")) {
    // Save user info in localStorage
    const userType = username === "admin" ? "admin" : "customer";
    localStorage.setItem("loggedUser", username);
    localStorage.setItem("userType", userType);

    // Redirect based on user type
    redirectAfterLogin({ user_type: userType });
  } else {
    messageDiv.textContent = "Invalid credentials. Please try again.";
    messageDiv.classList.add("show");
  }
});

// Check if user is already logged in
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser");
  const userType = localStorage.getItem("userType");

  if (loggedUser && userType) {
    redirectAfterLogin({ user_type: userType });
  }
});

// Redirect logic
function redirectAfterLogin(user) {
  if (user.user_type === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "home.html";
  }
}
