'use client'

import { Balance } from '@/types'
import { PRECIO_POR_CLASE } from '@/lib/supabase'

interface BalanceCardProps {
  balance: Balance
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const clasesAFavor = balance.clases_a_favor

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-tennis-green mb-4">Balance Actual</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-3xl font-bold text-tennis-green">
            {clasesAFavor >= 0 ? '+' : ''}{clasesAFavor}
          </p>
          <p className="text-sm text-gray-600">Clases a favor</p>
        </div>

        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-3xl font-bold text-blue-600">
            ${balance.total_pagado.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Total pagado</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Clases pagadas:</span>
          <span className="font-medium">{balance.clases_pagadas_total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Clases tomadas:</span>
          <span className="font-medium">{balance.clases_tomadas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Clases canceladas:</span>
          <span className="font-medium text-orange-600">{balance.clases_canceladas}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Clases repuestas:</span>
          <span className="font-medium text-green-600">{balance.clases_repuestas}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">
          Precio por clase: ${PRECIO_POR_CLASE} MXN
        </p>
      </div>
    </div>
  )
}
