# Testing `pnpm recursive install` behavior

See https://github.com/pnpm/pnpm/issues/1585 for details.

Between runs, clean up any installed artifacts with:

    rm -rf **/node_modules node_modules **/shrinkwrap.yaml shrinkwrap.yaml
    
To show the size taken by the installation, create **~/space-taken.sh**:

```sh
#!/bin/sh
DEVICE=$(df . | awk 'END{print $1}')
USED_SPACE_BEFORE=$(df -k | grep $DEVICE | cut -d' ' -f 3)
$@
USED_SPACE_AFTER=$(df -k | grep $DEVICE | cut -d' ' -f 3)
echo $(($USED_SPACE_AFTER-USED_SPACE_BEFORE))
```

## `.npmrc` blank
* "Resolving: total 1044, reused 1044, downloaded 0, done"
* `~/space-taken pnpm recursive install`: 25840
* {a,b}/node_modules contains soft links to direct dependencies into `.registry.npmjs.org`, which has hard links into the store
* {a,b}/shrinkwrap.yaml

## `.npmrc`: `link-workspace-packages = true` only
* exactly as above

## No `.npmrc`, `~/space-taken pnpm recursive install --link-workspace-packages`
* exactly as above

## `.npmrc`: `link-workspace-packages = false` only
* exactly as above

## `.npmrc`: `shared-workspace-shrinkwrap = true` only
* Resolving: total 522, reused 522, downloaded 0
* `~/space-taken pnpm recursive install`: 13008
* {a,b}/node_modules contain soft links to ./node_modules
* shrinkwrap.yaml only in the monorepo root
* node_modules in the monorepo root

## `.npmrc`: both true
* almost exactly as above, but space-taken shows 12984
