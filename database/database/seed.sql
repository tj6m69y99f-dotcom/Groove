USE groove_store;

INSERT INTO categories (name, description) VALUES
  ('Rock', 'Clássicos e novidades do rock.'),
  ('Pop', 'Álbuns pop que atravessaram gerações.'),
  ('Jazz & Blues', 'Jazz, blues e grandes instrumentistas.'),
  ('Música Portuguesa', 'Discos de artistas portugueses.'),
  ('Soul / Funk / Disco', 'Ritmos dançantes e cheios de groove.');

INSERT INTO products
  (category_id, title, artist, condition, price, stock, cover_class)
VALUES
  -- Rock
  (1, 'The Dark Side of the Moon', 'Pink Floyd', 'Used', 24.99, 2, 'cover-2'),
  (1, 'Abbey Road', 'The Beatles', 'New', 29.99, 3, 'cover-5'),
  (1, 'Back in Black', 'AC/DC', 'New', 28.99, 4, 'cover-1'),
  (1, 'Nevermind', 'Nirvana', 'Used', 23.99, 2, 'cover-3'),

  -- Pop
  (2, 'Thriller', 'Michael Jackson', 'New', 32.99, 5, 'cover-1'),
  (2, 'Like a Virgin', 'Madonna', 'Used', 22.99, 1, 'cover-4'),
  (2, 'Future Nostalgia', 'Dua Lipa', 'New', 27.99, 6, 'cover-7'),
  (2, '25', 'Adele', 'Used', 21.99, 3, 'cover-6'),

  -- Jazz & Blues
  (3, 'Kind of Blue', 'Miles Davis', 'New', 27.99, 4, 'cover-3'),
  (3, 'Live at the Regal', 'B.B. King', 'Used', 23.99, 2, 'cover-6'),
  (3, 'Blue Train', 'John Coltrane', 'New', 28.50, 3, 'cover-2'),
  (3, 'Lady Sings the Blues', 'Billie Holiday', 'Used', 20.99, 2, 'cover-8'),

  -- Música Portuguesa
  (4, 'Viagens', 'Pedro Abrunhosa', 'New', 22.99, 6, 'cover-7'),
  (4, 'Mingos & Os Samurais', 'Rui Veloso', 'Used', 21.99, 2, 'cover-5'),
  (4, 'Circo de Feras', 'Xutos & Pontapés', 'New', 24.99, 4, 'cover-1'),
  (4, 'O Monstro Precisa de Amigos', 'Ornatos Violeta', 'Used', 26.50, 2, 'cover-4'),

  -- Soul / Funk / Disco
  (5, 'What''s Going On', 'Marvin Gaye', 'New', 25.99, 4, 'cover-8'),
  (5, 'Songs in the Key of Life', 'Stevie Wonder', 'Used', 27.99, 2, 'cover-3'),
  (5, 'I Never Loved a Man the Way I Love You', 'Aretha Franklin', 'New', 26.99, 3, 'cover-6'),
  (5, 'C''est Chic', 'Chic', 'Used', 22.50, 2, 'cover-7');
