CREATE TABLE usuarios (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tiendas (
    nombre VARCHAR(100) PRIMARY KEY
);
INSERT INTO tiendas (nombre) VALUES ('Mercadona');

CREATE TABLE administradores (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nombreTienda VARCHAR(100) NOT NULL,
    FOREIGN KEY (nombreTienda) REFERENCES tiendas(nombre) ON DELETE CASCADE
);


CREATE TABLE cafes (
    nombre VARCHAR(100),
    tueste VARCHAR(100),
    precio DECIMAL(10, 2) NOT NULL,
    origen VARCHAR(100) NOT NULL,
    aliasAdmin VARCHAR(50),
    PRIMARY KEY (nombre, tueste),
    FOREIGN KEY (aliasAdmin) REFERENCES administradores(alias) ON DELETE SET NULL
);


CREATE TABLE valoraciones (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    aliasUsuario VARCHAR(50),
    valoracion INT CHECK (valoracion BETWEEN 0 AND 5),
    PRIMARY KEY (nombreCafe, tuesteCafe, aliasUsuario), -- Para q un usuario no pueda valorar el mismo cafe dos veces
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafes(nombre, tueste) ON DELETE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias) ON DELETE CASCADE
);


CREATE TABLE carritos (
    aliasUsuario VARCHAR(50) PRIMARY KEY,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias) ON DELETE CASCADE
);

CREATE TABLE cantidades_cafes_carritos (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    aliasUsuario VARCHAR(50),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (nombreCafe, tuesteCafe, aliasUsuario), -- Evita q puedas añadir 2 cafes iguales y salgan como dos diferentes
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafes(nombre, tueste) ON DELETE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias) ON DELETE CASCADE
);


CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    aliasUsuario VARCHAR(50),
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios(alias) ON DELETE CASCADE
);


CREATE TABLE cafes_pedidos (
    idPedido INT,
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (nombreCafe, tuesteCafe) REFERENCES cafes(nombre, tueste) ON DELETE CASCADE
);
