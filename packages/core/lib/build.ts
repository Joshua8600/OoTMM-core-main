import fs from 'fs/promises';
import path from 'path';
import { sync as globSync } from 'glob';
import JSZip from 'jszip';

import { build as comboBuild } from './combo/build';
import { codegen as comboCodegen } from './combo/codegen';
import { customAssetsKeep, customFiles } from './combo/custom';
import { Monitor } from './combo/monitor';
import { DEFAULT_SETTINGS } from './combo';
import { cosmeticsAssets } from './combo/cosmetics';
import { DEFAULT_COSMETICS } from './combo/cosmetics/util';
import { DEFAULT_RANDOM_SETTINGS } from './combo/settings/random';

async function build() {
  const opts = {} as any;
  await Promise.all([
    comboCodegen(dummyMonitor),
    cosmeticsAssets(opts),
  ]);
  const b = await comboBuild({ debug: false, seed: 'BUILD', settings: DEFAULT_SETTINGS, cosmetics: DEFAULT_COSMETICS, random: DEFAULT_RANDOM_SETTINGS });

  /* Create the zip */
  const zip = new JSZip();

  /* Add the payload and the patches */
  await Promise.all(
    Object.entries(b).map(async ([game, { payload, patches }]) => {
      zip.file(`${game}_payload.bin`, payload);
      zip.file(`${game}_patch.bin`, patches);
    })
  );

  /* Add the extra assets */
  await customAssetsKeep(opts);
  await customFiles(opts);
  for (const basePath of ["build/assets", "data/static"]) {
    const matches = globSync(['**/*.bin', '**/*.zobj'], { cwd: basePath });
    for (const filename of matches) {
      const data = await fs.readFile(path.join(basePath, filename));
      zip.file(filename, data);
    }
  }

  /* Compress the data */
  const zipBuf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });
  await fs.writeFile('dist/data.zip', zipBuf);
}

const dummyMonitor = new Monitor({});

build().catch((err) => {
  console.error(err);
  /* DEBUG */
  setTimeout(() => process.exit(1), 10000);
  //process.exit(1);
});
