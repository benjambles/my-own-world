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
    id serial PRIMARY KEY,
    "key" varchar(30) NOT NULL,
    "value" varchar(50) NOT NULL
);

ALTER TABLE "System" OWNER TO postgres;
CREATE UNIQUE INDEX unique_key ON "System" (lower("key"));

INSERT INTO "System" ("key", "value") VALUES 
('api_version', 'v1'), 
('db_version', '1.0');

-- Users --
CREATE TABLE "Users" (
    uuid uuid PRIMARY KEY,
    "firstName" varchar(50) NOT NULL,
    "lastName" varchar(50) NOT NULL,
    "screenName" varchar(50),
    email varchar(256) NOT NULL,
    password varchar(500) NOT NULL,
    "createdOn" timestamptz NOT NULL DEFAULT NOW(),
    "lastModifiedOn" timestamptz NOT NULL DEFAULT NOW(),
    "lastLoggedIn" timestamptz NOT NULL DEFAULT NOW(),
    "isActive" boolean DEFAULT true NOT NULL
);

ALTER TABLE "Users" OWNER TO postgres;
CREATE UNIQUE INDEX unique_screenname ON "Users" (lower("screenName"));
CREATE INDEX lower_email ON "Users" (lower(email));

INSERT INTO "Users" ("uuid", "firstName", "lastName", "screenName", "email", "password") VALUES 
('38ef3e09-cdcd-543c-bc39-c7b4f21db98d', 'Ben', 'Allen', 'Shambles', 'aes192:a6f759b3e35225fae6495918bfc5dc9864d8f82b27c6bb99337f16d52ffb4568', '$2a$10$3Wao.HJP.J2LM.rtzofxleYrkEDjaatuiHu15ZODA4CvRurnN.hbK');

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

-- Projects --

CREATE TABLE "Projects" (
    id serial PRIMARY KEY,
    "ownerId" uuid REFERENCES "Users",
    "name" varchar(100) NOT NULL,
    "summary" varchar(300),
    "description" TEXT,
    "baseLanguage" varchar(5) REFERENCES "Languages",
    "createdOn" timestamptz NOT NULL DEFAULT NOW(),
    "lastModifiedOn" timestamptz NOT NULL DEFAULT NOW(),
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

ALTER TABLE "Projects" OWNER TO postgres;
CREATE INDEX projects__owner_id ON "Projects" ("ownerId");

-- ROLES --

CREATE TABLE "Roles" (
    id serial PRIMARY KEY,
    "projectId" INT REFERENCES "Projects",
    "name" varchar(50) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

ALTER TABLE "Roles" OWNER TO postgres;
CREATE INDEX roles__project_id ON "Roles" ("projectId");

-- Permissions --

CREATE TABLE "Permissions" (
    id serial PRIMARY KEY,
    "name" varchar(20) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

ALTER TABLE "Permissions" OWNER TO postgres;

-- User_Roles --

CREATE TABLE "User_Roles" (
    id serial PRIMARY KEY,
    "userId" uuid REFERENCES "Users",
    "projectId" INT REFERENCES "Projects",
    "roleId" INT REFERENCES "Roles",
    UNIQUE("userId", "projectId")
);

ALTER TABLE "User_Roles" OWNER TO postgres;
CREATE INDEX user_roles__project_id ON "User_Roles" ("projectId");
CREATE INDEX user_roles__user_id ON "User_Roles" ("userId");


-- Role_Permissions --

CREATE TABLE "Role_Permissions" (
    id serial PRIMARY KEY,
    "roleId" int REFERENCES "Roles",
    "permissionId" int REFERENCES "Permissions",
    UNIQUE("roleId", "permissionId")
);

ALTER TABLE "Role_Permissions" OWNER TO postgres;
CREATE INDEX role_permissions__role_id ON "Role_Permissions" ("roleId");
CREATE INDEX role_permissions__permission_id ON "Role_Permissions" ("permissionId");