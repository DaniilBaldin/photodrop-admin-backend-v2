import { varchar, mysqlTable, InferModel } from 'drizzle-orm/mysql-core';

export const adminUsers = mysqlTable('adminusers', {
    user: varchar('user', { length: 45 }).notNull(),
    password: varchar('password', { length: 45 }).notNull(),
    dateCreated: varchar('dateCreated', { length: 45 }).notNull(),
});

export type AdminUser = InferModel<typeof adminUsers>;
