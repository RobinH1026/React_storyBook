const path = require('path');
const fse = require('fs-extra');
const fs = require('fs'); 
const glob = require('glob');

const packagePath = process.cwd();
const buildPath= path.join(packagePath, './build')
const srcPath= path.join(packagePath, './src')

/**
 * Make Build Folder If Not Exist.
 */
async function makeFolder({ to }) {
  console.log(to)
  if (!(await fse.exists(to))) {
    await fs.mkdirSync(to);
  }
  return [];
}

async function typesCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(async file => {
    await fse.copy(path.resolve(from, file), path.resolve(to, file))
    await fse.remove(path.resolve(from, file))
  });
  return Promise.all(cmds);
}

async function cssCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.css', { cwd: from });
  const cmds = files.map(async file => {
    await fse.copy(path.resolve(from, file), path.resolve(to, file))
  });
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: './index.js',
    module: './esm/index.js',
    types: './index.d.ts',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function run() {
  await makeFolder({ to: buildPath })
  await createPackageFile()
  await typesCopy({ from: srcPath, to: buildPath });
  await cssCopy({ from: srcPath, to: buildPath });
}

run();
