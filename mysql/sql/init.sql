DROP TABLE IF EXISTS records;
CREATE TABLE records (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATETIME NOT NULL,
  N SMALLINT(4),
  dotInstall SMALLINT(4),
  POSSE SMALLINT(4),
  HTML SMALLINT(4),
  CSS SMALLINT(4),
  PHP SMALLINT(4),
  Laravel SMALLINT(4),
  SHELL SMALLINT(4),
  other SMALLINT(4),
  time FLOAT(5,2)
);
INSERT INTO records (date, N, dotInstall, POSSE, HTML, CSS, PHP, Laravel, SHELL, other, time)
VALUES
  ('2022-5-11', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-12', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-13', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-15', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-16', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-17', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-5-18', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-6-1', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3),
  ('2022-6-1', 1, 0, 0, 1, 1, 1, 1, 1, 1, 1),
  ('2022-6-2', 1, 0, 0, 1, 0, 1, 1, 0, 1, 5),
  ('2022-6-3', 1, 0, 0, 1, 1, 1, 1, 1, 1, 3),
  ('2022-6-4', 1, 1, 0, 1, 1, 1, 0, 1, 1, 3),
  ('2022-6-5', 1, 0, 1, 1, 1, 1, 1, 0, 0, 3),
  ('2022-6-6', 1, 1, 0, 1, 1, 1, 0, 1, 1, 3),
  ('2022-6-7', 1, 0, 1, 1, 1, 1, 1, 1, 1, 3),
  ('2022-6-28', 1, 0, 0, 1, 1, 1, 1, 1, 0, 3);


DROP TABLE IF EXISTS mst_digit;
CREATE TABLE mst_digit (
  digit SMALLINT(4)
);
INSERT INTO mst_digit (digit)
VALUES
(0),
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9);

CREATE VIEW vw_sequence99 AS
SELECT (d1.digit + (d2.digit * 10)) AS Number
FROM (mst_digit d1 join mst_digit d2);