import { mkdirSync, writeFileSync } from "node:fs";


const paths = {
  errors: "cjs/shared/errors",
  pdf: "cjs/pdf/index",
  svg: "cjs/svg/index",
  types: "cjs/shared/types",
  utils: "cjs/shared/utils"
};

for(const dir in paths){
  const path = paths[dir];
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/package.json`, JSON.stringify({
    main: `../lib/${path}.cjs`,
    types: `../lib/${path}.d.ts`
  }, null, 2));
}
