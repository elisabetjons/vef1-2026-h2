import { el, empty } from './elements.js';

// birtir books fylkið
export const books = []; 

// Birtir allar bækur í bókasafninu
export function showBooks(sortBy = '') {
    const main = document.querySelector('#main-content');

    empty(main);

    const heading = el('h2', {}, 'Bókasafnið mitt');
    main.appendChild(heading);

    // röðun á bókum
    const sortSelect = el('select', {id: 'sort-books'});

    sortSelect.appendChild(el('option', {value: ''}, 'Veldu röðun:'));
    sortSelect.appendChild(el('option', {value: 'title'}, 'Titil'));
    sortSelect.appendChild(el('option', {value: 'author'}, 'Höfundi'));
    sortSelect.appendChild(el('option', {value: 'rating'}, 'Einkunn'));

    sortSelect.value = sortBy;
    main.appendChild(sortSelect);

    if (books.length === 0) {
        const message = el('p', {}, 'Bókasafnið er tómt.');
        main.appendChild(message);
        return;
    }

    const bookGrid = el('section', {class: 'book-grid'});

    // raðar bókum eftir höfund, titil og einkunn
    const sortedBooks = [...books];

    if (sortBy === 'title') {
        sortedBooks.sort((a,b) => a.title.localeCompare(b.title));
    }else if (sortBy === 'author') {
        sortedBooks.sort((a,b) => a.author.localeCompare(b.author));
    }else if (sortBy === 'rating') {
        sortedBooks.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    }

    for (const book of sortedBooks) {
        const card = el('article', {
            class: 'book-card',
            tabindex: '0',
        });

        const title = el('h3', {}, book.title);
        const author = el('p', {}, book.author);

        const rating = el('div', {class: 'book-rating'});
        for (let i=1; i<=5; i++){
            const star = el(
                'span', {class: i<=(book.rating || 0) ? 'star-filled' : 'star-empty'}, '★'); 
                rating.appendChild(star); 
        }

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(rating);

        card.addEventListener('click', () => {
            showBookDetails(book);
        });

        bookGrid.appendChild(card);
    }

    main.appendChild(bookGrid);

    sortSelect.addEventListener('change', () => {
        showBooks(sortSelect.value);
    })
}

// sýnir upplýsingar um valda bók
function showBookDetails(book) {
    const main = document.querySelector('#main-content');
    empty(main);

    // birtir titil og höfund
    const heading = el('h2', {}, book.title);
    const author = el('p', {}, `Höfundur: ${book.author}`);
    main.appendChild(heading);
    main.appendChild(author);

    // einkunn
    const ratingLabel = el('label', {for: 'rating'}, 'Einkunn (1–5)');
    const ratingInput = el('input', {
        type: 'number',
        id: 'rating',
        min: '1',
        max: '5',
        step: '1',
        value: book.rating ?? '',
    });
    main.appendChild(ratingLabel);
    main.appendChild(ratingInput);

    // umsögn
    const reviewLabel = el('label', {for: 'review'}, 'Umsögn');
    const reviewInput = el(
        'textarea',
        { id: 'review', rows: '5' },
        book.review || ''
    );
    main.appendChild(reviewLabel);
    main.appendChild(reviewInput);

    // vista breytingar
    const saveButton = el('button', {type: 'button'}, 'Vista breytingar');
    main.appendChild(saveButton);

    saveButton.addEventListener('click', () => {
        const rating = ratingInput.value;

        if (rating !== '' && (Number(rating) < 1 || Number(rating) > 5)) {
            alert('Einkunn þarf að vera á bilinu 1–5.');
            return;
        }

        book.rating = rating === '' ? null : Number(rating);
        book.review = reviewInput.value.trim();

        showBooks();
    });

    // eyða bók 
    const deleteButton = el(
        'button',
        {type: 'button', class: 'delete-button'},
        'Eyða bók'
    );
    main.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        const confirmed = confirm(
            `Ertu viss um að þú viljir eyða "${book.title}"?`
        );

        if (!confirmed) return;

        const index = books.findIndex((item) => item.id === book.id);

        if (index !== -1) {
            books.splice(index, 1);
        }

        showBooks();
    });

    // til baka takki í bókasafnið
    const backButton = el('button', {type: 'button'}, 'Til baka');

    backButton.addEventListener('click', () => {
        showBooks();
    });
    main.appendChild(backButton);
}