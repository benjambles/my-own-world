SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;
SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- System --

CREATE TABLE "System" (
    uuid uuid PRIMARY KEY,
    "key" varchar(30) NOT NULL,
    "value" varchar(50) NOT NULL
);

ALTER TABLE "System" OWNER TO postgres;
CREATE UNIQUE INDEX unique_key ON "System" (lower("key"));

INSERT INTO "System" ("uuid", "key", "value") VALUES 
('38ef3e09-cdcd-543c-bc39-c7b4f21db98d', 'api_version', '0.1'), 
('38ef3e09-cdcd-543c-bc39-c7b4f21db98a', 'db_version', '0.1'),
('38ef3e09-cdcd-543c-bc39-c7b4f21db98b', 'maintenance', 'false');

-- Users --
CREATE TABLE "Users" (
    uuid uuid PRIMARY KEY,
    "firstName" varchar(50) NOT NULL,
    "lastName" varchar(50) NOT NULL,
    "screenName" varchar(50),
    "password" varchar(128) NOT NULL,
    "createdOn" timestamptz NOT NULL DEFAULT NOW(),
    "lastModifiedOn" timestamptz NOT NULL DEFAULT NOW(),
    "lastLoggedIn" timestamptz NOT NULL DEFAULT NOW(),
    "isDeleted" boolean DEFAULT FALSE NOT NULL
);

ALTER TABLE "Users" OWNER TO postgres;
CREATE UNIQUE INDEX unique_screenname ON "Users" (lower("screenName"));

INSERT INTO "Users" ("uuid", "firstName", "lastName", "screenName", "password") VALUES 
('38ef3e09-cdcd-543c-bc39-c7b4f21db98d', 'Ben', 'Allen', 'Shambles', '$2a$10$3Wao.HJP.J2LM.rtzofxleYrkEDjaatuiHu15ZODA4CvRurnN.hbK');

-- Accounts -- 
CREATE TABLE "Identities" (
    uuid uuid PRIMARY KEY,
    "type" VARCHAR(50) NOT NULL,
    "identifier" varchar(128) NOT NULL,
    "hash" varchar(128) NOT NULL,
    "userId" uuid REFERENCES "Users"
);

ALTER TABLE "Identities" OWNER TO postgres;
CREATE UNIQUE INDEX unique_identifier ON "Identities" (lower("hash"));

INSERT INTO "Identities" ("uuid", "type", "identifier", "userId") VALUES 
('38ef3e09-cdcd-543c-bc39-c7b4f21db98a', 'email', 'aes-256-cbc:93386ce51744179eaf071f4dce152397:36ce9e2d085c3cda43409463abb6115794ffabd9a4d2c4ec3d10b31f502c8862', 'd60041a180da76c5c48df967cb334b2eb220a4b5391ae0e0f18bfcc6d5528122', '38ef3e09-cdcd-543c-bc39-c7b4f21db98d');

-- Languages -- 

CREATE TABLE "Languages" (
    "cultureCode" char(5) PRIMARY KEY,
    "name" varchar(50) NOT NULL
);

ALTER TABLE "Languages" OWNER TO postgres;

-- i18n -- 

CREATE TABLE "i18n" (
    key varchar(150) PRIMARY KEY,
    "cultureCode" varchar(5) REFERENCES "Languages",
    "value" varchar(150)
);

ALTER TABLE "i18n" OWNER TO postgres;
CREATE INDEX i18n__culture_code ON "i18n" ("cultureCode");

-- Realms --
-- CREATE TABLE "Realms" (
--     uuid uuid PRIMARY KEY,
--     "ownerId" uuid REFERENCES "Users",
--     "name" varchar(100) NOT NULL,
--     "summary" varchar(300),
--     "description" TEXT,
--     "baseLanguage" varchar(5) REFERENCES "Languages",
--     "createdOn" timestamptz NOT NULL DEFAULT NOW(),
--     "lastModifiedOn" timestamptz NOT NULL DEFAULT NOW(),
--     "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
-- );

-- ALTER TABLE "Realms" OWNER TO postgres;
-- CREATE INDEX realms__owner_id ON "Realms" ("ownerId");

-- ROLES --

CREATE TABLE "Roles" (
    id INT PRIMARY KEY,
    "realmId" uuid REFERENCES "Realms",
    "name" varchar(50) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

ALTER TABLE "Roles" OWNER TO postgres;
CREATE INDEX roles__realm_id ON "Roles" ("realmId");

-- Permissions --

CREATE TABLE "Permissions" (
    id INT PRIMARY KEY,
    "name" varchar(20) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

ALTER TABLE "Permissions" OWNER TO postgres;

-- User_Roles --

CREATE TABLE "User_Roles" (
    uuid uuid PRIMARY KEY,
    "userId" uuid REFERENCES "Users",
    "realmId" uuid REFERENCES "Realms",
    "roleId" INT REFERENCES "Roles",
    UNIQUE("userId", "realmId")
);

ALTER TABLE "User_Roles" OWNER TO postgres;
CREATE INDEX user_roles__realm_id ON "User_Roles" ("realmId");
CREATE INDEX user_roles__user_id ON "User_Roles" ("userId");


-- Role_Permissions --

CREATE TABLE "Role_Permissions" (
    uuid uuid PRIMARY KEY,
    "roleId" int REFERENCES "Roles",
    "permissionId" int REFERENCES "Permissions",
    UNIQUE("roleId", "permissionId")
);

ALTER TABLE "Role_Permissions" OWNER TO postgres;
CREATE INDEX role_permissions__role_id ON "Role_Permissions" ("roleId");
CREATE INDEX role_permissions__permission_id ON "Role_Permissions" ("permissionId");
