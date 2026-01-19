export interface Pago {
  id: string
  fecha: string
  monto: number
  clases_pagadas: number
  notas?: string
  created_at: string
}

export interface Clase {
  id: string
  fecha: string
  tipo: 'tomada' | 'cancelada' | 'repuesta'
  notas?: string
  created_at: string
}

export interface Balance {
  clases_pagadas_total: number
  clases_tomadas: number
  clases_canceladas: number
  clases_repuestas: number
  clases_a_favor: number
  total_pagado: number
}
