CREATE SCHEMA `Chicharrikos`;
USE `Chicharrikos`;

-- ----------------------
-- Crear Tabla Registro de Usuario
-- ----------------------

CREATE TABLE `Chicharrikos`.`usuario`(
`id_usuario` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
`nombre_usuario` VARCHAR(150) NOT NULL UNIQUE,
`telefono_usuario` BIGINT NOT NULL UNIQUE,
`correo_usuario` VARCHAR(80) NOT NULL UNIQUE,
`direccion_usuario` VARCHAR(300) NOT NULL,
`contraseña_usuario` VARCHAR(50) NOT NULL UNIQUE
);
-- ----------------------
-- Crear Tabla Registro de Pedido
-- ----------------------

CREATE TABLE `Chicharrikos`.`pedido`(
`id_pedido` BIGINT NOT NULL PRIMARY KEY,
`piezas` INT NOT NULL,
`fecha_pedido` DATETIME NOT NULL,
`total_pedido` DOUBLE NOT NULL,
`ciudad_pedido` VARCHAR(100) NOT NULL,
 `usuario_id_usuario` INT NOT NULL,
 FOREIGN KEY (`usuario_id_usuario`) 
 REFERENCES `usuario`(`id_usuario`)
);

-- ----------------------
-- Crear Tabla Registro de Categoria
-- ----------------------

CREATE TABLE `Chicharrikos`.`Categoria`(
`id` INT primary KEY,
`name` VARCHAR(50) UNIQUE NOT NULL
);
-- ----------------------
-- Crear Tabla Registro de Producto
-- ----------------------
CREATE TABLE `Chicharrikos`.`Producto`(
`id_producto` BIGINT NOT NULL PRIMARY KEY,
`nombre_producto` VARCHAR(50) NOT NULL,
`precio_producto` DOUBLE NOT NULL,
`categoria_producto` VARCHAR(50) NOT NULL,
`categoria_id` INT, 
 FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`)
);
-- ----------------------
-- Crear Tabla Registro de Pedido de producto 
-- ----------------------

CREATE TABLE `Chicharrikos`.`Pedido_producto`(
`pedido_id_pedido` BIGINT,
FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido`(`id_pedido`),

`pedido_usuario_id_usuario` INT,
FOREIGN KEY (`pedido_usuario_id_usuario`) REFERENCES `pedido`(`usuario_id_usuario`),

`producto_id_producto` BIGINT,
FOREIGN KEY (`producto_id_producto`) REFERENCES `Producto`(`id_producto`),

`producto_categoria_id` INT,
FOREIGN KEY (`producto_categoria_id`) REFERENCES `Producto`(`categoria_id`)
);

-- ------------------------------------------------------
-- Registro de datos 
-- -------------------------------------------------------
INSERT INTO `usuario` (`nombre_usuario`, `telefono_usuario`, `direccion_usuario`, `correo_usuario`, `contraseña_usuario`)
VALUES ("Ximena", 5547896201, "Av. las flores, #193, Col. Vallejo", "ximena@gmail.com", "48ix1825"), 
("Jennifer", 5573720383, "Jacarandas, #37, Del. Bosque", "jennifer@gmail.com", "123jenn"),
("Daniela Rodriguez2", 5562555138, "Topiltzin #4490,El Zapote", "dany.rodgarcia@gmail.com", "112233"),
("Mariana", 5548442131, "Miguel Velazquez, #31, Providencia", "osorniomariana7@gmail.com", "Mariana1234"),
("Denisse", 3318483237, "Rio de janeiro, Providencia", "denissehernandez2002@gmail.com","Denisse162002");


SELECT * FROM `usuario`;

INSERT INTO `producto` (`id_producto`, `nombre_producto`, `precio_producto`, `categoria_producto`)
VALUES (1001, "Manguito Enchilado", 55, "Picante"),
(1002, "Guayaba Enchilada", 69, "Picante"),
(1003, "Durazno Enchilado", 65, "Picante"),
(1004, "Chips Chilacayote Fuego", 45, "Picante"),
(1005, "Mix de Verduras Enchiladas", 50, "Picante"),
(2001, "Piña Enchilada", 35, "Dulce"),
(2002, "Pretzel Cubierto con Chocolate", 75, "Dulce"),
(2003, "Pasa con chocolate sin azúcar", 70, "Dulce"),
(3001, "Churritos", 35, "Salado"),
(3002, "Nuez de la India", 65, "Salado"),
(3003, "Chips de Plátano sin Azúcar", 40, "Salado");
SELECT * FROM `producto`;

INSERT INTO `categoria` (`id`, `name`)
VALUES (10, "Picante"),
(20, "Dulce"),
(30, "Salado");
SELECT * FROM `categoria`;









