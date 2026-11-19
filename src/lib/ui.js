import { el, empty } from './elements.js';
import { addBook } from './baetaBok.js';
import { showBooks } from './baekur.js';

// Forsíðan 
export function homePage() {
  const main = document.querySelector('#main-content');

  if (!main) {
    console.error('Fann ekki main-content');
    return;
  }

  empty(main);

// Hero hluti
  const hero = el('section', { class: 'hero' });
  const heading = el('h1', {}, 'Velkomin á Bókavefinn!');
  const paragraph = el('p', {}, 'Hér getur þú skráð bækurnar sem þú hefur lesið, gefið þeim einkunn og skoðað bókasafnið þitt.');

  hero.appendChild(heading);
  hero.appendChild(paragraph);
  main.appendChild(hero);

// Takkar með linkum á nýja síðu
  const buttons = el('section', { class: 'buttons' });

  const booksCard = el('div', { class: 'action-card' });
  const booksImage = el('img', { src: '/myndir/bygging.svg', alt: '' });
  const booksHeading = el('h2', {}, 'Bókasafnið mitt');
  const booksLink = el('a', { href: '?page=baekur' }, 'Bókasafnið mitt');

  booksCard.appendChild(booksImage);
  booksCard.appendChild(booksHeading);
  booksCard.appendChild(booksLink);

  const addBookCard = el('div', { class: 'action-card' });
  const addBookImage = el('img', { src: '/myndir/bokasafn.svg', alt: '' });
  const addBookHeading = el('h2', {}, 'Bæta við bók');
  const addBookLink = el('a', { href: '?page=baeta-bok' }, 'Bæta við bók');

  addBookCard.appendChild(addBookImage);
  addBookCard.appendChild(addBookHeading);
  addBookCard.appendChild(addBookLink);

  buttons.appendChild(booksCard);
  buttons.appendChild(addBookCard);
  main.appendChild(buttons);
}

// Fall til að sýna skjá
export function showScreen() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');

  if (page === 'baekur') {
    showBooks();
    return;
  }

  if (page === 'baeta-bok') {
    addBook();
    return;
  }

  homePage();
}

// Skipti á milli síða 
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');

  // kemur í veg fyrir að bækur detta út ef skipt er á milli síða
  if (!link) return;
  if (link.origin !== window.location.origin) return;
  if (link.pathname !== window.location.pathname) return;

  event.preventDefault();

  window.history.pushState({}, '', link.href);

  showScreen();
});

// Virkar líka þegar notandi ýtir á back í vafranum
window.addEventListener('popstate', showScreen);