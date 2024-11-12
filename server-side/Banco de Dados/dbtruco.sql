CREATE DATABASE CampTruco;

USE CampTruco;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Equipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomeEquipe VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    equipeId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (equipeId) REFERENCES Equipes(id) ON DELETE CASCADE
);

CREATE TABLE matchs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipeId INT NOT NULL,
    round1 BOOLEAN,
    round2 BOOLEAN,
    round3 BOOLEAN,
    FOREIGN KEY (equipeId) REFERENCES Equipes(id)
);
