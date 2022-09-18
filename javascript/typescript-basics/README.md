# Environment Setup

Let's initialize Node.js project:

```sh
npm init -y
```

Add `typescript` as a development dependency:

```sh
npm i -D typescript
```

After the `typescript` package is installed, you will have the `tsc` binary
available.

Add `ts-node`, which is essentially a wrapper around `node` to get it to work
with `.ts` files, as a development dependency:

```sh
npm i -D ts-node
```

Initialize a `tsconfig.json`:

```sh
tsc --init
```
