
<template>
  <div class="flex w-full gap-7 justify-between custom-borders-bottom">
    <div class="w-full max-w-52">
      <v-text-field
        label="Search"
        variant="outlined"
        prepend-inner-icon="mdi mdi-magnify"
      ></v-text-field>
    </div>
    <div class="w-full max-w-36">
      <v-select
        label="Select"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="underlined"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
</script>
