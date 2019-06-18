CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

CREATE TABLE "Agencies" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Name" text NULL,
    "Represent" text NULL,
    "Email" text NULL,
    "Phone" text NULL,
    CONSTRAINT "PK_Agencies" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetRoles" (
    "Id" bigint NOT NULL,
    "Name" character varying(256) NULL,
    "NormalizedName" character varying(256) NULL,
    "ConcurrencyStamp" text NULL,
    CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetUsers" (
    "Id" bigint NOT NULL,
    "UserName" character varying(256) NULL,
    "NormalizedUserName" character varying(256) NULL,
    "Email" character varying(256) NULL,
    "NormalizedEmail" character varying(256) NULL,
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text NULL,
    "SecurityStamp" text NULL,
    "ConcurrencyStamp" text NULL,
    "PhoneNumber" text NULL,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp with time zone NULL,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    "Firstname" text NULL,
    "Lastname" text NULL,
    CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id")
);

CREATE TABLE "Citizenships" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Name" text NULL,
    CONSTRAINT "PK_Citizenships" PRIMARY KEY ("Id")
);

CREATE TABLE "Countries" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Name" text NULL,
    CONSTRAINT "PK_Countries" PRIMARY KEY ("Id")
);

CREATE TABLE "Currencies" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Name" text NULL,
    "Symbol" text NULL,
    CONSTRAINT "PK_Currencies" PRIMARY KEY ("Id")
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" integer NOT NULL,
    "RoleId" bigint NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserClaims" (
    "Id" integer NOT NULL,
    "UserId" bigint NOT NULL,
    "ClaimType" text NULL,
    "ClaimValue" text NULL,
    CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text NULL,
    "UserId" bigint NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" bigint NOT NULL,
    "RoleId" bigint NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" bigint NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Guests" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Name" text NULL,
    "Phone" text NULL,
    "Identification" text NULL,
    "CountryID" bigint NOT NULL,
    "CitizenshipID" bigint NOT NULL,
    CONSTRAINT "PK_Guests" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Guests_Citizenships_CitizenshipID" FOREIGN KEY ("CitizenshipID") REFERENCES "Citizenships" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Guests_Countries_CountryID" FOREIGN KEY ("CountryID") REFERENCES "Countries" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Rooms" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Number" text NULL,
    "Description" text NULL,
    "Capacity" integer NOT NULL,
    "BedCont" integer NOT NULL,
    "VPN" double precision NOT NULL,
    "CurrencyID" bigint NOT NULL,
    CONSTRAINT "PK_Rooms" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Rooms_Currencies_CurrencyID" FOREIGN KEY ("CurrencyID") REFERENCES "Currencies" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Reservations" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Details" text NULL,
    "InitDate" timestamp without time zone NOT NULL,
    "EndDate" timestamp without time zone NOT NULL,
    "CheckIn" boolean NOT NULL,
    "CheckOut" boolean NOT NULL,
    "AgencyID" bigint NOT NULL,
    "RoomID" bigint NOT NULL,
    CONSTRAINT "PK_Reservations" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Reservations_Agencies_AgencyID" FOREIGN KEY ("AgencyID") REFERENCES "Agencies" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Reservations_Rooms_RoomID" FOREIGN KEY ("RoomID") REFERENCES "Rooms" ("Id") ON DELETE CASCADE
);

CREATE TABLE "GuestReservations" (
    "GuestId" bigint NOT NULL,
    "ReservationId" bigint NOT NULL,
    CONSTRAINT "PK_GuestReservations" PRIMARY KEY ("GuestId", "ReservationId"),
    CONSTRAINT "FK_GuestReservations_Guests_GuestId" FOREIGN KEY ("GuestId") REFERENCES "Guests" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_GuestReservations_Reservations_ReservationId" FOREIGN KEY ("ReservationId") REFERENCES "Reservations" ("Id") ON DELETE CASCADE
);

CREATE TABLE "Invoices" (
    "Id" bigint NOT NULL,
    "CreatorId" bigint NOT NULL,
    "ModifierId" bigint NOT NULL,
    "CreateDate" timestamp without time zone NOT NULL,
    "ModifyDate" timestamp without time zone NOT NULL,
    "HVersion" integer NOT NULL,
    "Number" double precision NOT NULL,
    "CurrencyID" bigint NOT NULL,
    "State" integer NOT NULL,
    "Date" timestamp without time zone NOT NULL,
    "ReservationID" bigint NOT NULL,
    CONSTRAINT "PK_Invoices" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Invoices_Currencies_CurrencyID" FOREIGN KEY ("CurrencyID") REFERENCES "Currencies" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Invoices_Reservations_ReservationID" FOREIGN KEY ("ReservationID") REFERENCES "Reservations" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" ("RoleId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "AspNetRoles" ("NormalizedName");

CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" ("UserId");

CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" ("UserId");

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "AspNetUsers" ("NormalizedEmail");

CREATE UNIQUE INDEX "UserNameIndex" ON "AspNetUsers" ("NormalizedUserName");

CREATE INDEX "IX_GuestReservations_ReservationId" ON "GuestReservations" ("ReservationId");

CREATE INDEX "IX_Guests_CitizenshipID" ON "Guests" ("CitizenshipID");

CREATE INDEX "IX_Guests_CountryID" ON "Guests" ("CountryID");

CREATE INDEX "IX_Invoices_CurrencyID" ON "Invoices" ("CurrencyID");

CREATE INDEX "IX_Invoices_ReservationID" ON "Invoices" ("ReservationID");

CREATE INDEX "IX_Reservations_AgencyID" ON "Reservations" ("AgencyID");

CREATE INDEX "IX_Reservations_RoomID" ON "Reservations" ("RoomID");

CREATE INDEX "IX_Rooms_CurrencyID" ON "Rooms" ("CurrencyID");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20190609234952_Remove all', '2.2.4-servicing-10062');

ALTER TABLE "Rooms" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Rooms" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Rooms_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Rooms" ALTER COLUMN "Id" SET DEFAULT (nextval('"Rooms_Id_seq"'));
ALTER SEQUENCE "Rooms_Id_seq" OWNED BY "Rooms"."Id";

ALTER TABLE "Reservations" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Reservations" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Reservations_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Reservations" ALTER COLUMN "Id" SET DEFAULT (nextval('"Reservations_Id_seq"'));
ALTER SEQUENCE "Reservations_Id_seq" OWNED BY "Reservations"."Id";

ALTER TABLE "Invoices" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Invoices" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Invoices_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Invoices" ALTER COLUMN "Id" SET DEFAULT (nextval('"Invoices_Id_seq"'));
ALTER SEQUENCE "Invoices_Id_seq" OWNED BY "Invoices"."Id";

ALTER TABLE "Guests" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Guests" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Guests_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Guests" ALTER COLUMN "Id" SET DEFAULT (nextval('"Guests_Id_seq"'));
ALTER SEQUENCE "Guests_Id_seq" OWNED BY "Guests"."Id";

ALTER TABLE "Currencies" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Currencies" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Currencies_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Currencies" ALTER COLUMN "Id" SET DEFAULT (nextval('"Currencies_Id_seq"'));
ALTER SEQUENCE "Currencies_Id_seq" OWNED BY "Currencies"."Id";

ALTER TABLE "Countries" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Countries" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Countries_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Countries" ALTER COLUMN "Id" SET DEFAULT (nextval('"Countries_Id_seq"'));
ALTER SEQUENCE "Countries_Id_seq" OWNED BY "Countries"."Id";

ALTER TABLE "Citizenships" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Citizenships" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Citizenships_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Citizenships" ALTER COLUMN "Id" SET DEFAULT (nextval('"Citizenships_Id_seq"'));
ALTER SEQUENCE "Citizenships_Id_seq" OWNED BY "Citizenships"."Id";

ALTER TABLE "AspNetUsers" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "AspNetUsers" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "AspNetUsers_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "AspNetUsers" ALTER COLUMN "Id" SET DEFAULT (nextval('"AspNetUsers_Id_seq"'));
ALTER SEQUENCE "AspNetUsers_Id_seq" OWNED BY "AspNetUsers"."Id";

ALTER TABLE "AspNetUserClaims" ALTER COLUMN "Id" TYPE integer;
ALTER TABLE "AspNetUserClaims" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "AspNetUserClaims_Id_seq" AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "AspNetUserClaims" ALTER COLUMN "Id" SET DEFAULT (nextval('"AspNetUserClaims_Id_seq"'));
ALTER SEQUENCE "AspNetUserClaims_Id_seq" OWNED BY "AspNetUserClaims"."Id";

ALTER TABLE "AspNetRoles" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "AspNetRoles" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "AspNetRoles_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "AspNetRoles" ALTER COLUMN "Id" SET DEFAULT (nextval('"AspNetRoles_Id_seq"'));
ALTER SEQUENCE "AspNetRoles_Id_seq" OWNED BY "AspNetRoles"."Id";

ALTER TABLE "AspNetRoleClaims" ALTER COLUMN "Id" TYPE integer;
ALTER TABLE "AspNetRoleClaims" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "AspNetRoleClaims_Id_seq" AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "AspNetRoleClaims" ALTER COLUMN "Id" SET DEFAULT (nextval('"AspNetRoleClaims_Id_seq"'));
ALTER SEQUENCE "AspNetRoleClaims_Id_seq" OWNED BY "AspNetRoleClaims"."Id";

ALTER TABLE "Agencies" ALTER COLUMN "Id" TYPE bigint;
ALTER TABLE "Agencies" ALTER COLUMN "Id" SET NOT NULL;
CREATE SEQUENCE "Agencies_Id_seq" START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE NO CYCLE;

ALTER TABLE "Agencies" ALTER COLUMN "Id" SET DEFAULT (nextval('"Agencies_Id_seq"'));
ALTER SEQUENCE "Agencies_Id_seq" OWNED BY "Agencies"."Id";

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20190618114057_sad', '2.2.4-servicing-10062');

