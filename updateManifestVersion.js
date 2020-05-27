const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const manifestPath = './public/manifest.json';
const devManifestPath = './public/dev/manifest.json';

// read file and make object
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let devManifest = JSON.parse(fs.readFileSync(devManifestPath, 'utf8'));
let version = manifest.version.split('.');

const askForMajorVersionUpdate = () => {
  readline.question('Update major version ? (y/n)', (majorVersionResult) => {
    if (majorVersionResult === 'y') {
      majorVersion = true;
      version[0] = parseInt(version[0]) + 1;
      version[1] = 0;
      updateManifests();
    } else {
      readline.question(
        'Update minor version ? (y/n)',
        (minorVersionResult) => {
          if (minorVersionResult === 'y') {
            version[1] = parseInt(version[1]) + 1;
            updateManifests();
          } else {
            console.log('Extension version won t be update');
            process.exit();
          }
        },
      );
    }
  });
};

const updateManifestVersion = (
  manifestToUpdate,
  manifestPathToUpdate,
  newVersion,
  isDev = false,
) => {
  console.log(
    ` ${isDev ? 'Dev manifest' : 'Manifest'}  version update: ${
      manifestToUpdate.version
    }  -->  ${newVersion}`,
  );
  manifestToUpdate.version = newVersion;
  fs.writeFileSync(
    manifestPathToUpdate,
    JSON.stringify(manifestToUpdate, null, 2),
  );
};

const updateManifests = () => {
  const newVersion = version.join('.');
  updateManifestVersion(manifest, manifestPath, newVersion);
  updateManifestVersion(devManifest, devManifestPath, newVersion, true);
  console.log(`************************************************`);
  console.log(`*******     PLEASE UPDATE THE README     *******`);
  console.log(`********        DO NOT FORGET IT        ********`);
  console.log(`************************************************`);
  process.exit();
};

askForMajorVersionUpdate();
