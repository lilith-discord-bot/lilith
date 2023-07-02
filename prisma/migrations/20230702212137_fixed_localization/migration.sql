-- Update locale values to match the new locale enum
UPDATE "Guild" SET "locale" = 'ja' WHERE "locale" = 'jp';
UPDATE "Guild" SET "locale" = 'pt' WHERE "locale" = 'br';
