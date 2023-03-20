import { varchar, mysqlTable, InferModel, serial } from 'drizzle-orm/mysql-core';

export const adminUsers = mysqlTable('adminusers', {
    id: serial('id').primaryKey().notNull(),
    user: varchar('user', { length: 45 }).notNull(),
    password: varchar('password', { length: 100 }).notNull(),
    dateCreated: varchar('dateCreated', { length: 45 }).notNull(),
});

export type AdminUser = InferModel<typeof adminUsers>;
