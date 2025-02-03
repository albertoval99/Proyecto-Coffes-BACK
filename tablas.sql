CREATE TABLE usuarios (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    fechaNacimiento DATE,
    email VARCHAR(100)
);

CREATE TABLE tiendas (
    nombre VARCHAR(100) PRIMARY KEY
);

CREATE TABLE direcciones(
    aliasUsuario VARCHAR(50) PRIMARY KEY,
    direccion VARCHAR(200) UNIQUE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias)
);


CREATE TABLE administradores (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nombreTienda VARCHAR(100) NOT NULL,
    FOREIGN KEY (nombreTienda) REFERENCES tiendas(nombre)
);

INSERT INTO administradores (alias,password,nombretienda) VALUES ('Malladeta','$2a$10$yAl8fMYj6JOGRjQxztbe5uyr7p1fJSMyNXQuAetR0dQo4mtJ22ore','Mercadona');


CREATE TABLE cafes (
    nombre VARCHAR(100),
    tueste VARCHAR(100),
    precio DECIMAL(10, 2) NOT NULL,
    origen VARCHAR(100),
    peso DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    PRIMARY KEY (nombre, tueste,peso,origen,nombreTienda),
    FOREIGN KEY (nombreTienda) REFERENCES tiendas(nombre) 
);


CREATE TABLE valoraciones (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    origenCafe VARCHAR(100),
    pesoCafe DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    aliasUsuario VARCHAR(50),
    valoracion INT CHECK (valoracion BETWEEN 0 AND 5),
    PRIMARY KEY (nombreCafe, tuesteCafe, pesoCafe,origenCafe, aliasUsuario,nombreTienda), -- Para q un usuario no pueda valorar el mismo cafe dos veces
    FOREIGN KEY (nombreCafe, tuesteCafe,pesoCafe,origenCafe,nombreTienda) REFERENCES cafes(nombre, tueste,peso,origen,nombreTienda) ON UPDATE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias)
);


CREATE TABLE carritos (
    aliasUsuario VARCHAR(50) PRIMARY KEY,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias) 
);

CREATE TABLE cantidades_cafes_carritos (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    origenCafe VARCHAR(100),
    pesoCafe DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    aliasUsuario VARCHAR(50),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (nombreCafe, tuesteCafe, aliasUsuario, pesoCafe,origenCafe,nombreTienda), -- Evita q puedas añadir 2 cafes iguales y salgan como dos diferentes
    FOREIGN KEY (nombreCafe, tuesteCafe,pesoCafe,origenCafe,nombreTienda) REFERENCES cafes(nombre, tueste,peso,origen,nombreTienda)ON UPDATE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias)
);


CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    direccion VARCHAR(200) NOT NULL,
    aliasUsuario VARCHAR(50),
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias),
    FOREIGN KEY (direccion) REFERENCES direcciones(direccion)
);


CREATE TABLE cafes_pedidos (
    idPedido INT,
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    origenCafe VARCHAR(100),
    pesoCafe DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(nombreCafe,tuesteCafe,origenCafe,pesoCafe,nombreTienda,idPedido),
    FOREIGN KEY (idPedido) REFERENCES pedidos(id)
    
);
