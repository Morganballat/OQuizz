
DROP TABLE IF EXISTS "level",
"answer",
"user",
"quiz",
"question",
"tag",
"quiz_has_tag";


CREATE TABLE IF NOT EXISTS "level" (
 
  "id" serial PRIMARY KEY,
  "name" text NOT NULL
);


CREATE TABLE IF NOT EXISTS "answer" (
  "id" serial PRIMARY KEY,
  "description" text NOT NULL,
  "question_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "firstname" text NULL,
  "lastname" text NULL
);


CREATE TABLE IF NOT EXISTS "quiz" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NULL,
  "user_id" integer NOT NULL REFERENCES "user" ("id")
);


CREATE TABLE IF NOT EXISTS "question" (
  "id" serial PRIMARY KEY,
  "question" text NOT NULL,
  "anecdote" text NULL,
  "wiki" text NULL,
  "level_id" integer NOT NULL REFERENCES "level" ("id"),
  -- 'Good answer',
  "answer_id" integer NOT NULL REFERENCES "answer" ("id"),
  "quiz_id" integer NOT NULL REFERENCES "quiz" ("id")
);


CREATE TABLE IF NOT EXISTS "tag" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL
);


CREATE TABLE IF NOT EXISTS "quiz_has_tag" (
  "quiz_id" integer REFERENCES "quiz"("id"),
  "tag_id" integer REFERENCES "tag" ("id"),
  PRIMARY KEY ("quiz_id", "tag_id")
);


ALTER TABLE "answer"
  ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");


COMMIT;