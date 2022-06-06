DROP TABLE IF EXISTS big_questions;
CREATE TABLE big_questions (
  id SMALLINT(4),
  name VARCHAR(255) NOT NULL
);

INSERT INTO big_questions
VALUES
  (1, '東京の難読地名クイズ'),
  (2, '広島県の難読地名クイズ');

