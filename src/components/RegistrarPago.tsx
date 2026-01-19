'use client'

import { useState } from 'react'
import { supabase, PRECIO_POR_CLASE, CLASES_POR_MES } from '@/lib/supabase'

interface RegistrarPagoProps {
  onPagoRegistrado: () => void
}

export default function RegistrarPago({ onPagoRegistrado }: RegistrarPagoProps) {
  const [clases, setClases] = useState(CLASES_POR_MES)
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)

  const monto = clases * PRECIO_POR_CLASE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('pagos').insert({
      fecha: new Date().toISOString().split('T')[0],
      monto,
      clases_pagadas: clases,
      notas: notas || null,
    })

    setLoading(false)

    if (error) {
      alert('Error al registrar el pago: ' + error.message)
      return
    }

    setClases(CLASES_POR_MES)
    setNotas('')
    setMostrarForm(false)
    onPagoRegistrado()
  }

  if (!mostrarForm) {
    return (
      <button
        onClick={() => setMostrarForm(true)}
        className="btn-primary w-full"
      >
        + Registrar Pago
      </button>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Registrar Pago</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numero de clases
          </label>
          <input
            type="number"
            min="1"
            value={clases}
            onChange={(e) => setClases(parseInt(e.target.value) || 0)}
            className="input-field"
          />
        </div>

        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Monto a pagar:</p>
          <p className="text-2xl font-bold text-tennis-green">
            ${monto.toLocaleString()} MXN
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej: Pago de enero"
            className="input-field"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMostrarForm(false)}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? 'Guardando...' : 'Guardar Pago'}
          </button>
        </div>
      </form>
    </div>
  )
}
