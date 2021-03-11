const sendForm = () => {
    const errorMessage = 'Что-то пошло не так.',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся.';
    
    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    };

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2.5rem;';

    document.body.addEventListener('submit', (event) => {

        event.preventDefault();
        statusMessage.style.color = 'white';

        if ( event.target.querySelector('.mess') ) {
            alert('Вы должны заполнить все поля');
            return;
        }

        if ( event.target.querySelector('[type="text"]').value.length < 2 ) {
            alert('Минимальная длина имени составляет 2 символа');
            return;
        }

        if ( event.target.querySelector('[type="email"]').value.length === 0) {
            alert('Поле email обязательное');
            return;
        }

        if ( event.target.querySelector('[type="tel"]').value.match(/^\+/) && 
             event.target.querySelector('[type="tel"]').value.length < 12 ) {
                alert('Недостаточно символов для номера телефона');
                return;
        }

        if ( event.target.querySelector('[type="tel"]').value.match(/^(7|8)/) && 
             event.target.querySelector('[type="tel"]').value.length < 11 ) {
                alert('Недостаточно символов для номера телефона');
                return;
        }
        
        event.target.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        const formData = new FormData(event.target);
        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Network status is not 200');
                }
            })
            .then(() => {
                let formInputs = event.target.querySelectorAll('input');
            
                formInputs.forEach(item => {
                    item.value = '';
                });

                statusMessage.textContent = successMessage;
            })
            .catch((err) => {
                statusMessage.textContent = errorMessage;
                console.error(err);
            })
            .finally(() => {
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 3000);
            });
    });
};

export default sendForm;