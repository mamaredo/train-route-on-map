module.exports = function (
  name = 'hook',
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator(name, {
    description: 'src/hooks/*',
    prompts: [
      {
        type: 'input',
        name: 'hook',
        message: '\nuse{inputValue}\nhook name'
      }
    ],
    actions: ({ hook }) => {
      const actions = [
        {
          type: 'add',
          path: 'src/hooks/use{{pascalCase hook}}.ts',
          templateFile: 'generator/hook/useHook.ts.hbs'
        },
        // `use ${hook}`： 半角スペースがあることで単語が区切られ適当な文字ケースに変換させることができる
        plop.getParentIndexAction(`use ${hook}`, 'camelCase', {
          target: 'src/hooks/index.ts',
          templateFile: 'generator/hook/index.ts.hbs'
        })
      ]

      return actions
    }
  })
}
