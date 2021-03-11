const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupFrame = document.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn');
    
    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {

            popup.style.display = 'block';

            if ( window.innerWidth > 768 ) {

                let count = 0;
                let animation;

                let timer = function () {

                    animation = requestAnimationFrame(timer);

                    count++;

                    if ( count >= 23 ) {
                        cancelAnimationFrame(animation);
                        return;
                    } else {
                        popupFrame.style.left = 2*count + '%';
                    }

                };

                timer();

            }
        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;

        if ( target.classList.contains('popup-close') ) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
        }
        
        if (!target) {
            popup.style.display = 'none';
        }
    });
};

export default togglePopUp;