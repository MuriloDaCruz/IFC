import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('Product', () => {
  const products = ref([
    { id: 1, name: 'Harry Potter e a pedra filosofal', price: 179.0, qty: 100 },
    { id: 2, name: 'Diario de um banana', price: 59.9, qty: 50 },
    { id: 3, name: 'Gbi na busca do Amor', price: 40.9, qty: 90 },
    { id: 4, name: 'Biblia Sagrada', price: 69.9, qty: 300 },
    { id: 5, name: 'Peter Pan', price: 55.9, qty: 20 },
  ])

  function getProductById(id) {
    return products.value.find((product) => product.id == id) || null
  }

  function deleteProductById(id) {
    const pos = products.value.findIndex((product) => product.id == id)
    if (pos !== -1) {
      products.value.splice(pos, 1)
    }
  }

  function addProduct(newProduct) {
    const nextId = products.value.length > 0 ? Math.max(...products.value.map(p => p.id)) + 1 : 1;
    products.value.push({ ...newProduct, id: nextId })
  }

  return { products, getProductById, deleteProductById, addProduct }
})
