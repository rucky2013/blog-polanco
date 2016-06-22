drop database if exists blog_polanco;
create database blog_polanco default character set utf8 default collate utf8_general_ci;
use blog_polanco;

create table Posts(
  id int primary key auto_increment,
  title varchar(64) not null,
  body text not null,
  createdAt timestamp default now()
);

create table Comments(
  id int primary key auto_increment,
  body text not null,
  createdAt timestamp default now(),
  postId int not null,
  foreign key(postId) references Posts(id) on update cascade on delete cascade
);
