-- -----------------------------------------------------
-- Schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Watty` ;

-- -----------------------------------------------------
-- Schema 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Watty`;
USE `Watty` ;

-- Tabla: USUARIO
CREATE TABLE USUARIO (
  `Id_User` INT auto_increment NOT NULL UNIQUE,
  `Run_User` VARCHAR(10) NOT NULL UNIQUE,
  `Nom_User` VARCHAR(50) NOT NULL,
  `Correo_User` VARCHAR(70) NOT NULL,
  `Contra_User` VARCHAR(8) NOT NULL,
  `Celular_User` VARCHAR(12) NOT NULL,
  `FechaCreacion_User` DATE NOT NULL,
  `Foto_User` BLOB
) auto_increment=10;

-- Tabla: TIPO_AMBIENTE
CREATE TABLE TIPO_AMBIENTE (
    Id_TipoAmb INTEGER PRIMARY KEY  NOT NULL,
    Nombre_TipoAmb VARCHAR(45) NOT NULL,
    Consumo_Ambiente INTEGER
);

-- Tabla: AMBIENTE
CREATE TABLE AMBIENTE (
    Id_Ambiente INTEGER PRIMARY KEY AUTO_INCREMENT,
    Id_TipoAmb INTEGER,
    Nombre_Ambiente VARCHAR(45) NOT NULL,
    Id_User INTEGER,
    FOREIGN KEY (Id_TipoAmb) REFERENCES TIPO_AMBIENTE (Id_TipoAmb),
    FOREIGN KEY (Id_User) REFERENCES USUARIO (Id_User)
) auto_increment=1000;

-- Tabla: ELECTRODOMESTICO
CREATE TABLE ELECTRODOMESTICO (
    Id_Elect INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre_Elect VARCHAR(45) NOT NULL,
    Marca_Elect VARCHAR(20) NOT NULL,
    Foto_Elect VARCHAR(45),
    ConsumoKWh_Elect DECIMAL(15,2),
    HorasUso_Elect INTEGER,
    PotenciaKw_Elect DECIMAL(15,5)
) auto_increment=100;

-- Tabla: DETALLE_AMBIENTE
CREATE TABLE DETALLE_AMBIENTE (
    Id_DetalleAmb INTEGER PRIMARY KEY AUTO_INCREMENT,
    Id_Elect INTEGER,
    Id_Ambiente INTEGER,
    FOREIGN KEY (Id_Elect) REFERENCES ELECTRODOMESTICO (Id_Elect),
    FOREIGN KEY (Id_Ambiente) REFERENCES AMBIENTE (Id_Ambiente)
);

-- Tabla: META_MENSUAL
CREATE TABLE META_MENSUAL (
    Id_Mensual INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Mes_Mensual DATE NOT NULL,
    MetaKw_Mensual DECIMAL(15,5) NOT NULL,
    MetaCosto_Mensual DECIMAL(15,5) NOT NULL,
    Id_User INT NOT NULL,
    FOREIGN KEY (Id_User) REFERENCES USUARIO(Id_User)
);

-- Tabla: CONSUMO_ENERGETICO_DIARIO (AÚN SIN USO)
CREATE TABLE CONSUMO_ENERGETICO_DIARIO (
    Id_ConsumoDiario INTEGER PRIMARY KEY AUTO_INCREMENT,
    Fecha_Consumo DATETIME NOT NULL,
    TotalkWh_Consumo DECIMAL(15,2),
    TotalCosto_Diario DECIMAL(15,3),
    Id_Ambiente INT,
    Id_User INT,
    FOREIGN KEY (Id_Ambiente) REFERENCES AMBIENTE(Id_Ambiente),
    FOREIGN KEY (Id_User) REFERENCES USUARIO(Id_User)
);



-- INSERT'S
-- Insertar en USUARIO
INSERT INTO USUARIO (Run_User, Nom_User, Correo_User, Celular_User, Contra_User, FechaCreacion_User)
VALUES
('11111111-1', 'Kevin Parker', 'kevin@gmail.com', '912345678', 'pass123', '2024-01-15'),
('22222222-2', 'Ana Lopez', 'ana@gmail.com', '923456789', 'ana2024', '2024-02-10');

-- Insertar Tipos de Ambiente
INSERT INTO TIPO_AMBIENTE (Id_TipoAmb, Nombre_TipoAmb)
VALUES 
(100, 'Cocina'),
(200, 'Sala de Estar'),
(300, 'Comedor'),
(400, 'Dormitorio'),
(500, 'Baño'),
(600, 'Lavandería'),
(700, 'Oficina'),
(800, 'Garaje'),
(900, 'Patio');

-- Insertar Ambientes para cada usuario
INSERT INTO AMBIENTE (Nombre_Ambiente, Id_User, Id_TipoAmb)
VALUES
('Cocina Principal', 10, 100),
('Sala de Estar Familiar', 10, 200),
('Dormitorio Principal', 11, 400),
('Baño en Suite', 11, 500),
('Garaje Familiar', 10, 800);

-- Insertar Electrodomésticos
INSERT INTO ELECTRODOMESTICO (Nombre_Elect, Marca_Elect, Foto_Elect, ConsumoKWh_Elect, HorasUso_Elect, PotenciaKw_Elect)
VALUES
('Refrigerador','LG', 'refrigerador.png', 120.50, 24, 0.15000),
('Congelador','Samsung', 'Congelador.png', 170.50, 24, 0.19000),
('Televisor 55"','TCL', 'televisor.png', 15.75, 6, 0.10000),
('Aire Acondicionado','Nose', 'aire.png', 250.00, 8, 2.50000),
('Cámara de Seguridad','NosE', 'camara.png', 5.50, 24, 0.00500),
('Taladro Eléctrico','Bauker', 'taladro.png', 300.00, 2, 0.75000);

-- Insertar Detalles de Ambientes (Relación entre Ambiente y Electrodoméstico)
INSERT INTO DETALLE_AMBIENTE (Id_Elect, Id_Ambiente)
VALUES
(100, 1000), -- Refrigerador en la Cocina Principal
(101, 1000), -- Congelador en la Cocina Principal
(102, 1001), -- Televisor en la Sala de Estar
(103, 1002), -- Aire Acondicionado en el Dormitorio Principal
(104, 1004), -- Cámara de Seguridad en el Garaje
(105, 1004); -- Taladro Eléctrico en el Garaje


-- Insertar Metas Mensuales
INSERT INTO META_MENSUAL (Mes_Mensual, MetaKw_Mensual, MetaCosto_Mensual, Id_User)
VALUES
('2024-01-01', 500.00, 100.00, 10),
('2024-01-01', 400.00, 80.00,11);


USE WATTY;
select * from usuario;
SELECT * FROM ELECTRODOMESTICO;
SELECT * FROM ambiente;
select * from Detalle_Ambiente;


SELECT AMBIENTE.Id_Ambiente, AMBIENTE.Nombre_Ambiente, ELECTRODOMESTICO.Nombre_Elect, ELECTRODOMESTICO.ConsumokWh_Elect
FROM AMBIENTE
INNER JOIN detalle_ambiente ON AMBIENTE.Id_ambiente = detalle_ambiente.Id_ambiente
INNER JOIN ELECTRODOMESTICO ON detalle_ambiente.ID_elect = ELECTRODOMESTICO.Id_elect
WHERE ID_USER=1;

SELECT Id_User, Nom_User, Correo_User, Celular_User
  FROM USUARIO
  WHERE Correo_User = ? AND Contra_User = ?
