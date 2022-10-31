-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE sequence posts_id_seq;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    slug text COLLATE pg_catalog."default" NOT NULL,
    "userId" bigint,
    status text COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    description text COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;
