import {el, empty} from './elements.js';
import { books, showBooks } from './baekur.js';
import { searchBooks } from './api.js';

// býr til input box til að bæta við bók
export function addBook() {
    const main = document.querySelector('#main-content');
    empty(main);

    const heading = el('h2', {}, 'Bæta við bók'); 
    const form = el('form', {}); 

    // leita að bók í google books api
    const searchLabel = el('label', {for: 'book-search'}, 'Leita að bók');
    const searchInput = el('input', {
        type: 'text', 
        id: 'book-search',
        placeholder: 'Sláðu inn höfund eða titil á bók',
    });

    const searchButton = el('button', {type: 'button'}, 'Leita');
    const results = el('div', {class: 'search-results'}); 

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) return;
        results.textContent = 'Leitar að bók...'; 

        // ef höfundur eða titill finnst ekki
        try {
            const foundBook = await searchBooks(searchTerm);
            empty(results); 

            if (foundBooks.length === 0) {
                results.textContent = 'Engar bækur fundust';
                return; 
            }
            
            for (const book of foundBook) {
                const title = book.volumeInfo.title || 'Óþekktur titill';
                const authors = book.volumeInfo.authors?.join(', ') || 'Óþekktur höfundur';
                const result = el('button', {type:'button'}, `${title}-${authors}`);
                result.addEventListener('click', () => {
                    const newBook = {
                        id: Date.now(), 
                        googleBooksId: book.id, 
                        title: title, 
                        author: authors, 
                        thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
                        rating: null, 
                        review: '', 
                    };
                    books.push(newBook); 
                    showBooks;
                });
                results.appendChild(result);

            }
        } catch (error) {
            results.textContent = 'Villa kom upp við leitina'; 
            console.error(error);
        }
    });
    form.appendChild(searchLabel);
    form.appendChild(searchInput);
    form.appendChild(searchButton);
    form.appendChild(results);


    // titill á nýrri bók
    const titleLabel = el('label', {for: 'title'}, 'Titill');
    const titleInput = el('input', {
        type: 'text',
        id: 'title', 
        required: true,
    }); 
    form.appendChild(titleLabel);
    form.appendChild(titleInput);

    // höfundur á nýrri bók
    const authorLabel = el('label', {for: 'author'}, 'Höfundur');
    const authorInput = el('input', {
        type: 'text', 
        id: 'author', 
        required: true,
    });
    form.appendChild(authorLabel);
    form.appendChild(authorInput);

    // submit takki 
    const submitButton = el('button', {type: 'submit'}, 'Bæta við bók');
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const newBook = {
            id: Date.now(),
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            rating: null,
            review: '', 
        };
        books.push(newBook);

        showBooks();
    });

    main.appendChild(heading); 
    main.appendChild(form); 
}