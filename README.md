# Solar System

一个可交互的 3D 太阳系与银河系静态网页，使用 Three.js 在浏览器中实时渲染。包含太阳、八大行星与月球的独立聚焦、公转与自转、真实表面纹理、地球昼夜灯光与云层、银河系旋臂与太阳位置、星空、小行星带、行星环、天体资料和响应式触控操作。

## 本地预览

```powershell
python -m http.server 4173
```

访问 `http://127.0.0.1:4173/`。

## 部署

项目不需要后端、数据库或构建步骤。推送到 GitHub 仓库并开启 GitHub Pages 后即可直接访问。

页面通过 jsDelivr 加载 Three.js，因此首次打开时需要网络连接。天体纹理均保存在仓库内，不依赖第三方纹理服务器。

## 开源参考

- [Three.js](https://github.com/mrdoob/three.js)（MIT）：WebGL 场景、几何体与 ShaderMaterial；太阳的程序化流动表面参考官方 `webgl_shader_lava` 示例思路重新实现。
- [THREEx Planets](https://github.com/jeromeetienne/threex.planets)（MIT）：行星大气层与边缘辉光的视觉思路。
- [Solar System Scope Planet Textures](https://www.solarsystemscope.com/textures/)（[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)）：水星、金星、地球、月球、火星、木星、土星、天王星和海王星的 2K 纹理。纹理基于 NASA 高程、Blue Marble、Messenger、Viking、Cassini 与 Hubble 等公开观测数据制作。
- [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)：行星直径、自转方向、轴倾角与扁率等物理参数参考。

太阳噪声、粒子、轨道与交互效果在浏览器中实时生成；天体表面使用上述署名纹理。

线上地址：<https://synchronized2.github.io/>
