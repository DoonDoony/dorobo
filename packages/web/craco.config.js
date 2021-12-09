const CracoAlias = require('craco-alias')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  eslint: {
    enable: false,
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.path.json',
      },
      overrideCracoConfig: ({ cracoConfig }) => {
        console.dir(cracoConfig)
        if (typeof cracoConfig.eslint.enable !== 'undefined') {
          cracoConfig.disableEslint = !cracoConfig.eslint.enable
        }
        delete cracoConfig.eslint
        return cracoConfig
      },
      overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
        if (typeof cracoConfig.disableEslint !== 'undefined' && cracoConfig.disableEslint === true) {
          webpackConfig.plugins = webpackConfig.plugins.filter(
            instance => instance.constructor.name !== 'ESLintWebpackPlugin'
          )
        }
        return webpackConfig
      },
    },
  ],
}
