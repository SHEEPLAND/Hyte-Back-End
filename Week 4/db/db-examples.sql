-- Windows: MySQL Client start-valikko
-- Mysql client käynnistys komentoriviltä
-- mysql -u root -pMUNSALASANA

-- Drop existing database and create a fresh one
-- Drop and recreate the database

DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

-- Create Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_level ENUM('regular', 'admin') DEFAULT 'regular'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create DiaryEntries Table
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50) DEFAULT NULL,
    weight DECIMAL(5,2) DEFAULT NULL,
    sleep_hours INT DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create ExerciseTracking Table
CREATE TABLE ExerciseTracking (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    date DATE NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    calories_burned DECIMAL(5,2) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create Appointments Table
CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    doctor_name VARCHAR(100) DEFAULT NULL,
    notes TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-------------------
-- Insert Test Data
-------------------

-- Insert Users
INSERT INTO Users (username, password, email, user_level) VALUES
    ('johndoe', 'hashed-pw-1', 'johndoe@example.com', 'regular'),
    ('janedoe', 'hashed-pw-2', 'janedoe@example.com', 'admin');

-- Insert Diary Entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES
    (1, '2024-01-10', 'Excited', 70.5, 8, 'Had a great day, felt energetic'),
    (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work'),
    (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, felt stressed'),
    (1, '2024-01-10', 'Happy', 70.5, 8, 'Great day!'),
    (2, '2024-01-11', 'Tired', 65.0, 6, 'Long work day.');

-- Insert Exercise Records
INSERT INTO ExerciseTracking (user_id, date, activity_type, duration, calories_burned) VALUES
    (2, '2024-01-11', 'Yoga', 45, 150.00),
    (1, '2024-01-10', 'Running', 30, 300.00),
    (2, '2024-01-11', 'Cycling', 45, 450.00);

-- Insert Appointments
INSERT INTO Appointments (user_id, appointment_date, doctor_name, notes) VALUES
    (1, '2024-02-15 10:00:00', 'Dr. Smith', 'Routine checkup'),
    (2, '2024-02-20 14:30:00', 'Dr. Adams', 'Dental cleaning'),
    (1, '2025-03-01 10:00:00', 'Dr. Smith', 'Routine checkup'),
    (2, '2025-03-15 14:30:00', 'Dr. Adams', 'Dental cleaning');

-------------------
-- Sample Queries
-------------------

-- Show all users
SELECT * FROM Users;

-- Show all diary entries for user 1
SELECT * FROM DiaryEntries WHERE user_id = 1;

-- Show all exercises for user 2
SELECT * FROM ExerciseTracking WHERE user_id = 2;

-- Show upcoming appointments
SELECT * FROM Appointments WHERE appointment_date >= NOW() ORDER BY appointment_date ASC;

-- Update a diary entry (change mood)
UPDATE DiaryEntries SET mood = 'Energetic' WHERE entry_id = 2;

-- Delete an appointment
DELETE FROM Appointments WHERE appointment_id = 2;
