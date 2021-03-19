-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (100) NOT NULL,
    "last_name" VARCHAR (100) NOT NULL,
    "profile_pic" VARCHAR (1000) NOT NULL,
    "phone" VARCHAR (100) NOT NULL,
    "state" VARCHAR (100) NOT NULL,    
    "city" VARCHAR (100) DEFAULT NULL,
    "child_first_name" VARCHAR (100) DEFAULT NULL,
    "child_last_name" VARCHAR (100) DEFAULT NULL,
    "special_sentiment" VARCHAR (700) DEFAULT NULL,
    "second_photo" VARCHAR (1000) DEFAULT NULL,
    "story" VARCHAR (1000) DEFAULT NULL,
    "approved_user" BOOLEAN DEFAULT FALSE,
    "admin_user" BOOLEAN DEFAULT FALSE
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
    "admin_approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "journal" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" NOT NULL,
    "date" DATE NOT NULL,
    "content" VARCHAR (1000) NOT NULL,
    "public" BOOLEAN DEFAULT FALSE
);