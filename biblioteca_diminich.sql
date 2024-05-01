-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 30, 2024 alle 17:14
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

-- --------------------------------------------------------

--
-- Struttura della tabella `tarmadio`
--

CREATE TABLE `tarmadio` (
  `idArmadio` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tautore`
--

CREATE TABLE `tautore` (
  `idAutore` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `dataNascita` date NOT NULL,
  `dataMorte` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tautorecarta`
--

CREATE TABLE `tautorecarta` (
  `idAutoreCarta` int(11) NOT NULL,
  `idCartaGeoPolitica` int(255) NOT NULL,
  `idAutore` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tautoreenciclopedia`
--

CREATE TABLE `tautoreenciclopedia` (
  `idMultiAutori` int(11) NOT NULL,
  `idAutore` int(11) NOT NULL,
  `idEnciclopedia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tcartageopolitica`
--

CREATE TABLE `tcartageopolitica` (
  `idCartaGeoPolitica` int(11) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `dataRappresentazione` date NOT NULL,
  `idAutore` int(11) DEFAULT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tcasaeditrice`
--

CREATE TABLE `tcasaeditrice` (
  `idCasaEditrice` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tcliente`
--

CREATE TABLE `tcliente` (
  `IdCliente` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `codiceFiscale` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `idCasaEditrice` int(11) DEFAULT NULL,
  `idMultiAutori` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `tlavoratore`
--

CREATE TABLE `tlavoratore` (
  `idLavoratore` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `codiceFiscale` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Struttura della tabella `tprestito`
--

CREATE TABLE `tprestito` (
  `idPrestito` int(11) NOT NULL,
  `idPrenotazione` int(255) NOT NULL,
  `dataInizio` date NOT NULL,
  `dataFine` date NOT NULL
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

-- --------------------------------------------------------

--
-- Struttura della tabella `tstanza`
--

CREATE TABLE `tstanza` (
  `idStanza` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `fk__idAutore` (`idAutore`),
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
  ADD KEY `fk_idCasaEditrice` (`idCasaEditrice`),
  ADD KEY `fk_idMultiAutori` (`idMultiAutori`);

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
-- Indici per le tabelle `tprestito`
--
ALTER TABLE `tprestito`
  ADD PRIMARY KEY (`idPrestito`),
  ADD KEY `fk_idPrenotazione` (`idPrenotazione`);

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
  ADD KEY `fk_idScaffaleCarta` (`idScaffale`),
  ADD KEY `fk_idCartaScaffale` (`idCarta`);

--
-- Indici per le tabelle `tscaffalelibro`
--
ALTER TABLE `tscaffalelibro`
  ADD PRIMARY KEY (`idScaffaleLibro`),
  ADD KEY `fk_idLibrofk` (`idLibro`),
  ADD KEY `fk_idScaffaleLibro` (`idScaffale`);

--
-- Indici per le tabelle `tscaffalevolume`
--
ALTER TABLE `tscaffalevolume`
  ADD PRIMARY KEY (`idScaffaleVolume`),
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
  MODIFY `idArmadio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tautore`
--
ALTER TABLE `tautore`
  MODIFY `idAutore` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tautorecarta`
--
ALTER TABLE `tautorecarta`
  MODIFY `idAutoreCarta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tautoreenciclopedia`
--
ALTER TABLE `tautoreenciclopedia`
  MODIFY `idMultiAutori` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  MODIFY `idCartaGeoPolitica` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tcasaeditrice`
--
ALTER TABLE `tcasaeditrice`
  MODIFY `idCasaEditrice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tcliente`
--
ALTER TABLE `tcliente`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tenciclopedia`
--
ALTER TABLE `tenciclopedia`
  MODIFY `idEnciclopedia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tlavoratore`
--
ALTER TABLE `tlavoratore`
  MODIFY `idLavoratore` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tlibro`
--
ALTER TABLE `tlibro`
  MODIFY `idLibro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tprenotazione`
--
ALTER TABLE `tprenotazione`
  MODIFY `idPrenotazione` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tprestito`
--
ALTER TABLE `tprestito`
  MODIFY `idPrestito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tscaffale`
--
ALTER TABLE `tscaffale`
  MODIFY `idScaffale` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tscaffalecarta`
--
ALTER TABLE `tscaffalecarta`
  MODIFY `idScaffaleCarta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tscaffalelibro`
--
ALTER TABLE `tscaffalelibro`
  MODIFY `idScaffaleLibro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tscaffalevolume`
--
ALTER TABLE `tscaffalevolume`
  MODIFY `idScaffaleVolume` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tstanza`
--
ALTER TABLE `tstanza`
  MODIFY `idStanza` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tvolume`
--
ALTER TABLE `tvolume`
  MODIFY `idVolume` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk__idAutore` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `fk_idCasaEditrice_` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`);

--
-- Limiti per la tabella `tenciclopedia`
--
ALTER TABLE `tenciclopedia`
  ADD CONSTRAINT `fk_idCasaEditrice` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`),
  ADD CONSTRAINT `fk_idMultiAutori` FOREIGN KEY (`idMultiAutori`) REFERENCES `tautoreenciclopedia` (`idMultiAutori`);

--
-- Limiti per la tabella `tlibro`
--
ALTER TABLE `tlibro`
  ADD CONSTRAINT `fk_idAutore` FOREIGN KEY (`idAutore`) REFERENCES `tautore` (`idAutore`),
  ADD CONSTRAINT `idCasaEditrice` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`idCasaEditrice`),
  ADD CONSTRAINT `idLibro` FOREIGN KEY (`idLibro`) REFERENCES `tcasaeditrice` (`idCasaEditrice`);

--
-- Limiti per la tabella `tprenotazione`
--
ALTER TABLE `tprenotazione`
  ADD CONSTRAINT `fk_idLibro_tprenotazione` FOREIGN KEY (`idLibro`) REFERENCES `tlibro` (`idLibro`),
  ADD CONSTRAINT `idCliente` FOREIGN KEY (`idCliente`) REFERENCES `tcliente` (`IdCliente`);

--
-- Limiti per la tabella `tprestito`
--
ALTER TABLE `tprestito`
  ADD CONSTRAINT `fk_idPrenotazione` FOREIGN KEY (`idPrenotazione`) REFERENCES `tprenotazione` (`idPrenotazione`);

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