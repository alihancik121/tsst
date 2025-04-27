<template>
  <FontAwesomeIcon
    class="hover:cursor-pointer dark:text-gray-50 dark:hover:text-gray-200"
    :icon="isDarkMode ? 'moon' : 'sun'"
    size="lg"
    @click="$colorMode.preference = isDarkMode ? 'light' : 'dark'"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'ColorSwitcher',
  computed: {
    isDarkMode(): boolean {
      return this.$colorMode.preference === 'dark';
    },
  },
});
</script>
