function validateRegistrationForm(event) {
    event.preventDefault() // Prevent default form submission
  
    const usernameInput = document.getElementById("regUsername")
    const emailInput = document.getElementById("regEmail")
    const passwordInput = document.getElementById("regPassword")
    const confirmPasswordInput = document.getElementById("regConfirmPassword")
  
    const usernameError = document.getElementById("regUsernameError")
    const emailError = document.getElementById("regEmailError")
    const passwordError = document.getElementById("regPasswordError")
    const confirmPasswordError = document.getElementById("regConfirmPasswordError")
    const registerMessage = document.getElementById("registerMessage")
  
    let isValid = true
  
    // Clear previous messages
    usernameError.textContent = ""
    emailError.textContent = ""
    passwordError.textContent = ""
    confirmPasswordError.textContent = ""
    registerMessage.classList.remove("show", "error", "success")
    registerMessage.textContent = ""
  
    // Username validation
    if (usernameInput.value.trim() === "") {
      usernameError.textContent = "Username is required."
      usernameError.classList.add("show")
      isValid = false
    } else {
      usernameError.classList.remove("show")
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Email is required."
      emailError.classList.add("show")
      isValid = false
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address."
      emailError.classList.add("show")
      isValid = false
    } else {
      emailError.classList.remove("show")
    }
  
    // Password validation
    if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters long."
      passwordError.classList.add("show")
      isValid = false
    } else {
      passwordError.classList.remove("show")
    }
  
    // Confirm Password validation
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match."
      confirmPasswordError.classList.add("show")
      isValid = false
    } else {
      confirmPasswordError.classList.remove("show")
    }
  
    if (isValid) {
      // Simulate registration
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []
  
      // Check if username or email already exists
      const userExists = registeredUsers.some(
        (user) => user.username === usernameInput.value || user.email === emailInput.value,
      )
  
      if (userExists) {
        registerMessage.textContent = "Username or Email already registered."
        registerMessage.classList.add("show", "error")
        return
      }
  
      const newUser = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value, // In a real app, hash this password!
      }
      registeredUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
  
      registerMessage.textContent = "Registration successful! Redirecting to login..."
      registerMessage.classList.add("show", "success")
  
      // Clear form fields
      usernameInput.value = ""
      emailInput.value = ""
      passwordInput.value = ""
      confirmPasswordInput.value = ""
  
      setTimeout(() => {
        window.location.href = "login.html"
      }, 1500)
    }
  }
  
  // Attach event listener to the form
  document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm")
    if (registrationForm) {
      registrationForm.addEventListener("submit", validateRegistrationForm)
    }
  })
  