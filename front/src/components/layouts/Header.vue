<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">GameStore</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav_link" v-for="(category, key) in categories" :key="key">
                        <a href="#" class="nav-link">{{
                            category.title
                        }}</a> <!--:to="`/category/${_id}`"-->
                    </li>
                    <li class="nav_link">
                        <router-link class="nav-link" to="/cart">
                            <font-awesome-icon icon="shopping-cart" />
                            {{ cartCount }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MevnHeader',
    props: {
        categories: {
            type: Array,
            default: () => []
        },
        cartCount: {
            type: Number,
            default: 0
        }
    }
}
</script>