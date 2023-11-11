<template>
    <v-dialog width="500" v-model="isActive" theme="light">
        <v-card title="Details">
            <v-card-text color="light-blue-lighten-2">

                <v-hover v-slot="{ isHovering, props }">
                    <v-card :elevation="isHovering ? 6 : 2" v-bind="props" class="mx-auto" max-width="344" theme="light">
                        <v-img :src="img" height="200px" cover></v-img>

                        <v-list lines="three">
                            <v-list-item v-for="(item, i) in listItem" :key="i">
                                <v-list-item-title>
                                    {{ item.propertyName.toUpperCase() }}
                                </v-list-item-title>

                                <v-divider></v-divider>
                                <v-spacer></v-spacer>

                                <v-list-item-subtitle>
                                    {{ item.propertyValue }}
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-hover>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" color="blue" @click="isActive = false"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    components: {},
    data() {
        return {
            isActive: false,
            incomingData: {},
            listItem: [],
            img: '',
            fields: []
        };
    },
    methods: {
        toggle(param) {
            this.isActive = param.isActive;
            this.incomingData = param.data;
            this.fields = param.fields;

            this.listItem = _setDatasForDisplay(this.incomingData);

            this.img = this.listItem.filter(t => t.propertyName === 'languageImage' || t.propertyName === 'languageTechImage')[0]?.propertyValue;

            this.listItem = this.listItem.filter(t => t.propertyName !== 'languageImage' || t.propertyName !== 'languageTechImage');

            console.log(this.img);
            console.log(this.listItem);
        },
    },
};

function _setDatasForDisplay(data) {
    var props = Object.keys(data);
    var itemDumpArray = [];
    props.forEach(e => {
        itemDumpArray.push({
            propertyName: e,
            propertyValue: data[e]
        });
    });

    return itemDumpArray;
}

</script>
<style scoped></style>
