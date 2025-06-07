 function sendMessage() {
            const input = document.querySelector('.chat-input');
            const message = input.value.trim();
            
            if (message) {
                // Simular envio da mensagem
                input.value = '';
                input.style.height = 'auto';
                
                // Mostrar animação de digitação
                const typingAnimation = document.querySelector('.typing-animation');
                typingAnimation.style.display = 'flex';
                
                // Simular resposta após 2 segundos
                setTimeout(() => {
                    typingAnimation.style.display = 'none';
                    // Aqui você integraria com o backend do assistente
                    console.log('Mensagem enviada:', message);
                }, 2000);
            }
        }

        // Auto-resize do textarea
        const textarea = document.querySelector('.chat-input');
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });

        // Enviar com Enter (Shift+Enter para nova linha)
        textarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Sistema de slider para feedbacks
        let currentSlide = 0;
        const track = document.querySelector('.feedback-track');
        const cards = document.querySelectorAll('.feedback-card');
        const totalCards = cards.length;
        
        function getCardsToShow() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1200) return 2;
            return 2;
        }
        
        function updateSlider() {
            const cardsToShow = getCardsToShow();
            const maxSlide = Math.max(0, totalCards - cardsToShow);
            
            // Ajustar currentSlide se necessário
            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }
            
            const cardWidth = cards[0].offsetWidth + 20; // largura do card + gap
            const translateX = -(currentSlide * cardWidth);
            track.style.transform = `translateX(${translateX}px)`;
            
            // Atualizar estado dos botões
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (prevBtn && nextBtn) {
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide >= maxSlide;
            }
        }

        function slideLeft() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        }

        function slideRight() {
            const cardsToShow = getCardsToShow();
            const maxSlide = Math.max(0, totalCards - cardsToShow);
            
            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        }

        // Auto-slide (opcional)
        let autoSlideInterval = setInterval(() => {
            const cardsToShow = getCardsToShow();
            const maxSlide = Math.max(0, totalCards - cardsToShow);
            
            if (currentSlide >= maxSlide) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateSlider();
        }, 5000);

        // Pausar auto-slide ao hover
        const feedbackSection = document.querySelector('.feedback-slider');
        if (feedbackSection) {
            feedbackSection.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            feedbackSection.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    const cardsToShow = getCardsToShow();
                    const maxSlide = Math.max(0, totalCards - cardsToShow);
                    
                    if (currentSlide >= maxSlide) {
                        currentSlide = 0;
                    } else {
                        currentSlide++;
                    }
                    updateSlider();
                }, 5000);
            });
        }

        // Inicializar slider
        setTimeout(updateSlider, 100);

        // Reajustar ao redimensionar janela
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentSlide = 0;
                updateSlider();
            }, 250);
        });

        // Animações de entrada das features
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.style.animation = `slideIn 0.8s ease-out ${index * 0.2}s both`;
        });

        // Sistema de avaliação por estrelas
        const starInputs = document.querySelectorAll('.star-input');
        let currentRating = 0;

        starInputs.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                highlightStars(index + 1);
            });

            star.addEventListener('click', () => {
                currentRating = index + 1;
                setRating(currentRating);
            });
        });

        document.querySelector('.stars-input').addEventListener('mouseleave', () => {
            setRating(currentRating);
        });

        function highlightStars(rating) {
            starInputs.forEach((star, index) => {
                if (index < rating) {
                    star.textContent = '★';
                    star.classList.add('active');
                } else {
                    star.textContent = '☆';
                    star.classList.remove('active');
                }
            });
        }

        function setRating(rating) {
            starInputs.forEach((star, index) => {
                if (index < rating) {
                    star.textContent = '★';
                    star.classList.add('active');
                } else {
                    star.textContent = '☆';
                    star.classList.remove('active');
                }
            });
        }

        // Envio de feedback
        document.querySelector('.feedback-btn').addEventListener('click', () => {
            const feedbackText = document.querySelector('.feedback-input').value.trim();
            
            if (currentRating === 0) {
                alert('Por favor, selecione uma avaliação antes de enviar.');
                return;
            }
            
            if (!feedbackText) {
                alert('Por favor, escreva seu feedback antes de enviar.');
                return;
            }

            // Simular envio do feedback
            alert(`Obrigado pelo seu feedback! Avaliação: ${currentRating} estrelas`);
            
            // Limpar formulário
            document.querySelector('.feedback-input').value = '';
            currentRating = 0;
            setRating(0);
        });