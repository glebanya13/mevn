<template>
    <div class="cart-container">
        <h2 class="mt-4">Cart <font-awesome-icon icon="shopping-cart" /></h2>
        <div v-if="cartItems">
            <div v-if="!paymentIntent">
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item, key) in cartItems" :key="key">
                        {{ item.title }} - {{ item.price }}$
                    </li>
                </ul>
                <div class="panel text-right">
                    Amount: {{ cartCount }}
                    <br />
                    Total: {{ cartTotalPrice }}$
                    <hr />
                </div>
            </div>

            <div v-if="!paymentIntent">
                <UserForm @onFormSubmit="handleGetPaymentIntent" />
            </div>

            <div v-if="paymentIntent">
                <card ref="card" class="stripe-card" :class="{ complete }"
                    stripe="pk_test_51H0jsgJjMphy3gtYQ4BmwWkak8Agp5vS6p97ZUt2u7XblpLzRWZc2H4X3tg8FIP62LJQxG5U2yNb3TuNRmLYgwz000zHSAKBkk"
                    :options="stripeOptions" @change="complete = $event.complete" />
                <button class="btn btn-success" @click="pay" :disabled="!complete">
                    Pay with credit card
                </button>
            </div>


        </div>
        <div v-else>
            <img class="empty-image"
                src="https://images.pexels.com/photos/21067/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <hr />
            Your cart is empty please add items to it
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { Card, handleCardPayment } from 'vue-stripe-elements-plus';
import UserForm from '@/components/UserForm.vue';

export default {
    name: 'CartView',
    components: {
        Card,
        UserForm,
    },
    data: () => ({
        complete: false,
        stripeOptions: {
        },
        paymentIntent: null,
    }),

    computed: {
        ...mapGetters({
            cartItems: 'cartItems',
            cartTotalPrice: 'cartTotalPrice',
            cartCount: 'cartCount',
        }),
    },
    methods: {
        ...mapActions({
            handleBuy: 'handleBuy',
        }),
        ...mapMutations({
            clearCart: 'clearCart',
        }),
        async handleGetPaymentIntent(form) {
            try {
                const intent = await this.handleBuy({
                    ...form,
                    products: this.cartItems,
                })
                this.paymentIntent = intent.paymentIntent.client_secret
            } catch (err) {
                console.log(err)
            }
        },
        async pay() {
            try {
                await handleCardPayment(this.paymentIntent)
                this.clearCart()
            } catch (err) {
                console.log(err)
            }
        },
    },

}
</script>

<style>
.empty-image {
    width: 400px;
}

.__PrivateStripeElement {
    padding: 10px !important;
    margin-bottom: 10px !important;
}
</style>
