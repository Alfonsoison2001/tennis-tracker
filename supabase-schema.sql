-- Esquema de base de datos para Tennis Ledger
-- Ejecutar este SQL en el Editor SQL de Supabase (supabase.com)

-- Eliminar tablas existentes si hay conflicto
DROP TABLE IF EXISTS clases CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS configuracion CASCADE;

-- Tabla de clases tomadas
CREATE TABLE clases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  nota TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabla de pagos mensuales
CREATE TABLE pagos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mes TEXT NOT NULL,
  monto NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabla de configuracion
CREATE TABLE configuracion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clave TEXT UNIQUE NOT NULL,
  valor TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE clases ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Politicas para acceso publico
CREATE POLICY "Permitir todo en clases" ON clases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en pagos" ON pagos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en configuracion" ON configuracion FOR ALL USING (true) WITH CHECK (true);

-- Indices
CREATE INDEX idx_clases_fecha ON clases(fecha DESC);
CREATE INDEX idx_pagos_mes ON pagos(mes DESC);
