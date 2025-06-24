document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Initialize form
  setupForm()
  setupFileUpload()
  checkURLParams()
})

function setupForm() {
  const form = document.getElementById("reportForm")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      submitForm()
    })
  }

  // Set today's date as max date
  const dateInput = document.getElementById("date")
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0]
    dateInput.max = today
    dateInput.value = today
  }
}

function setupFileUpload() {
  const uploadArea = document.getElementById("uploadArea")
  const fileInput = document.getElementById("photoUpload")
  const uploadedImage = document.getElementById("uploadedImage")
  const previewImage = document.getElementById("previewImage")
  const removeImageBtn = document.getElementById("removeImage")

  if (!uploadArea || !fileInput) return

  // Click to upload
  uploadArea.addEventListener("click", () => {
    fileInput.click()
  })

  // Drag and drop functionality
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = "#2563eb"
    uploadArea.style.backgroundColor = "#f0f9ff"
  })

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = "#d1d5db"
    uploadArea.style.backgroundColor = "transparent"
  })

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = "#d1d5db"
    uploadArea.style.backgroundColor = "transparent"

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  })

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  })

  // Remove image
  if (removeImageBtn) {
    removeImageBtn.addEventListener("click", () => {
      fileInput.value = ""
      uploadedImage.style.display = "none"
      uploadArea.style.display = "block"
    })
  }
}

function handleFileUpload(file) {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.")
    return
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB.")
    return
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    const previewImage = document.getElementById("previewImage")
    const uploadedImage = document.getElementById("uploadedImage")
    const uploadArea = document.getElementById("uploadArea")

    if (previewImage && uploadedImage && uploadArea) {
      previewImage.src = e.target.result
      uploadedImage.style.display = "block"
      uploadArea.style.display = "none"
    }
  }
  reader.readAsDataURL(file)
}

function checkURLParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const type = urlParams.get("type")

  if (type === "lost" || type === "found") {
    const radioButton = document.querySelector(`input[name="itemType"][value="${type}"]`)
    if (radioButton) {
      radioButton.checked = true
    }
  }
}

function submitForm() {
  // Get form data
  const formData = new FormData()

  // Basic form fields
  const fields = [
    "itemType",
    "itemName",
    "category",
    "description",
    "location",
    "date",
    "fullName",
    "studentId",
    "email",
    "phone",
    "notes",
  ]

  let isValid = true
  const errors = []

  fields.forEach((fieldName) => {
    const field = document.getElementById(fieldName) || document.querySelector(`input[name="${fieldName}"]:checked`)
    if (field) {
      const value = field.value.trim()
      formData.append(fieldName, value)

      // Basic validation for required fields
      if (isRequiredField(fieldName) && !value) {
        isValid = false
        errors.push(`${getFieldDisplayName(fieldName)} is required.`)
      }
    }
  })

  // Email validation
  const email = document.getElementById("email").value.trim()
  if (email && !isValidEmail(email)) {
    isValid = false
    errors.push("Please enter a valid email address.")
  }

  // Phone validation
  const phone = document.getElementById("phone").value.trim()
  if (phone && !isValidPhone(phone)) {
    isValid = false
    errors.push("Please enter a valid phone number.")
  }

  // File upload
  const fileInput = document.getElementById("photoUpload")
  if (fileInput.files.length > 0) {
    formData.append("photo", fileInput.files[0])
  }

  if (!isValid) {
    alert("Please fix the following errors:\n\n" + errors.join("\n"))
    return
  }

  // Show loading state
  const submitBtn = document.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Submitting..."
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    // In a real application, this would send data to a server
    console.log("Form submitted with data:", Object.fromEntries(formData))

    // Show success message
    showSuccessMessage()

    // Reset form
    document.getElementById("reportForm").reset()

    // Reset file upload
    const uploadedImage = document.getElementById("uploadedImage")
    const uploadArea = document.getElementById("uploadArea")
    if (uploadedImage && uploadArea) {
      uploadedImage.style.display = "none"
      uploadArea.style.display = "block"
    }

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

function isRequiredField(fieldName) {
  const requiredFields = [
    "itemType",
    "itemName",
    "category",
    "description",
    "location",
    "date",
    "fullName",
    "studentId",
    "email",
    "phone",
  ]
  return requiredFields.includes(fieldName)
}

function getFieldDisplayName(fieldName) {
  const displayNames = {
    itemType: "Item Type",
    itemName: "Item Name",
    category: "Category",
    description: "Description",
    location: "Location",
    date: "Date",
    fullName: "Full Name",
    studentId: "Student/Staff ID",
    email: "Email",
    phone: "Phone Number",
    notes: "Additional Notes",
  }
  return displayNames[fieldName] || fieldName
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  // Simple phone validation - accepts various formats
  const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

function showSuccessMessage() {
  // Create success modal
  const modal = document.createElement("div")
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
    `

  const modalContent = document.createElement("div")
  modalContent.style.cssText = `
        background: white;
        border-radius: 0.75rem;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
    `

  modalContent.innerHTML = `
        <div style="color: #16a34a; font-size: 3rem; margin-bottom: 1rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: #1f2937; margin-bottom: 1rem; font-size: 1.5rem;">Report Submitted Successfully!</h2>
        <p style="color: #6b7280; margin-bottom: 2rem; line-height: 1.6;">
            Thank you for reporting the item. We'll review your submission and it will appear in our listings shortly. 
            You'll be contacted if someone finds a match.
        </p>
        <button onclick="this.closest('div').remove(); window.location.href='index.html';" style="background: #2563eb; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Return to Home
        </button>
    `

  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove()
      window.location.href = "index.html"
    }
  }, 5000)
}

// Form field enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Auto-format phone number
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.startsWith("254")) {
        value = "+" + value
      } else if (value.startsWith("0")) {
        value = "+254" + value.substring(1)
      }
      e.target.value = value
    })
  }

  // Auto-suggest email domain
  const emailInput = document.getElementById("email")
  if (emailInput) {
    emailInput.addEventListener("blur", (e) => {
      const value = e.target.value
      if (value && !value.includes("@") && !value.includes(".")) {
        e.target.value = value + "@strathmore.edu"
      }
    })
  }
})
