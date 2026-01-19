'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Pago, Clase, Balance } from '@/types'
import BalanceCard from '@/components/BalanceCard'
import RegistrarPago from '@/components/RegistrarPago'
import RegistrarClase from '@/components/RegistrarClase'
import HistorialClases from '@/components/HistorialClases'
import HistorialPagos from '@/components/HistorialPagos'

export default function Home() {
  const [pagos, setPagos] = useState<Pago[]>([])
  const [clases, setClases] = useState<Clase[]>([])
  const [loading, setLoading] = useState(true)

  const cargarDatos = useCallback(async () => {
    setLoading(true)

    const [pagosRes, clasesRes] = await Promise.all([
      supabase.from('pagos').select('*').order('fecha', { ascending: false }),
      supabase.from('clases').select('*').order('fecha', { ascending: false }),
    ])

    if (pagosRes.data) setPagos(pagosRes.data)
    if (clasesRes.data) setClases(clasesRes.data)

    setLoading(false)
  }, [])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const calcularBalance = (): Balance => {
    const clases_pagadas_total = pagos.reduce((sum, p) => sum + p.clases_pagadas, 0)
    const clases_tomadas = clases.filter((c) => c.tipo === 'tomada').length
    const clases_canceladas = clases.filter((c) => c.tipo === 'cancelada').length
    const clases_repuestas = clases.filter((c) => c.tipo === 'repuesta').length
    const total_pagado = pagos.reduce((sum, p) => sum + p.monto, 0)

    // Clases a favor = pagadas - tomadas - repuestas
    // (las canceladas se reponen, asi que no se restan)
    const clases_a_favor = clases_pagadas_total - clases_tomadas - clases_repuestas

    return {
      clases_pagadas_total,
      clases_tomadas,
      clases_canceladas,
      clases_repuestas,
      clases_a_favor,
      total_pagado,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tennis-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const balance = calcularBalance()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-tennis-green text-white p-4 shadow-lg">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center">Tennis Tracker</h1>
          <p className="text-center text-green-100 text-sm">Mis clases de tennis</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Balance */}
        <BalanceCard balance={balance} />

        {/* Acciones rapidas */}
        <div className="grid grid-cols-2 gap-4">
          <RegistrarClase onClaseRegistrada={cargarDatos} />
          <RegistrarPago onPagoRegistrado={cargarDatos} />
        </div>

        {/* Historiales */}
        <HistorialClases clases={clases.slice(0, 10)} />
        <HistorialPagos pagos={pagos.slice(0, 5)} />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs py-4">
        <p>Precio por clase: $350 MXN</p>
      </footer>
    </div>
  )
}
