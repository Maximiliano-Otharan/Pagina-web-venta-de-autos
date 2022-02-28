-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2022 a las 19:44:52
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autosdisp`
--

CREATE TABLE `autosdisp` (
  `Id` int(255) NOT NULL,
  `Modelo` varchar(255) NOT NULL,
  `Pais_de_origen` varchar(255) NOT NULL,
  `Motor` varchar(255) NOT NULL,
  `Peso` varchar(255) NOT NULL,
  `Traccion` varchar(10) NOT NULL,
  `Tipo_de_carroceria` varchar(10) NOT NULL,
  `Potencia` varchar(100) NOT NULL,
  `Velocidad_maxima` varchar(100) NOT NULL,
  `Combustible` varchar(100) NOT NULL,
  `Precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autosdisp`
--

INSERT INTO `autosdisp` (`Id`, `Modelo`, `Pais_de_origen`, `Motor`, `Peso`, `Traccion`, `Tipo_de_carroceria`, `Potencia`, `Velocidad_maxima`, `Combustible`, `Precio`) VALUES
(9, 'M4 Supra(Oriental)', 'Japon', '2jz-gte en linea 6', '1410-1570 kg', 'RWD', 'Coupe', '243kw', '250km/h', 'Gasolina', 2000),
(10, 'Evolution VII', 'Japon', '4G63 Turbo 4 en línea', '1380 kg', 'AWD', 'Sedan', '206kw', '241km/h', 'Gasolina', 5000),
(12, 'M3-B30', 'Alemania', '2,3-2,5 L S14 I4', '1.165–1.360 kg', 'RWD', 'Coupe', '206kw', '239.4km/h', 'Gasolina', 5000),
(37, 'Chevrolet corsa', 'Estados Unidos', 'GM4200 L4', '67,5', 'FWD', 'Sedan', '92hpw', '182km/h', 'Gasolina', 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `Id` int(11) NOT NULL,
  `Modelo` varchar(255) NOT NULL,
  `Pais_de_origen` varchar(255) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Id_auto_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autosdisp`
--
ALTER TABLE `autosdisp`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_auto_fk` (`Id_auto_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autosdisp`
--
ALTER TABLE `autosdisp`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=452;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`Id_auto_fk`) REFERENCES `autosdisp` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
