<template>
    <div class="container select-tree-container">
        <section class="select-tree-demo-box">
            <selectTree
                    v-model="selectTree.key"
                    :tree="selectTree.tree"

            >
            </selectTree>
        </section>
        <section class="select-tree-demo-box">
            <selectTree
                    v-model="nSelectTree.key"
                    :tree="nSelectTree.tree"
                    :singleShow="false"

            >
            </selectTree>
        </section>
        <section class="select-tree-demo-box">
            <selectTree
                    v-model="n2SelectTree.key"
                    :tree="n2SelectTree.tree"

            >
            </selectTree>
        </section>
        <section class="select-tree-demo-box">
            <selectTree
                    v-model="n3SelectTree.key"
                    :tree="n3SelectTree.tree"

            >
            </selectTree>
        </section>
    </div>
</template>

<script>
  import selectTree from '../packages/selectTree/index.vue';
  export default {
    data () {
      return {
        selectTree: {
          key:  '1-3-7',
          tree: [
            {
              k: '1',
              v: '1...',
              childs: [
                {
                  k: 2,
                  v: '1...1'
                }, {
                  k: 3,
                  v: '1...2',
                  childs: [
                    {
                      k: 7,
                      v: '1...2...1'
                    }, {
                        k: 8,
                        v: '1...2...2'
                    }
                  ]
                }
              ]
            },
            {
              k: 4,
              v: '2...',
              childs: [
                {
                  k: 5,
                  v: '2...1'
                }, {
                    k: 6,
                  v: '2...2'
                }
              ]
            }
          ],
          hasOptions: false,

        },
        nSelectTree:  {
          key:  '1-3-7',
          tree: [
            {
              k: '1',
              v: '1...',
              childs: [
                {
                  k: 2,
                  v: '1...1'
                }, {
                  k: 3,
                  v: '1...2',
                  childs: [
                    {
                      k: 7,
                      v: '1...2...1'
                    }, {
                      k: 8,
                      v: '1...2...2'
                    }
                  ]
                }
              ]
            },
            {
              k: 4,
              v: '2...',
              childs: [
                {
                  k: 5,
                  v: '2...1'
                }, {
                  k: 6,
                  v: '2...2'
                }
              ]
            }
          ],
          hasOptions: false,

        },
        n2SelectTree:  {
          key:  '',
          tree: [
            {
              k: '1',
              v: '1...',
              childs: [
                {
                  k: 2,
                  v: '1...1'
                }, {
                  k: 3,
                  v: '1...2',
                  childs: [
                    {
                      k: 7,
                      v: '1...2...1'
                    }, {
                      k: 8,
                      v: '1...2...2'
                    }
                  ]
                }
              ]
            },
            {
              k: 4,
              v: '2...',
              childs: [
                {
                  k: 5,
                  v: '2...1'
                }, {
                  k: 6,
                  v: '2...2'
                }
              ]
            }
          ],
          hasOptions: false,

        },
        n3SelectTree:  {
          key:  '',
          tree: [],
          hasOptions: false,
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.n3SelectTree.tree = [
          {
            k: '1',
            v: '1...',
            childs: [
              {
                k: 2,
                v: '1...1'
              }, {
                k: 3,
                v: '1...2',
                childs: [
                  {
                    k: 7,
                    v: '1...2...1'
                  }, {
                    k: 8,
                    v: '1...2...2'
                  }
                ]
              }
            ]
          },
          {
            k: 4,
            v: '2...',
            childs: [
              {
                k: 5,
                v: '2...1'
              }, {
                k: 6,
                v: '2...2'
              }
            ]
          }
        ];
        this.n3SelectTree.key = '1-3-7';
      }, 3000)
    },
    components: {selectTree}
  };
</script>

<style lang="scss">
    .select-tree-container {
        position: relative;
        .select-tree-demo-box {
            position: relative;
            width: 200px;
            float: left;
            margin-right: 20px;
        }

    }
</style>
