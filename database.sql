-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first-name" VARCHAR (100) NOT NULL,
    "last-name" VARCHAR (100) NOT NULL,
    "profile-pic" VARCHAR (1000) NOT NULL,
    "phone" VARCHAR (100) NOT NULL,
    "state" VARCHAR (100) NOT NULL,    
    "city" VARCHAR (100) DEFAULT NULL,
    "child-first-name" VARCHAR (100) DEFAULT NULL,
    "child-last-name" VARCHAR (100) DEFAULT NULL,
    "special-sentiment" VARCHAR (700) DEFAULT NULL,
    "second-photo" VARCHAR (1000) DEFAULT NULL,
    "story" VARCHAR (1000) DEFAULT NULL,
    "approved-user" BOOLEAN DEFAULT FALSE,
    "admin-user" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" NOT NULL,
    "name" VARCHAR (100) NOT NULL,
    "date" DATE NOT NULL,
    "location" VARCHAR (100) NOT NULL,
    "description" VARCHAR (500) NOT NULL,
    "type" VARCHAR (100) NOT NULL,
    "link" VARCHAR (1000) DEFAULT NULL, 
    "admin-approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "journal" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" NOT NULL,
    "date" DATE NOT NULL,
    "content" VARCHAR (1000) NOT NULL,
    "public" BOOLEAN DEFAULT FALSE
);