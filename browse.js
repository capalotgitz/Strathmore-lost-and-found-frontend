// Sample data for browse page
const allItems = [
  {
    id: 1,
    title: "iPhone 14 Pro - Space Black",
    type: "lost",
    location: "Library - 2nd Floor",
    date: "2 hours ago",
    category: "electronics",
    description: "Black iPhone 14 Pro with cracked screen protector. Has a blue case with card holder.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    reporter: "John D.",
    views: 23,
  },
  {
    id: 2,
    title: "Blue Jansport Backpack",
    type: "found",
    location: "Student Center",
    date: "5 hours ago",
    category: "bags",
    description: "Navy blue Jansport backpack found near the cafeteria. Contains notebooks and pens.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    reporter: "Sarah M.",
    views: 45,
  },
  {
    id: 3,
    title: "Toyota Car Keys",
    type: "lost",
    location: "Parking Lot B",
    date: "1 day ago",
    category: "keys",
    description: "Toyota car keys with black key fob and a small teddy bear keychain.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    reporter: "Mike K.",
    views: 67,
  },
  {
    id: 4,
    title: "Calculus Textbook - 8th Edition",
    type: "found",
    location: "Mathematics Building",
    date: "2 days ago",
    category: "books",
    description: "Stewart Calculus textbook, 8th edition. Name 'Alex' written inside front cover.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    reporter: "Lisa R.",
    views: 34,
  },
  {
    id: 5,
    title: "Silver Watch - Casio",
    type: "lost",
    location: "Sports Complex",
    date: "3 days ago",
    category: "jewelry",
    description: "Silver Casio digital watch with metal band. Sentimental value.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
    reporter: "David L.",
    views: 89,
  },
  {
    id: 6,
    title: "Red Nike Hoodie - Size M",
    type: "found",
    location: "Auditorium",
    date: "4 days ago",
    category: "clothing",
    description: "Red Nike hoodie, size Medium. Found after the guest lecture on Thursday.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
    reporter: "Emma W.",
    views: 56,
  },
]

let filteredItems = [...allItems]
let currentPage = 1
const itemsPerPage = 6

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Initialize page
  setupFilters()
  displayItems()
  updateItemCount()

  // Check for search query in URL
  const urlParams = new URLSearchParams(window.location.search)
  const searchQuery = urlParams.get("search")
  if (searchQuery) {
    document.getElementById("searchInput").value = searchQuery
    filterItems()
  }
})

function setupFilters() {
  const searchInput = document.getElementById("searchInput")
  const categoryFilter = document.getElementById("categoryFilter")
  const typeFilter = document.getElementById("typeFilter")
  const sortSelect = document.getElementById("sortSelect")
  const loadMoreBtn = document.getElementById("loadMoreBtn")

  // Search functionality
  searchInput.addEventListener("input", debounce(filterItems, 300))

  // Filter functionality
  categoryFilter.addEventListener("change", filterItems)
  typeFilter.addEventListener("change", filterItems)

  // Sort functionality
  sortSelect.addEventListener("change", sortItems)

  // Load more functionality
  loadMoreBtn.addEventListener("click", loadMoreItems)
}

function filterItems() {
  const searchQuery = document.getElementById("searchInput").value.toLowerCase()
  const categoryFilter = document.getElementById("categoryFilter").value
  const typeFilter = document.getElementById("typeFilter").value

  filteredItems = allItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery)

    const matchesCategory = !categoryFilter || item.category === categoryFilter
    const matchesType = !typeFilter || item.type === typeFilter

    return matchesSearch && matchesCategory && matchesType
  })

  currentPage = 1
  displayItems()
  updateItemCount()
}

function sortItems() {
  const sortValue = document.getElementById("sortSelect").value

  switch (sortValue) {
    case "newest":
      filteredItems.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case "oldest":
      filteredItems.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case "most-viewed":
      filteredItems.sort((a, b) => b.views - a.views)
      break
  }

  displayItems()
}

function displayItems() {
  const itemsGrid = document.getElementById("browseItemsGrid")
  const loadMoreBtn = document.getElementById("loadMoreBtn")

  if (!itemsGrid) return

  const startIndex = 0
  const endIndex = currentPage * itemsPerPage
  const itemsToShow = filteredItems.slice(startIndex, endIndex)

  itemsGrid.innerHTML = ""

  itemsToShow.forEach((item) => {
    const itemCard = createBrowseItemCard(item)
    itemsGrid.appendChild(itemCard)
  })

  // Show/hide load more button
  if (endIndex >= filteredItems.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "block"
  }
}

function createBrowseItemCard(item) {
  const card = document.createElement("div")
  card.className = "browse-item-card"
  card.onclick = () => showItemDetails(item)

  card.innerHTML = `
        <div class="browse-item-header">
            <div class="browse-item-meta">
                <span class="badge badge-${item.type}">${item.type === "lost" ? "Lost" : "Found"}</span>
                <div class="view-count">
                    <i class="fas fa-eye"></i>
                    <span>${item.views}</span>
                </div>
            </div>
            <img src="${item.image}" alt="${item.title}" class="browse-item-image" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            <h3 class="browse-item-title">${item.title}</h3>
        </div>
        <div class="browse-item-content">
            <p class="browse-item-description">${item.description}</p>
            <div class="browse-item-details">
                <div class="browse-item-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.location}</span>
                </div>
                <div class="browse-item-time">
                    <i class="fas fa-clock"></i>
                    <span>${item.date}</span>
                </div>
            </div>
            <div class="browse-item-footer">
                <span class="browse-item-category">${getCategoryDisplayName(item.category)}</span>
                <span class="browse-item-reporter">by ${item.reporter}</span>
            </div>
            <button class="view-details-btn" onclick="event.stopPropagation(); showItemDetails(${JSON.stringify(item).replace(/"/g, "&quot;")})">
                View Details
            </button>
        </div>
    `

  return card
}

function getCategoryDisplayName(category) {
  const categoryMap = {
    electronics: "Electronics",
    bags: "Bags",
    books: "Books",
    keys: "Keys",
    clothing: "Clothing",
    jewelry: "Jewelry",
  }
  return categoryMap[category] || category
}

function loadMoreItems() {
  currentPage++
  displayItems()
}

function updateItemCount() {
  const itemCountElement = document.getElementById("itemCount")
  if (itemCountElement) {
    itemCountElement.textContent = filteredItems.length
  }
}

function showItemDetails(item) {
  // Create a modal or detailed view
  const modal = document.createElement("div")
  modal.className = "modal-overlay"
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
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
    `

  modalContent.innerHTML = `
        <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937; margin: 0;">${item.title}</h2>
                <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; color: #6b7280; cursor: pointer; padding: 0.5rem;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div style="padding: 1.5rem;">
            <div style="margin-bottom: 1rem;">
                <span class="badge badge-${item.type}" style="margin-right: 1rem;">${item.type === "lost" ? "Lost" : "Found"}</span>
                <span style="color: #6b7280; font-size: 0.875rem;">${item.date}</span>
            </div>
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/600x200?text=No+Image'">
            <p style="color: #374151; margin-bottom: 1rem; line-height: 1.6;">${item.description}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <strong style="color: #1f2937;">Location:</strong><br>
                    <span style="color: #6b7280;">${item.location}</span>
                </div>
                <div>
                    <strong style="color: #1f2937;">Category:</strong><br>
                    <span style="color: #6b7280;">${getCategoryDisplayName(item.category)}</span>
                </div>
                <div>
                    <strong style="color: #1f2937;">Reported by:</strong><br>
                    <span style="color: #6b7280;">${item.reporter}</span>
                </div>
                <div>
                    <strong style="color: #1f2937;">Views:</strong><br>
                    <span style="color: #6b7280;">${item.views}</span>
                </div>
            </div>
            <div style="text-align: center; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
                <button onclick="contactReporter('${item.reporter}', '${item.title}')" style="background: #2563eb; color: white; border: none; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; margin-right: 1rem;">
                    Contact Reporter
                </button>
                <button onclick="this.closest('.modal-overlay').remove()" style="background: transparent; color: #374151; border: 1px solid #d1d5db; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                    Close
                </button>
            </div>
        </div>
    `

  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
}

function contactReporter(reporter, itemTitle) {
  alert(
    `Contact feature would connect you with ${reporter} regarding "${itemTitle}". In a real application, this would open a contact form or messaging system.`,
  )
}

// Utility function for debouncing
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
