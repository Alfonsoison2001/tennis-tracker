'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface RegistrarClaseProps {
  onClaseRegistrada: () => void
}

export default function RegistrarClase({ onClaseRegistrada }: RegistrarClaseProps) {
  const [tipo, setTipo] = useState<'tomada' | 'cancelada' | 'repuesta'>('tomada')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarForm, setMostrarForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('clases').insert({
      fecha,
      tipo,
      notas: notas || null,
    })

    setLoading(false)

    if (error) {
      alert('Error al registrar la clase: ' + error.message)
      return
    }

    setTipo('tomada')
    setFecha(new Date().toISOString().split('T')[0])
    setNotas('')
    setMostrarForm(false)
    onClaseRegistrada()
  }

  if (!mostrarForm) {
    return (
      <button
        onClick={() => setMostrarForm(true)}
        className="btn-primary w-full"
      >
        + Registrar Clase
      </button>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Registrar Clase</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de clase
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTipo('tomada')}
              className={`p-3 rounded-lg text-center transition-colors ${
                tipo === 'tomada'
                  ? 'bg-tennis-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tomada
            </button>
            <button
              type="button"
              onClick={() => setTipo('cancelada')}
              className={`p-3 rounded-lg text-center transition-colors ${
                tipo === 'cancelada'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelada
            </button>
            <button
              type="button"
              onClick={() => setTipo('repuesta')}
              className={`p-3 rounded-lg text-center transition-colors ${
                tipo === 'repuesta'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Repuesta
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <input
            type="text"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Ej: Clase de viernes extra"
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
            {loading ? 'Guardando...' : 'Guardar Clase'}
          </button>
        </div>
      </form>
    </div>
  )
}
