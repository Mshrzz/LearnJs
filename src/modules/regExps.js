const regExps = () => {

    const calcBlock = document.querySelector('.calc-block'),
          footerForm = document.querySelector('.footer-form-input');

    calcBlock.addEventListener('input', (e) => {
        let target = e.target;

        if (target.matches('input')) {
            target.value = target.value.replace(/\D/g, '');
        }
    });


    document.addEventListener('focusout', e => {

        let target = e.target;

        if (e.target.matches('input')) {
            
            target.value = target.value.replace(/^(\s+)|(\s+)$/g, '');
            target.value = target.value.replace(/[\s]{2,}/g, ' ');
            target.value = target.value.replace(/[\-]{2,}/, '-');

            if (target.matches('#form2-name') || target.matches('#form2-message') || 
                target.matches('#form1-name') || target.matches('#form3-name')) {

                target.value = target.value.replace(/[^а-яё\-\ ]/gi, '');

                if (target.matches('#form2-name') || target.matches('#form1-name') || target.matches('#form3-name')) {

                    target.value = target.value.replace(/^[а-яё]/, function (nameChar) { return nameChar.toUpperCase(); } );

                }
            }

            if (target.matches('#form2-email') || target.matches('#form1-email') || target.matches('#form3-email')) {
                target.value = target.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi, '');
            }

            if (target.matches('#form2-phone') || target.matches('#form1-phone') || target.matches('#form3-phone')) {
                target.value = target.value.replace(/[^\d\(\)\-]/, '');
            }

            if (target.matches('input') && target.classList.contains('calc-item')) {
                target.value = target.value.replace(/\D/g, '');
            }


        }
      });

    document.body.addEventListener('input', (e) => {
        let target = e.target;

        if (target.matches('#form1-name') || target.matches('#form2-name') || 
            target.matches('#form3-name')) {

            target.value = target.value.replace(/[^а-яё\-\ ]/gi, '');

        }

        if ( target.matches('#form2-message') ) {
            target.value = target.value.replace(/[^(а-яё|\d)\-\.\!\,\:\? ]/gi, '');
        }

        if (target.matches('#form3-email') || target.matches('#form2-email') || target.matches('#form1-email')) {

            target.value = target.value.replace(/[^\w\@\-\_\.\!\~\*\'']/gi, '');

        }

        if (target.matches('#form3-phone') || target.matches('#form2-phone') || target.matches('#form1-phone')) {

            if ( target.value.match(/^\+/) ) {
                target.value = target.value.substring(0,12);
            }

            if ( target.value.match(/^(7|8)/) ) {
                target.value = target.value.substring(0,11);
            }

            target.value = target.value.replace(/[^\d\(\)\-\+]/, '');

        }

    });


};

export default regExps;