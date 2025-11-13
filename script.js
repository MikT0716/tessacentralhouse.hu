// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // // Set minimum date for check-in to today
        // const today = new Date().toISOString().split('T')[0];
        // document.getElementById('checkinDate').setAttribute('min', today);

        // // Update minimum checkout date based on check-in date
        // document.getElementById('checkinDate').addEventListener('change', function() {
        //     const checkinDate = new Date(this.value);
        //     checkinDate.setDate(checkinDate.getDate() + 1);
        //     const minCheckout = checkinDate.toISOString().split('T')[0];
        //     document.getElementById('checkoutDate').setAttribute('min', minCheckout);
        //     document.getElementById('checkoutDate').value = '';
        // });

        // // Form submission handler
        // document.getElementById('bookingForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     // Validate dates
        //     const checkinDate = document.getElementById('checkinDate').value;
        //     const checkoutDate = document.getElementById('checkoutDate').value;
        //     const adults = document.getElementById('adults').value;
        //     const children = document.getElementById('children').value;
        //     const specialRequests = document.getElementById('specialRequests').value;

        //     if (!checkinDate || !checkoutDate) {
        //         const messages = {
        //             hu: 'Kérjük, válassza ki az érkezés és távozás dátumát.',
        //             en: 'Please select both check-in and check-out dates.',
        //             de: 'Bitte wählen Sie sowohl das Anreise- als auch das Abreisedatum.'
        //         };
        //         alert(messages[currentLanguage]);
        //         return;
        //     }

        //     if (new Date(checkoutDate) <= new Date(checkinDate)) {
        //         const messages = {
        //             hu: 'A távozás dátumának az érkezés dátuma után kell lennie.',
        //             en: 'Check-out date must be after check-in date.',
        //             de: 'Das Abreisedatum muss nach dem Anreisedatum liegen.'
        //         };
        //         alert(messages[currentLanguage]);
        //         return;
        //     }

        //     // Calculate nights
        //     const nights = Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24));
            
        //     // Create booking summary
        //     const summaries = {
        //         hu: {
        //             title: 'Köszönjük foglalási kérelmét!',
        //             checkin: 'Érkezés',
        //             checkout: 'Távozás',
        //             nights: 'Éjszakák',
        //             guests: 'Vendégek',
        //             adults: 'Felnőtt(ek)',
        //             children: 'Gyermek(ek)',
        //             contact: 'Hamarosan felvesszük Önnel a kapcsolatot a foglalás megerősítése érdekében.',
        //             info: 'Fontos információk',
        //             checkinTime: 'Bejelentkezés: 15:00 - 23:00',
        //             checkoutTime: 'Kijelentkezés: 08:00 - 11:00'
        //         },
        //         en: {
        //             title: 'Thank you for your booking request!',
        //             checkin: 'Check-in',
        //             checkout: 'Check-out',
        //             nights: 'Nights',
        //             guests: 'Guests',
        //             adults: 'Adult(s)',
        //             children: 'Child(ren)',
        //             contact: 'We will contact you shortly to confirm your reservation.',
        //             info: 'Important Information',
        //             checkinTime: 'Check-in: 15:00 - 23:00',
        //             checkoutTime: 'Check-out: 08:00 - 11:00'
        //         },                
        //         de: {
        //             title: 'Vielen Dank für Ihre Buchungsanfrage!',
        //             checkin: 'Anreise',
        //             checkout: 'Abreise',
        //             nights: 'Nächte',
        //             guests: 'Gäste',
        //             adults: 'Erwachsene(r)',
        //             children: 'Kind(er)',
        //             contact: 'Wir werden uns in Kürze mit Ihnen in Verbindung setzen, um Ihre Reservierung zu bestätigen.',
        //             info: 'Wichtige Informationen',
        //             checkinTime: 'Check-in: 15:00 - 23:00',
        //             checkoutTime: 'Check-out: 08:00 - 11:00'
        //         }
        //     };

        //     const s = summaries[currentLanguage];
        //     let bookingSummary = `${s.title}\n\n`;
        //     bookingSummary += `${s.checkin}: ${checkinDate}\n`;
        //     bookingSummary += `${s.checkout}: ${checkoutDate}\n`;
        //     bookingSummary += `${s.nights}: ${nights}\n`;
        //     bookingSummary += `${s.guests}: ${adults} ${s.adults}, ${children} ${s.children}\n`;
        //     bookingSummary += `\n${s.contact}\n`;
        //     bookingSummary += `\n${s.info}:\n`;
        //     bookingSummary += `${s.checkinTime}\n`;
        //     bookingSummary += `${s.checkoutTime}`;

        //     alert(bookingSummary);
            
        //     // Reset form
        //     this.reset();
        // });

/**
 * Gallery Modal Carousel Handler
 * Manages clickable gallery thumbnails and syncs them with the modal carousel
 */

class GalleryCarousel {
  constructor(gallerySelector = '[data-bs-slide-to]', carouselId = 'galleryCarousel') {
    this.galleryThumbnails = document.querySelectorAll(gallerySelector);
    this.carouselId = carouselId;
    this.carouselElement = document.getElementById(carouselId);
    this.carouselInstance = null;
    
    this.init();
  }

  /**
   * Initialize the gallery carousel functionality
   */
  init() {
    if (!this.carouselElement) {
      console.error(`Carousel with ID "${this.carouselId}" not found`);
      return;
    }

    this.carouselInstance = bootstrap.Carousel.getOrCreateInstance(this.carouselElement);
    this.attachEventListeners();
  }

  /**
   * Attach click event listeners to all gallery thumbnails
   */
  attachEventListeners() {
    this.galleryThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener('click', (e) => this.handleThumbnailClick(e));
    });
  }

  /**
   * Handle thumbnail click event
   * @param {Event} event - The click event
   */
  handleThumbnailClick(event) {
    event.preventDefault();
    
    const slideIndex = parseInt(event.currentTarget.getAttribute('data-bs-slide-to'));
    this.activateSlide(slideIndex);
  }

  /**
   * Activate a specific slide in the carousel
   * @param {number} slideIndex - The index of the slide to activate
   */
  activateSlide(slideIndex) {
    this.removeActiveClassFromAllItems();
    this.removeActiveClassFromAllIndicators();
    this.setActiveClass(slideIndex);
    this.setActiveIndicator(slideIndex);
    
    if (this.carouselInstance) {
      this.carouselInstance.to(slideIndex);
    }
  }

  /**
   * Remove 'active' class from all carousel items
   */
  removeActiveClassFromAllItems() {
    const carouselItems = this.carouselElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item) => {
      item.classList.remove('active');
    });
  }

  /**
   * Remove 'active' class from all carousel indicators
   */
  removeActiveClassFromAllIndicators() {
    const indicators = this.carouselElement.querySelectorAll('[data-bs-slide-to]');
    indicators.forEach((indicator) => {
      indicator.classList.remove('active');
    });
  }

  /**
   * Set 'active' class on a specific carousel item
   * @param {number} slideIndex - The index of the item to activate
   */
  setActiveClass(slideIndex) {
    const carouselItems = this.carouselElement.querySelectorAll('.carousel-item');
    if (carouselItems[slideIndex]) {
      carouselItems[slideIndex].classList.add('active');
    }
  }

  /**
   * Set 'active' class on a specific carousel indicator
   * @param {number} slideIndex - The index of the indicator to activate
   */
  setActiveIndicator(slideIndex) {
    const indicators = this.carouselElement.querySelectorAll('[data-bs-slide-to]');
    if (indicators[slideIndex]) {
      indicators[slideIndex].classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GalleryCarousel('[data-bs-slide-to]', 'galleryCarousel');
});

