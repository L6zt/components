<template>
<div class="select-page-container container">
  <section>
  <select-area 
      waitSelector="[data-selector='waitSelect']" 
      @change="handleSelectChange"
      @statusChange="handleStatusChange"
   >
   <section>
    <table border="none" class="table" align="center" cellpadding="0">
      <tr>
        <td colspan="6" rowspan="2" class="stop-select">星期/时间</td>
        <td colspan="12" class="stop-select">00:00-12:00</td>
        <td colspan="12" class="stop-select">12:00-24:00</td>
      </tr>
      <tr class="stop-select">
        <td v-for="i in 24" :key="i">{{i - 1}}</td>
      </tr>
      <template v-for="(item, j) in list">
        <tr :key="`${j}-cell`">
          <td colspan="6" class="stop-select">星期{{j + 1}}</td>
          <td 
            :data-path="`${j}-${i}`"
             data-selector="waitSelect" 
             v-for="( sitem, i)  in item" 
             :key="i" 
             @mouseover="handleMouserOver(`${j}-${i}`, sitem)"
             @mouseout="handleMouseOut"
             @click="selectHalfHours(sitem)" 
             :class="{active: sitem.checked}"
             ></td>
        </tr>
      </template>
    </table>
   </section>
  </select-area>
  <template  v-if="isMouseOver && !selectAreaStatus">
  <span style="margin-right: 20px">{{`星期${mousePointData.rowIdx}`}}: </span>
  <span>{{`${mousePointData.sIdx}:00`}}-{{`${mousePointData.eIdx + 1}:00`}}</span>
  </template>
  </section>
  <section class="select-result-aera">
    <section v-for="item in selectResultList" :key="item.idx" class="clearfix">
      <span class="day-title">星期{{item.idx + 1}}</span>
      <section class="select-area-box">
      <span class="time-part" v-for="(ssItem, idx) in item.list" :key="idx" style="margin-right: 10px">
        <span>{{ssItem[0].idx}}:00~{{ssItem[ssItem.length - 1].idx + 1}}:00</span>
      </span>
      </section>
    </section>
  </section>

</div>
</template>

<script>
import selectArea from '../packages/selectArea/index.vue';
export default {
  data() {
    return {
      list: Array(7).fill(1).map(() => {
        return Array(24).fill(2).map((d, idx) => ({ checked: false, idx }))
      }),
      mousePointData: {
        rowIdx: '',
        sIdx: '',
        eIdx: ''
      },
      isMouseOver: false,
      selectAreaStatus: false
    }
  },
  computed: {
    selectResultList() {
      const { list } = this
      const result = list.map((daySelectItem, idx) => {
        let list = []
        let partItem = []
        for (let i = 0, lg = daySelectItem.length; i < lg; i++) {
          const item = daySelectItem[i]
          if (item.checked) {
            partItem.push(item)
          } else {
            if (partItem.length > 0 && i !== lg- 1) {
              list.push(partItem)
              partItem = []
            }
          }
          if (i === lg - 1) {
            if (partItem.length > 0) {
              list.push(partItem)
              partItem = []
            }
          }
        }
        return {
          idx,
          list
        }
      }).filter((item) => item.list.length > 0)
      return result
    }
  },
  components: {
    selectArea
  },
  methods: {
    selectHalfHours(sitem) {
      sitem.checked = !sitem.checked
    },
    handleStatusChange(status) {
      this.selectAreaStatus = status
    },
    handleSelectChange({ els }) {
      const list = els.map((el) => {
        const path = el.getAttribute('data-path');
        const keys = path.split('-');
        return this.list[keys[0]][keys[1]]
      })
      let flag = list.every(item => item.checked)
      list.forEach(item => {
        item.checked = !flag
      })
    },
    handleMouserOver(path, item) {
     const idxPaths = path.split('-');
     const [rootIndex, root2Index] = idxPaths;
     // checked
     if (!item.checked) {
       this.isMouseOver = false
       return false
     }
     const row = this.list[rootIndex]
     
     let sIdx = Number(root2Index)
     let eIdx = Number(root2Index)
     while(sIdx >=0 && row[sIdx].checked ) {
       sIdx --
     }
     while(eIdx <= 23 && row[eIdx].checked) {
       eIdx ++
     }
     sIdx = sIdx + 1
     eIdx = eIdx - 1
     this.isMouseOver = true
     this.mousePointData = {
       rowIdx: rootIndex * 1 + 1,
       sIdx,
       eIdx
     }

    },
    handleMouseOut() {
      this.isMouseOver = false
      this.mousePointData = {}
    }
  }
}
</script>

<style lang="scss">
/* overflow 会隐藏超出的元素*/
.select-page-container {
  .select-kind-box {
    position: relative;
    padding-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .select-result-aera  {
    line-height:  1.5;
    .day-title {
     float: left;
     color: 14px;
    }
    .select-area-box {
      margin-left: 50px;
      color: #ccc;
      font-size: 14px;
    }
    .time-part {
      margin-left: 5px;
    }
  }
}
.clearfix {
  overflow: hidden;
}
.table {
  font-size: 12px;
  color: #ccc;
  text-align: center;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  table-layout: fixed;

  .stop-select {
    user-select: none;
  }

  td {
    position: relative;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    line-height: 20px;
    padding: 2px;
    width: 20px;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      background: #00BCD4;
    }
  }
}
</style>
