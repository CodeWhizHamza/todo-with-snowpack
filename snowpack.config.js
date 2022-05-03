/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: ['@snowpack/plugin-typescript', '@snowpack/plugin-sass'],
  packageOptions: {},
  devOptions: {},
  buildOptions: {
    out: 'dist',
  },
  optimize: {
    minify: true,
    bundle: true,
    target: 'es2017',
  },
}

