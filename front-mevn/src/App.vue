<template>
  <MevnHeader :categories="categories" :cartCount="cartCount" />
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <h1 class="my-4">Categories</h1>
        <div class="list-group">
          <router-link v-for="({ id, title }, key) in categories" :key="key" :to="`/category/${id}`"
            class="list-group-item">
            {{ title }}
          </router-link>
        </div>
      </div>
      <div class="col-lg-9 margin-s">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MevnHeader from '@/components/layouts/Header.vue'
export default {
  name: 'App',
  components: {
    MevnHeader
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions({
      fetchCategories: 'fetchCategories'
    })
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      cartCount: 'cartCount'
    })
  }
}
</script>

<style lang="scss">
body {
  padding-top: 56px;
}

.margin-s {
  margin-top: 95px;
}
</style>
