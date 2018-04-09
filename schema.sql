use bamazon;

#create database bamazon;

#DROP TABLE products;

create table products (
	item_id integer NOT NULL auto_increment,
	product_name varchar(255) NOT NULL,
	department_name varchar(255) NOT NULL,
   price decimal(15,2) NOT NULL,
	stock_quantity integer NOT NULL,
	primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
value
("Auto Coder", "Electronics", 2999.99, 1),
("Auto Toaster", "Home Goods", 109.99, 20),
("Auto Amazoner", "Electronics", 999.99, 15),
("Auto Automobiler", "Vehicles", 484999.00, 5),
("Auto Fooder", "Home Goods", 1299.99, 20),
("Big Cat", "Pets", 599.99, 16),
("Big Dog", "Pets", 199.99, 17),
("Big Fish", "Pets", 99.99, 200),
("Stick", "Sporting Goods", 9.99, 200),
("Dirt", "Lawn & Garden", 19.99, 200)
