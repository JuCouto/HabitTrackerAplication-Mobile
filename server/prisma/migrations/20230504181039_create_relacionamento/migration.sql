-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dias_habitos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia_id" TEXT NOT NULL,
    "habito_id" TEXT NOT NULL,
    CONSTRAINT "dias_habitos_dia_id_fkey" FOREIGN KEY ("dia_id") REFERENCES "dias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "dias_habitos_habito_id_fkey" FOREIGN KEY ("habito_id") REFERENCES "habitos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_dias_habitos" ("dia_id", "habito_id", "id") SELECT "dia_id", "habito_id", "id" FROM "dias_habitos";
DROP TABLE "dias_habitos";
ALTER TABLE "new_dias_habitos" RENAME TO "dias_habitos";
CREATE UNIQUE INDEX "dias_habitos_dia_id_habito_id_key" ON "dias_habitos"("dia_id", "habito_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
