<script setup>


// props
const props = defineProps({
  visible: {
    type: Boolean
  },
  title: {
    type: String,
    default: '标题'
  },
  width: {
    type: String
  },
  fullscreen: {
    type: Boolean
  },
  top: {
    type: String,
  },
  modal: {
    type: Boolean,
    default: true
  },
  appendToBody: {
    type: Boolean,
  },
  lockScroll: {
    type: Boolean
  },
  customClass: {
    type: String
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: function () {

    }
  },
  center: {
    type: Boolean
  },
  destroyOnClose: {
    type: Boolean
  }
})

// emit
const emit = defineEmits(['open', 'opened', 'close', 'closed'])

// Mounted

// ref

// data

// computed

// methods
const open = () => {
  emit('open')
}
const opened = () => {
  emit('opened')
}
const close = () => {
  emit('close')
}
const closed = () => {
  emit('closed')
}

const beforeClose = (done) => {
  done()
}

// watch

</script>

<template>
  <el-dialog v-bind="{
    title,
    width,
    fullscreen,
    top,
    modal,
    appendToBody,
    lockScroll,
    customClass,
    closeOnClickModal,
    closeOnPressEscape,
    showClose,
    beforeClose,
    center,
    destroyOnClose
  }" v-on="{ open, opened, close, closed }" v-model="visible">
    <template #title="scope">
      <slot name="title" :value="scope"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer="scope">
      <slot name="footer" :value="scope"></slot>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.home {}
</style>
