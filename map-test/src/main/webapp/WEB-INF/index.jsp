<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
	<title>Home</title>
</head>
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.3.js"></script>
 	<script type="text/javascript">
			  $(document).ready(function(){
				  $(".searchbutton").click(function(){
					  //input 창에서  value 받아오기
					  var values = $('#searchvalue').val();
					  //data값이 하나가 아니기 때문에 그룹화 해서 넘길 예정입니다.
					  var searchWebParam = {
			     				'query'		:values ,
			     				'size' : 5
							};
					  $("#searchcafe").empty();
					  //append로 결과를 보여줄 예정이기 때문에 태르를 담을 변수가 필요 해서 변수를 초기화 하여 선언 했습니다.
						var searchTitle = "";
					  //검색에 빈공백이 없도록 하기 위한 코드 입니다.
					  
					  if($('#searchvalue').val()==""){
							alert("검색을 입력해 주세요");
						}
					  	//검색 API를 Ajax로 이용 하기 위한 호출
						$.ajax({
							//카카오에서 제공 하는 검색 url 입니다 검색 하는 항목에 따라서 주소가 달라집니다.
			     			url			:	"https://dapi.kakao.com/v2/search/web",
			     			//형식을 json으로 받을 것이기 때문에 지정하여 주었습니다.
			     			dataType	:	"json",
			     			//이것은 개발자 REST 코드를 이용 하는 법입니다. KakaoAK 까지는 동일 하지만 뒤에 키는 앱을 생성 하신뒤 키 발급한 것을 입력 하시면 됩니다.
			     			  headers: {'Authorization': 'KakaoAK RESTAPI키'},
			     			 async: false,
			     			type 		:	"get",
			     			
			     			data : searchWebParam,	
			     			success 	:	function(r){
			     				//데이터는 r이라는 이름으로 성공 했을시 값을 넘겨 줍니다. 데이터는 한개만 있지 않을 것이기 떄문에 for문을 이용 하여 풀어 주셔야 합니다.
			     				$.each(r.documents, function (i, search) {
// 			     					alert();
			     					//변수에 테이블을 미리 입력해 줍니다. a 페이지를 새창에 띄울 예정입니다.
			     					searchTitle = "<div><a href=\"";
			     					//search.url 이곳에는 검색한 페이지의 url이 담겨져 잇습니다. 
			     					searchTitle =searchTitle+search.url+"\"target=\"_blank\">"+i+":"+search.title+" 날짜 : "+search.datetime.substring( 0, 10 )+"</a></div>";
			     					
			     					$("#searchcafe").append(searchTitle); 
			                    });
			                    
			                    
			     			},
			     			error		:	function(request, status, error){
			     				console.log("AJAX_ERROR");
			     			}
			     		});
				 	 });
			     	
			     });
				  </script>
<body>
<input type="text" id="searchvalue"><a href="#" class="searchbutton">검색</a>
<div id="searchcafe">
123
</div>
</body>
</html>