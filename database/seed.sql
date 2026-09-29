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
  (2, 'Thriller', 'Michael Jackson', 'New', 32.99, 5, 'cover-1'),
  (1, 'The Dark Side of the Moon', 'Pink Floyd', 'Used', 24.99, 2, 'cover-2'),
  (3, 'Kind of Blue', 'Miles Davis', 'New', 27.99, 4, 'cover-3'),
  (2, 'Like a Virgin', 'Madonna', 'Used', 22.99, 1, 'cover-4'),
  (1, 'Abbey Road', 'The Beatles', 'New', 29.99, 3, 'cover-5'),
  (3, 'Live at the Regal', 'B.B. King', 'Used', 23.99, 2, 'cover-6'),
  (4, 'Viagens', 'Pedro Abrunhosa', 'New', 22.99, 6, 'cover-7'),
  (5, 'What''s Going On', 'Marvin Gaye', 'New', 25.99, 4, 'cover-8');
