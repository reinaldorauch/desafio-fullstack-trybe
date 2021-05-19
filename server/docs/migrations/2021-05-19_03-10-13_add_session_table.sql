CREATE TABLE session (
  email varchar(45) not null,
  password varchar(45) not null,
  token char(16) not null,
  primary key (email, password)
) engine=innodb;

