// Global variables
let currentUser = null

// DOM elements
const authSectionMain = document.getElementById("authSectionMain")
const dashboardSection = document.getElementById("dashboardSection")
const authSection = document.getElementById("authSection")
const mobileAuth = document.getElementById("mobileAuth")
const navLinks = document.getElementById("navLinks")
const footerLinks = document.getElementById("footerLinks")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  checkUserLogin()
})

function initializeApp() {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Tab switching
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")
      switchTab(targetTab)
    })
  })

  // Switch buttons in forms
  const switchBtns = document.querySelectorAll(".switch-btn")
  switchBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")
      switchTab(targetTab)
    })
  })

  // Password toggle functionality
  const passwordToggles = document.querySelectorAll(".password-toggle")
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const targetInput = document.getElementById(targetId)
      const icon = this.querySelector("i")

      if (targetInput.type === "password") {
        targetInput.type = "text"
        icon.className = "fas fa-eye-slash"
      } else {
        targetInput.type = "password"
        icon.className = "fas fa-eye"
      }
    })
  })
}

function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Signup form
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup)
  }
}

function switchTab(tabName) {
  // Update tab buttons
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-tab") === tabName) {
      btn.classList.add("active")
    }
  })

  // Update tab content
  const tabContents = document.querySelectorAll(".tab-content")
  tabContents.forEach((content) => {
    content.classList.remove("active")
  })

  const targetContent = document.getElementById(tabName + "Tab")
  if (targetContent) {
    targetContent.classList.add("active")
  }

  // Clear any error messages
  clearErrors()
}

function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value
  const loginBtn = document.getElementById("loginBtn")
  const btnText = loginBtn.querySelector(".btn-text")
  const btnLoading = loginBtn.querySelector(".btn-loading")

  // Clear previous errors
  clearErrors()

  // Validation
  if (!email || !password) {
    showError("loginError", "Please fill in all fields")
    return
  }

  // Show loading state
  btnText.style.display = "none"
  btnLoading.style.display = "inline"
  loginBtn.disabled = true

  // Simulate login process
  setTimeout(() => {
    const userData = {
      id: 1,
      name: email.split("@")[0],
      email: email,
    }

    // Save user data
    localStorage.setItem("user_data", JSON.stringify(userData))
    currentUser = userData

    // Reset form
    document.getElementById("loginForm").reset()

    // Update UI
    updateUIForLoggedInUser()

    // Reset button state
    btnText.style.display = "inline"
    btnLoading.style.display = "none"
    loginBtn.disabled = false
  }, 1000)
}

function handleSignup(e) {
  e.preventDefault()

  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const phone = document.getElementById("signupPhone").value
  const password = document.getElementById("signupPassword").value
  const signupBtn = document.getElementById("signupBtn")
  const btnText = signupBtn.querySelector(".btn-text")
  const btnLoading = signupBtn.querySelector(".btn-loading")

  // Clear previous errors
  clearErrors()

  // Validation
  if (!name || !email || !password) {
    showError("signupError", "Please fill in all required fields")
    return
  }

  // Show loading state
  btnText.style.display = "none"
  btnLoading.style.display = "inline"
  signupBtn.disabled = true

  // Simulate signup process
  setTimeout(() => {
    const userData = {
      id: 1,
      name: name,
      email: email,
      phone: phone,
    }

    // Save user data
    localStorage.setItem("user_data", JSON.stringify(userData))
    currentUser = userData

    // Reset form
    document.getElementById("signupForm").reset()

    // Update UI
    updateUIForLoggedInUser()

    // Reset button state
    btnText.style.display = "inline"
    btnLoading.style.display = "none"
    signupBtn.disabled = false
  }, 1000)
}

function handleLogout() {
  localStorage.removeItem("user_data")
  currentUser = null
  updateUIForLoggedOutUser()
}

function checkUserLogin() {
  const userData = localStorage.getItem("user_data")
  if (userData) {
    try {
      currentUser = JSON.parse(userData)
      updateUIForLoggedInUser()
    } catch (e) {
      localStorage.removeItem("user_data")
      updateUIForLoggedOutUser()
    }
  } else {
    updateUIForLoggedOutUser()
  }
}

function updateUIForLoggedInUser() {
  // Hide auth section, show dashboard
  authSectionMain.style.display = "none"
  dashboardSection.style.display = "block"

  // Update welcome message
  const userName = document.getElementById("userName")
  if (userName && currentUser) {
    userName.textContent = currentUser.name
  }

  // Update header auth section
  updateHeaderAuth(true)

  // Update footer links
  updateFooterLinks(true)
}

function updateUIForLoggedOutUser() {
  // Show auth section, hide dashboard
  authSectionMain.style.display = "block"
  dashboardSection.style.display = "none"

  // Update header auth section
  updateHeaderAuth(false)

  // Update footer links
  updateFooterLinks(false)
}

function updateHeaderAuth(isLoggedIn) {
  if (isLoggedIn && currentUser) {
    // Desktop auth section
    authSection.innerHTML = `
            <div class="user-info">
                <i class="fas fa-user"></i>
                <span>${currentUser.name}</span>
            </div>
            <button class="logout-btn" onclick="handleLogout()">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </button>
        `

    // Mobile auth section
    mobileAuth.innerHTML = `
            <div class="mobile-user-info">
                <i class="fas fa-user"></i>
                <span>${currentUser.name}</span>
            </div>
            <button class="mobile-logout-btn" onclick="handleLogout()">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </button>
        `

    // Show navigation links
    navLinks.style.display = "flex"
  } else {
    // Desktop auth section
    authSection.innerHTML = ""

    // Mobile auth section
    mobileAuth.innerHTML = ""

    // Hide navigation links
    navLinks.style.display = "none"
  }
}

function updateFooterLinks(isLoggedIn) {
  if (isLoggedIn) {
    footerLinks.innerHTML = `
            <li><a href="browse.html">Browse Items</a></li>
            <li><a href="report.html">Report Item</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact Us</a></li>
        `
  } else {
    footerLinks.innerHTML = `
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact Us</a></li>
        `
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.style.display = "none"
    element.textContent = ""
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export functions for global access
window.handleLogout = handleLogout
window.switchTab = switchTab
