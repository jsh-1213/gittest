<!-- scale的容易出现左右留白，不太适用 -->
<template>
  <div
    id="big_container"
    ref="scaleBox"
    :style="{
      transform: `scale(${scale}) translateX(-50%)`,
      WebkitTransform: `scale(${scale}) translateX(-50%)`,
      width,
      height,
    }"
  >
    <slot name="entry"></slot>
  </div>
</template>

<script lang="ts">
import { toRefs, ref, onMounted } from "vue";
import _debounce from "lodash/debounce";
export default {
  props: {
    width: { default: 1920, type: Number },
    height: { default: 1080, type: Number },
  },
  setup(props, context) {
    let scaleBox = ref();
    let scale = ref(1);

    function getScale() {
      // 如果是开发环境，不进行比例缩放
      if (import.meta.env.MODE === "development") {
        return 1;
      }

      // 固定好16:9的宽高比，计算出最合适的缩放比，宽高比可根据需要自行更改
      const { width, height } = toRefs(props);
      let ww = window.innerWidth / width.value;
      let wh = window.innerHeight / height.value;
      return ww < wh ? ww : wh;
    }
    const setScale = _debounce(() => {
      // console.log(123, "缩放");
      // 获取到缩放比，设置它
      scale.value = getScale();
      scaleBox.value.style.setProperty("--scale", scale.value);
    }, 500);

    onMounted(() => window.addEventListener("resize", setScale));
    return { scale, scaleBox };
  },
};
</script>

<style lang="scss" scoped>
#big_container {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 0;
  transition: 0.3s;
}
</style>
