const plugin = require('../lib/index').default

const { transform } = plugin()

it('basic', () => {
  const result = transform(`
  # title
  - a
  - b
  ## title2
  1. a
  2. b
  `, 'test.md')
  expect(result.code).toMatchSnapshot()
});

it('code fence', () => {
  const result = transform(`
  # title
  ## title2
  \`test\`
  \`\`\`js
  { 
    a: 123
  }
  \`\`\`
  `, 'test.md')
  expect(result.code).toMatchSnapshot()
});