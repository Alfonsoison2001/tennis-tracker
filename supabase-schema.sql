-- Esquema de base de datos para Tennis Tracker
-- Ejecutar este SQL en el Editor SQL de Supabase (supabase.com)

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS pagos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  monto NUMERIC NOT NULL,
  clases_pagadas INTEGER NOT NULL DEFAULT 8,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabla de clases
CREATE TABLE IF NOT EXISTS clases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha DATE NOT NULL DEFAULT CURRENT_DATE,
  tipo TEXT NOT NULL CHECK (tipo IN ('tomada', 'cancelada', 'repuesta')),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clases ENABLE ROW LEVEL SECURITY;

-- Politicas para permitir acceso publico (sin autenticacion)
-- NOTA: Para produccion, considera agregar autenticacion
CREATE POLICY "Permitir lectura publica de pagos" ON pagos
  FOR SELECT USING (true);

CREATE POLICY "Permitir insercion publica de pagos" ON pagos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualizacion publica de pagos" ON pagos
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminacion publica de pagos" ON pagos
  FOR DELETE USING (true);

CREATE POLICY "Permitir lectura publica de clases" ON clases
  FOR SELECT USING (true);

CREATE POLICY "Permitir insercion publica de clases" ON clases
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualizacion publica de clases" ON clases
  FOR UPDATE USING (true);

CREATE POLICY "Permitir eliminacion publica de clases" ON clases
  FOR DELETE USING (true);

-- Indices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_pagos_fecha ON pagos(fecha DESC);
CREATE INDEX IF NOT EXISTS idx_clases_fecha ON clases(fecha DESC);
