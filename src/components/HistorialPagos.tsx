'use client'

import { Pago } from '@/types'

interface HistorialPagosProps {
  pagos: Pago[]
}

export default function HistorialPagos({ pagos }: HistorialPagosProps) {
  const formatFecha = (fecha: string) => {
    return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (pagos.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-tennis-green mb-4">Historial de Pagos</h2>
        <p className="text-gray-500 text-center py-4">No hay pagos registrados</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-tennis-green mb-4">Historial de Pagos</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {pagos.map((pago) => (
          <div
            key={pago.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{formatFecha(pago.fecha)}</p>
              <p className="text-xs text-gray-500">
                {pago.clases_pagadas} clases
                {pago.notas && ` - ${pago.notas}`}
              </p>
            </div>
            <span className="font-bold text-tennis-green">
              ${pago.monto.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
