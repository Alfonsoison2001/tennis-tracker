'use client'

import { Clase } from '@/types'

interface HistorialClasesProps {
  clases: Clase[]
}

export default function HistorialClases({ clases }: HistorialClasesProps) {
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'tomada':
        return 'bg-green-100 text-green-800'
      case 'cancelada':
        return 'bg-orange-100 text-orange-800'
      case 'repuesta':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'tomada':
        return 'Tomada'
      case 'cancelada':
        return 'Cancelada'
      case 'repuesta':
        return 'Repuesta'
      default:
        return tipo
    }
  }

  const formatFecha = (fecha: string) => {
    return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  if (clases.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-tennis-green mb-4">Historial de Clases</h2>
        <p className="text-gray-500 text-center py-4">No hay clases registradas</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-tennis-green mb-4">Historial de Clases</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {clases.map((clase) => (
          <div
            key={clase.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{formatFecha(clase.fecha)}</p>
              {clase.notas && (
                <p className="text-xs text-gray-500">{clase.notas}</p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(
                clase.tipo
              )}`}
            >
              {getTipoLabel(clase.tipo)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
