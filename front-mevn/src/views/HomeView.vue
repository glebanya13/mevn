<template>
  <div class="home">
    <div class="product-list">
      <ProductCard v-for="(product, key) in products" :key="key" :title="product.title" :price="product.price"
        :imageUrl="product.imageUrl"></ProductCard>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  mounted() {
    this.fetchProducts()
  },
  computed: {
    ...mapGetters({
      products: 'products'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts'
    })
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
}
</style>