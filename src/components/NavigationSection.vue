<template>
  <v-responsive>
    <v-navigation-drawer v-model="drawer" width="325">
      <v-list :lines="false" density="compact" nav>
        <!-- <v-list-group v-for="(item, i) in items" :key="i" :value="item">
        <template v-slot:activator="{ props }"> -->
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" :prepend-icon="item.icon" :title="item.text"
          color="blue-lighten-2" rounded="xl" :to="item.link"></v-list-item>
        <!-- </template> -->

        <!-- <v-list-item-title v-for="itemdetail in item.subItem" :key="itemdetail.id" :value="itemdetail">
          <template v-if="itemdetail.childItem">
            <v-list-group>
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :prepend-icon="itemdetail.icon" :to="itemdetail.link" :title="itemdetail.text"
                  color="orange-darken-1" rounded="xl"></v-list-item>
              </template>
              <v-list-item v-for="childItem in itemdetail.childItem" :key="childItem.id" :to="childItem.link"
                :title="childItem.text" color="orange-darken-1" rounded="xl">
              </v-list-item>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item :prepend-icon="itemdetail.icon" :to="itemdetail.link" :title="itemdetail.text"
              color="orange-darken-1" rounded="xl">
            </v-list-item>
          </template>
        </v-list-item-title> -->

        <!-- </v-list-group> -->
      </v-list>
    </v-navigation-drawer>
  </v-responsive>
</template>


<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      items: [
        {
          text: 'ProgrammingLanguage',
          icon: 'mdi-checkerboard',
          link: 'ProgrammingLanguage'
        },
        {
          text: 'ProgrammingLanguageTech',
          icon: 'mdi-check',
          link: 'ProgrammingLanguageTech'
        },
        {
          text: 'Article',
          icon: 'mdi-file-delimited',
          link: 'Article'
        },
      ]
    }
  },
}
</script>
