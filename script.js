// Sample data for recent items
const recentItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    type: "lost",
    location: "Library - 2nd Floor",
    date: "2 hours ago",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Blue Backpack",
    type: "found",
    location: "Student Center",
    date: "5 hours ago",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Car Keys (Toyota)",
    type: "lost",
    location: "Parking Lot B",
    date: "1 day ago",
    category: "Keys",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Textbook - Calculus",
    type: "found",
    location: "Mathematics Building",
    date: "2 days ago",
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
  },
]

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Populate recent items
  populateRecentItems()

  // Search functionality
  setupSearch()
})

function populateRecentItems() {
  const itemsGrid = document.getElementById("itemsGrid")
  if (!itemsGrid) return

  itemsGrid.innerHTML = ""

  recentItems.forEach((item) => {
    const itemCard = createItemCard(item)
    itemsGrid.appendChild(itemCard)
  })
}

function createItemCard(item) {
  const card = document.createElement("div")
  card.className = "item-card"
  card.onclick = () => showItemDetails(item)

  card.innerHTML = `
        <div class="item-header">
            <div class="item-meta">
                <span class="badge badge-${item.type}">${item.type === "lost" ? "Lost" : "Found"}</span>
                <span class="item-date">${item.date}</span>
            </div>
            <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">
            <h3 class="item-title">${item.title}</h3>
        </div>
        <div class="item-content">
            <div class="item-details">
                <div class="item-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.location}</span>
                </div>
            </div>
            <div class="item-footer">
                <span class="item-category">${item.category}</span>
            </div>
        </div>
    `

  return card
}

function setupSearch() {
  const searchInput = document.querySelector(".search-input")
  if (!searchInput) return

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch(this.value)
    }
  })

  const searchBtn = document.querySelector(".search-btn")
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const searchValue = searchInput.value
      performSearch(searchValue)
    })
  }
}

function performSearch(query) {
  if (query.trim()) {
    // In a real application, this would make an API call
    console.log("Searching for:", query)
    // Redirect to browse page with search query
    window.location.href = `browse.html?search=${encodeURIComponent(query)}`
  }
}

function showItemDetails(item) {
  // In a real application, this would navigate to a detailed view
  alert(
    `Item Details:\n\nTitle: ${item.title}\nType: ${item.type}\nLocation: ${item.location}\nCategory: ${item.category}\nDate: ${item.date}`,
  )
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      this.src = "https://via.placeholder.com/400x200?text=No+Image"
      this.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
})
