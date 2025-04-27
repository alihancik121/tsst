<template>
  <div class="has-tooltip hover:cursor-pointer">
    <span
      class="tooltip -mt-9 rounded-lg bg-white p-1.5 font-semibold text-black shadow-lg dark:bg-black dark:text-white"
      >{{ title }}</span
    >
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Tooltip',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
.tooltip {
  @apply invisible absolute;
  transition: 150ms;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
