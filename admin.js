// Load all users (mocked or from localStorage)
function viewUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [
      { username: "admin", role: "Admin", email: "admin@toolspace.com" },
      { username: "customer", role: "Customer", email: "customer@toolspace.com" }
    ];
  
    let html = "<h2>User Management</h2><table><tr><th>Username</th><th>Email</th><th>Role</th></tr>";
    users.forEach(user => {
      html += `<tr><td>${user.username}</td><td>${user.email}</td><td>${user.role}</td></tr>`;
    });
    html += "</table>";
  
    document.getElementById("admin-content").innerHTML = html;
  }
  
  // Load all items (mocked)
  function viewItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [
      { name: "Drill Machine", category: "Power Tool", stock: 10 },
      { name: "Hammer", category: "Hand Tool", stock: 25 }
    ];
  
    let html = "<h2>Item Management</h2><table><tr><th>Name</th><th>Category</th><th>Stock</th></tr>";
    items.forEach(item => {
      html += `<tr><td>${item.name}</td><td>${item.category}</td><td>${item.stock}</td></tr>`;
    });
    html += "</table>";
  
    document.getElementById("admin-content").innerHTML = html;
  }
  
  // Load all rentals (mocked)
  function viewRentals() {
    const rentals = JSON.parse(localStorage.getItem("rentals")) || [
      { customer: "customer", item: "Drill Machine", status: "Returned" },
      { customer: "customer", item: "Hammer", status: "Ongoing" }
    ];
  
    let html = "<h2>Rental Management</h2><table><tr><th>Customer</th><th>Item</th><th>Status</th></tr>";
    rentals.forEach(rental => {
      html += `<tr><td>${rental.customer}</td><td>${rental.item}</td><td>${rental.status}</td></tr>`;
    });
    html += "</table>";
  
    document.getElementById("admin-content").innerHTML = html;
  }
  
  // Logout and clear session
  function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userType");
    window.location.href = "login.html";
  }
  