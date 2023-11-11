<template>
    <div class="text--primary">

        <v-hover v-slot="{ isHovering, props }">
            <v-chip v-bind="props" :elevation="isHovering ? 24 : 6" class="ma-2 pa-2">
                <v-icon start icon="mdi-language-python"></v-icon>
                {{ pageName }}
            </v-chip>
        </v-hover>

        <div class="my-6"></div>

    </div>
</template>

<script>


export default {
    data() {
        return {
        }
    },
    props: {
        pageName: String
    }
}
</script>