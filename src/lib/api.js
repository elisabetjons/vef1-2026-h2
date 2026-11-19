export async function searchBooks(searchTerm) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&printType=books&maxResults=10`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Ekki tókst að sækja bækur.');
    }

    const data = await response.json();

    return data.items || [];
}
