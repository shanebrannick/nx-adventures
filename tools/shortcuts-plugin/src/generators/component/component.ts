import { componentGenerator as ngComponentGenerator, } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/component/schema';
import { Tree } from '@nx/devkit';
import { ComponentGeneratorSchema, NoramlizedComponentGeneratorSchema } from './schema';

//-----------------------------//

function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): NoramlizedComponentGeneratorSchema {

  const directory = options.directory || options.name;
  return {
    ...options,
    directory: directory + '/' + directory,
    prefix: options.prefix || 'aviva',
  }

}

//-----------------------------//


function generateComponentSchema(tree: Tree, options: NoramlizedComponentGeneratorSchema): Schema {

  return {
    path: options.directory,
    name: options.name,
    displayBlock: true,
    inlineStyle: false,
    inlineTemplate: false,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
    skipTests: false,
    skipImport: true,
    selector: options.prefix + '-' + options.name,
    export: false,
    exportDefault: false,
    prefix: options.prefix,
    skipFormat: false,
  }

}

//-----------------------------//

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {

  const normalizedOptions = normalizeOptions(tree, options);
  const generatedSchema = generateComponentSchema(tree, normalizedOptions)

  console.log('generatedSchema', generatedSchema); 

  await ngComponentGenerator(tree, generatedSchema);
}

export default componentGenerator;



// npx nx generate @nx-adventures/shortcuts-plugin:component --name=generated --no-interactive --dry-run 