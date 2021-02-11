'use strict';

const body = document.querySelector('body'),
      advertising = document.querySelector('.adv'),
      titles = document.querySelectorAll('a'),
      books = document.querySelector('.books'),
      book1 = document.querySelectorAll('.book')[1],
      book2 = document.querySelectorAll('.book')[0],
      book3 = document.querySelectorAll('.book')[4],
      book4 = document.querySelectorAll('.book')[3],
      book5 = document.querySelectorAll('.book')[5],
      book6 = document.querySelectorAll('.book')[2],
      bookArray = [book1, book2, book3, book4, book5, book6],
      chapterElementsBook2 = book2.querySelectorAll('li'),
      chapterElementsBook5 = book5.querySelectorAll('li'),
      chapterElementsBook6 = book6.querySelectorAll('li'),
      lastLi = document.createElement('li');

for (let i = 0; i < bookArray.length; i++) {
    books.append(bookArray[i]);
}

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

titles[4].textContent = 'Книга 3. this и Прототипы Объектов';

advertising.remove();

chapterElementsBook2[3].after(chapterElementsBook2[6]);
chapterElementsBook2[6].after(chapterElementsBook2[8]);
chapterElementsBook2[9].after(chapterElementsBook2[2]);

chapterElementsBook5[1].after(chapterElementsBook5[9]);
chapterElementsBook5[9].after(chapterElementsBook5[3]);
chapterElementsBook5[2].before(chapterElementsBook5[4]);
chapterElementsBook5[8].before(chapterElementsBook5[5]);

lastLi.textContent = 'Глава 8: За пределами ES6';

chapterElementsBook6[9].insertAdjacentElement('beforebegin', lastLi);