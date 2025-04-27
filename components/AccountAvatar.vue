<template>
  <img
    :src="`${imagePath}?size=${size}`"
    class="rounded-full shadow"
    :alt="`Avatar of ${tag}`"
    :width="size"
    :height="size"
    loading="lazy"
    @error="imageError = true"
  />
</template>

<script lang="ts">
export default defineComponent({
  name: 'AccountAvatar',
  props: {
    user: {
      type: Object,
      default: Object.assign(
        {},
        {
          id: null,
          avatar: null,
          username: null,
          discriminator: null,
        }
      ),
    },
    size: {
      type: String,
      default: '128',
    },
    format: {
      type: String,
      default: 'webp',
    },
  },
  data: () => ({ imageError: false }),
  computed: {
    tag(): string {
      return this.user ? `${this.user.username}#${this.user.discriminator}` : 'Unknown User';
    },
    imagePath(): string {
      const CDN_URL = 'https://cdn.discordapp.com';

      if (this.imageError || !this.user || !this.user.avatar) {
        const uri = this.user && this.user.discriminator ? this.user.discriminator % 5 : Math.floor(Math.random() * 6);
        return `${CDN_URL}/embed/avatars/${uri}.png`;
      }

      const isAnimated = this.user.avatar.startsWith('a_');
      return `${CDN_URL}/avatars/${this.user.id}/${this.user.avatar}.${isAnimated ? 'gif' : this.format}`;
    },
  },
});
</script>
