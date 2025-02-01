document.addEventListener("DOMContentLoaded", loadBooks);

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const condition = document.getElementById('condition').value;
    const contact = document.getElementById('contact').value;
    const image = document.getElementById('image').files[0];

    if (title && author && condition && contact && image) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const books = JSON.parse(localStorage.getItem("books")) || [];
            const newBook = {
                title,
                author,
                condition,
                contact,
                image: event.target.result,
            };
            books.push(newBook);
            localStorage.setItem("books", JSON.stringify(books));
            displayBooks();
        };
        reader.readAsDataURL(image);
        document.getElementById('bookForm').reset();
    } else {
        alert('Please fill in all fields and upload an image.');
    }
}

function loadBooks() {
    displayBooks();
}

// function showContactInfo() {
//     const contactInfo = document.getElementById('contact-info');
//     if (contactInfo.style.display === 'none' || contactInfo.style.display === '') {
//         contactInfo.style.display = 'block';
//     } else {
//         contactInfo.style.display = 'none';
//     }
// }

function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="Book Image">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Condition:</strong> ${book.condition}</p>
            <p><strong>Contact:</strong> ${book.contact}</p>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        bookGrid.appendChild(bookDiv);
    });
}

function searchBooks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput)
    );
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="Book Image">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Condition:</strong> ${book.condition}</p>
            <p><strong>Contact:</strong> ${book.contact}</p>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        bookGrid.appendChild(bookDiv);
    });
}

function editBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('condition').value = book.condition;
    document.getElementById('contact').value = book.contact;
    deleteBook(index);
}

function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}