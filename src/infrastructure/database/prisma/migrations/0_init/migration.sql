-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "customer_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "reference_month" TEXT NOT NULL,
    "electric_energy_kwh" DOUBLE PRECISION NOT NULL,
    "electric_energy_value" DOUBLE PRECISION NOT NULL,
    "sceee_energy_kwh" DOUBLE PRECISION NOT NULL,
    "sceee_energy_value" DOUBLE PRECISION NOT NULL,
    "compensated_energy_kwh" DOUBLE PRECISION NOT NULL,
    "compensated_energy_value" DOUBLE PRECISION NOT NULL,
    "public_lighting_contrib" DOUBLE PRECISION NOT NULL,
    "energy_consumption_kwh" DOUBLE PRECISION NOT NULL,
    "total_value_without_gd" DOUBLE PRECISION NOT NULL,
    "gd_savings" DOUBLE PRECISION NOT NULL,
    "file_url" TEXT,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_number_key" ON "customers"("customer_number");

-- CreateIndex
CREATE INDEX "invoices_customer_id_idx" ON "invoices"("customer_id");

-- CreateIndex
CREATE INDEX "invoices_reference_month_idx" ON "invoices"("reference_month");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_customer_id_reference_month_key" ON "invoices"("customer_id", "reference_month");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
