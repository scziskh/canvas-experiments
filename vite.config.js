import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: "./",
    plugins: [solidPlugin()],
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT),
    },
    build: {
      target: "esnext",
    },
    define: {
      "process.env": env,
    },
  });
};
