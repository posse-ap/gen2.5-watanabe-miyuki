DROP TABLE IF EXISTS big_questions;
CREATE TABLE big_questions (
  id SMALLINT(4),
  name VARCHAR(255) NOT NULL
);

INSERT INTO big_questions
VALUES
  (1, '東京の難読地名クイズ'),
  (2, '広島県の難読地名クイズ');

DROP TABLE IF EXISTS choices;
CREATE TABLE choices (
  id SMALLINT(4),
  question_id SMALLINT(4),
  name VARCHAR(255) NOT NULL,
  id SMALLINT(4),
);

INSERT INTO choices
VALUES
  (1, 1, 'たかなわ', 1),
  (2, 1, 'たかわ', 0),
  (3, 1, 'こうわ', 0),
  (4, 2, 'むこうひら', 0),
  (5, 2, 'むきひら', 0),
  (6, 2, 'むかいなだ', 1)