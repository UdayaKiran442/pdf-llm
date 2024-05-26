CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" varchar(256) NOT NULL,
	"userId" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"pdfURL" varchar(256) NOT NULL,
	"vectorEmbeddings" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_projectId" ON "projects" ("projectId");