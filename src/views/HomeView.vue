<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const router = useRouter()

function visualizar(id) {
    router.push(`/produto/${id}`)
}

const newProductName = ref('')
const newProductPrice = ref('')
const newProductQty = ref('')

function addProduct() {
  if (!newProductName.value || !newProductPrice.value || !newProductQty.value) {
    alert("Preencha todos os campos!")
    return
  }

  productStore.addProduct({
    name: newProductName.value,
    price: parseFloat(newProductPrice.value),
    qty: parseInt(newProductQty.value)
  })

  newProductName.value = ''
  newProductPrice.value = ''
  newProductQty.value = ''
}

</script>

<template>
  <form @submit.prevent="addProduct">
    <div>
      <h1>Form para adicionar produtos</h1>
      <label for="name">Nome:</label>
      <input v-model="newProductName" type="text" id="name" placeholder="Nome do produto" required />
    </div>
    <div>
      <label for="price">Preço:</label>
      <input v-model="newProductPrice" type="number" id="price" placeholder="Preço do produto" required />
    </div>
    <div>
      <label for="quantity">Quantidade:</label>
      <input v-model="newProductQty" type="number" id="quantity" placeholder="Quantidade do produto" required />
    </div>
    <button type="submit">Adicionar Produto</button>
  </form>

  <h1>Listagem de Produtos</h1>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Quantidade</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productStore.products" :key="product.id">
        <td> {{ product.id }} - </td>
        <td> {{ product.name }}</td>
        <td> {{ product.price }}</td>
        <td> {{ product.qty }}</td>
        <td>
          <button @click="visualizar(product.id)">Ver</button>
          <button @click="productStore.deleteProductById(product.id)">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
