module.exports = function (
  name = 'util',
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator(name, {
    description: 'src/utils/*',
    prompts: [
      {
        type: 'input',
        name: 'util',
        message: 'camelCase util name'
      }
    ],
    actions: ({ util }) => {
      const actions = [
        {
          type: 'add',
          path: 'src/utils/{{camelCase util}}.ts',
          templateFile: 'generator/util/utilityFunction.ts.hbs'
        },
        plop.getParentIndexAction(util, 'camelCase', {
          target: 'src/utils/index.ts',
          templateFile: 'generator/util/index.ts.hbs'
        })
      ]

      return actions
    }
  })
}
