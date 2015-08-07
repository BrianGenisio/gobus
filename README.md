# GoBus!

### How to Build

```shell
$ gulp build                    # or, `gulp build --release`
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.  This will minimize your JavaScript; you will also see some warnings from
[uglify](https://github.com/mishoo/UglifyJS) where it removes unused code from your release.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```
