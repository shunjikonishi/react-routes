var fs = require('fs'),
    xml2js = require('xml2js');
var parser = new xml2js.Parser();

console.log("|Name|Path|");
console.log("|:--|:--|");

fs.readFile(__dirname + '/temp.xml', function (err, data) {
  parser.parseString(data, function (err, result) {
    processRoute(result.Route, "");
  });
});

function processRoute(route, prefix) {
  var name = route.$.name;
  var path = route.$.path;
  if (!path) {
    path = name;
  }
  if (path && path.charAt(0) !== "/") {
    path = "/" + path;
  }
  path = prefix + path;
  console.log(`|${name}|${path}|`);
  if (route.Route) {
    route.Route.forEach(function(v) {
      processRoute(v, path === "/" ? "" : path);
    });
  }
}
