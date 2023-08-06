CREATE DATABASE utefood;
use utefood;
create table users (
	id varchar(36) primary key,
    full_name varchar(50),
	phone_number varchar(10),
    address varchar(100),
    date_of_birth date,
    avatar text,
    email varchar(50) unique,
    password varchar(20),
    user_role varchar(10),
    createdAt date,
    updatedAt date
);
create table category (
	id varchar(36) primary key,
    category_name varchar(50),
    image text,
    isDelete boolean
);

create table product (
	id varchar (36) primary key,
    categoryID varchar(36), FOREIGN KEY (categoryID) REFERENCES category(id),
    product_name varchar(100),
    description text,
    price int,
    quantity int,
    publucation_date date,
    createdAt date,
    updatedAt date,
    isDelete boolean
);
