<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="dto.MapDTO" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주소 출력</title>
</head>
<body>
<%
	// 바인딩한 MapDTO 가져오기
	MapDTO dto = (MapDTO) request.getAttribute("mapInfo");
%>
<!-- 카카오 지도 web api에서 소스 가져오기 -->
<div id="map" style="width:500px;height:400px;"></div>
<p><%= dto.getName() %></p>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6d096e2d7e3f4c07523b417978a66ad0"></script>
<script>
	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(<%= dto.getX() %>, <%= dto.getY() %>),
		level: 3
	};
	var map = new kakao.maps.Map(container, options);
</script>
</body>
</html>