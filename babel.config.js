module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'app/',
          rootPathPrefix: '@/'
        }
      ]
    ]
  }
}
