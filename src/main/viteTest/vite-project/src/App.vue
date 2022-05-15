<template>
  <div id = "map" style="width: 100%; height: 100%; position:fixed; top:0px; left:0px;"/>
</template>

<script>
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import axios from "axios";

export default {
  name: 'app',
  async beforeMount() {

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    console.log(params.id)

    const { data } = await axios.get(
        params.id + ".json"
    );
    console.log(data);
  },
  mounted() {

    let osmLayer = new TileLayer({
      source: new OSM(),
    });

    osmLayer.getSource().setAttributions([]);

    let view = new View({
      center: [-472202, 7530279],
      zoom: 12
    });

    this.map = new Map({
      target: 'map',
      layers: [osmLayer],
      view: view
    });

  }
}
</script>
