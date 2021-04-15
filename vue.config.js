const git = require('git-rev-sync');

process.env.VUE_APP_GIT_HASH = git.short();

module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    }
  },
  pluginOptions: {
    browserExtension: {
      components: {
        background: true,
        contentScripts: true
      },
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'better-volume': [
              'src/content-scripts/better-volume.js'
            ]
          }
        }
      }
    }
  }
}
