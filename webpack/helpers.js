var path = require('path')
var fs = require('fs')
var projectRootPath = path.resolve(__dirname, '../')
var webpack = require('webpack')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({ size: 5 })

module.exports = {
  createHappyPlugin: createHappyPlugin,
  installVendorDLL: installVendorDLL,
  isValidDLLs: isValidDLLs,
}

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,

    // make happypack more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1',
  })
}

function installVendorDLL(config, dllName) {
  var manifest = loadDLLManifest(
    path.join(projectRootPath, `webpack/dlls/${dllName}.json`))

  if (manifest) {
    console.log(`Webpack: will be using the ${dllName} DLL.`)

    config.plugins.push(new webpack.DllReferencePlugin({
      context: projectRootPath,
      manifest: manifest,
    }))
  }
}

function loadDLLManifest(filePath) {
  try {
    return require(filePath)
  }
  catch (e) {
    process.env.WEBPACK_DLLS = '0'

    console.error(`========================================================================
  Environment Error
------------------------------------------------------------------------
You have requested to use webpack DLLs (env var WEBPACK_DLLS=1) but a
manifest could not be found. This likely means you have forgotten to
build the DLLs.
You can do that by running:
    npm run build-dlls
The request to use DLLs for this build will be ignored.`)
  }

  return undefined
}

function isValidDLLs(dllNames, assetsPath) {
  for (var dllName of [].concat(dllNames)) {
    try {
      var manifest = require(
        path.join(projectRootPath, `webpack/dlls/${dllName}.json`))
      var dll = fs.readFileSync(
        path.join(assetsPath, `dlls/dll__${dllName}.js`)).toString('utf-8')
      if (dll.indexOf(manifest.name) === -1) {
        console.warn(`Invalid dll: ${dllName}`)
        return false
      }
    } catch (e) {
      return false
    }
  }
  return true
}
