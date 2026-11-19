import {el, empty} from './elements.js';
import { books, showBooks } from './baekur.js';

// bæyr til form til að bæta við bók
export function addBook() {
    const main = document.querySelector('#main-content'); 
    empty(main); 

    const heading = el('h2', {}, 'Bæta við bók'); 
    const form = el('form', {}); 
    
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