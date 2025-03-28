CREATE DATABASE Financiero;
USE Financiero;

CREATE TABLE dim_cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    DNI VARCHAR(20),
    Email VARCHAR(100),
    Telefono VARCHAR(15)
);

CREATE TABLE dim_sucursal (
    ID_Sucursal INT PRIMARY KEY,
    Nombre_Sucursal VARCHAR(50),
    Ciudad VARCHAR(50),
    Direccion VARCHAR(20)
);

CREATE TABLE dim_estatus (
    ID_Estatus INT PRIMARY KEY,
    Tipo_Prestamo ENUM('Personal','Automotriz','Hipotecario'),
    Estado ENUM('En proceso','Aprobado','Rechazado') NOT NULL
);

CREATE TABLE dim_fecha (
    ID_Fecha INT PRIMARY KEY,
    Fecha DATE
);

CREATE TABLE fact_historial (
    ID_Historial INT PRIMARY KEY,
    ID_Sucursal INT,
    ID_Cliente INT,
    ID_Fecha INT,
    ID_Estatus INT,
    Pago DECIMAL(10,2),
    Deuda DECIMAL(10,2),
    FOREIGN KEY (ID_Sucursal) REFERENCES dim_sucursal(ID_Sucursal),
    FOREIGN KEY (ID_Cliente) REFERENCES dim_cliente(ID_Cliente),
    FOREIGN KEY (ID_Fecha) REFERENCES dim_fecha(ID_Fecha),
    FOREIGN KEY (ID_Estatus) REFERENCES dim_estatus(ID_Estatus)
);

-- Crear la base de datos
DROP DATABASE IF EXISTS Financiero;
CREATE DATABASE Financiero;
USE Financiero;

-- Crear tablas
CREATE TABLE dim_cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    DNI VARCHAR(20),
    Email VARCHAR(100),
    Telefono VARCHAR(15)
);

CREATE TABLE dim_sucursal (
    ID_Sucursal INT PRIMARY KEY,
    Nombre_Sucursal VARCHAR(50),
    Ciudad VARCHAR(50),
    Direccion VARCHAR(100)
);

CREATE TABLE dim_estatus (
    ID_Estatus INT PRIMARY KEY,
    Tipo_Prestamo ENUM('Personal','Automotriz','Hipotecario'),
    Estado ENUM('En proceso','Aprobado','Rechazado') NOT NULL
);

CREATE TABLE dim_fecha (
    ID_Fecha INT PRIMARY KEY,
    Fecha DATE
);

CREATE TABLE fact_historial (
    ID_Historial INT PRIMARY KEY,
    ID_Sucursal INT,
    ID_Cliente INT,
    ID_Fecha INT,
    ID_Estatus INT,
    Pago DECIMAL(10,2),
    Deuda DECIMAL(10,2),
    FOREIGN KEY (ID_Sucursal) REFERENCES dim_sucursal(ID_Sucursal),
    FOREIGN KEY (ID_Cliente) REFERENCES dim_cliente(ID_Cliente),
    FOREIGN KEY (ID_Fecha) REFERENCES dim_fecha(ID_Fecha),
    FOREIGN KEY (ID_Estatus) REFERENCES dim_estatus(ID_Estatus)
);

-- Insertar clientes
INSERT INTO dim_cliente VALUES
(1, 'Laura', 'Hernández', '10000001', 'laura@example.com', '555111222'),
(2, 'Diego', 'Martínez', '10000002', 'diego@example.com', '555333444'),
(3, 'Sofía', 'Ramírez', '10000003', 'sofia@example.com', '555555666'),
(4, 'Jorge', 'López', '10000004', 'jorge@example.com', '555777888'),
(5, 'Camila', 'González', '10000005', 'camila@example.com', '555999000'),
(6, 'Luis', 'Ortega', '10000006', 'luis@example.com', '555123456'),
(7, 'Valeria', 'Morales', '10000007', 'valeria@example.com', '555789123'),
(8, 'Pedro', 'Vega', '10000008', 'pedro@example.com', '555456789'),
(9, 'Lucía', 'Castillo', '10000009', 'lucia@example.com', '555321654'),
(10, 'Andrés', 'Mendoza', '10000010', 'andres@example.com', '555987321');

-- Insertar sucursales
INSERT INTO dim_sucursal VALUES
(1, 'Sucursal Centro', 'Ciudad A', 'Av. Central 100'),
(2, 'Sucursal Norte', 'Ciudad B', 'Calle Norte 200'),
(3, 'Sucursal Sur', 'Ciudad C', 'Av. Sur 300'),
(4, 'Sucursal Este', 'Ciudad D', 'Calle del Sol 400'),
(5, 'Sucursal Oeste', 'Ciudad E', 'Av. del Lago 500');

-- Insertar estatus de préstamos
INSERT INTO dim_estatus VALUES
(1, 'Personal', 'Aprobado'),
(2, 'Automotriz', 'En proceso'),
(3, 'Hipotecario', 'Rechazado'),
(4, 'Personal', 'En proceso'),
(5, 'Hipotecario', 'Aprobado'),
(6, 'Automotriz', 'Aprobado'),
(7, 'Personal', 'Rechazado'),
(8, 'Hipotecario', 'En proceso'),
(9, 'Automotriz', 'Rechazado'),
(10, 'Hipotecario', 'Aprobado');

-- Insertar fechas
INSERT INTO dim_fecha VALUES
(1, '2024-01-10'),
(2, '2024-02-14'),
(3, '2024-03-01'),
(4, '2024-03-15'),
(5, '2024-03-30'),
(6, '2024-04-10'),
(7, '2024-04-20'),
(8, '2024-04-25'),
(9, '2024-05-01'),
(10, '2024-05-10');

-- Insertar historial financiero
INSERT INTO fact_historial VALUES
(1, 1, 1, 1, 1, 5000.00, 10000.00),      
(2, 1, 2, 2, 6, 3000.00, 9000.00),       
(3, 2, 3, 3, 5, 6000.00, 9000.00),       
(4, 2, 4, 4, 1, 7000.00, 8000.00),       
(5, 3, 5, 5, 1, 4000.00, 11000.00),      
(6, 4, 6, 6, 6, 8000.00, 17000.00),      
(7, 4, 7, 7, 1, 2500.00, 7500.00),       
(8, 5, 8, 8, 2, 0.00, 0.00),             
(9, 5, 9, 9, 3, 0.00, 0.00),             
(10, 3, 10, 10, 10, 10000.00, 20000.00); 

SELECT 
    c.Nombre AS Cliente,
    c.Apellido AS Apellido,
    f.Fecha,
    e.Tipo_Prestamo,
    e.Estado AS Estado_Prestamo,
    h.Pago,
    h.Deuda,
    (h.Deuda - h.Pago) AS Total_Prestamo
FROM fact_historial h
JOIN dim_cliente c ON h.ID_Cliente = c.ID_Cliente
JOIN dim_fecha f ON h.ID_Fecha = f.ID_Fecha
JOIN dim_estatus e ON h.ID_Estatus = e.ID_Estatus;



