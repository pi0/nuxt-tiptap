<script setup lang="ts">
let ws: WebSocket | undefined;

const message = ref<string>("");
const messages = useState<{ id: number, user: string, message: string, created_at: string }[]>(() => []);

const userId = useCookie<string>("userId")
if (!userId.value) {
  userId.value = getRandomUser().name
}

if (!messages.value.length) {
  // const res = await $fetch("/api/messages")
  // messages.value.push(...res.messages)
}

const log = (user: string, ...args: string[]) => {
  console.log("[ws]", user, ...args);
  messages.value.push({
    id: 0,
    message: args.join(" "),
    user: user,
    created_at: new Date().toLocaleString(),
  });
  scroll();
};

const connect = async () => {
  const wsProto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${wsProto}//${window.location.host}/api/chat`;
  if (ws) {
    log("ws", "Closing previous connection before reconnecting...");
    ws.close();
    clear();
  }

  log("ws", "Connecting to", wsUrl, "...");
  ws = new WebSocket(wsUrl);

  ws.addEventListener("message", (event) => {
    const { user = "system", message = "" } = event.data.startsWith("{")
      ? JSON.parse(event.data)
      : { message: event.data };
    log(
      user,
      typeof message === "string" ? message : JSON.stringify(message),
    );
  });

  await new Promise((resolve) => ws!.addEventListener("open", resolve));
  log("ws", "Connected!");
};

const clear = () => {
  messages.value.splice(0, messages.value.length);
  log("system", "previous messages cleared");
};

const scroll = () => {
  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight + 100);
  })
}

const send = () => {
  console.log("sending message...");
  if (message.value) {
    ws!.send(message.value);
  }
  message.value = "";
};

const ping = () => {
  log("ws", "Sending ping");
  ws!.send("ping");
};

onMounted(async () => {
  connect();
  scroll();
});

useServerHead({
  title: "Nuxt Chat",
})

</script>


<template>
  <div class="column-half">
    <!-- Messages -->
    <div id="messages" class="flex-grow flex flex-col justify-end px-4 pt-8 pb-21 sm:pb-12 text-slate-900 min-h-screen">
      <div class="flex items-center mb-4 overflow-x-scroll" v-for="message in messages" :key="message.id">
        <div class="flex flex-col">
          <p class="text-gray-500 mb-1 text-xs ml-10">{{ message.user }}</p>
          <div class="flex items-center">
            <img :src="'https://www.gravatar.com/avatar/' + encodeURIComponent(message.user) + '?s=512&d=monsterid'"
              alt="Avatar" class="w-8 h-8 rounded-full" />
            <div class="ml-2 rounded-lg p-2">
              <p class="">{{ message.message }}</p>
            </div>
          </div>
          <p class="text-gray-500 mt-1 text-xs ml-10">{{ message.created_at }}</p>
        </div>
      </div>
    </div>

    <!-- Chatbox -->
    <div class="px-4 py-2 flex items-center justify-between fixed bottom-0 flex-col sm:flex-row">
      <div class="w-full min-w-6">
        <input type="text" placeholder="Type your message..."
          class="w-full rounded-none px-4 py-2 bg-gray-700 focus:outline-none focus:ring focus:border-blue-300 sm:rounded-l-lg"
          @keydown.enter="send" v-model="message" />
      </div>
    </div>
  </div>
</template>
