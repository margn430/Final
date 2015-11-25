window.onload = function() {
    //var vizjson_url = 'https://margn430.cartodb.com/viz/1c80b040-8e39-11e5-bf27-0e3a376473ab/public_map'; // <-- Paste viz.json URL between quotes
    var vizjson_url = 'https://margn430.cartodb.com/api/v2/viz/1c80b040-8e39-11e5-bf27-0e3a376473ab/viz.json'; // <-- Paste viz.json URL between quotes

    var options = {
           sql: "SELECT * FROM carto_query",
           // cartocss: ""
       }

       var sublayers = [];

       // instantiate map object from Leaflet
       var mapObj = new L.Map(map, {  // <-- Replace map_id with your #id for rendering
           center: [40.714249, -73.957407], // New York
           zoom: 11 // zoom projection to adjust starting point zoom
       });


       // add basemap tiles
       L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(mapObj);

       // add data tile layers here (if you have multiple layers, you can manipulate them in js here)
       cartodb.createLayer(mapObj,vizjson_url)
           .addTo(mapObj)
           .done(function(layer) {
               console.log("Map successfully created.");
               sublayers[0] = layer.getSubLayer(0);
               sublayers[1] = layer.getSubLayer(1);
               //sublayers[0].set(options); // altering the SQL and CartoCSS; see above
           })
           .error(function(err) {
               console.log("Map not created: " + err);
           });
    }
