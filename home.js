function logout() {
  localStorage.removeItem("loggedUser")
  localStorage.removeItem("cart")
  localStorage.removeItem("rentalStart")
  localStorage.removeItem("rentalEnd")
  window.location.href = "index.html"
}

function goToBrowse() {
  window.location.href = "browse.html"
}

// Check authentication
window.addEventListener("load", () => {
  const loggedUser = localStorage.getItem("loggedUser")
  if (!loggedUser) {
    window.location.href = "index.html"
  }
})
