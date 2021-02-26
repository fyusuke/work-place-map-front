module.exports = {
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = 'Re:Work'
            return args
        })
    },
    css: {
        loaderOptions: {
          // pass options to sass-loader
          // @/ is an alias to src/
          // so this assumes you have a file named `src/variables.sass`
          // Note: this option is named as "prependData" in sass-loader v8
        //   sass: {
        //     additionalData: `@import "~@/variables.sass"`
        //   }
            sass: {
                additionalData: `@import "~@/assets/scss/style.scss"`
            }
        }
    }
}