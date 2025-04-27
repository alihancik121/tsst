<template>
  <div class="flex items-center space-x-1">
    <Tooltip v-for="flagName in ownedFlags" :key="`f-${flagName}`" :title="toTitleCase(flagName)">
      <img
        class="drop-shadow dark:drop-shadow-none"
        :src="`/img/badges/${flagName.toLowerCase()}.svg`"
        :height="flagName === 'VERIFIED_BOT' ? 17 : badgeSize"
        :width="flagName === 'VERIFIED_BOT' ? 40 : 15"
        :alt="toTitleCase(flagName)"
      />
    </Tooltip>

    <Tooltip v-if="user.premium_type > 0" :title="['Nitro Classic', 'Nitro Full'][user.premium_type - 1]">
      <img
        class="drop-shadow dark:drop-shadow-none"
        src="/img/badges/nitro.svg"
        :height="badgeSize"
        :width="badgeSize"
        alt="Nitro"
      />
    </Tooltip>
  </div>
</template>

<script lang="ts">
const userFlags = Object.freeze({
  DISCORD_EMPLOYEE: 1 << 0,
  PARTNERED_SERVER_OWNER: 1 << 1,
  HYPESQUAD_EVENTS: 1 << 2,
  BUGHUNTER_LEVEL_1: 1 << 3,
  HOUSE_BRAVERY: 1 << 6,
  HOUSE_BRILLIANCE: 1 << 7,
  HOUSE_BALANCE: 1 << 8,
  EARLY_SUPPORTER: 1 << 9,
  TEAM_USER: 1 << 10,
  BUGHUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT: 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER: 1 << 17,
  DISCORD_CERTIFIED_MODERATOR: 1 << 18,
  ACTIVE_DEVELOPER: 1 << 22,
});

export default defineComponent({
  name: 'BadgeList',
  props: {
    user: {
      type: Object,
      required: true,
    },
    badgeSize: {
      default: '32',
      type: String,
    },
  },
  computed: {
    ownedFlags(): string[] {
      return Object.keys(userFlags).filter((bit) => this.hasFlag(bit));
    },
  },
  methods: {
    hasFlag(bit: string): boolean {
      return this.user.flags && (this.user.flags & userFlags[bit]) === userFlags[bit];
    },
    toTitleCase(str: string): string {
      const splitStr = str.replaceAll('_', ' ').toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }

      return splitStr.join(' ');
    },
  },
});
</script>
