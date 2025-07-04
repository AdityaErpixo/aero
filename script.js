// Aero Vista Global - Enhanced JavaScript File

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initMobileMenu()
  initHeroSlider()
  initTestimonialCarousel()
  initGalleryFilter()
  initBlogFilter()
  initFAQ()
  initContactForm()
  initApplicationForm()
  initCookieConsent()
  initScrollEffects()
  initModalHandlers()
  initAnimations()
  initStatsCounter()
  initProgressBars()
})

// Enhanced Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
  const mobileMenuContainer = document.getElementById("mobileMenuContainer")
  const mobileMenuClose = document.getElementById("mobileMenuClose")
  const hamburger = document.querySelector(".hamburger")

  function openMobileMenu() {
    mobileMenuOverlay.classList.add("active")
    mobileMenuContainer.classList.add("active")
    hamburger.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove("active")
    mobileMenuContainer.classList.remove("active")
    hamburger.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileMenu)
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu()
      }
    })
  }

  // Close menu when clicking on menu items
  const mobileMenuItems = document.querySelectorAll(".mobile-menu-item")
  mobileMenuItems.forEach((item) => {
    item.addEventListener("click", closeMobileMenu)
  })

  // Close menu with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
      closeMobileMenu()
    }
  })
}

// Enhanced Hero Slider
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".slider-dot")
  let currentSlide = 0
  let slideInterval

  if (slides.length === 0) return

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show current slide
    slides[index].classList.add("active")
    if (dots[index]) dots[index].classList.add("active")
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 6000)
  }

  function stopSlideshow() {
    clearInterval(slideInterval)
  }

  // Auto-advance slides
  startSlideshow()

  // Pause on hover
  const sliderContainer = document.querySelector(".slider-container")
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopSlideshow)
    sliderContainer.addEventListener("mouseleave", startSlideshow)
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
      stopSlideshow()
      startSlideshow()
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
      showSlide(currentSlide)
      stopSlideshow()
      startSlideshow()
    } else if (e.key === "ArrowRight") {
      nextSlide()
      stopSlideshow()
      startSlideshow()
    }
  })
}

// Enhanced Testimonial Carousel
function initTestimonialCarousel() {
  const testimonials = document.querySelectorAll(".testimonial-slide")
  let currentTestimonial = 0

  if (testimonials.length === 0) return

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
    testimonials[index].classList.add("active")
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
    showTestimonial(currentTestimonial)
  }

  // Auto-advance testimonials
  setInterval(nextTestimonial, 8000)
}

// Stats Counter Animation
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 16)
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })

  statNumbers.forEach((stat) => {
    observer.observe(stat)
  })
}

// Progress Bars Animation
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width")
        setTimeout(() => {
          entry.target.style.width = width + "%"
        }, 500)
        observer.unobserve(entry.target)
      }
    })
  })

  progressBars.forEach((bar) => {
    observer.observe(bar)
  })
}

// Enhanced Scroll Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })
}

// Gallery Filter
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".gallery-filter")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-blue-600", "text-white")
        btn.classList.add("bg-gray-200", "text-gray-700")
      })
      this.classList.remove("bg-gray-200", "text-gray-700")
      this.classList.add("active", "bg-blue-600", "text-white")

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 10)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Blog Filter
function initBlogFilter() {
  const filterButtons = document.querySelectorAll(".blog-filter")
  const blogPosts = document.querySelectorAll(".blog-post")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category")

      // Update active button
      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-blue-600", "text-white")
        btn.classList.add("bg-gray-200", "text-gray-700")
      })
      this.classList.remove("bg-gray-200", "text-gray-700")
      this.classList.add("active", "bg-blue-600", "text-white")

      // Filter blog posts
      blogPosts.forEach((post) => {
        if (category === "all" || post.classList.contains(category)) {
          post.style.display = "block"
          setTimeout(() => {
            post.style.opacity = "1"
            post.style.transform = "translateY(0)"
          }, 10)
        } else {
          post.style.opacity = "0"
          post.style.transform = "translateY(20px)"
          setTimeout(() => {
            post.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// FAQ Accordion
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement
      const answer = faqItem.querySelector(".faq-answer")
      const icon = this.querySelector("i")

      // Toggle current FAQ
      if (faqItem.classList.contains("active")) {
        faqItem.classList.remove("active")
        answer.style.display = "none"
        icon.style.transform = "rotate(0deg)"
      } else {
        // Close all other FAQs
        faqQuestions.forEach((otherQuestion) => {
          const otherItem = otherQuestion.parentElement
          const otherAnswer = otherItem.querySelector(".faq-answer")
          const otherIcon = otherQuestion.querySelector("i")

          otherItem.classList.remove("active")
          otherAnswer.style.display = "none"
          otherIcon.style.transform = "rotate(0deg)"
        })

        // Open current FAQ
        faqItem.classList.add("active")
        answer.style.display = "block"
        icon.style.transform = "rotate(180deg)"
      }
    })
  })
}

// Enhanced Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      if (validateContactForm()) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent

        submitButton.disabled = true
        submitButton.innerHTML = '<div class="loading"></div> Sending...'

        setTimeout(() => {
          submitButton.disabled = false
          submitButton.textContent = originalText

          // Show success message
          if (successMessage) {
            successMessage.classList.remove("hidden")
            contactForm.reset()

            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.classList.add("hidden")
            }, 5000)
          }
        }, 2000)
      }
    })
  }
}

// Contact Form Validation
function validateContactForm() {
  const form = document.getElementById("contactForm")
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    const errorMessage = field.parentElement.querySelector(".error-message")

    if (!field.value.trim()) {
      field.classList.add("form-error")
      if (!errorMessage) {
        const error = document.createElement("div")
        error.className = "error-message"
        error.textContent = "This field is required"
        field.parentElement.appendChild(error)
      }
      isValid = false
    } else {
      field.classList.remove("form-error")
      if (errorMessage) {
        errorMessage.remove()
      }
    }
  })

  // Email validation
  const emailField = form.querySelector('input[type="email"]')
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailField.value)) {
      emailField.classList.add("form-error")
      const errorMessage = emailField.parentElement.querySelector(".error-message")
      if (!errorMessage) {
        const error = document.createElement("div")
        error.className = "error-message"
        error.textContent = "Please enter a valid email address"
        emailField.parentElement.appendChild(error)
      }
      isValid = false
    }
  }

  return isValid
}

// Application Form Modal
function initApplicationForm() {
  const applicationForm = document.getElementById("applicationForm")

  if (applicationForm) {
    applicationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateApplicationForm()) {
        const submitButton = applicationForm.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent

        submitButton.disabled = true
        submitButton.innerHTML = '<div class="loading"></div> Submitting...'

        setTimeout(() => {
          submitButton.disabled = false
          submitButton.textContent = originalText

          alert("Application submitted successfully! We will contact you within 48 hours.")
          closeApplicationModal()
          applicationForm.reset()
        }, 2000)
      }
    })
  }
}

// Application Form Validation
function validateApplicationForm() {
  const form = document.getElementById("applicationForm")
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("form-error")
      isValid = false
    } else {
      field.classList.remove("form-error")
    }
  })

  return isValid
}

// Modal Handlers
function initModalHandlers() {
  // Close modals when clicking outside
  document.addEventListener("click", (event) => {
    const modals = document.querySelectorAll(".fixed.inset-0")
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.classList.add("hidden")
      }
    })
  })

  // Close modals with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const modals = document.querySelectorAll(".fixed.inset-0:not(.hidden)")
      modals.forEach((modal) => {
        modal.classList.add("hidden")
      })
    }
  })
}

// Gallery Modal Functions
function openModal(imageSrc, title, description) {
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")

  if (modal && modalImage && modalTitle && modalDescription) {
    modalImage.src = imageSrc
    modalTitle.textContent = title
    modalDescription.textContent = description
    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal")
  if (modal) {
    modal.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
}

// Application Modal Functions
function openApplicationModal(position) {
  const modal = document.getElementById("applicationModal")
  const selectedPosition = document.getElementById("selectedPosition")
  const positionSelect = document.getElementById("position")

  if (modal && selectedPosition) {
    selectedPosition.textContent = position
    if (positionSelect && position !== "General Application") {
      positionSelect.value = position
    }
    modal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
  }
}

function closeApplicationModal() {
  const modal = document.getElementById("applicationModal")
  if (modal) {
    modal.classList.add("hidden")
    document.body.style.overflow = "auto"
  }
}

// Cookie Consent
function initCookieConsent() {
  const cookieConsent = document.getElementById("cookieConsent")
  const acceptButton = document.getElementById("acceptCookies")
  const declineButton = document.getElementById("declineCookies")

  // Check if user has already made a choice
  if (!localStorage.getItem("cookieConsent")) {
    setTimeout(() => {
      if (cookieConsent) {
        cookieConsent.classList.add("show")
        cookieConsent.style.transform = "translateY(0)"
      }
    }, 2000)
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted")
      hideCookieConsent()
    })
  }

  if (declineButton) {
    declineButton.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined")
      hideCookieConsent()
    })
  }
}

function hideCookieConsent() {
  const cookieConsent = document.getElementById("cookieConsent")
  if (cookieConsent) {
    cookieConsent.style.transform = "translateY(100%)"
    setTimeout(() => {
      cookieConsent.style.display = "none"
    }, 300)
  }
}

// Enhanced Scroll Effects
function initScrollEffects() {
  // Smooth scroll for anchor links
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

  // Enhanced scroll to top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollToTopBtn.className =
    "fixed bottom-20 right-6 bg-blue-600 text-white px-3 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-40 hidden hover:scale-110"
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollToTopBtn)

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Show/hide scroll to top button with animation
  let scrollTimeout
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("hidden")
        scrollToTopBtn.style.opacity = "1"
        scrollToTopBtn.style.transform = "translateY(0)"
      } else {
        scrollToTopBtn.style.opacity = "0"
        scrollToTopBtn.style.transform = "translateY(20px)"
        setTimeout(() => {
          scrollToTopBtn.classList.add("hidden")
        }, 300)
      }
    }, 100)
  })

  // Navbar background on scroll
  const navbar = document.querySelector("nav")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("bg-white/95")
      navbar.classList.remove("bg-white/95")
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
  })
}

// Utility Functions
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

// Form Utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Loading States
function showLoading(element) {
  const originalContent = element.innerHTML
  element.innerHTML = '<div class="loading"></div> Loading...'
  element.disabled = true
  return originalContent
}

function hideLoading(element, originalContent) {
  element.innerHTML = originalContent
  element.disabled = false
}

// Enhanced Error Handling
window.addEventListener("error", (event) => {
  console.error("JavaScript Error:", event.error)
  // You can add error reporting here
})

// Performance Monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    }, 0)
  })
}

// Enhanced Accessibility
document.addEventListener("keydown", (event) => {
  // Skip to main content with Alt+S
  if (event.altKey && event.key === "s") {
    const mainContent = document.querySelector("main") || document.querySelector(".main-content")
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView()
    }
  }
})

// Service Worker Registration (for future PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js');
  })
}

// Enhanced Touch Support for Mobile
let touchStartY = 0
let touchEndY = 0

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartY - touchEndY

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up
      console.log("Swipe up detected")
    } else {
      // Swipe down
      console.log("Swipe down detected")
    }
  }
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
initLazyLoading()
