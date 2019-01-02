# Testing `pnpm recursive install` behavior

See https://github.com/pnpm/pnpm/issues/1585 for details.

Between runs, clean up any installed artifacts with:

    rm -rf **/node_modules node_modules **/shrinkwrap.yaml shrinkwrap.yaml
    
To show the size taken by node_modules, run `du -sh node_modules`.

## .npmrc blank
* "Resolving: total 1044, reused 1044, downloaded 0, done"
* a/node_modules = 93Mb, b/node_modules = 93Mb
* a/shrinkwrap.yaml, b/shrinkwrap.yaml

## .npmrc: `link-workspace-packages = true` only
* exactly as above:
  * "Resolving: total 1044, reused 1044, downloaded 0, done"
  * a/node_modules = 93Mb, b/node_modules = 93Mb
  * a/shrinkwrap.yaml, b/shrinkwrap.yaml

## .npmrc: `shared-workspace-shrinkwrap = true` only
* Resolving: total 522, reused 522, downloaded 0
* a/node_modules and b/node_modules contain hard links
* shrinkwrap.yaml only in the monorepo root
* node_modules full (not links) in the monorepo root

## .npmrc: both true
* exactly as above:
  * Resolving: total 522, reused 522, downloaded 0
  * a/node_modules and b/node_modules contain hard links
  * shrinkwrap.yaml only in the monorepo root
  * node_modules full (not links) in the monorepo root
