<template>
  <base-table
    title="Requester templates"

    v-bind:array-items="$store.getters['moduleTemplates/templatesRequester']"

    name-vuex-module="moduleTemplates"
    name-state-pagination="paginationRequester"
    name-local-storage-pagination="paginationTemplatesRequester"

    name-state-columns="arrayColumns"
    name-state-columns-selected="objectColumnsSelectedInitial"

    v-bind:show-select="false"
  >
    <template
      v-slot:default="{ item, objectColumnsSelected, isCondensed }"
    >
      <table-templates-requester-item
        v-bind:template="item"
        v-bind:object-columns-selected="objectColumnsSelected"
        v-bind:is-condensed="isCondensed"
      />
    </template>

    <template v-slot:actions>
      <create-template-requester />
    </template>
  </base-table>
</template>

<script>
import BaseTable from '../../../../components/base-table';
import TableTemplatesRequesterItem from './table-templates-requester-item';
import CreateTemplateRequester from '../create/create-template-requester';

export default {
  name: 'TableTemplatesRequester',
  components: { CreateTemplateRequester, TableTemplatesRequesterItem, BaseTable },
};
</script>

<style scoped>

</style>
