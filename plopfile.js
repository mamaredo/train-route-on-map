const path = require('path')
const fs = require('fs')

const componentGenerater = require('./generator/component')
const featureGenerater = require('./generator/feature')
const hookGenerater = require('./generator/hook')
const utilGenerater = require('./generator/util')

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const handleStringCase = {
    pascalCase: str => plop.handlebars.helpers.pascalCase(str),
    camelCase: str => plop.handlebars.helpers.camelCase(str)
  }

  plop.getParentIndexAction = function (
    answer,
    moduleStringCase,
    { target, templateFile }
  ) {
    const existsParentIndex = fs.existsSync(
      path.resolve(__dirname, './' + target)
    )
    const action = existsParentIndex
      ? {
          type: 'modify',
          path: target,
          templateFile,
          transform: current => {
            const currentModules = current.trim()
            const transformedModule = handleStringCase[moduleStringCase](answer)

            const newModule = `export * from './${transformedModule}'`
            const updatedModules = currentModules + '\n' + newModule + '\n'

            return Promise.resolve(updatedModules)
          }
        }
      : {
          type: 'add',
          path: target,
          templateFile
        }

    return action
  }

  componentGenerater('component', plop)
  featureGenerater('feature', plop)
  hookGenerater('hook', plop)
  utilGenerater('util', plop)
}
