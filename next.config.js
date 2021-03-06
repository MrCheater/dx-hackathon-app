module.exports = {
  webpack: (config, { dev }) => {
    const entry = config.entry
    config.entry = async (...args) => {
      const result = await entry(...args)
      result['main.js'] = [
        'babel-polyfill',
        'regenerator-runtime/runtime',
        ...result['main.js']
      ]
      return result
    }

    return config
  }
}
