// @flow
/* eslint-env node */
const createNamedModuleVisitor = require('../babel-plugin-utils/visit-named-module');

module.exports = assetURLPlugin;

function assetURLPlugin(babel /*: Object */) {
  const t = babel.types;
  const visitor = createNamedModuleVisitor(
    t,
    'assetUrl',
    'fusion-core',
    refsHandler
  );
  return {visitor};
}

function refsHandler(t, context, refs = []) {
  refs.forEach(refPath => {
    const parentPath = refPath.parentPath;
    if (!t.isCallExpression(parentPath)) {
      return;
    }
    const args = parentPath.get('arguments');
    if (args.length !== 1) {
      throw parentPath.buildCodeFrameError(
        'assetUrl takes a single string literal argument'
      );
    }
    if (!t.isStringLiteral(args[0])) {
      throw parentPath.buildCodeFrameError(
        'assetUrl argument must be a string literal'
      );
    }
    args[0].replaceWith(
      t.callExpression(t.identifier('require'), [
        t.stringLiteral(
          `__SECRET_FILE_LOADER__?storeFile=true&storeFileTarget=node!${
            args[0].node.value
          }`
        ),
      ])
    );
  });
}
