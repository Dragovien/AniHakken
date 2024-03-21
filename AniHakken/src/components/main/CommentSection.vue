<template>
  <section class="comment-section">
    <div class="message-wrapper">
      <q-chat-message
        :text="['Have you seen Quasar?']"
        sent
        text-color="white"
        bg-color="primary"
      >
        <template v-slot:name>me</template>
        <template v-slot:stamp>7 minutes ago</template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--sent"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          />
        </template>
      </q-chat-message>

      <q-chat-message bg-color="amber">
        <template v-slot:name>Mary</template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--received"
            src="https://cdn.quasar.dev/img/avatar2.jpg"
          />
        </template>

        <div>
          Already building an app with it...
          <img
            src="https://cdn.quasar.dev/img/discord-qeart.png"
            class="my-emoji"
          />
        </div>

        <q-spinner-dots size="2rem" />
      </q-chat-message>

       <q-chat-message bg-color="amber">
        <template v-slot:name>Mary</template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--received"
            src="https://cdn.quasar.dev/img/avatar2.jpg"
          />
        </template>

        <div>
          Already building an app with it...
          <img
            src="https://cdn.quasar.dev/img/discord-qeart.png"
            class="my-emoji"
          />
        </div>

        <q-spinner-dots size="2rem" />
      </q-chat-message>
    </div>
    <q-input rounded standout v-model="text" class="comment-input" label="Votre commentaire">
				<template v-slot:append>
					<q-icon name="send" @click="sendComment(text)" class="cursor-pointer"></q-icon>
				</template>
			</q-input>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      text: null,
    };
  },
  methods: {
    sendComment(text) {
      console.log(text);
    },
  },
});
</script>

<style lang="scss" scoped>
.my-emoji {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}

.comment-section {
  margin: 1em;
  
}

.message-wrapper {
  padding: 1em;
  border: 1px solid black;
  background-color: white;
  max-height: 30vh;
  overflow-y: auto;
}

.comment-input {
  margin: 2em 0;
}
</style>
