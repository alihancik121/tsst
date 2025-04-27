<template>
  <div @keydown.esc="toggleModal">
    <button
      :disabled="isDisabled"
      class="mt-2 mb-4 rounded bg-green-500 p-2 font-semibold text-gray-50 transition hover:bg-green-600 disabled:opacity-50"
      @click="toggleModal"
    >
      <FontAwesomeIcon icon="download" class="mr-2" />
      Download Tokens
    </button>

    <div
      class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center transition"
      :class="{ 'opacity-0 pointer-events-none': !shown }"
    >
      <div class="absolute h-full w-full bg-gray-800 opacity-90"></div>

      <div class="z-50 mx-auto w-11/12 overflow-y-auto rounded bg-gray-100 shadow-lg dark:bg-gray-900 md:max-w-md">
        <div class="py-4 px-6 text-left">
          <div class="flex items-center justify-between pb-3">
            <div class="flex items-center space-x-3">
              <FontAwesomeIcon icon="download" size="lg" />
              <h5 class="text-2xl font-bold text-black dark:text-white">Download Tokens</h5>
            </div>

            <div class="z-50 flex cursor-pointer items-center" @click="toggleModal">
              <FontAwesomeIcon
                icon="circle-xmark"
                class="text-red-500 hover:cursor-pointer hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
              />
            </div>
          </div>
          <span class="mb-3 block text-gray-700 dark:text-gray-400"
            >Export your tokens in one of the supported formats (.txt or .csv)</span
          >

          <label class="font-semibold text-black dark:text-white">File Type:</label>
          <select
            v-model="exportType"
            class="border-blurple focus:border-blurple-dark mt-1.5 w-full rounded border-2 bg-gray-200 p-2 text-black outline-none dark:bg-gray-800 dark:text-white"
          >
            <option v-for="type in ['txt', 'csv']" :key="type" :value="type">.{{ type }} File</option>
          </select>

          <div class="mt-3">
            <label class="font-semibold text-white">Values:</label>
            <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              <label
                v-for="value in Object.keys(values)"
                :key="`v-${value}`"
                class="flex items-center space-x-3 hover:cursor-pointer"
              >
                <input
                  v-model="values[value]"
                  type="checkbox"
                  class="checked:bg-blurple h-5 w-5 appearance-none rounded border border-gray-300 checked:border-transparent focus:outline-none"
                  checked
                />
                <span class="font-semibold text-black dark:text-white">{{ value.toUpperCase() }}</span>
              </label>
            </div>
          </div>

          <div class="mt-10 flex justify-end border-t border-gray-400 dark:border-gray-600">
            <button
              class="mt-3 rounded bg-green-500 p-2 font-semibold text-gray-50 transition hover:bg-green-600 disabled:opacity-50"
              @click="downloadTokens"
            >
              <FontAwesomeIcon icon="download" class="mr-2" />
              Download Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ExportModal',
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    shown: false,
    exportType: 'txt',
    values: { username: true, discriminator: true, id: true, avatar: true, email: true, phone: true },
  }),
  methods: {
    toggleModal(): void {
      this.shown = !this.shown;
    },
    downloadTokens(): void {
      const link = document.createElement('a');
      link.setAttribute(
        'href',
        `data:text/${
          this.exportType === 'txt' ? 'plain' : this.exportType
        };charset=utf-8,${this.generateFileContents()}`
      );
      link.setAttribute(
        'download',
        `tokens-${new Date().toLocaleDateString('en-US').replaceAll('/', '_')}.${this.exportType}`
      );

      link.style.display = 'none';
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    },
    generateFileContents(): string {
      let fileContent = '';
      const enabledValues = Object.keys(this.values).filter((value) => this.values[value] === true);
      if (this.exportType === 'txt') {
        for (const account of this.accounts) {
          if (enabledValues.length > 0) {
            fileContent += enabledValues.map((val) => `${val.toUpperCase()}: ${account.user[val] ?? '-'}`).join(' | ');
            fileContent += '\n';
          }

          fileContent += account.tokens.map((token) => `${token}\n`);
        }
      }

      if (this.exportType === 'csv') {
        if (enabledValues.length > 0) {
          fileContent += ''.concat(...enabledValues.map((value) => value.toUpperCase() + ','));
        }

        fileContent += 'TOKENS\n';

        for (const account of this.accounts) {
          if (enabledValues.length > 0) {
            fileContent += enabledValues.map((val) => account.user[val] ?? '-').join(',');
            fileContent += ',';
          }

          fileContent += `"${account.tokens.join(',')}"\n`;
        }
      }

      return encodeURIComponent(fileContent);
    },
  },
});
</script>
