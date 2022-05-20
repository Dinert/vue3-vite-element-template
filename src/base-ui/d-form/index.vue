<script setup>
import { firstUpperCase, resize } from '@/utils'

// props
defineProps({
  ref,
  rules: {
    type: Array,
    default: () => [],
  },
  labelWidth: {
    type: String,
  },
  formItem: {
    type: Object,
    default: () => [],
  },
  model: {
    type: Object,
    default: () => { },
  },
  inline: {
    type: Boolean,
    default: true
  },
  row: {
    type: Object,
    default: () => ({
      gutter: 20
    })
  },
  colLayout: {
    type: Object,
    default: () => {
      return {
        xl: 3, // ≥1920px
        lg: 4, // ≥1200px
        md: 8, // ≥992px
        sm: 12, // ≥768px
        xs: 24 // <768px
      }
    }
  },
  isSearch: {
    type: Boolean,
    default: true
  }
});

// mounted
onMounted(() => {
  // 监听winodw窗口缩放
  resize(() => {
    const elFormLeft = document.querySelector('.el-form-left')
    const clientHeight = elFormLeft.clientHeight
    console.log(clientHeight, elFormHeight.value)
    if (clientHeight > elFormHeight.value) {
      isArrow.value = true
    } else {
      if (!packUp.value) {
        packUp.value = true
      }
      isArrow.value = false
    }
  })
})

// data
const form = ref(null)
const setFormArr = []
const elFormHeight = ref(60)
const isArrow = ref(false) // 是否显示展示操作
const packUp = ref(true)

// methods

// 展开还是收起状态
const unfold = () => {
  if (packUp.value) {
    packUp.value = false
  } else {
    packUp.value = true
  }
}

// item的ref
const setForm = (el) => {
  setFormArr.push(el)
}

// label的tooltip
const isDisabledLabel = (label) => {
  return !(label.length >= 5)
}

// 鼠标移入显示tooltip
const mouseEnter = (index, form) => {
  const el = setFormArr[index].$el.querySelector('.el-input__inner')
  const tempEl = setFormArr[index].$el.querySelector('.temp-tooltip')
  const elWidth = el.offsetWidth
  const tempElWidth = tempEl.offsetWidth
  if (tempElWidth > elWidth) {
    form.tooltip = true
  } else {
    form.tooltip = false
  }
}

// 获取显示的tooltip值
const getTooltipValue = (value, form) => {
  const type = form.type
  const options = form.options
  if (['input'].includes(type)) {
    return value
  } else if (['select'].includes(type)) {
    let item = options.filter(item => item.value === value)[0]
    return item && item.label
  }
}

// expose
defineExpose({
  form
})
</script>

<template>
  <el-form v-bind="{
    model,
    rules,
    labelWidth,
    inline,
  }" ref="form" :class="{ packUp: !packUp }">
    <el-row v-bind="row" class="el-form-left">
      <el-col v-bind="colLayout" v-for="(form, key, index) in formItem" :class="[form.type]">
        <el-form-item v-bind="{
          key: key,
          prop: key,
          label: form.label,
          ref: setForm
        }">
          <template #label>
            <el-tooltip v-bind="{
              content: form['label'],
              placement: 'top',
              disabled: isDisabledLabel(form.label)
            }">
              {{ form['label'] }}
            </el-tooltip>
          </template>
          <el-tooltip v-bind="{
            content: getTooltipValue(model[key], form),
            placement: 'top',
            disabled: !form.tooltip
          }">
            <div @mouseenter="mouseEnter(index, form)">
              <span class="temp-tooltip">{{ getTooltipValue(model[key], form) }}</span>
              <template v-if="['input'].includes(form.type)">
                <el-input v-model="model[key]" v-bind="form" v-on="form.on || {}"></el-input>
              </template>
              <template v-else-if="['select'].includes(form.type)">
                <el-select v-model="model[key]" v-bind="form" v-on="form.on || {}">
                  <el-option v-for="options in form.options" v-bind="{
                    value: options.value,
                    label: options.label
                  }" v-on="form.on || {}">
                    <slot :name="form.type + firstUpperCase(key)" :options="options"></slot>
                  </el-option>
                </el-select>
              </template>
              <template
                v-else-if="['datetime', 'date', 'week', 'month', 'year', 'datetimerange', 'daterange', 'monthrange', 'yearrange'].includes(form.type)">
                <el-date-picker v-model="model[key]" v-bind="form" v-on="form.on || {}"></el-date-picker>
              </template>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="el-form-right">
      <el-button type="text" v-if="isArrow" @click="unfold" class="el-form-right-operation">
        <svg class="ali-icon" aria-hidden="true" style="margin-right: 3px;">
          <use :xlink:href="packUp ? `#icon-arrow-up` : `#icon-arrow-down`"></use>
        </svg>
        {{ packUp ? '收起' : '展开' }}
      </el-button>
      <slot name="search"></slot>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  padding: 16px 16px 0;
  background-color: var(--el-bg-color);
  border-radius: var(--el-bg-radius);
  display: flex;
  overflow: hidden;
  transition: var(--el-transition-all);
  max-height: 300px;

  &.packUp {
    max-height: 50px;
  }

  &-left {
    flex: 1;

    .el-col {
      &.datetimerange {
        min-width: 450px;
      }
      &.date{
        min-width: 210px;
      }
      &.select{
        min-width: 230px;
      }
    }
  }

  &-right {
    margin-left: 20px;
    min-width: 150px;
    &-operation {
      &.el-button.is-text {
        background-color: unset;
        padding-right: 0;
      }
    }
  }

  &-item {
    width: 100%;
    margin-bottom: 18px;

    ::v-deep(.temp-tooltip) {
      display: block;
      position: absolute;
      left: 999999999;
      z-index: -9999;
    }

    ::v-deep(.el-tooltip__trigger) {
      width: 100%;
    }


    ::v-deep(.el-date-editor) {
      width: 100%;

      .el-input__wrapper {
        width: 100%;
        box-sizing: border-box;
      }
    }



    ::v-deep(.el-input__inner) {
      @extend .text-dot;
    }

    ::v-deep(.el-form-item__label) {
      @extend .text-dot;
      max-width: 80px;
    }


  }

  .el-select {
    width: 100%;
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
