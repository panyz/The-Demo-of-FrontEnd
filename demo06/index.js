// document.write("<script language=javascript src='coordtransform.js'></script>");

var timmer;
var lineArr = [];
var polyline, startMarker, stopMarker;
var times = 0;
var geolocation;

var map = new AMap.Map('map', {-
    center: [113.442045, 23.173124], //地图中心点
    zomm: 10 //默认的放大级别
});

/**给地图增加工具条，控制地图的放大和缩小 */
map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});

// function getPosition(callback) {
//     if (geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) { // 获取当前位置信息
//             var coords = position.coords;
//             callback(coords);
//         }, function (error) {
//             switch (error.code) {
//                 case 0:
//                     alert("尝试获取您的位置信息时发生错误:" + error.message);
//                     break;
//                 case 1:
//                     alert("用户拒绝了获取位置信息请求");
//                     break
//                 case 2:
//                     alert("浏览器无法获取您的位置信息"+ error.message);
//                     break
//                 case 3:
//                     alert("获取位置信息超时");
//                     break
//             }
//         },geoOptions);
//     }
// }

// getPosition(function (coords) {
//     coords = convert(coords.longitude,coords.latitude);
//     var startPoint = new AMap.LngLat(coords.longitude,coords.latitude);
//     map.setCenter(startPoint);
//     map.setZoom(16);

// });

function convert(longitude,latitude) {
    if (coordtransform && coordtransform.wgs84togcj02) {
        var coords = coordtransform.wgs84togcj02(longitude,latitude);
        return{
            longitude:coords[0],
            latitude:coords[1]
        }
    }
    return{
        longitude:longitude,
        latitude:latitude
    }
}

function start() {
    timmer = geolocation.watchPosition(function (position) {
        var coords = position.coords;
        if (coords.accuracy > 20) {
            return;
        }
        coords = convert(coords.longitude,coords.latitude);
        console.log(coords);
        map.setCenter(new AMap.LngLat(coords.longitude,coords.altitude));
        lineArr.push([coords.longitude,coords.altitude]);
        renderTracer(getPath(lineArr));
    },function (error) {
        console.log(error);
    });
}

function stop() {
    geolocation.clearWatch(timmer);
    stopMarker && stopMarker.hide();
    startMarker && startMarker.hide();
    polyline && polyline.hide();
}

function getPath(arr) {
    var path = [];
    arr.forEach(function (item) {
        path.push([].concat(item));
    });
    return path;
}

function renderTracer(points) {
    if (points.length) {
        if (points.length === 1) {
            renderStartMarket(points[0]);
        } else if(points.length > 1){
            var endPoint = [].concat(points[points.length-1]);
            renderLines(points);
            renderEndMarket(endPoint);
        }
    }
}

function renderStart(point) {
    var lngLat = new AMap.LngLat(point[0],point[1]);
    if (!startMarker) {
        startMarker = new AMap.Marker({
            position:lngLat,
            map:map
        });
    } else {
        startMarker.setPosition(lngLat);
        startMarker.show();
    }
}

function renderEndMarket(point) {
    var lngLat = new AMap.LngLat(point[0],point[1]);
    if (!stopMarker) {
        stopMarker = new AMap.Marker({
            position:lngLat,
            map:map
        });
    } else {
        stopMarker.setPosition(lngLat);
        stopMarker.show();
    }
}

function renderLine(points) {
    if (!polyline) {
        polyline = new AMap.Polyline({
            path:points,
            strokeColor:'#3366FF',
            strokeOpacity:1,
            strokeWeight:5,
            strokeStyle:'solid',
            strokeDasharray:[10,5]
        });
        polyline.setMap(map);
    } else {
        polyline.show();
        polyline.setPath(points);
    }
}

document.getElementById('btnStart').addEventListener('click',start);
document.getElementById('btnStop').addEventListener('click',stop);