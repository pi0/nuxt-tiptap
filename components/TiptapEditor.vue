<script setup lang="ts">
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

const editor = ref<Editor | undefined>();
const status = ref("connecting");
const room = ref("default");
const currentUser = ref(getRandomUser());

const setName = () => {
  const name = (window.prompt("Name", currentUser.value.name) || "")
    .trim()
    .slice(0, 32);
  if (name) {
    currentUser.value.name = name;
  }
};

onMounted(() => {
  // Create a new Yjs document
  const ydoc = new Y.Doc();

  // Connect to the sync provider ws server
  const wsProto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${wsProto}//${window.location.host}/api/yjs`;
  const provider = new WebsocketProvider(wsUrl, "tiptap", ydoc);

  // Update status changes
  const statusHandler = (event: { status: string }) => {
    status.value = event.status;
  };
  provider.on("status", statusHandler);

  // Save current user to localStorage and emit to editor
  watch(currentUser, () => {
    if (editor.value && currentUser.value) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
      editor.value.chain().focus().updateUser(currentUser.value).run();
    }
  });

  // Create a new editor instance
  editor.value = new Editor({
    onCreate: ({ editor: currentEditor }) => {
      provider.on("synced", () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(getDefaultContent());
        }
      });
    },
    extensions: [
      StarterKit.configure({ history: false }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({ limit: 10_000 }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({ provider }),
    ],
  });

  // Sync user
  editor.value.chain().focus().updateUser(currentUser.value).run();

  // Cleanup  after unmount
  onUnmounted(() => {
    provider.off("status", statusHandler);
    provider.disconnect();
    provider.destroy();
    ydoc.destroy();
    editor.value?.destroy();
  });
});
</script>

<template>
  <div class="column-half" v-if="editor">
    <BubbleMenu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
      <button @click="editor.chain().focus().toggleBold().run()" :class="editor.isActive('bold') ? 'is-active' : ''">
        Bold
      </button>

      <button @click="editor.chain().focus().toggleItalic().run()"
        :class="editor.isActive('italic') ? 'is-active' : ''">
        Italic
      </button>

      <button @click="editor.chain().focus().toggleStrike().run()"
        :class="editor.isActive('strike') ? 'is-active' : ''">
        Strike
      </button>
    </BubbleMenu>

    <!-- <FloatingMenu :tippy-options="{ duration: 100 }" :editor="editor">
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="editor.isActive('heading', { level: 1 }) ? 'is-active' : ''">
        H1
      </button>

      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="editor.isActive('heading', { level: 2 }) ? 'is-active' : ''">
        H2
      </button>

      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="editor.isActive('bulletList') ? 'is-active' : ''">
        Bullet list
      </button>
    </FloatingMenu> -->

    <editor-content class="main-group" :editor="editor" />

    <div class="collab-status-group" :data-state="status === 'connected' ? 'online' : 'offline'">
      <label>
        {{
          status === "connected"
            ? `${editor.storage.collaborationCursor.users.length} user${editor.storage.collaborationCursor.users.length === 1 ? "" : "s"} online in ${room}`
            : "offline"
        }}
      </label>
      <button :style="{ '--color': currentUser.color }" @click="setName">
        ✎ {{ currentUser.name }}
      </button>
    </div>
  </div>
</template>
