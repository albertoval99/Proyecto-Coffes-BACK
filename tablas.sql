CREATE TABLE usuarios (
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    imagen VARCHAR(255)
);

CREATE TABLE tiendas ( nombre VARCHAR(100) PRIMARY KEY );

CREATE TABLE administradores (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nombreTienda VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (nombreTienda) REFERENCES tiendas (nombre)
);

INSERT INTO
    administradores (alias, password, nombretienda)
VALUES (
        'Malladeta',
        '$2a$10$yAl8fMYj6JOGRjQxztbe5uyr7p1fJSMyNXQuAetR0dQo4mtJ22ore',
        'Mercadona'
    );

CREATE TABLE cafes (
    nombre VARCHAR(100),
    tueste VARCHAR(100),
    precio DECIMAL(10, 2) NOT NULL,
    origen VARCHAR(100),
    peso DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    PRIMARY KEY (
        nombre,
        tueste,
        peso,
        origen,
        nombreTienda
    ),
    FOREIGN KEY (nombreTienda) REFERENCES tiendas (nombre)
);

ALTER TABLE cafes DROP CONSTRAINT cafes_pkey;

ALTER TABLE cafes
ADD PRIMARY KEY (
    nombre,
    tueste,
    peso,
    origen,
    nombreTienda
);

CREATE TABLE carritos (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    origenCafe VARCHAR(100),
    pesoCafe DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    aliasUsuario VARCHAR(50),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (
        nombreCafe,
        tuesteCafe,
        aliasUsuario,
        pesoCafe,
        origenCafe,
        nombreTienda
    ),
    FOREIGN KEY (
        nombreCafe,
        tuesteCafe,
        pesoCafe,
        origenCafe,
        nombreTienda
    ) REFERENCES cafes (
        nombre,
        tueste,
        peso,
        origen,
        nombreTienda
    ) ON UPDATE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios (alias)
);

/**
 * Tablas modificadas y direcciones borrada
 */

CREATE TABLE valoraciones (
    nombreCafe VARCHAR(100),
    tuesteCafe VARCHAR(100),
    origenCafe VARCHAR(100),
    pesoCafe DECIMAL(10, 2),
    nombreTienda VARCHAR(100),
    aliasUsuario VARCHAR(50),
    valoracion INT CHECK (valoracion BETWEEN 0 AND 5),
    PRIMARY KEY (
        nombreCafe,
        tuesteCafe,
        pesoCafe,
        origenCafe,
        aliasUsuario,
        nombreTienda
    ),
    FOREIGN KEY (
        nombreCafe,
        tuesteCafe,
        pesoCafe,
        origenCafe,
        nombreTienda
    ) REFERENCES cafes (
        nombre,
        tueste,
        peso,
        origen,
        nombreTienda
    ) ON UPDATE CASCADE,
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios (alias)
);

ALTER TABLE valoraciones ADD COLUMN precioCafe DECIMAL(10, 2) NOT NULL;

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    tarjeta VARCHAR(16) NOT NULL,
    fechacaducidad VARCHAR(5) NOT NULL,
    cvv INT NOT NULL,
    aliasUsuario VARCHAR(50),
    FOREIGN KEY (aliasUsuario) REFERENCES usuarios (alias)
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
    PRIMARY KEY (
        nombreCafe,
        tuesteCafe,
        origenCafe,
        pesoCafe,
        nombreTienda,
        idPedido
    ),
    FOREIGN KEY (idPedido) REFERENCES pedidos (id)
);