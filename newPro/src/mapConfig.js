const mapConfig = {
  resolutions: [
    0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625,
    0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625,
    0.0006866455078125, 0.00034332275390625, 0.000171661376953125,
    8.58306884765629e-5, 4.29153442382814e-5, 2.1457672119140625e-5,
    1.07288360595703e-5, 5.36441802978515e-6,
  ], // 分辨率
  center: [113.991538, 22.571418],
  customLayers: [
    {
      name: "天地图路网",
      opt: {
        projection: "EPSG:4326",
        tileSize: 512,
        url: "https://smartum.sz.gov.cn/szcg/SZMAP_BLACK/raster_{z}_{x}_{y}",
      },
    },
    {
      name: "天地图文字标注",
      opt: {
        projection: "EPSG:4326",
        tileSize: 512,
        url: "https://smartum.sz.gov.cn/szcg/SZMAP_BLACK/text_{z}_{x}_{y}",
      },
    },
  ],
};
export default mapConfig;
