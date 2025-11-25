// CHANGE THIS PASSWORD TO WHATEVER YOU WANT
    const SECRET_PASSWORD = "ifoyou"; // custom password from user

    const form = document.getElementById("lockForm");
    const passwordInput = document.getElementById("passwordInput");
    const errorBox = document.getElementById("lockError");

    // Always prompt for the password on reload: do not use a persistent localStorage flag
    // Therefore, we remove the check for a stored unlock state and explicitly reset the page to locked
    // on every page load. This ensures that even if a previous session added an "unlocked" class,
    // we restore the initial "locked" state when the script runs.

    // Ensure the body is in the locked state each time the page loads
    document.body.classList.add("locked");
    document.body.classList.remove("unlocked");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const value = passwordInput.value.trim();
      if (!value) {
        errorBox.textContent = "whisper something at least ;)";
        return;
      }
      if (value === SECRET_PASSWORD) {
        document.body.classList.remove("locked");
        document.body.classList.add("unlocked");
        errorBox.textContent = "";
        // do not persist unlocked state; user will have to re-enter password on next load
      } else {
        errorBox.textContent = "mmm, that’s not it. try again, lover.";
        passwordInput.value = "";
      }
    });

    // Smooth scroll for nav
    document.querySelectorAll("nav a[data-scroll]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("data-scroll"));
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // Fade-in on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll("main section").forEach((section) => {
      observer.observe(section);
    });

    // Instagram-style feed modal with carousel
    const postElements = document.querySelectorAll('.post');
    const modalEl = document.getElementById('modal');
    if (modalEl) {
      const modalImg = modalEl.querySelector('.modal-image');
      const modalCaption = modalEl.querySelector('.modal-caption');
      const prevBtn = modalEl.querySelector('.modal-prev');
      const nextBtn = modalEl.querySelector('.modal-next');
      const closeBtn = modalEl.querySelector('.modal-close');
      let currentImages = [];
      let currentIndex = 0;

      // open modal when clicking a post
      postElements.forEach((post) => {
        post.addEventListener('click', () => {
          const imagesAttr = post.getAttribute('data-images');
          try {
            currentImages = JSON.parse(imagesAttr);
          } catch (e) {
            currentImages = [];
          }
          currentIndex = 0;
          const caption = post.getAttribute('data-caption') || '';
          modalCaption.textContent = caption;
          if (currentImages.length > 0) {
            modalImg.src = currentImages[currentIndex];
          }
          modalEl.classList.add('open');
        });
      });

      function showImage(index) {
        if (!currentImages || currentImages.length === 0) return;
        modalImg.src = currentImages[index];
      }

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentImages || currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentImages || currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
      });

      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modalEl.classList.remove('open');
      });

      // close modal on clicking outside content
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) {
          modalEl.classList.remove('open');
        }
      });

      // close modal on ESC key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modalEl.classList.remove('open');
        }
      });
    }