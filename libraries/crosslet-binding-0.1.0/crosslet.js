HTMLWidgets.widget({
  name: "crosslet",
  type: "output",
  initialize: function(el){
    
  },
  renderValue: function(el, data){
    var payload = data
    payload.data = HTMLWidgets.dataframeToD3(payload.data)
    console.log(payload.data)
     k = Object.keys(payload.dimensions)
     k.forEach(function(v, i){
      payload.dimensions[v].data.dataSet = payload.data
    })
    
    var myColorScale = d3.scale.linear()
      .domain([1, 10, 20.1])
      .range(["red", "yellow", "green"])
      .interpolate(d3.cie.interpolateLab)
      
    var config = {
      map: payload.map,
      data: {version: "1.0", id_field: payload.id_field},
      dimensions : payload.dimensions,
      defaults: payload.defaults,
    };
  
    new crosslet.MapView($(el), config)
  }
})


function getMap(scope){
  var map = []
  map.world = {
    leaflet: {
      key: "af67a5248c104d27bff9e8d363b6db4a",
      styleId: 96931, /* 81531, */
      attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a>'
    },
    view: {
      center: [35.505, -1.09],
      zoom: 2
    },
    geo: {
      url: "http://rawgithub.com/markmarkoh/datamaps/master/src/js/data/world.topo.json",
      name_field: "name",
      id_field: "name",
      topo_object: "world"
    }
  }
  map.us = {
    leaflet: {
      key: "fe623ce312234f8f9333bbee72d4a176",
      styleId: 96931, /* 64657, */
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    },
    view: {
      center: [40.42, -98.73],
      zoom:5
    },
    geo: {
      url: "http://rawgithub.com/sztanko/crosslet/gh-pages/examples/us/data/us_counties.topo.json",
      name_field: "NAME",
      id_field: "GEOID",
      topo_object: "us_counties"
    }
  }
  return map[scope]
}

    
