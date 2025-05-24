<template>
    <div>
        <section class="section">
            <div class="container">
                <h1 class="title">Welcome to the home page</h1>
                <p class="subtitle">
                    This is the home page of the application.
                </p>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'HomeView',
    }
</script>

<style scoped>
    .section {
        margin-top: 2rem;
        text-align: center;
    }
    .title {
        font-size: 2rem;
        font-weight: 700;
        color: #343a40;
    }
    .subtitle {
        font-size: 1rem;
        color: #6c757d;
    }
</style>