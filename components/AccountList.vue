<template>
  <div class="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
    <div v-for="account of accounts" :key="account.user.id">
      <div
        class="hover:scale-102 cursor-pointer rounded-lg bg-gray-200 p-5 drop-shadow-lg transition ease-in-out hover:-translate-y-1 dark:bg-gray-800 dark:drop-shadow-none"
        @click="toggleAccountDetails(account.user.id)"
      >
        <div class="flex justify-between">
          <div class="flex items-center space-x-4">
            <AccountAvatar size="64" :user="account.user" class="drop-shadow-md" />

            <div>
              <div class="flex items-center font-semibold">
                <span>{{ account.user.username }}</span>
                <span class="text-xs text-gray-600 dark:text-gray-400">#{{ account.user.discriminator }}</span>
                <BadgeList :user="account.user" badge-size="18" class="ml-2" />
              </div>
              <small class="text-gray-700 dark:text-gray-400">{{ account.user.id }}</small>
            </div>
          </div>

          <FontAwesomeIcon
            icon="circle-xmark"
            class="text-red-500 hover:cursor-pointer hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            @click="removeAccount(account.user.id)"
          />
        </div>
      </div>

      <div
        class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center transition"
        :class="{ 'opacity-0 pointer-events-none': accountDetailsShown !== account.user.id }"
      >
        <div class="absolute h-full w-full bg-gray-800 opacity-90"></div>

        <div
          class="z-50 mx-auto max-h-full w-11/12 overflow-y-auto rounded bg-gray-100 shadow-lg dark:bg-gray-900 md:max-w-xl"
        >
          <div class="py-4 px-6 text-left">
            <div class="flex items-center justify-between pb-3">
              <div class="flex items-center space-x-3">
                <AccountAvatar size="64" :user="account.user" class="drop-shadow-md" />
                <div>
                  <div class="flex items-center">
                    <h5 class="text-xl font-bold text-black dark:text-white">
                      {{ account.user.username }}#{{ account.user.discriminator }}
                    </h5>
                    <BadgeList :user="account.user" badge-size="18" class="ml-2" />
                  </div>

                  <span class="text-sm dark:text-gray-300">{{ account.user.id }}</span>
                </div>
              </div>

              <div class="z-50 flex cursor-pointer items-center" @click="toggleAccountDetails(account.user.id)">
                <FontAwesomeIcon
                  icon="circle-xmark"
                  class="text-red-500 hover:cursor-pointer hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                />
              </div>
            </div>

            <div class="pt-5">
              <h5 class="mb-2 text-lg font-bold text-black dark:text-white">Account Information</h5>
              <div class="overflow-x-auto">
                <table class="min-w-full table-auto">
                  <tbody>
                    <tr class="border border-gray-600">
                      <th class="border-r border-gray-600 px-2 py-1">Verified</th>
                      <td class="px-2 py-1">
                        <FontAwesomeIcon
                          :class="account.user.verified ? `text-green-500` : `text-red-500`"
                          :icon="account.user.verified ? `check-circle` : `circle-xmark`"
                        />
                      </td>
                    </tr>
                    <tr class="border border-gray-600">
                      <th class="border-r border-gray-600 px-2 py-1">Email</th>
                      <td class="px-2 py-1">{{ account.user.email ?? '-' }}</td>
                    </tr>
                    <tr class="border border-gray-600">
                      <th class="border-r border-gray-600 px-2 py-1">Phone</th>
                      <td class="px-2 py-1">{{ account.user.phone ?? '-' }}</td>
                    </tr>
                    <tr class="border border-gray-600">
                      <th class="border-r border-gray-600 px-2 py-1">MFA</th>
                      <td class="px-2 py-1">
                        <FontAwesomeIcon
                          :class="account.user.mfa_enabled ? `text-green-500` : `text-yellow-500`"
                          :icon="account.user.mfa_enabled ? `check-circle` : `triangle-exclamation`"
                        />
                      </td>
                    </tr>
                    <tr class="border border-gray-600">
                      <th class="border-r border-gray-600 px-2 py-1">Account Creation</th>
                      <td class="px-2 py-1">
                        {{ new Date(snowflakeToMilliseconds(account.user.id)).toLocaleString() }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="pt-5">
              <h5 class="mb-2 text-lg font-bold text-black dark:text-white">Tokens ({{ account.tokens.length }})</h5>
              <div
                v-for="token in account.tokens"
                :key="token"
                class="mt-1 overflow-hidden text-ellipsis rounded bg-gray-300 p-1 text-sm dark:bg-gray-800"
              >
                <span>{{ token }}</span>
              </div>
            </div>

            <div class="pt-5">
              <h5 class="mb-2 text-lg font-bold text-black dark:text-white">JSON Data</h5>
              <pre
                class="overflow-hidden text-ellipsis rounded bg-gray-300 p-1 text-sm leading-tight dark:bg-gray-800"
                >{{ JSON.stringify(account.user, null, 1) }}</pre
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AccountList',
  props: {
    accounts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({ accountDetailsShown: null }),
  methods: {
    removeAccount(id: string): void {
      this.$emit('delete', id);
    },
    toggleAccountDetails(id: string): void {
      this.accountDetailsShown = this.accountDetailsShown ? null : id;
    },
  },
});
</script>
