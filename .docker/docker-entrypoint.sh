#!/bin/sh
npx prisma migrate dev --name init_migration --schema ./schema.prisma
npm start