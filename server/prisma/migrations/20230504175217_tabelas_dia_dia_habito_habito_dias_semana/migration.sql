-- CreateTable
CREATE TABLE "habitos_dias_semana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habito_id" TEXT NOT NULL,
    "dia_semana" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "dias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "dias_habitos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dia_id" TEXT NOT NULL,
    "habito_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "habitos_dias_semana_habito_id_dia_semana_key" ON "habitos_dias_semana"("habito_id", "dia_semana");

-- CreateIndex
CREATE UNIQUE INDEX "dias_data_key" ON "dias"("data");

-- CreateIndex
CREATE UNIQUE INDEX "dias_habitos_dia_id_habito_id_key" ON "dias_habitos"("dia_id", "habito_id");
