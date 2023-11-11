<template>
  <div>

    <v-container>
      <v-card>
        <v-toolbar density="compact">
          <v-hover v-slot="{ isHovering, props }">
            <v-chip :elevation="isHovering ? 6 : 2" v-bind="props" class="ma-2" color="light-blue-darken-1" label
              prepend-icon="mdi-file-sign">
              Articles
            </v-chip>
          </v-hover>
          <v-spacer></v-spacer>
          <v-tooltip text="Add" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn @click="insertArticleDialog" icon="mdi-file-document-plus" color="success" size="small"
                v-bind="props"></v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Delete" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-if="selectedId != 0" icon="mdi-file-document-remove" color="primary" size="small" v-bind="props"
                @click="deleteProcess"></v-btn>
            </template>
          </v-tooltip>
        </v-toolbar>
      </v-card>

    </v-container>
    <DxHtmlEditor :value="markup" v-model="markup" height="725px">
      <DxMediaResizing :enabled="true" />
      <DxImageUpload :tabs="currentTabs" file-upload-mode="base64" />
      <DxToolbar :multiline="isMultiline">
        <DxItem name="undo" />
        <DxItem name="redo" />
        <DxItem name="separator" />
        <DxItem name="size" :accepted-values="sizeValues" :options="fontSizeOptions" />
        <DxItem name="font" :accepted-values="fontValues" :options="fontFamilyOptions" />
        <DxItem name="separator" />
        <DxItem name="bold" />
        <DxItem name="italic" />
        <DxItem name="strike" />
        <DxItem name="underline" />
        <DxItem name="separator" />
        <DxItem name="alignLeft" />
        <DxItem name="alignCenter" />
        <DxItem name="alignRight" />
        <DxItem name="alignJustify" />
        <DxItem name="separator" />
        <DxItem name="orderedList" />
        <DxItem name="bulletList" />
        <DxItem name="separator" />
        <DxItem name="header" :accepted-values="headerValues" :options="headerOptions" />
        <DxItem name="separator" />
        <DxItem name="color" />
        <DxItem name="background" />
        <DxItem name="separator" />
        <DxItem name="link" />
        <DxItem name="image" />
        <DxItem name="separator" />
        <DxItem name="clear" />
        <DxItem name="codeBlock" />
        <DxItem name="blockquote" />
        <DxItem name="separator" />
        <DxItem name="insertTable" />
        <DxItem name="deleteTable" />
        <DxItem name="insertRowAbove" />
        <DxItem name="insertRowBelow" />
        <DxItem name="deleteRow" />
        <DxItem name="insertColumnLeft" />
        <DxItem name="insertColumnRight" />
        <DxItem name="deleteColumn" />
      </DxToolbar>
    </DxHtmlEditor>

    <v-row justify="center">
      <v-dialog v-model="dialogInsertProcess" width="1024" style="z-index: 200;">
        <v-card>
          <v-card-title>
            <span class="text-h6">Insert New Article</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field clearable label="Title" v-model="insertTitleModel" hint="Title">

                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field clearable :prepend-inner-icon="levelIcon" label="Author" v-model="insertAuthorModel"
                    hint="Author"></v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field clearable :prepend-inner-icon="levelIcon" label="ArticleName"
                    v-model="insertArticleNameModel" hint="ArticleName"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select chips v-model="selectedCategory" :items="comboDatas" item-title="categoryName" item-value="id"
                    label="Category" variant="solo-filled" @click="getCategories" hint="Category">
                  </v-select>
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
  </div>
</template>
<script>

import {
  DxHtmlEditor,
  DxToolbar,
  DxMediaResizing,
  DxImageUpload,
  DxItem,
} from 'devextreme-vue/html-editor';
import {
  DxCheckBox,
} from 'devextreme-vue/check-box';
import {
  DxSelectBox,
} from 'devextreme-vue/select-box';
import crudUnspecifiedService from '@/services/crudUnspecifiedService';
import generalService from '@/services/generalService';
import httpService from '@/services/httpService';
//import { markup, tabs } from './data.js';

export default {
  components: {
    DxHtmlEditor,
    DxMediaResizing,
    DxToolbar,
    DxItem,
    DxImageUpload,
    DxCheckBox,
    DxSelectBox,
  },

  data() {
    return {
      markup: '',
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      //currentTabs: tabs[2].value,
      dialogInsertProcess: false,
      isMultiline: true,
      fontSizeOptions: { inputAttr: { 'aria-label': 'Font size' } },
      fontFamilyOptions: { inputAttr: { 'aria-label': 'Font family' } },
      headerOptions: { inputAttr: { 'aria-label': 'Font family' } },
      comboDatas: [],
      selectedCategory: [],
      insertAuthorModel: '',
      insertTitleModel: '',
      insertArticleNameModel: ''
    };
  },
  methods: {
    async insertArticleDialog() {
      this.dialogInsertProcess = true;
      console.log(this.markup);
    },
    async insertProcess() {

      var sections = this.markup.split('');

      let intro = sections[0];
      let body = sections[1];
      let conclu = sections[2];

      var result = await crudUnspecifiedService.insert(`https://localhost:7280/api/Articles`, {
        title: this.insertTitleModel,
        author: this.insertAuthorModel,
        introduction: intro,
        body: body,
        conclusion: conclu,
        articleName: this.insertArticleNameModel,
        image: null,
        categoryId: this.selectedCategory
      }, this.$root, this.$refs);

      console.log(result);
    },
    async getCategories() {
      var token = await generalService.getAuthItemsIfExist();
      if (token !== '') {
        var response = await httpService.post(`https://localhost:7280/api/Categories`, {}, token)
        this.comboDatas = response.data;
      }
    },
  }
};
</script>
<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

.dx-htmleditor-content table {
  width: 50%;
}

.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
  display: inline-block;
  margin-right: 40px;
}

.option>.dx-selectbox,
.option>.label {
  display: inline-block;
  vertical-align: middle;
}

.option>.label {
  margin-right: 10px;
}
</style>
