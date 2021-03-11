const smoothScrolling = () => {
    document.body.addEventListener('click', (event) => {
    
        let target = event.target,
            targetTagA = event.target.closest('a');
        
        // Сразу отсекаем клик на кнопки отправки заявки
        if (target.matches('button')) {
            return;
        }
        
        event.preventDefault();
    
        if ( (targetTagA) && (targetTagA.getAttribute('href')[0] === '#') && 
             (targetTagA.getAttribute('href').length > 2) ) {
                 const blockID = targetTagA.getAttribute('href').substring(1);
                 document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
        }
    
    });
};

export default smoothScrolling;