## 1.0.0 (2016-11-28)

##### Chores

* **develop:** Added bitHound config ([e4044433](https://github.com/fvdm/nodejs-overheid.io/commit/e4044433a6b7b65de7322b6e6c25801c425d6acb))
* **package:** Replaced test runner and dev deps by dotest ([8605da3a](https://github.com/fvdm/nodejs-overheid.io/commit/8605da3a3468bfd5aae59d5383e7425bd6ff4f16))

##### Documentation Changes

* **readme:**
  * Moved long example to top ([a3269884](https://github.com/fvdm/nodejs-overheid.io/commit/a32698841874a8f635ad059019b4be201bf321e6))
  * Added errors section ([59ddf12f](https://github.com/fvdm/nodejs-overheid.io/commit/59ddf12f0a0238c0c1843db7fc40d3069a01c011))
  * Examples for different uses ([9764d9ac](https://github.com/fvdm/nodejs-overheid.io/commit/9764d9ac06f2f39f2a4992c1026dba5b569ee602))
  * Fixed table header ([b89ec094](https://github.com/fvdm/nodejs-overheid.io/commit/b89ec0940383a12d47be48d2429b6a6e20cfc140))
* **badges:**
  * Added bitHound code quality ([2b401dea](https://github.com/fvdm/nodejs-overheid.io/commit/2b401deac13b060ae057876a99982e769418b388))
  * Replace Gemnasium with bitHound deps ([2e40d842](https://github.com/fvdm/nodejs-overheid.io/commit/2e40d8426b229467d9359c0b55f878d7c8eb1dee))

##### Refactors

* **main:**
  * Rewrite error handling ([d38bafa5](https://github.com/fvdm/nodejs-overheid.io/commit/d38bafa5059727d9e438b906aaf73738f64f463f))
  * Default data to empty string ([5caeee26](https://github.com/fvdm/nodejs-overheid.io/commit/5caeee26ba14cdcdd268ff9d851bf511af82000a))

##### Code Style Changes

* **test:** Removed space on function call w/o params ([2b009761](https://github.com/fvdm/nodejs-overheid.io/commit/2b009761bdf479754ded66cb620351114326b3c2))
* **main:** Removed meaningless spaces ([37aeafc4](https://github.com/fvdm/nodejs-overheid.io/commit/37aeafc49746b753f2b4c4cf2dd44f29e058de52))

##### Tests

* **main:**
  * 'no result' is 'Error: no result' ([2fc16860](https://github.com/fvdm/nodejs-overheid.io/commit/2fc16860e1555da5d969a7f44ccaeff8f8b4fe73))
  * config.timeout is ‘request failed’ ([c12a0fa0](https://github.com/fvdm/nodejs-overheid.io/commit/c12a0fa04a3b0e0c2094f8544940f6fe9ccb1e74))
  * Reordered 'Error: invalid response' checks ([bddf57ee](https://github.com/fvdm/nodejs-overheid.io/commit/bddf57ee30ae5cb4febe89e4bf5ef650310a7f2a))
  * Check err isNull on normal requests ([c58c3d3b](https://github.com/fvdm/nodejs-overheid.io/commit/c58c3d3b89068e26d625e8d2fee4b6571a7ec104))
  * Added 'Error: API error' test ([a0a3d16f](https://github.com/fvdm/nodejs-overheid.io/commit/a0a3d16fdfc6b9b41594731d44c3a2ab686451ec))
  * Added 'Error: invalid response' test ([37d9cee5](https://github.com/fvdm/nodejs-overheid.io/commit/37d9cee58c57f14269bc1c24c5deec8fedd0c005))
  * Include key/value param ([18c355ed](https://github.com/fvdm/nodejs-overheid.io/commit/18c355ed56418f0c84ea906de6abf4d72ae0ae6b))
* **config:** Use dynamic node versions on Travis CI ([b1ff71e8](https://github.com/fvdm/nodejs-overheid.io/commit/b1ff71e8bcb74c179ffe393747d231a20fa8b75b))

#### 0.3.5 (2016-8-16)

##### Documentation Changes

* **readme:** Fixed syntax typo ([15e3c071](https://github.com/fvdm/nodejs-overheid.io/commit/15e3c071b60b93015de9f9fa1d1a5c23fa2479d7))

#### 0.3.4 (2016-8-16)

##### Code Style Changes

* **main:** Removed block padding ([2dec789e](https://github.com/fvdm/nodejs-overheid.io/commit/2dec789e1813b13060b35a695b297b9c42fee8d6))

#### 0.3.3 (2016-8-16)

##### Refactors

* **main:** JSdoc the functions ([953b88d7](https://github.com/fvdm/nodejs-overheid.io/commit/953b88d728d4855077741ae76ff2e490794077f8))
* **errors:** Moved common errors to doError() ([ec38a79b](https://github.com/fvdm/nodejs-overheid.io/commit/ec38a79b0f012593aad575c8b794b1f0c888e06d))

#### 0.3.2 (2016-8-16)

##### Chores

* **package:** Minor clean up, added keywords ([b6b7f907](https://github.com/fvdm/nodejs-overheid.io/commit/b6b7f907cec462fd6abb57a47622ad49f3ec32c6))

##### Tests

* **script:** Run tests even when API key is not set ([27b6ce1e](https://github.com/fvdm/nodejs-overheid.io/commit/27b6ce1e68c89172e2b2443cb76b8e6ea3464c4b))

#### 0.3.1 (2016-8-16)

##### Chores

* **package:**
  * Added coverage dependencies ([0c0c338e](https://github.com/fvdm/nodejs-overheid.io/commit/0c0c338ec32048e3855125caeca272e309487209))
  * Updated dependencies ([d3624b2d](https://github.com/fvdm/nodejs-overheid.io/commit/d3624b2d299674f8da10360d3450e27e49b65d04))
  * update eslint to version 3.0.0 ([f5e5ebea](https://github.com/fvdm/nodejs-overheid.io/commit/f5e5ebea781b92285e57bd3325b0ce450004d944))
  * update dotest to version 1.2.1 ([96b93b8a](https://github.com/fvdm/nodejs-overheid.io/commit/96b93b8a7ee168335dc5417eb50e04f64fb11293))
* **develop:** Added gitignore config ([bf57556d](https://github.com/fvdm/nodejs-overheid.io/commit/bf57556d4a4acf90c57adf38930b3c7b53787aae))

##### Documentation Changes

* **readme:** Updated author footnote ([61053da3](https://github.com/fvdm/nodejs-overheid.io/commit/61053da3d7d0d16a11473e08a27f88707393472d))
* **badges:**
  * Added Coveralls status badge ([ef1b9230](https://github.com/fvdm/nodejs-overheid.io/commit/ef1b92300c11c078b361992cc9542fe843740833))
  * Add Gemnasium dependencies status ([469fe12a](https://github.com/fvdm/nodejs-overheid.io/commit/469fe12a20164755b5b1efb6fd845a072a7e9dee))
  * Add npm version for changelog ([daa97fb8](https://github.com/fvdm/nodejs-overheid.io/commit/daa97fb8d1544f6642f8cb70969887aa22ab3e6e))

##### Other Changes

* **undefined:**
  * updated minimum dev dep versions ([e07fda59](https://github.com/fvdm/nodejs-overheid.io/commit/e07fda59dc11a0721668310e18b6634a99f41f82))
  * include eslint in test command ([f4274cbd](https://github.com/fvdm/nodejs-overheid.io/commit/f4274cbd1a316f87d0d09b44972e049785164ac9))
  * dev dep eslint 2.5.0 is broken ([edade578](https://github.com/fvdm/nodejs-overheid.io/commit/edade578709a637d03b5dc0f454d97d62a0554e4))

##### Refactors

* **package:** Minimum supported node v4.0 ([b468510b](https://github.com/fvdm/nodejs-overheid.io/commit/b468510bc40a62df6c780423db3141cc642c1be6))

##### Tests

* **runner:** Added test.sh runner ([c16d824a](https://github.com/fvdm/nodejs-overheid.io/commit/c16d824aee5b21a8ee2c4a75e1e70ad5f1425d86))
* **lint:** Update eslint to ES6 ([acec49e8](https://github.com/fvdm/nodejs-overheid.io/commit/acec49e8ec208e9ea61e2aa860f7dd2636350335))
* **undefined:**
  * add node v6 to Travis config ([e9a0de06](https://github.com/fvdm/nodejs-overheid.io/commit/e9a0de06b024e42f744f2b1e2224679a61c2d548))
  * clean up code ([be06706f](https://github.com/fvdm/nodejs-overheid.io/commit/be06706f32da5eb61870e9fd22a7e6229f3072bd))
  * check API key before doing anything else ([df66aad1](https://github.com/fvdm/nodejs-overheid.io/commit/df66aad15440a12bddf1215a35511fbfc1937bdb))
  * fixed eslint errors ([af2c6013](https://github.com/fvdm/nodejs-overheid.io/commit/af2c601330a2080a67a5ff2b80c3e6974c67ee9d))
  * modernized eslint config, minor updates ([12a1ab00](https://github.com/fvdm/nodejs-overheid.io/commit/12a1ab008df7bc37d46eb76a9485428acac3cbad))

