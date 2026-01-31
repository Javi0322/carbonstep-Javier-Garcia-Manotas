// Factores de emisión (ejemplos aproximados en kg CO2e por unidad)
// En una app real se sacarían de fuentes oficiales y se actualizarían.
export const emissionFactors = {
  transporte: {
    coche_gasolina: { label: 'Coche (gasolina)', unit: 'km', factor: 0.192 },
    coche_diesel: { label: 'Coche (diésel)', unit: 'km', factor: 0.171 },
    bus: { label: 'Bus', unit: 'km', factor: 0.089 },
    tren: { label: 'Tren', unit: 'km', factor: 0.041 },
    metro: { label: 'Metro', unit: 'km', factor: 0.035 },
    bici: { label: 'Bici', unit: 'km', factor: 0.0 },
    andando: { label: 'Andando', unit: 'km', factor: 0.0 }
  },

  alimentacion: {
    carne_roja: { label: 'Carne roja', unit: 'kg', factor: 27.0 },
    pollo: { label: 'Pollo', unit: 'kg', factor: 6.9 },
    lacteos: { label: 'Lácteos', unit: 'kg', factor: 3.2 },
    vegetal: { label: 'Vegetal', unit: 'kg', factor: 2.0 }
  },

  hogar: {
    electricidad: { label: 'Electricidad', unit: 'kWh', factor: 0.23 },
    gas: { label: 'Gas', unit: 'kWh', factor: 0.204 }
  },

  consumo: {
    ropa: { label: 'Ropa (gasto)', unit: '€', factor: 0.4 },
    electronica: { label: 'Electrónica (gasto)', unit: '€', factor: 0.6 },
    supermercado: { label: 'Supermercado (gasto)', unit: '€', factor: 0.25 }
  },

  ocio: {
    vuelo: { label: 'Vuelo', unit: 'km', factor: 0.255 },
    hotel: { label: 'Hotel', unit: 'noche', factor: 15.0 },
    streaming: { label: 'Streaming', unit: 'hora', factor: 0.055 }
  }
}
