<template>
  <div id="map">
    <!-- vuex -->
    <!-- <button @click="add">加{{ count }}</button>
    <button>{{ count1 }}</button>
    <button>{{ watchData }}</button>
    <button @click="add1">减{{ count }}</button> -->

    <!-- 父子组件传值 -->
    <!-- <aaa @my-emmit="myemmit" :msg="msg" ></aaa> -->

    <div class="btnGroup">
      <button class="btn" @click="clearMap">清除</button>
      <button class="btn" @click="chooseType('Point')">选点</button>
      <button class="btn" @click="chooseType('LineString')">选线</button>
      <button class="btn" @click="chooseType('Polygon')">选面</button>
    </div>
    <div class="btnGroup btnGroupLt">
      <button class="btn" @click="clearMap('custom')">清除</button>
      <button
        class="btn"
        @click="addmarker(item.value)"
        v-for="(item, index) in ArryData"
        :key="index"
      >
        {{ item.value }}
      </button>
      <!-- <button class="btn" @click="customPoint">点</button>
      <button class="btn" @click="customLine">线</button>
      <button class="btn" @click="customPolygon">面</button> -->
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted, computed, toRaw, watch ,toRefs} from "vue";
import mapConfig from "@/mapConfig.js";

import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ"; // 加载瓦片/切片的

import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { Draw, Modify, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import { Point, LineString, Polygon } from "ol/geom";

import renyuanIcon from "@/assets/images/map/renyuan.png";
import aaa from "./aaa.vue";

export default {
  components: {
    aaa,
  },
  setup() {
    const store = useStore();
    const source = new VectorSource();
    const vector = new VectorLayer({
      source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });
    const renyuanLayer = ref(null);
    const lineLayer = ref(null);
    const polygonLayer = ref(null);
    const aaa = ref({ ad: 123 });
    const ArryData = ref([{ value: "点" }, { value: "线" }, { value: "面" }]);
    let map = ref(null);
    let initMap = () => {
      console.log(ArryData.value,'00000000000000');
      // 自定义组装图层
      let custom_layers = [];
      if (mapConfig.customLayers && mapConfig.customLayers.length > 0) {
        let data = mapConfig.customLayers;
        custom_layers = data.map((layerOpt) => {
          return new TileLayer({
            source: new XYZ(layerOpt.opt),
            name: layerOpt.name,
          });
        });
      }

      map = new Map({
        target: "map",
        layers: [...custom_layers, vector],
        view: new View({
          projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
          center: mapConfig.center,
          zoom: 10, // 地图缩放级别（打开页面时默认级别）
          resolutions: mapConfig.resolutions,
        }),
        source,
      });
    };

    // 开始画点线面
    let draw, snap, modify;
    const addInteractions = () => {
      draw = new Draw({ source, type: drwaType });
      map.addInteraction(draw);

      // 靠近绘制的会自动吸附
      snap = new Snap({ source });
      map.addInteraction(snap);

      modify = new Modify({ source });
      map.addInteraction(modify);
    };

    let drwaType = ref("Point");
    const chooseType = (type) => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);

      drwaType = type;

      addInteractions();
    };

    onMounted(() => {
      initMap();
      
    });

    const add = () => store.dispatch("test/setCount", 10); //dispatch：触发actions里面的方法
    // const add1 = () => store.dispatch("test/setCount1", 10);//也可以用下面commit方式
    const add1 = () => store.commit("test/def", 10); //commit触发mutations里面的方法
    const clearMap = (type) => {
      msg.value=789
      if (type === "custom") {
        if (renyuanLayer.value) map.removeLayer(renyuanLayer.value);
        if (lineLayer.value) map.removeLayer(lineLayer.value);
        if (polygonLayer.value) map.removeLayer(polygonLayer.value);
      } else {
        // map.removeInteraction(draw); // 还原鼠标样式，未清空图层
        // map.removeInteraction(snap);
        // map.removeInteraction(modify);
        // map.removeLayer(vector);
        let arr = map.getInteractions();
      }
    };
    const addmarker = (value) => {
      if (value == "点") {
        customPoint();
      } else if (value == "线") {
        customLine();
      } else {
        customPolygon();
      }
    };
    // 点击自定义画点
    const customPoint = () => {
      let renyuanFeature = new Feature({
        geometry: new Point([113.991538, 22.571418]),
        name: "人员图标",
      });

      const renyuanStyle = new Style({
        image: new Icon({ src: renyuanIcon }),
      });
      renyuanFeature.setStyle(renyuanStyle);

      const renyuanSource = new VectorSource({ features: [renyuanFeature] });
      renyuanLayer.value = new VectorLayer({ source: renyuanSource });
      map.addLayer(renyuanLayer.value);
    };
    // 给定坐标画线
    const customLine = () => {
      let arr = [
        [113.54381132, 22.26603718],
        [113.54210586, 22.25908172],
        [113.54272867, 22.24522491],
        [113.52521249, 22.2608184],
        [113.53888402, 22.28296649],
        [113.56272589, 22.28156777],
        [113.56545975, 22.27349332],
      ];

      let lineFeature = new Feature({
        geometry: new LineString(arr),
        name: "线路",
      });

      lineLayer.value = new VectorLayer({
        source: new VectorSource({ features: [lineFeature] }),
        style: new Style({
          stroke: new Stroke({ width: 5, color: "#27BB53" }),
        }),
      });

      map.addLayer(lineLayer.value);
    };
    // 给定坐标画面
    const customPolygon = () => {
      let arr = [
        [114.06625114734103, 22.582559905338663],
        [114.10435997302463, 22.581186614323038],
        [114.11431633288791, 22.54994424371757],
        [114.06487785632541, 22.549600920963663],
      ];

      let polygonFeature = new Feature({
        geometry: new Polygon([arr]),
        name: "面",
      });
      polygonLayer.value = new VectorLayer({
        source: new VectorSource({ features: [polygonFeature] }),
        style: new Style({
          stroke: new Stroke({ width: 5, color: "#27BB53" }),
          fill: new Fill({ color: "rgba(100,149,237,0.3)" }),
        }),
      });
      map.addLayer(polygonLayer.value);
    };
    const watchData = ref(0);
    const count1 = computed(() => store.getters.count);
    watch(count1, (newProps, oldProps) => {//监听单个值或者整个对象时，第一个参数(监听对象)是直接传入
    //监听对象aaa里面的bb属性时,第一个参数(监听对象)是箭头函数watch((aaa.bb)=>{}, (newProps, oldProps) => {}
      console.log(newProps, oldProps);
      watchData.value = oldProps;
    });
    const msg=ref(456)
    const myemmit=(value)=>{
      console.log(value);
    }
    return {
      map,
      count: 10,
      count1,
      add,
      chooseType,
      clearMap,
      customPoint,
      addmarker,
      customLine,
      customPolygon,
      initMap,
      aaa,
      ArryData,
      add1,
      watchData,
      myemmit,
      msg
    };
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100vw;
  height: 100vh;

  .btnGroup {
    position: absolute;
    right: 0;
    z-index: 1000;
    top: 60px;
    .btn {
      width: 80px;
      background-color: rgb(20, 122, 122);
      color: #fff;
      outline: none;
      border: none;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      &:not(:first-of-type) {
        margin-left: 10px;
      }
    }
  }

  .btnGroupLt {
    top: 0;
  }
}
/*隐藏ol的一些自带元素*/
:deep(.ol-control) {
  display: none;
}
</style>
