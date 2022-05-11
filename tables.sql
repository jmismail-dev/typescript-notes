
-- Notes Table
create table notes(
  id INT auto_increment primary key not null,
  title VARCHAR(40) not null,
  body TEXT not null,
  createdOn TIMESTAMP not null,
  updatedOn TIMESTAMP not null
);


-- Notes History
create table notes_history(
  id INT auto_increment primary key not null,
  title VARCHAR(40) not null,
  body TEXT not null,
  createdOn TIMESTAMP not null,
  updatedOn TIMESTAMP not null,
  noteId INT,
  FOREIGN KEY (noteId) REFERENCES notes(id) ON DELETE CASCADE
)