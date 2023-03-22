import { varchar, mysqlTable, InferModel, serial } from 'drizzle-orm/mysql-core';

export const photos = mysqlTable('photo', {
    id: serial('id').primaryKey().notNull(),
    photo_logo: varchar('photo_logo', { length: 200 }).notNull(),
    client_name: varchar('client_name', { length: 45 }).notNull(),
    photo_url: varchar('photo_url', { length: 200 }).notNull(),
    album_id: varchar('album_id', { length: 45 }).notNull(),
    marked_url: varchar('marked_url', { length: 200 }).notNull(),
    marked_logo: varchar('marked_logo', { length: 200 }).notNull(),
});

export type Photo = InferModel<typeof photos>;
