{
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "A simple bar chart with embedded data.",
  
// Controller_1 - time slider
const selectYear = vl.selectSingle('select').fields('Year')
  .init({Year: 2013})
  .bind(vl.slider().min(2013).max(2019).step(1));
  
// layer_1 - base map
const map = vl.markGeoshape({fill: 'gray', stroke: '#706545', opacity: 0.2})
  .data(vl.topojson(topoKC).feature('Municipal_Boundaries'));

// layer_2 - points with changeable size and color according to the two controllers
const points = vl.markCircle()
  .data(cityListingPrice_Year)
  .select(selectYear)
  .transform(vl.filter(selectYear))
  .encode(
    vl.latitude().fieldQ('Latitude'),
    vl.longitude().fieldQ('Longitude'),
    vl.tooltip().fieldN('Listing'),
    vl.size().fieldQ('Listing'),
  );

// overlay layer_1 map and layer_2 points together
return vl.layer(map, points)
  .project(vl.projection('mercator'))
  .width(800).height(800)
  .config({view: {stroke: null}})
  .render()
}