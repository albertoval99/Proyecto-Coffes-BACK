CREATE TABLE usuario (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tienda (
    nombre VARCHAR(100) PRIMARY KEY
);

CREATE TABLE admin (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nombreTienda VARCHAR(100) NOT NULL,
    FOREIGN KEY (nombreTienda) REFERENCES tienda(nombre) ON DELETE CASCADE
);

CREATE TABLE cafe (
    nombre VARCHAR(100),
    tueste VARCHAR(100),
    precio DECIMAL(10, 2) NOT NULL,
    origen VARCHAR(100) NOT NULL,
    aliasAdmin VARCHAR(50),
    PRIMARY KEY (nombre, tueste),
    FOREIGN KEY (aliasAdmin) REFERENCES admin(alias) ON DELETE SET NULL
);


CREATE TABLE valoracion (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    aliasUsuario VARCHAR(50),
    valoracion INT CHECK (valoracion BETWEEN 0 AND 5),
    PRIMARY KEY (nombreCafe, tuesteCafe, aliasUsuario), -- Para q un usuario no pueda valorar el mismo cafe dos veces
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafe(nombre, tueste) ON DELETE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuario(alias) ON DELETE CASCADE
);


CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    aliasUsuario VARCHAR(50),
    FOREIGN KEY (aliasUsuario) REFERENCES usuario(alias) ON DELETE CASCADE
);


CREATE TABLE cantidad_cafe_carrito (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    idCarrito INT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (nombreCafe, tuesteCafe, idCarrito), -- Evita q puedas añadir 2 cafes iguales y salgan como dos diferentes
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafe(nombre, tueste) ON DELETE CASCADE,
    FOREIGN KEY (idCarrito) REFERENCES carrito(id) ON DELETE CASCADE
);


CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aliasUsuario VARCHAR(50),
    FOREIGN KEY (aliasUsuario) REFERENCES usuario(alias) ON DELETE CASCADE
);


CREATE TABLE cafe_pedido (
    idPedido INT,
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafe(nombre, tueste) ON DELETE CASCADE
);
