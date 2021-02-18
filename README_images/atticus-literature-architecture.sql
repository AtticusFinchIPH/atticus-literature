CREATE TYPE "users_role" AS ENUM (
  'superadmin',
  'admin',
  'client'
);

CREATE TYPE "products_origin" AS ENUM (
  'vietnamese',
  'chinese',
  'japanese',
  'asian',
  'russian',
  'american',
  'western',
  'others'
);

CREATE TYPE "orders_status" AS ENUM (
  'paid',
  'processing',
  'shipped',
  'delivered'
);

CREATE TYPE "orders_payment" AS ENUM (
  'visa',
  'direct'
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "nick_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "address" varchar,
  "phone" varchar,
  "role" users_role DEFAULT 'client'
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" varchar,
  "image" varchar NOT NULL,
  "author_id" int NOT NULL,
  "origin" products_origin NOT NULL,
  "genres" varchar,
  "publisher" varchar,
  "publish_year" datetime,
  "price" "numeric(9, 2)" NOT NULL,
  "in_stock" int NOT NULL
);

CREATE TABLE "authors" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "receiver" varchar,
  "email" varchar,
  "address" varchar,
  "phone" varchar,
  "status" orders_status NOT NULL,
  "created_at" datetime DEFAULT (now()),
  "payment_method" orders_payment,
  "total" "numeric(9, 2)"
);

CREATE TABLE "order_items" (
  "order_id" int UNIQUE NOT NULL,
  "product_id" int UNIQUE NOT NULL,
  "quantity" int DEFAULT 1
);

CREATE TABLE "reviews" (
  "user_id" int UNIQUE NOT NULL,
  "product_id" int UNIQUE NOT NULL,
  "stars" int NOT NULL,
  "content" varchar
);

CREATE TABLE "cart_items" (
  "user_id" int UNIQUE NOT NULL,
  "product_id" int UNIQUE NOT NULL,
  "quantity" int DEFAULT 1
);

CREATE TABLE "favorite_items" (
  "user_id" int UNIQUE NOT NULL,
  "product_id" int UNIQUE NOT NULL
);

ALTER TABLE "products" ADD FOREIGN KEY ("author_id") REFERENCES "authors" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "cart_items" ("user_id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "favorite_items" ("user_id");

ALTER TABLE "favorite_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

COMMENT ON TABLE "orders" IS 'order may come from anonymous user';
