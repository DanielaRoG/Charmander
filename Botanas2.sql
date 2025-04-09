CREATE DATABASE Botanas2;
USE Botanas2;

CREATE TABLE cLiente
(
	idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(100) not null,
    correo varchar(150) not null unique,
    direccion varchar(100) not null,
    telefono varchar(100) not null unique, 
    contraseña varchar(100) not null
);

CREATE TABLE categoria(
categoria_id int primary key, 
nombre varchar(50)
);

CREATE TABLE producto(
idproducto int primary key,
descripcion varchar(60),
precio decimal(12,2),
existencia int,
categoria_id int,
FOREIGN KEY(categoria_id) REFERENCES categoria(categoria_id)
);


CREATE TABLE pedido(
idpedido int auto_increment primary key,
idcliente int,
idproducto int,
monto decimal(12,2),
cantidad int,
fecha_pedido date,
FOREIGN KEY(idcliente) REFERENCES cliente(idcliente),
FOREIGN KEY(idproducto)REFERENCES producto(idproducto)
);


-- ------------------------------------------------------
-- Registro de datos 
-- -------------------------------------------------------
INSERT INTO `cliente` (`nombre`, `correo`, `direccion`, `telefono`, `contraseña`)
VALUES ("Ximena", "ximena@gmail.com", "Av. las flores, #193, Col. Vallejo","5547896201" , "48ix1825"), 
("Jennifer", "jennifer@gmail.com", "Jacarandas, #37, Del. Bosque", "5573720383", "123jenn"),
("Daniela Rodriguez2", "dany.rodgarcia@gmail.com", "Topiltzin #4490,El Zapote", "5562555138", "112233"),
("Mariana", "osorniomariana7@gmail.com" , "Miguel Velazquez, #31, Providencia","5548442131", "Mariana1234"),
("Denisse", "denissehernandez2002@gmail.com" , "Rio de janeiro, Providencia","3318483237","Denisse162002");

SELECT * FROM cliente;

-- -------------------------------------------------------------------------------------------------------
-- Registro de categorias
-- -------------------------------------------------------------------------------------------------------
INSERT INTO `categoria` (`categoria_id`, `nombre`)
VALUES (10, "Picante"),
(20, "Dulce"),
(30, "Salado");

SELECT * FROM categoria;

-- -------------------------------------------------------------------------------------------------------
-- Registro de productos
-- -------------------------------------------------------------------------------------------------------
INSERT INTO `producto` (`idproducto`, `descripcion`, `precio`,`existencia`, `categoria_id`)
VALUES (1001, "Manguito Enchilado", 55 , 6 , 10),
(1002, "Guayaba Enchilada", 69,6, 10),
(1003, "Durazno Enchilado", 65,6, 10),
(1004, "Chips Chilacayote Fuego", 45,6, 10),
(1005, "Mix de Verduras Enchiladas", 50,6, 10),
(2001, "Piña", 35,6, 20),
(2002, "Pretzel Cubierto con Chocolate", 75,6, 20),
(2003, "Pasa con chocolate sin azúcar", 70,6, 20),
(3001, "Churritos", 35,6, 30),
(3002, "Nuez de la India", 65,6, 30),
(3003, "Chips de Plátano sin Azúcar", 40,6, 30);

SELECT * FROM producto;
-- -------------------------------------------------------------------------------------------------------
-- Registro de pedido
-- -------------------------------------------------------------------------------------------------------
INSERT INTO pedido (idcliente, idproducto, monto, cantidad, fecha_pedido)
VALUES (1, 2002, 150.00, 2, '2025-04-08');

SELECT * FROM pedido;

-- ---------------------------------------------------------------------------------
-- JOIN 
-- ---------------------------------------------------------------------------------
SELECT 
    pedido.idpedido,
    cliente.nombre AS nombre_cliente,
    producto.descripcion AS producto,
    pedido.cantidad,
    pedido.monto,
    pedido.fecha_pedido
FROM pedido
INNER JOIN cliente ON pedido.idcliente = cliente.idcliente
INNER JOIN producto ON pedido.idproducto = producto.idproducto;
