create database usuario

create table usuario(id SERIAL PRIMARY KEY, nombre varchar(20), correo TEXT, ciudad varchar(20))
create table ventas(id SERIAL PRIMARY KEY, fecha varchar, descripcion varchar,  cantidad integer, precioVenta numeric, total numeric, stock integer)