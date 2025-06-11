// Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    class AutoCarousel {
        constructor() {
            this.track = document.getElementById('carouselTrack');
            this.indicators = document.getElementById('indicators');
            this.currentSlideSpan = document.getElementById('currentSlide');
            this.totalSlidesSpan = document.getElementById('totalSlides');
            this.progressFill = document.getElementById('progressFill');
            this.pausePlayBtn = document.getElementById('pausePlay');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');

            this.currentIndex = 0;
            this.totalSlides = 6;
            this.isPlaying = true;
            this.intervalId = null;
            this.autoPlayDelay = 4000; // 4 segundos

            this.init();
        }

        init() {
            this.createIndicators();
            this.updateCarousel();
            this.startAutoPlay();
            this.bindEvents();
        }

        createIndicators() {
            this.indicators.innerHTML = '';
            for (let i = 0; i < this.totalSlides; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                indicator.addEventListener('click', () => this.goToSlide(i));
                this.indicators.appendChild(indicator);
            }
        }

        updateCarousel() {
            // Calcular quantos cards cabem na tela
            const containerWidth = this.track.parentElement.clientWidth - 60; // menos padding
            const cardWidth = 320; // largura do card
            const gap = 30; // gap entre cards
            const cardsPerView = Math.floor((containerWidth + gap) / (cardWidth + gap));

            // Ajustar para não passar do total de slides
            const maxIndex = Math.max(0, this.totalSlides - cardsPerView);
            if (this.currentIndex > maxIndex) {
                this.currentIndex = 0;
            }

            // Mover o track
            const translateX = -this.currentIndex * (cardWidth + gap);
            this.track.style.transform = `translateX(${translateX}px)`;

            // Atualizar indicadores
            const indicatorElements = this.indicators.querySelectorAll('.indicator');
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });

            // Atualizar contador e progresso
            this.currentSlideSpan.textContent = this.currentIndex + 1;
            const progressWidth = ((this.currentIndex + 1) / this.totalSlides) * 100;
            this.progressFill.style.width = `${progressWidth}%`;
        }

        goToSlide(index) {
            this.currentIndex = index;
            this.updateCarousel();

            // Reiniciar autoplay se estiver ativo
            if (this.isPlaying) {
                this.startAutoPlay();
            }
        }

        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.updateCarousel();
        }

        prevSlide() {
            this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
            this.updateCarousel();
        }

        startAutoPlay() {
            this.stopAutoPlay();
            this.intervalId = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }

        stopAutoPlay() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }

        togglePlayPause() {
            this.isPlaying = !this.isPlaying;

            if (this.isPlaying) {
                this.startAutoPlay();
                this.pausePlayBtn.textContent = '⏸️';
            } else {
                this.stopAutoPlay();
                this.pausePlayBtn.textContent = '▶️';
            }
        }

        bindEvents() {
            // Controles
            this.pausePlayBtn.addEventListener('click', () => this.togglePlayPause());
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                if (this.isPlaying) this.startAutoPlay();
            });
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                if (this.isPlaying) this.startAutoPlay();
            });

            // Pausar ao passar o mouse
            this.track.addEventListener('mouseenter', () => {
                if (this.isPlaying) this.stopAutoPlay();
            });

            this.track.addEventListener('mouseleave', () => {
                if (this.isPlaying) this.startAutoPlay();
            });

            // Redimensionamento da tela
            window.addEventListener('resize', () => {
                this.updateCarousel();
            });

            // Controle por teclado
            document.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowLeft':
                        this.prevSlide();
                        if (this.isPlaying) this.startAutoPlay();
                        break;
                    case 'ArrowRight':
                        this.nextSlide();
                        if (this.isPlaying) this.startAutoPlay();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.togglePlayPause();
                        break;
                }
            });

            // Touch/Swipe para mobile
            let startX = 0;
            let endX = 0;

            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            this.track.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });

            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;

                if (Math.abs(diffX) > 50) { // Mínimo de 50px para registrar swipe
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }

                    if (this.isPlaying) this.startAutoPlay();
                }
            });
        }
    }

    // Inicializar o carrossel quando a página carregar
    document.addEventListener('DOMContentLoaded', () => {
        new AutoCarousel();
    });
    // =============================================
    // 4. Header Scroll Effect
    // =============================================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            header.style.backdropFilter = scrollY > 50 ? 'blur(15px)' : 'blur(10px)';
            header.style.boxShadow = scrollY > 50 ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none';
        });
    }

    // =============================================
    // 5. Eventos Globais
    // =============================================
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Fechar modal ao clicar fora
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // =============================================
    // Classe do Carrossel (atualizada)
    // =============================================
    class SkillCarousel {
        constructor() {
            this.track = document.getElementById('carouselTrack');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.indicatorsContainer = document.getElementById('indicators');
            this.currentSlideElement = document.getElementById('currentSlide');
            this.progressFill = document.getElementById('progressFill');
            this.cards = document.querySelectorAll('.skill-card');
            this.currentIndex = 0;
            this.totalCards = this.cards.length;
            this.autoplayInterval = null;
            this.isTransitioning = false;

            if (this.cards.length === 0) {
                throw new Error('Nenhum card encontrado no carrossel');
            }

            this.init();
        }

        init() {
            this.createIndicators();
            this.bindEvents();
            this.updateCarousel();
            this.startAutoplay();
            this.handleResize();
        }

        createIndicators() {
            if (!this.indicatorsContainer) return;

            this.indicatorsContainer.innerHTML = '';
            for (let i = 0; i < this.totalCards; i++) {
                const indicator = document.createElement('button');
                indicator.classList.add('indicator');
                indicator.setAttribute('data-slide', i + 1);
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => this.goToCard(i));
                this.indicatorsContainer.appendChild(indicator);
            }
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.previousCard());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextCard());
            }

            // Touch events
            let startX = 0;
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                this.pauseAutoplay();
            }, { passive: true });

            this.track.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                if (Math.abs(diffX) > 50) {
                    diffX > 0 ? this.nextCard() : this.previousCard();
                }
                this.startAutoplay();
            }, { passive: true });

            // Pause on hover
            this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.track.addEventListener('mouseleave', () => this.startAutoplay());
        }

        updateCarousel() {
            if (this.isTransitioning) return;
            this.isTransitioning = true;

            const cardWidth = this.cards[0].offsetWidth + 30;
            this.track.style.transform = `translateX(${-this.currentIndex * cardWidth}px)`;

            // Update indicators
            if (this.indicatorsContainer) {
                const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
                indicators.forEach((ind, i) => ind.classList.toggle('active', i === this.currentIndex));
            }

            // Update counter
            if (this.currentSlideElement) {
                this.currentSlideElement.textContent = this.currentIndex + 1;
            }

            // Update progress
            if (this.progressFill) {
                this.progressFill.style.width = `${((this.currentIndex + 1) / this.totalCards) * 100}%`;
            }

            setTimeout(() => {
                this.isTransitioning = false;
            }, 600);
        }

        nextCard() {
            if (this.isTransitioning) return;
            this.currentIndex = (this.currentIndex + 1) % this.totalCards;
            this.updateCarousel();
        }

        previousCard() {
            if (this.isTransitioning) return;
            this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
            this.updateCarousel();
        }

        goToCard(index) {
            if (this.isTransitioning || index === this.currentIndex) return;
            this.currentIndex = index;
            this.updateCarousel();
        }

        startAutoplay() {
            this.pauseAutoplay();
            this.autoplayInterval = setInterval(() => this.nextCard(), 4000);
        }

        pauseAutoplay() {
            clearInterval(this.autoplayInterval);
        }
    }

    // =============================================
    // 6. Disponibiliza funções globais
    // =============================================
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Copy to clipboard functionality
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Copiado para a área de transferência!';
            notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #BE9B65, #d4b876);
                    color: #0a0a1a;
                    padding: 12px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    z-index: 9999;
                    animation: slideInRight 0.3s ease;
                `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    }

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';

            // Reset form
            this.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);

        }, 2000);
    });
    // Add CSS for slide in animation
    const style = document.createElement('style');
    style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
    document.head.appendChild(style);

    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });





