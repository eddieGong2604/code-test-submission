-- Seed catalog (same data as src/lib/books.ts). Must run after create-books-table migration.
insert into public.books (id, title, author, price, cover, description, isbn) values
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 10.00, 'https://m.media-amazon.com/images/I/51Bm6JUCscL._SY522_.jpg', 'A classic novel set in the Roaring Twenties, exploring themes of wealth, class, and the elusive American Dream through the mysterious Jay Gatsby.', '978-0743273565'),
(2, 'The Catcher in the Rye', 'J.D. Salinger', 12.00, 'https://m.media-amazon.com/images/I/61cfToP7pgL._SL1500_.jpg', 'Holden Caulfield, a cynical teenager, navigates New York City after being expelled from prep school, searching for authenticity in a ''phony'' world.', '978-0316769488'),
(3, 'To Kill a Mockingbird', 'Harper Lee', 15.00, 'https://m.media-amazon.com/images/I/51lVvSDLQJL._SY522_.jpg', 'A profound exploration of racial injustice and the loss of innocence in the American South, seen through the eyes of young Scout Finch.', '978-0061120084'),
(4, '1984', 'George Orwell', 11.50, 'https://m.media-amazon.com/images/I/61ZewDE3beL._SL1200_.jpg', 'A chilling dystopian vision of a totalitarian future where Big Brother is always watching and independent thought is a crime.', '978-0451524935'),
(5, 'Pride and Prejudice', 'Jane Austen', 9.00, 'https://m.media-amazon.com/images/I/71Q1tPupKjL._SL1500_.jpg', 'Elizabeth Bennet navigates the complexities of social status, marriage, and family in 19th-century England, eventually finding love with the proud Mr. Darcy.', '978-0141439518'),
(6, 'The Hobbit', 'J.R.R. Tolkien', 14.00, 'https://m.media-amazon.com/images/I/71jD4jMityL._SL1500_.jpg', 'Bilbo Baggins, a home-loving hobbit, is swept into an epic adventure with dwarves and a wizard to reclaim a lost treasure from a fearsome dragon.', '978-0547928227'),
(7, 'Brave New World', 'Aldous Huxley', 13.00, 'https://m.media-amazon.com/images/I/81zE42gT3xL._SL1500_.jpg', 'A provocative look at a future society where technology and conditioning have eliminated pain and conflict, but at the cost of freedom and individuality.', '978-0060850524'),
(8, 'Fahrenheit 451', 'Ray Bradbury', 10.50, 'https://m.media-amazon.com/images/I/61l8LHt4MeL._SL1500_.jpg', 'In a world where books are banned and ''firemen'' burn them, Guy Montag begins to question his role in maintaining a mindless, hedonistic society.', '978-1451673319'),
(9, 'The Alchemist', 'Paulo Coelho', 12.50, 'https://m.media-amazon.com/images/I/61HAE8zahLL._SL1500_.jpg', 'Santiago, a shepherd boy, travels across the desert in search of treasure buried near the Pyramids, learning to follow his heart and find his Personal Legend.', '978-0062315007'),
(10, 'Dune', 'Frank Herbert', 16.00, 'https://m.media-amazon.com/images/I/81ym3QUd3KL._SL1500_.jpg', 'Set on the desert planet Arrakis, Paul Atreides navigates political intrigue and prophecy in this sweeping epic of ecology, religion, and power.', '978-0441172719')
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  price = excluded.price,
  cover = excluded.cover,
  description = excluded.description,
  isbn = excluded.isbn;
