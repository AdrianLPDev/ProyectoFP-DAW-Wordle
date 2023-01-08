-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-01-2023 a las 16:48:57
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wordlabras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas`
--

CREATE TABLE `estadisticas` (
  `id_estadistica` int(11) NOT NULL,
  `usuario` varchar(252) NOT NULL,
  `fecha` varchar(252) NOT NULL,
  `victoria` tinyint(1) NOT NULL,
  `intentos` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estadisticas`
--

INSERT INTO `estadisticas` (`id_estadistica`, `usuario`, `fecha`, `victoria`, `intentos`) VALUES
(1, 'admin', '30-11-2022', 1, 1),
(2, 'admin', '01-12-2022', 1, 1),
(3, 'admin', '02-12-2022', 1, 1),
(4, 'usuario', '29-12-2022', 1, 5),
(5, 'usuario', '28-12-2022', 1, 5),
(6, 'usuario', '27-12-2022', 1, 1),
(7, 'a', '03-01-2023', 1, 1),
(8, 'a', '06-01-2023', 1, 1),
(9, 'a', '07-01-2023', 1, 4),
(10, 'admin', '07-01-2023', 1, 6),
(11, 'b', '01-01-2023', 1, 2),
(12, 'b', '02-01-2023', 1, 2),
(13, 'b', '03-01-2023', 1, 2),
(15, 'usuario', '07-01-2023', 1, 4),
(16, 'b', '07-01-2023', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(252) NOT NULL,
  `usuario` varchar(252) NOT NULL,
  `password` varchar(252) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `usuario`, `password`) VALUES
(1, 'admin@admin.com', 'admin', 'admin'),
(2, 'usuario@usuario.com', 'usuario', 'usuario'),
(3, 'a@a.com', 'a', 'a'),
(4, 'b@b.com', 'b', 'b'),
(5, 'c@c.com', 'c', 'c'),
(6, 'd@d.com', 'd', 'd'),
(7, 'Adrian@iesgalileo.es', 'adrian', 'adrian');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD PRIMARY KEY (`id_estadistica`),
  ADD KEY `FK_usuario` (`usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  MODIFY `id_estadistica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD CONSTRAINT `FK_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
