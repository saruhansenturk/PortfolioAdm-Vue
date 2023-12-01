<template>
  <v-responsive>
    <v-container>
      <v-card>
        <v-toolbar density="compact">
          <v-hover v-slot="{ isHovering, props }">
            <v-chip :elevation="isHovering ? 6 : 2" v-bind="props" class="ma-2" color="light-blue-darken-1" label
              prepend-icon="mdi-language-csharp">
              Programming Language Techs
            </v-chip>
          </v-hover>
          <v-spacer></v-spacer>
          <v-tooltip text="Add" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn @click="insertButtonClick" icon="mdi-plus-thick" color="success" size="small" v-bind="props"></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Delete" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-if="selectedId != 0" icon="mdi-delete-alert" color="primary" size="small" v-bind="props"
                @click="deleteProcess"></v-btn>
            </template>
          </v-tooltip>
        </v-toolbar>
      </v-card>

    </v-container>

  </v-responsive>


  <v-responsive>
    <DxDataGrid ref="grid" id="dataGrid" :data-source="dataSource" :show-borders="true" :remote-operations="true"
      :show-column-lines="true" :show-row-lines="true" :allow-column-reordering="true" :hover-state-enabled="true"
      :onRowDblClick="doubleClickRow" @selection-changed="selectionChanged" @context-menu-preparing="addMenuItems"
      errorRowEnabled="false">
      <DxPaging :page-size="10" :page-index="0" />
      <DxPager :visible="true" :allowed-page-sizes="[5, 10]" :display-mode="full" :show-page-size-selector="true"
        :show-info="true" :show-navigation-buttons="true" />

      <DxSelection mode="single" />

      <DxColumn data-field="id" data-type="string" />
      <DxColumn data-field="name" data-type="string" />
      <DxColumn data-field="programmingLanguageName" data-type="string" />
      <DxColumn data-field="level" data-type="string" cell-template="levelTemplate" />

      <template #levelTemplate="{ data }">
        <v-chip :color="data.value > 50 ? 'green' : 'red'">
          {{ data.value }}
        </v-chip>
      </template>
      <DxColumn data-field="isDeleted" data-type="bool" cell-template="cellTemplate" />
      <template #cellTemplate="{ data }">
        <v-icon :icon="data.value ? 'mdi-check-outline' : 'mdi-close-outline'" />
      </template>

    </DxDataGrid>
  </v-responsive>



  <v-row justify="center">
    <v-dialog v-model="dialogUpdateProcess" width="1024" style="z-index: 200;">
      <v-card>
        <v-card-title>
          <span class="text-h6">Edit Programming Language Tech <span style="color:rgb(21, 87, 211)"> {{ titleModel
          }}</span></span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm="6" md="6">
                <v-text-field clearable label="Name" v-model="editNameModel" hint="Name"></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-slider v-model="editLevelModel" label="Level" color="blue" class="align-center" max="100" min="0"
                  hide-details>
                  <template v-slot:append>
                    <v-text-field v-model="editLevelModel" hide-details single-line density="compact" type="number"
                      style="width: 70px"></v-text-field>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
            <v-row>

              <v-col cols="12" sm="6">
                <v-text-field clearable label="Description" v-model="editDescriptionModel" hint="Description">
                  <template v-slot:prepend-inner>
                    <v-icon icon="mdi-gradient-horizontal"></v-icon>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field label="IsDeleted*" readonly v-model="editDisableIsDeleted"></v-text-field>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogUpdateProcess = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="updateProcess">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>


  <v-row justify="center">
    <v-dialog v-model="dialogInsertProcess" width="1024" style="z-index: 200;">
      <v-card>
        <v-card-title>
          <span class="text-h6">Insert New Programming Language Tech</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field clearable @input="handleInputName" label="Name" v-model="insertNameModel" hint="Name">
                  <template v-slot:prepend-inner>
                    <v-icon :icon="addIcon"></v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-slider v-model="insertLevelModel" label="Level" color="blue" class="align-center" max="100" min="0"
                  hide-details>
                  <template v-slot:append>
                    <v-text-field v-model="insertLevelModel" hide-details single-line density="compact" type="number"
                      style="width: 70px">
                    </v-text-field>
                  </template>
                </v-slider>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" sm="6">

                <v-select chips v-model="selectedProg" :items="programmings" item-title="programmingLangName"
                  item-value="id" label="Programming Language" variant="solo-filled" @click="getProgramming"
                  @update:modelValue="getSelected" hint="Programming Language">

                </v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field clearable label="Description" v-model="insertDescriptionModel" hint="Description">
                  <template v-slot:prepend-inner>
                    <v-icon icon="mdi-gradient-horizontal"></v-icon>
                  </template>
                </v-text-field>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <DxFileUploader uploadMode="useForms" :onValueChanged="handleImgUpload"></DxFileUploader>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogInsertProcess = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="insertProcess">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import DxButton from 'devextreme-vue/button';
import { DxDataGrid, DxPaging, DxPager, DxColumn, DxSelection } from 'devextreme-vue/data-grid';
import DxFileUploader from 'devextreme-vue/file-uploader';
import httpService from '@/services/httpService';
import generalService from '@/services/generalService';
import crudService from '@/services/crudService';
import DxContextMenu from 'devextreme-vue/context-menu';



export default {
  components: {
    DxButton,
    DxDataGrid,
    DxPaging,
    DxPager,
    DxColumn,
    DxSelection,
    DxFileUploader,
    DxContextMenu
  },
  data() {
    return {
      dataSource: [],
      dialogUpdateProcess: false,
      dialogInsertProcess: false,
      editNameModel: "",
      editLevelModel: "",
      editDescriptionModel: "",
      insertNameModel: "",
      insertLevelModel: "",
      insertImage: [],
      insertDescriptionModel: "",
      imgSrc: '',
      programmings: [],
      selectedProg: [],

      file: null,

      titleModel: "",
      editDisableIsDeleted: false,
      selectedId: -1,

      addIcon: 'mdi-code-tags',
      levelIcon: 'mdi-speedometer-slow'


    }
  },
  created() {
    this.dataSource = crudService.getAll("https://localhost:7280/api/ProgrammingLangTechs");
  },
  methods: {
    doubleClickRow(item) {
      this.editNameModel = item.data.name;
      this.editLevelModel = item.data.level;
      this.editDescriptionModel = item.data.description;
      this.titleModel = item.data.id;
      this.editDisableIsDeleted = item.data.isDeleted;
      this.dialogUpdateProcess = true;
    },
    updateProcess() {
      crudService.updateItem(`https://localhost:7280/api/ProgrammingLangTechs/Update`, { id: this.titleModel, name: this.editNameModel, level: parseInt(this.editLevelModel), description: this.editDescriptionModel }, this.$root, this.$refs);
    },
    deleteProcess() {
      crudService.deleteItem(this.selectedId, `https://localhost:7280/api/ProgrammingLangTechs/${this.selectedId.id}`, this.$root, this.$refs);
    },
    async insertProcess() {
      var byteFile;
      if (this.insertImage.length !== 0) {
        byteFile = await generalService.uploadImage(this.insertImage)
      }

      crudService.insertItem('https://localhost:7280/api/ProgrammingLangTechs', { name: this.insertNameModel, level: parseInt(this.insertLevelModel), programmingLanguageId: this.selectedProg, languageTechImage: byteFile ?? null, description: this.insertDescriptionModel }, this.$root, this.$refs);
    },
    insertButtonClick() {
      this.dialogInsertProcess = true;
    },
    handleInputName() {
      if (this.insertNameModel !== '') {
        this.addIcon = 'mdi-code-tags-check';
      }
      else {
        this.addIcon = 'mdi-code-tags'
      }
    },
    handleInputLevel() {
      if (this.insertLevelModel !== '') {
        this.levelIcon = 'mdi-speedometer';
      }
      else {
        this.levelIcon = 'mdi-speedometer-slow';
      }
    },
    handleImgUpload(event) {
      if (event.value.length === 1) {
        this.insertImage = event.value[0];
      }
    },
    async getProgramming() {

      var token = await generalService.getAuthItemsIfExist();

      if (token !== '') {
        var response = await httpService.post('https://localhost:7280/api/ProgrammingLanguages/GetProgrammingLangItems', {}, token).
          then(res => {
            this.programmings = res.data;
          });
      }
    },
    getSelected(e) {
      console.log(e);
    },
    async addMenuItems(e) {
      console.log(e);
      if (e?.row !== undefined)
        var getDetails = await generalService.contextMenuItems(`https://localhost:7280/api/ProgrammingLangTechs/${e?.row?.data?.id}`, e, this.$root);
    },
    selectionChanged(item) {
      this.selectedId = item.selectedRowsData[0];
    }
  }

}
</script>
