import { varchar, mysqlTable, InferModel, serial } from 'drizzle-orm/mysql-core';

export const albums = mysqlTable('albums', {
    id: serial('id').primaryKey().notNull(),
    album_name: varchar('album_name', { length: 45 }).notNull(),
    album_location: varchar('album_location', { length: 100 }).notNull(),
    date: varchar('date', { length: 45 }).notNull(),
    person_id: varchar('person_id', { length: 45 }).notNull(),
    album_logo: varchar('album_logo', { length: 200 }).notNull(),
});

export type Album = InferModel<typeof albums>;
