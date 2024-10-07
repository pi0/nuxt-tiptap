# Nuxt + TipTap

[Tiptap][tiptap] editor demo made with [Nuxt][nuxt], [Nitro](nitro) and [y-crossws][y-crossws] for live collaboration.

Zero-config deploys to everywhere!

## How it works?

**Client:**

We have integrated [Tiptap][tiptap] editor with [Vue.js][vue] with a WebSocket provider for live collaboration. Check [components/TiptapEditor.vue](./components/TiptapEditor.vue) for code.

**Server:**

We add [y-crossws][y-crossws] in a [server route](https://nitro.unjs.io/guide/routing). That's all needed!

[server/api/yjs/[slug].ts](./server/api/yjs/[slug].ts):

```ts
import { createHandler } from "y-crossws";

export default defineWebSocketHandler(createHandler().hooks);
```

## Stack

**Client:**

- **[Nuxt][nuxt]**: Fullstack [Vue.js][Vue] based framework that makes web development intuitive and powerful.
- **[Tiptap][tiptap]**: Headless editor framework with various extensions, such as collaboration.
- **[Prosemirror][porsemirror]**: A toolkit for building rich-text editors. [Tiptap][tiptap] uses it as its underlying editor engine.

**Server:**

- **[Nitro][nitro]**: Server toolkit used by [Nuxt][nuxt] for runtime agnostic server development and deployments.
- **[Crossws][crossws]**: Cross-platform WebSocket server integrated into [Nitro][nitro].
- **[yjs][yjs]**: A [CRDT](https://github.com/yjs/yjs/blob/master/README.md#Yjs-CRDT-Algorithm) library for live collaborative editing.
- **[y-crossws][y-crossws]**: Framework- and platform-agnostic WebSocket server for [yjs][yjs] made with [crossws][crossws].

<!-- references -->

[nuxt]: https://nuxt.com/
[vue]: https://vuejs.org/
[nitro]: https://nitro.unjs.io/
[crossws]: https://crossws.unjs.io
[yjs]: https://yjs.dev/#features
[y-crossws]: https://github.com/pi0/y-crossws
[tiptap]: https://tiptap.dev/
[porsemirror]: https://prosemirror.net/

## Development

Make sure to install the dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

Build the application for production:

```bash
pnpm run build # --preset <deployment preset>
```

Check out the [deployment docs](https://nitro.unjs.io/deploy) for more information.

## Credits

Demo made by [pi0](https://github.com/pi0) based on [Tiptap demo](https://github.com/ueberdosis/tiptap/blob/main/demos/src/Demos/CollaborationSplitPane/React).
