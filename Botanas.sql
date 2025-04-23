CREATE SCHEMA `Botanas`;
USE `Botanas`;
-- Creación de la tabla usuario
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(150),
    telefono_usuario BIGINT,
    correo_usuario VARCHAR(80),
    direccion_usuario VARCHAR(300),
    contraseña_usuario VARCHAR(50)
);


-- Creación de la tabla categoria
CREATE TABLE categoria (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Creación de la tabla producto
CREATE TABLE producto (
    id_producto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(50),
    precio_producto DOUBLE,
    categoria_producto VARCHAR(50),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Creación de la tabla pedido
CREATE TABLE pedido (
    id_pedido BIGINT PRIMARY KEY ,
    piezas INT,
    fecha_pedido DATETIME,
    total_pedido DOUBLE,
    ciudad_pedido VARCHAR(100),
    usuario_id_usuario INT,
    FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario)
);

-- Creación de la tabla pedido_has_producto (tabla de relación)
CREATE TABLE pedido_has_producto (
    pedido_id_pedido BIGINT,
    pedido_usuario_id_usuario INT,
    producto_id_producto BIGINT,
    producto_categoria_id INT,
    PRIMARY KEY (pedido_id_pedido, producto_id_producto),
    FOREIGN KEY (pedido_id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (pedido_usuario_id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (producto_id_producto) REFERENCES producto(id_producto),
    FOREIGN KEY (producto_categoria_id) REFERENCES categoria(id)
);

-- Creación de índices adicionales que aparecen en el diagrama
-- Los índices de clave primaria ya se crearon implícitamente con PRIMARY KEY
-- Podemos añadir otros índices si fuera necesario según el diagrama
CREATE INDEX idx_nombre_categoria ON categoria(name);



-- ------------------------------------------------------
SHOW TABLES;
INSERT INTO `usuario` (`nombre_usuario`, `telefono_usuario`, `direccion_usuario`, `correo_usuario`, `contraseña_usuario`)
VALUES ("Ximena", 5547896201, "Av. las flores, #193, Col. Vallejo", "ximena@gmail.com", "48ix1825"), 
("Jennifer", 5573720383, "Jacarandas, #37, Del. Bosque", "jennifer@gmail.com", "123jenn"),
("Daniela Rodriguez2", 5562555138, "Topiltzin #4490,El Zapote", "dany.rodgarcia@gmail.com", "112233"),
("Mariana", 5548442131, "Miguel Velazquez, #31, Providencia", "osorniomariana7@gmail.com", "Mariana1234"),
("Denisse", 3318483237, "Rio de janeiro, Providencia", "denissehernandez2002@gmail.com","Denisse162002");

SELECT * FROM `usuario`;

INSERT INTO `categoria` (`id`, `name`)
VALUES (10, "Picante"),
(20, "Dulce"),
(30, "Salado");
SELECT * FROM `categoria`;
-- ----------------------
-- Ingresar datos a producto
-- ----------------------
INSERT INTO `producto` (`id_producto`, `nombre_producto`, `precio_producto`, `categoria_producto`,`categoria_id`)
VALUES (1001, "Manguito Enchilado", 55, "Picante",10),
(1002, "Guayaba Enchilada", 69, "Picante",10),
(1003, "Durazno Enchilado", 65, "Picante",10),
(1004, "Chips Chilacayote Fuego", 45, "Picante",10),
(1005, "Mix de Verduras Enchiladas", 50, "Picante",10),
(2001, "Piña Enchilada", 35, "Dulce",20),
(2002, "Pretzel Cubierto con Chocolate", 75, "Dulce",20),
(2003, "Pasa con chocolate sin azúcar", 70, "Dulce",20),
(3001, "Churritos", 35, "Salado",30),
(3002, "Nuez de la India", 65, "Salado",30),
(3003, "Chips de Plátano sin Azúcar", 40, "Salado",30);
SELECT * FROM `producto`;
-- ----------------------
-- Producto mayor a 50 pesos

SELECT * FROM `producto`
WHERE `precio_producto` > 50 ;
-- Producto correspondiene a categoria 20 Dulce


SELECT * FROM `producto`
WHERE `categoria_id` = 20 ;

