-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 19, 2024 alle 19:36
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblioteca_diminich`
--

DELIMITER $$
--
-- Procedure
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `CarteInScaffale` (IN `scaffale_id` INT)   BEGIN
    -- Corpo della stored procedure
    SELECT COUNT(*)
    FROM tscaffale
    JOIN tscaffalecarta ON tscaffale.idScaffale = tscaffalecarta.idScaffale
    WHERE tscaffale.idScaffale = scaffale_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAutore` (IN `nome` VARCHAR(255), IN `cognome` VARCHAR(255))   BEGIN
    INSERT INTO tautore (nome,cognome)
    VALUES (nome,cognome);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertCasaEditrice` (IN `nome` VARCHAR(255))   BEGIN
    INSERT INTO tcasaeditrice (nome)
    VALUES (nome);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPosizioneCarta` (IN `p_idScaffale` INT, IN `p_Indice` INT, IN `p_numeroScaffale` INT)   BEGIN
    INSERT INTO tscaffalecarta(idScaffale, idCarta, numeroScaffale)
    VALUES (p_idScaffale, p_Indice, p_numeroScaffale);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPosizioneLibro` (IN `p_idScaffale` INT, IN `p_Indice` INT, IN `p_numeroScaffale` INT)   BEGIN
    INSERT INTO tscaffalelibro(idScaffale, idLibro, numeroScaffale)
    VALUES (p_idScaffale, p_Indice, p_numeroScaffale);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPosizioneVolume` (IN `p_idScaffale` INT, IN `p_Indice` INT, IN `p_numeroScaffale` INT)   BEGIN
    INSERT INTO tscaffalevolume(idScaffale, idVolume, numeroScaffale)
    VALUES (p_idScaffale, p_Indice, p_numeroScaffale);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LibriInScaffale` (IN `scaffale_id` INT)   BEGIN
    -- Corpo della stored procedure
    SELECT COUNT(*)
    FROM tscaffale
    JOIN tscaffalelibro ON tscaffale.idScaffale = tscaffalelibro.idScaffale
    WHERE tscaffale.idScaffale = scaffale_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `scaffaliCarta` ()   BEGIN
    -- Corpo della stored procedure
    SELECT idScaffale, nome
    FROM tscaffale
    WHERE nome LIKE '%Carta%';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `scaffaliLibro` ()   BEGIN
    -- Corpo della stored procedure
    SELECT idScaffale, nome
    FROM tscaffale
    WHERE nome LIKE '%Libro%';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `scaffaliVolume` ()   BEGIN
    -- Corpo della stored procedure
    SELECT idScaffale, nome
    FROM tscaffale
    WHERE nome LIKE '%Enciclopedia%';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `VolumiiInScaffale` (IN `scaffale_id` INT)   BEGIN
    -- Corpo della stored procedure
    SELECT COUNT(*)
    FROM tscaffale
    JOIN tscaffalevolume ON tscaffale.idScaffale = tscaffalevolume.idScaffale
    WHERE tscaffale.idScaffale = scaffale_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `tarmadio`
--

CREATE TABLE `tarmadio` (
  `idArmadio` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tarmadio`
--

INSERT INTO `tarmadio` (`idArmadio`, `nome`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4');

-- --------------------------------------------------------

--
-- Struttura della tabella `tautore`
--

CREATE TABLE `tautore` (
  `idAutore` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tautore`
--

INSERT INTO `tautore` (`idAutore`, `nome`, `cognome`) VALUES
(1, 'Jane', 'Austen'),
(2, 'Leo', 'Tolstoy'),
(3, 'Virginia', 'Woolf'),
(4, 'Gabriel', 'García Márquez'),
(5, 'Agatha', 'Christie'),
(6, 'Ernest', 'Hemingway'),
(7, 'J.K.', 'Rowling'),
(8, 'Mark', 'Twain'),
(9, 'George', 'Orwell'),
(10, 'Toni', 'Morrison'),
(15, 'Andrea', 'Kusuanco'),
(16, 'Ciccio', 'Gamer89');

-- --------------------------------------------------------

--
-- Struttura della tabella `tautorecarta`
--

CREATE TABLE `tautorecarta` (
  `idAutoreCarta` int(11) NOT NULL,
  `idCartaGeoPolitica` int(255) NOT NULL,
  `idAutore` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tautorecarta`
--

INSERT INTO `tautorecarta` (`idAutoreCarta`, `idCartaGeoPolitica`, `idAutore`) VALUES
(1, 3, 2),
(2, 4, 6),
(3, 4, 10),
(4, 7, 8),
(5, 6, 1),
(6, 1, 1),
(7, 2, 2),
(8, 6, 6),
(9, 10, 1),
(10, 10, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `tautoreenciclopedia`
--

CREATE TABLE `tautoreenciclopedia` (
  `idMultiAutori` int(11) NOT NULL,
  `idAutore` int(11) NOT NULL,
  `idEnciclopedia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tautoreenciclopedia`
--

INSERT INTO `tautoreenciclopedia` (`idMultiAutori`, `idAutore`, `idEnciclopedia`) VALUES
(1, 5, 10),
(2, 4, 10),
(3, 4, 9),
(4, 4, 6),
(5, 7, 7),
(6, 2, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `tcartageopolitica`
--

CREATE TABLE `tcartageopolitica` (
  `idCartaGeoPolitica` int(11) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `dataRappresentazione` date NOT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL,
  `isbn` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tcartageopolitica`
--

INSERT INTO `tcartageopolitica` (`idCartaGeoPolitica`, `titolo`, `data`, `dataRappresentazione`, `idCasaEditrice`, `isbn`) VALUES
(1, 'Mappa geopolitica dell\'Europa', '2023-05-15', '2023-06-01', 1, '1'),
(2, 'Le grandi potenze mondiali', '2023-08-20', '2023-09-10', 2, '2'),
(3, 'Crisi politica in Medio Oriente', '2023-10-10', '2023-10-25', 3, '3'),
(4, 'L\'Africa post-coloniale', '2023-04-05', '2023-05-01', 1, '4'),
(5, 'La geopolitica dell\'Asia orientale', '2023-06-12', '2023-07-01', 2, '5'),
(6, 'La Russia e il suo ruolo nel mondo contemporaneo', '2023-09-25', '2023-10-10', 3, '6'),
(7, 'L\'America Latina nel XXI secolo', '2023-11-15', '2023-12-01', 1, '7'),
(8, 'Il Medio Oriente e il petrolio', '2023-02-20', '2023-03-10', 2, '8'),
(9, 'Le dispute territoriali nel Mar Cinese Meridionale', '2023-07-08', '2023-08-01', 3, '9'),
(10, 'La politica estera degli Stati Uniti', '2023-10-30', '2023-11-15', 1, '10'),
(31, 'testAutoPos', '2024-05-02', '2014-05-01', 5, '1111111111111111111111111');

-- --------------------------------------------------------

--
-- Struttura della tabella `tcasaeditrice`
--

CREATE TABLE `tcasaeditrice` (
  `idCasaEditrice` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tcasaeditrice`
--

INSERT INTO `tcasaeditrice` (`idCasaEditrice`, `nome`) VALUES
(1, 'Penguin Random House'),
(2, 'HarperCollins Publishers'),
(3, 'Simon & Schuster'),
(4, 'Macmillan Publishers'),
(5, 'Hachette Livre'),
(11, 'I Paguri');

-- --------------------------------------------------------

--
-- Struttura della tabella `tcliente`
--

CREATE TABLE `tcliente` (
  `IdCliente` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `codiceFiscale` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tcliente`
--

INSERT INTO `tcliente` (`IdCliente`, `nome`, `cognome`, `codiceFiscale`, `password`, `mail`) VALUES
(1, 'Nicolas', 'Diminich', 'codiceFiscvale', '1234', 'test@gmail.com'),
(2, 'test2', 'test2', 'test2', 'test2', 'test2@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `tenciclopedia`
--

CREATE TABLE `tenciclopedia` (
  `idEnciclopedia` int(11) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `volumiTotali` int(11) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tenciclopedia`
--

INSERT INTO `tenciclopedia` (`idEnciclopedia`, `titolo`, `data`, `volumiTotali`, `isbn`, `idCasaEditrice`) VALUES
(6, 'Enciclopedia di Storia Antica', '2023-01-15', 10, '978-1234567890', 1),
(7, 'Enciclopedia di Biologia Moderna', '2023-02-20', 8, '978-2345678901', 1),
(8, 'Enciclopedia di Fisica Quantistica', '2023-03-25', 12, '978-3456789012', 2),
(9, 'Enciclopedia di Letteratura Contemporanea', '2023-04-30', 7, '978-4567890123', 2),
(10, 'Enciclopedia di Arte Medievale', '2023-05-10', 5, '978-5678901234', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `tlavoratore`
--

CREATE TABLE `tlavoratore` (
  `idLavoratore` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `codiceFiscale` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tlavoratore`
--

INSERT INTO `tlavoratore` (`idLavoratore`, `nome`, `cognome`, `codiceFiscale`, `password`) VALUES
(1, 'Nicolas', 'Diminich', '1234', '12');

-- --------------------------------------------------------

--
-- Struttura della tabella `tlibro`
--

CREATE TABLE `tlibro` (
  `idLibro` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `pubblicazione` date NOT NULL,
  `idAutore` int(11) DEFAULT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tlibro`
--

INSERT INTO `tlibro` (`idLibro`, `nome`, `isbn`, `pubblicazione`, `idAutore`, `idCasaEditrice`) VALUES
(11, 'Orgoglio e Pregiudizio', '978-8809020422', '1813-01-28', 1, 1),
(12, 'Anna Karenina', '978-1853262715', '1877-01-01', 2, 2),
(13, 'La signora Dalloway', '978-0099470458', '1925-05-14', 3, 3),
(14, 'Cent\'anni di solitudine', '978-8811661844', '1967-05-30', 4, 4),
(15, 'Dieci piccoli indiani', '978-8804610459', '1939-11-06', 5, 5),
(16, 'Il vecchio e il mare', '978-8807890135', '1952-09-01', 6, 1),
(17, 'Harry Potter e la Pietra Filosofale', '978-88-7645-211-9', '1997-06-26', 7, 2),
(18, 'Le avventure di Tom Sawyer', '978-8804424350', '1876-12-10', 8, 3),
(19, '1984', '978-88-04-18278-0', '1949-06-08', 9, 4),
(20, 'Beloved', '978-8807818436', '1987-09-02', 10, 5),
(21, 'Skibidy Toiler', '12312313213123', '2017-05-03', 9, 5),
(22, 'In Cucina con Ciccio', '888-8-888-88888-8', '2020-12-25', 16, 11);

-- --------------------------------------------------------

--
-- Struttura della tabella `tprenotazione`
--

CREATE TABLE `tprenotazione` (
  `idPrenotazione` int(11) NOT NULL,
  `idCliente` int(255) NOT NULL,
  `idLibro` int(255) NOT NULL,
  `dataPrenotazione` date NOT NULL,
  `dataAccetazione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tprenotazione`
--

INSERT INTO `tprenotazione` (`idPrenotazione`, `idCliente`, `idLibro`, `dataPrenotazione`, `dataAccetazione`) VALUES
(1, 1, 19, '2024-04-01', '2024-05-01'),
(3, 1, 17, '2024-05-02', '2024-05-13'),
(32, 1, 15, '2024-05-02', NULL),
(66, 1, 16, '2024-05-06', '2024-05-13'),
(67, 1, 11, '2024-05-07', '2024-05-12'),
(68, 1, 22, '2024-05-19', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `tprenotazionecarta`
--

CREATE TABLE `tprenotazionecarta` (
  `idPrenotazione` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idCarta` int(11) NOT NULL,
  `dataPrenotazione` date NOT NULL,
  `dataAccetazione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tprenotazionecarta`
--

INSERT INTO `tprenotazionecarta` (`idPrenotazione`, `idCliente`, `idCarta`, `dataPrenotazione`, `dataAccetazione`) VALUES
(1, 1, 1, '2024-05-05', '2024-05-13'),
(2, 1, 4, '2024-05-05', NULL),
(3, 1, 7, '2024-05-05', NULL),
(4, 1, 3, '2024-05-06', '2024-05-13');

-- --------------------------------------------------------

--
-- Struttura della tabella `tprenotazioneenciclopedia`
--

CREATE TABLE `tprenotazioneenciclopedia` (
  `idPrenotazione` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idVolume` int(11) NOT NULL,
  `dataPrenotazione` date NOT NULL,
  `dataAccetazione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tprestito`
--

CREATE TABLE `tprestito` (
  `idPrestito` int(11) NOT NULL,
  `idPrenotazione` int(255) NOT NULL,
  `dataInizio` date DEFAULT NULL,
  `dataFine` date DEFAULT NULL,
  `idLavoratoreConsegna` int(11) NOT NULL,
  `idLavoratoreRitiro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tprestito`
--

INSERT INTO `tprestito` (`idPrestito`, `idPrenotazione`, `dataInizio`, `dataFine`, `idLavoratoreConsegna`, `idLavoratoreRitiro`) VALUES
(1, 1, '2024-05-01', '2024-05-12', 1, 1),
(5, 67, NULL, '2024-05-13', 1, 1),
(6, 66, NULL, NULL, 1, NULL),
(7, 3, '2024-05-13', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `tprestitocarta`
--

CREATE TABLE `tprestitocarta` (
  `idPrestito` int(11) NOT NULL,
  `idPrenotazione` int(11) NOT NULL,
  `dataInizio` date NOT NULL,
  `dataFine` date DEFAULT NULL,
  `idLavoratoreConsegna` int(11) NOT NULL,
  `idLavoratoreRitiro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tprestitocarta`
--

INSERT INTO `tprestitocarta` (`idPrestito`, `idPrenotazione`, `dataInizio`, `dataFine`, `idLavoratoreConsegna`, `idLavoratoreRitiro`) VALUES
(1, 4, '2024-05-13', '2024-05-13', 1, 1),
(2, 1, '2024-05-13', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `tprestitoenciclopedia`
--

CREATE TABLE `tprestitoenciclopedia` (
  `idPrestito` int(11) NOT NULL,
  `idPrenotazione` int(11) NOT NULL,
  `dataInizio` date NOT NULL,
  `dataFine` date DEFAULT NULL,
  `idLavoratoreConsegna` int(11) NOT NULL,
  `idLavoratoreRitiro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tscaffale`
--

CREATE TABLE `tscaffale` (
  `idScaffale` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `idStanza` int(11) NOT NULL,
  `idArmadio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tscaffale`
--

INSERT INTO `tscaffale` (`idScaffale`, `nome`, `idStanza`, `idArmadio`) VALUES
(1, 'testLibro', 1, 1),
(2, 'testLibro', 1, 2),
(3, 'testLibro', 1, 3),
(4, 'testCarta', 2, 1),
(5, 'testCarta', 2, 2),
(6, 'testEnciclopedia', 3, 1),
(7, 'testEnciclopedia', 3, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `tscaffalecarta`
--

CREATE TABLE `tscaffalecarta` (
  `idScaffaleCarta` int(11) NOT NULL,
  `idScaffale` int(255) NOT NULL,
  `idCarta` int(255) NOT NULL,
  `numeroScaffale` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tscaffalecarta`
--

INSERT INTO `tscaffalecarta` (`idScaffaleCarta`, `idScaffale`, `idCarta`, `numeroScaffale`) VALUES
(10, 4, 1, 1),
(11, 4, 2, 2),
(13, 4, 3, 3),
(14, 4, 4, 4),
(15, 4, 5, 5);

-- --------------------------------------------------------

--
-- Struttura della tabella `tscaffalelibro`
--

CREATE TABLE `tscaffalelibro` (
  `idScaffaleLibro` int(11) NOT NULL,
  `idScaffale` int(255) NOT NULL,
  `idLibro` int(255) NOT NULL,
  `numeroScaffale` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tscaffalelibro`
--

INSERT INTO `tscaffalelibro` (`idScaffaleLibro`, `idScaffale`, `idLibro`, `numeroScaffale`) VALUES
(10, 1, 11, 10),
(2, 1, 12, 2),
(8, 1, 13, 8),
(4, 1, 14, 4),
(5, 1, 15, 5),
(7, 1, 16, 7),
(6, 1, 17, 6),
(9, 1, 18, 9),
(1, 1, 19, 1),
(3, 1, 20, 3),
(12, 2, 21, 1),
(14, 2, 22, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `tscaffalevolume`
--

CREATE TABLE `tscaffalevolume` (
  `idScaffaleVolume` int(11) NOT NULL,
  `idScaffale` int(255) NOT NULL,
  `idVolume` int(255) NOT NULL,
  `numeroScaffale` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tscaffalevolume`
--

INSERT INTO `tscaffalevolume` (`idScaffaleVolume`, `idScaffale`, `idVolume`, `numeroScaffale`) VALUES
(1, 6, 76, 1),
(2, 6, 77, 2),
(3, 6, 78, 3),
(4, 6, 81, 4),
(5, 6, 83, 5),
(7, 6, 86, 7),
(8, 7, 87, 1),
(9, 7, 88, 2),
(10, 7, 91, 3),
(11, 7, 92, 4),
(12, 7, 93, 5),
(13, 7, 96, 6),
(14, 7, 97, 7),
(15, 7, 98, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `tstanza`
--

CREATE TABLE `tstanza` (
  `idStanza` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tstanza`
--

INSERT INTO `tstanza` (`idStanza`, `nome`) VALUES
(1, '1A'),
(2, '2B'),
(3, '3C');

-- --------------------------------------------------------

--
-- Struttura della tabella `tvolume`
--

CREATE TABLE `tvolume` (
  `idVolume` int(11) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `numeroVolume` int(255) NOT NULL,
  `idEnciclopedia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `tvolume`
--

INSERT INTO `tvolume` (`idVolume`, `isbn`, `numeroVolume`, `idEnciclopedia`) VALUES
(76, '978-0234567890', 1, 6),
(77, '978-0234567891', 2, 6),
(78, '978-0234567892', 3, 6),
(81, '978-1234567895', 1, 7),
(82, '978-2345678906', 2, 7),
(83, '978-2345678907', 3, 7),
(86, '978-3456789010', 1, 8),
(87, '978-3456789011', 2, 8),
(88, '978-3456789012', 3, 8),
(91, '978-4567890125', 1, 9),
(92, '978-4567890126', 2, 9),
(93, '978-4567890127', 3, 9),
(96, '978-5678901230', 1, 10),
(97, '978-5678901231', 2, 10),
(98, '978-5678901232', 3, 10);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `tarmadio`
--
ALTER TABLE `tarmadio`
  ADD PRIMARY KEY (`idArmadio`);

--
-- Indici per le tabelle `tautore`
--
ALTER TABLE `tautore`
  ADD PRIMARY KEY (`idAutore`);

--
-- Indici per le tabelle `tautorecarta`
--
ALTER TABLE `tautorecarta`
  ADD PRIMARY KEY (`idAutoreCarta`),
  ADD KEY `fk_idAutoreCarta` (`idAutore`),
  ADD KEY `fk_idCartaGeoPolitica` (`idCartaGeoPolitica`);

--
-- Indici per le tabelle `tautoreenciclopedia`
--
ALTER TABLE `tautoreenciclopedia`
  ADD PRIMARY KEY (`idMultiAutori`),
  ADD KEY `fk_idAutoreEnciclopedia` (`idAutore`),
  ADD KEY `fk_idEnciclopedia_` (`idEnciclopedia`);

--
-- Indici per le tabelle `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  ADD PRIMARY KEY (`idCartaGeoPolitica`),
  ADD KEY `fk_idCasaEditrice_` (`idCasaEditrice`);

--
-- Indici per le tabelle `tcasaeditrice`
--
ALTER TABLE `tcasaeditrice`
  ADD PRIMARY KEY (`idCasaEditrice`);

--
-- Indici per le tabelle `tcliente`
--
ALTER TABLE `tcliente`
  ADD PRIMARY KEY (`IdCliente`),
  ADD UNIQUE KEY `codiceFiscale` (`codiceFiscale`);

--
-- Indici per le tabelle `tenciclopedia`
--
ALTER TABLE `tenciclopedia`
  ADD PRIMARY KEY (`idEnciclopedia`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `fk_idCasaEditrice` (`idCasaEditrice`);

--
-- Indici per le tabelle `tlavoratore`
--
ALTER TABLE `tlavoratore`
  ADD PRIMARY KEY (`idLavoratore`),
  ADD UNIQUE KEY `codiceFiscale` (`codiceFiscale`);

--
-- Indici per le tabelle `tlibro`
--
ALTER TABLE `tlibro`
  ADD PRIMARY KEY (`idLibro`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `fk_idAutore` (`idAutore`),
  ADD KEY `idCasaEditrice` (`idCasaEditrice`);

--
-- Indici per le tabelle `tprenotazione`
--
ALTER TABLE `tprenotazione`
  ADD PRIMARY KEY (`idPrenotazione`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `fk_idLibro_tprenotazione` (`idLibro`);

--
-- Indici per le tabelle `tprenotazionecarta`
--
ALTER TABLE `tprenotazionecarta`
  ADD PRIMARY KEY (`idPrenotazione`),
  ADD KEY `fk_idCarta` (`idCarta`),
  ADD KEY `fk_idClienteCarta` (`idCliente`);

--
-- Indici per le tabelle `tprenotazioneenciclopedia`
--
ALTER TABLE `tprenotazioneenciclopedia`
  ADD PRIMARY KEY (`idPrenotazione`),
  ADD KEY `fk_idVolumeEnciclopedia` (`idVolume`),
  ADD KEY `fk_idClienteEnciclopediaVolume` (`idCliente`);

--
-- Indici per le tabelle `tprestito`
--
ALTER TABLE `tprestito`
  ADD PRIMARY KEY (`idPrestito`),
  ADD UNIQUE KEY `idPrenotazione` (`idPrenotazione`),
  ADD UNIQUE KEY `idPrenotazione_2` (`idPrenotazione`),
  ADD KEY `fk_idPrenotazione` (`idPrenotazione`),
  ADD KEY `fk_LavoratoreConsegna` (`idLavoratoreConsegna`),
  ADD KEY `fk_LavoratoreRitiro` (`idLavoratoreRitiro`);

--
-- Indici per le tabelle `tprestitocarta`
--
ALTER TABLE `tprestitocarta`
  ADD PRIMARY KEY (`idPrestito`),
  ADD UNIQUE KEY `idPrenotazione` (`idPrenotazione`),
  ADD KEY `fk_idPrenotazioneCarta` (`idPrenotazione`),
  ADD KEY `fk_LavoratoreConsegnaCarta` (`idLavoratoreConsegna`),
  ADD KEY `fk_LavoratoreRitiroCarta` (`idLavoratoreRitiro`),
  ADD KEY `idPrestito` (`idPrestito`) USING BTREE;

--
-- Indici per le tabelle `tprestitoenciclopedia`
--
ALTER TABLE `tprestitoenciclopedia`
  ADD PRIMARY KEY (`idPrestito`),
  ADD UNIQUE KEY `idPrestito` (`idPrestito`),
  ADD UNIQUE KEY `idPrenotazione` (`idPrenotazione`),
  ADD KEY `fk_idPrestitoEnciclopedia` (`idPrenotazione`),
  ADD KEY `fk_LavoratoreConsegnaEnciclopedia` (`idLavoratoreConsegna`),
  ADD KEY `fk_LavoratoreRitiroEnciclopedia` (`idLavoratoreRitiro`);

--
-- Indici per le tabelle `tscaffale`
--
ALTER TABLE `tscaffale`
  ADD PRIMARY KEY (`idScaffale`),
  ADD KEY `fk_idStanza` (`idStanza`),
  ADD KEY `fk_idArmadio` (`idArmadio`);

--
-- Indici per le tabelle `tscaffalecarta`
--
ALTER TABLE `tscaffalecarta`
  ADD PRIMARY KEY (`idScaffaleCarta`),
  ADD UNIQUE KEY `idScaffale` (`idScaffale`,`idCarta`,`numeroScaffale`),
  ADD UNIQUE KEY `idCarta` (`idCarta`),
  ADD KEY `fk_idScaffaleCarta` (`idScaffale`),
  ADD KEY `fk_idCartaScaffale` (`idCarta`);

--
-- Indici per le tabelle `tscaffalelibro`
--
ALTER TABLE `tscaffalelibro`
  ADD PRIMARY KEY (`idScaffaleLibro`),
  ADD UNIQUE KEY `idScaffale` (`idScaffale`,`idLibro`,`numeroScaffale`),
  ADD UNIQUE KEY `idLibro` (`idLibro`),
  ADD KEY `fk_idLibrofk` (`idLibro`),
  ADD KEY `fk_idScaffaleLibro` (`idScaffale`);

--
-- Indici per le tabelle `tscaffalevolume`
--
ALTER TABLE `tscaffalevolume`
  ADD PRIMARY KEY (`idScaffaleVolume`),
  ADD UNIQUE KEY `idScaffale` (`idScaffale`,`idVolume`,`numeroScaffale`),
  ADD UNIQUE KEY `idVolume` (`idVolume`),
  ADD KEY `fk_idScaffaleVolume` (`idScaffale`),
  ADD KEY `fk_idVolumeScaffale` (`idVolume`);

--
-- Indici per le tabelle `tstanza`
--
ALTER TABLE `tstanza`
  ADD PRIMARY KEY (`idStanza`);

--
-- Indici per le tabelle `tvolume`
--
ALTER TABLE `tvolume`
  ADD PRIMARY KEY (`idVolume`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `fk_idEnciclopedia` (`idEnciclopedia`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `tarmadio`
--
ALTER TABLE `tarmadio`
  MODIFY `idArmadio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `tautore`
--
ALTER TABLE `tautore`
  MODIFY `idAutore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT per la tabella `tautorecarta`
--
ALTER TABLE `tautorecarta`
  MODIFY `idAutoreCarta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT per la tabella `tautoreenciclopedia`
--
ALTER TABLE `tautoreenciclopedia`
  MODIFY `idMultiAutori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  MODIFY `idCartaGeoPolitica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la tabella `tcasaeditrice`
--
ALTER TABLE `tcasaeditrice`
  MODIFY `idCasaEditrice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `tcliente`
--
ALTER TABLE `tcliente`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `tenciclopedia`
--
ALTER TABLE `tenciclopedia`
  MODIFY `idEnciclopedia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `tlavoratore`
--
ALTER TABLE `tlavoratore`
  MODIFY `idLavoratore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `tlibro`
--
ALTER TABLE `tlibro`
  MODIFY `idLibro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT per la tabella `tprenotazione`
--
ALTER TABLE `tprenotazione`
  MODIFY `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT per la tabella `tprenotazionecarta`
--
ALTER TABLE `tprenotazionecarta`
  MODIFY `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `tprenotazioneenciclopedia`
--
ALTER TABLE `tprenotazioneenciclopedia`
  MODIFY `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `tprestito`
--
ALTER TABLE `tprestito`
  MODIFY `idPrestito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `tprestitocarta`
--
ALTER TABLE `tprestitocarta`
  MODIFY `idPrestito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `tprestitoenciclopedia`
--
ALTER TABLE `tprestitoenciclopedia`
  MODIFY `idPrestito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `tscaffale`
--
ALTER TABLE `tscaffale`
  MODIFY `idScaffale` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `tscaffalecarta`
--
ALTER TABLE `tscaffalecarta`
  MODIFY `idScaffaleCarta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT per la tabella `tscaffalelibro`
--
ALTER TABLE `tscaffalelibro`
  MODIFY `idScaffaleLibro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `tscaffalevolume`
--
ALTER TABLE `tscaffalevolume`
  MODIFY `idScaffaleVolume` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `tstanza`
--
ALTER TABLE `tstanza`
  MODIFY `idStanza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `tvolume`
--
ALTER TABLE `tvolume`
  MODIFY `idVolume` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `tautorecarta`
--
ALTER TABLE `tautorecarta`
  ADD CONSTRAINT `fk_idAutoreCarta` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `fk_idCartaGeoPolitica` FOREIGN KEY (`idCartaGeoPolitica`) REFERENCES `tcartageopolitica` (`idCartaGeoPolitica`);

--
-- Limiti per la tabella `tautoreenciclopedia`
--
ALTER TABLE `tautoreenciclopedia`
  ADD CONSTRAINT `fk_idAutoreEnciclopedia` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `fk_idEnciclopedia_` FOREIGN KEY (`idEnciclopedia`) REFERENCES `tenciclopedia` (`idEnciclopedia`),
  ADD CONSTRAINT `idAutore` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`);

--
-- Limiti per la tabella `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  ADD CONSTRAINT `fk_idCasaEditrice_` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`);

--
-- Limiti per la tabella `tenciclopedia`
--
ALTER TABLE `tenciclopedia`
  ADD CONSTRAINT `fk_idCasaEditrice` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`);

--
-- Limiti per la tabella `tlibro`
--
ALTER TABLE `tlibro`
  ADD CONSTRAINT `fk_idAutore` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `idAutore_fk` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `idCasaEditrice` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`),
  ADD CONSTRAINT `idCasaEditrice_fk` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`);

--
-- Limiti per la tabella `tprenotazione`
--
ALTER TABLE `tprenotazione`
  ADD CONSTRAINT `fk_idLibro_tprenotazione` FOREIGN KEY (`idLibro`) REFERENCES `tlibro` (`idLibro`),
  ADD CONSTRAINT `idCliente` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`);

--
-- Limiti per la tabella `tprenotazionecarta`
--
ALTER TABLE `tprenotazionecarta`
  ADD CONSTRAINT `fk_idCarta` FOREIGN KEY (`idCarta`) REFERENCES `tcartageopolitica` (`idCartaGeoPolitica`),
  ADD CONSTRAINT `fk_idCliente` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`),
  ADD CONSTRAINT `fk_idClienteCarta` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`),
  ADD CONSTRAINT `fk_idClienteEnciclopedia` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`);

--
-- Limiti per la tabella `tprenotazioneenciclopedia`
--
ALTER TABLE `tprenotazioneenciclopedia`
  ADD CONSTRAINT `fk_idClienteEnciclopediaVolume` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`),
  ADD CONSTRAINT `fk_idVolumeEnciclopedia` FOREIGN KEY (`idVolume`) REFERENCES `tvolume` (`idVolume`);

--
-- Limiti per la tabella `tprestito`
--
ALTER TABLE `tprestito`
  ADD CONSTRAINT `fk_LavoratoreConsegna` FOREIGN KEY (`idLavoratoreConsegna`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_LavoratoreRitiro` FOREIGN KEY (`idLavoratoreRitiro`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_idPrenotazione` FOREIGN KEY (`idPrenotazione`) REFERENCES `tprenotazione` (`idPrenotazione`);

--
-- Limiti per la tabella `tprestitocarta`
--
ALTER TABLE `tprestitocarta`
  ADD CONSTRAINT `fk_LavoratoreConsegnaCarta` FOREIGN KEY (`idLavoratoreConsegna`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_LavoratoreRitiroCarta` FOREIGN KEY (`idLavoratoreRitiro`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_idPrenotazioneCarta` FOREIGN KEY (`idPrenotazione`) REFERENCES `tprenotazionecarta` (`idPrenotazione`);

--
-- Limiti per la tabella `tprestitoenciclopedia`
--
ALTER TABLE `tprestitoenciclopedia`
  ADD CONSTRAINT `fk_LavoratoreConsegnaEnciclopedia` FOREIGN KEY (`idLavoratoreConsegna`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_LavoratoreRitiroEnciclopedia` FOREIGN KEY (`idLavoratoreRitiro`) REFERENCES `tlavoratore` (`idLavoratore`),
  ADD CONSTRAINT `fk_idPrestitoEnciclopedia` FOREIGN KEY (`idPrenotazione`) REFERENCES `tprenotazioneenciclopedia` (`idPrenotazione`);

--
-- Limiti per la tabella `tscaffale`
--
ALTER TABLE `tscaffale`
  ADD CONSTRAINT `fk_idArmadio` FOREIGN KEY (`idArmadio`) REFERENCES `tarmadio` (`idArmadio`),
  ADD CONSTRAINT `fk_idStanza` FOREIGN KEY (`idStanza`) REFERENCES `tstanza` (`idStanza`);

--
-- Limiti per la tabella `tscaffalecarta`
--
ALTER TABLE `tscaffalecarta`
  ADD CONSTRAINT `fk_idCartaScaffale` FOREIGN KEY (`idCarta`) REFERENCES `tcartageopolitica` (`idCartaGeoPolitica`),
  ADD CONSTRAINT `fk_idScaffaleCarta` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`idScaffale`);

--
-- Limiti per la tabella `tscaffalelibro`
--
ALTER TABLE `tscaffalelibro`
  ADD CONSTRAINT `fk_idLibrofk` FOREIGN KEY (`idLibro`) REFERENCES `tlibro` (`idLibro`),
  ADD CONSTRAINT `fk_idScaffaleLibro` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`idScaffale`);

--
-- Limiti per la tabella `tscaffalevolume`
--
ALTER TABLE `tscaffalevolume`
  ADD CONSTRAINT `fk_idScaffaleVolume` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`idScaffale`),
  ADD CONSTRAINT `fk_idVolumeScaffale` FOREIGN KEY (`idVolume`) REFERENCES `tvolume` (`idVolume`);

--
-- Limiti per la tabella `tvolume`
--
ALTER TABLE `tvolume`
  ADD CONSTRAINT `fk_idEnciclopedia` FOREIGN KEY (`idEnciclopedia`) REFERENCES `tenciclopedia` (`idEnciclopedia`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
