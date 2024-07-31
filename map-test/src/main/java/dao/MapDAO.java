//package dao;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.net.URL;
//import java.net.URLEncoder;
//
//import org.json.JSONArray;
//import org.json.JSONObject;
//
//import dto.MapDTO;
//
//public class MapDAO {
//	public MapDTO getByGeoDataByAddress(String addr) throws IOException {
//		// return할 데이터 준비
//		MapDTO dto = new MapDTO();
//		
//		// API key(키값)
//		String API_KEY = "AIzaSyDXMN6Lg3WVVzi20NcbAEEBJu6Xw9Ai3Cs";
//		// 입력한 주소(address), API key(key)를 파라미터로 가지는 url 준비 (google 서버에 전달하기 위해)
//		// 주소는 한글이므로 url에 붙일 때 깨지지 않도록 URLEncoder.encode() 사용
//	    String surl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + URLEncoder.encode(addr, "UTF-8") + "&key="+API_KEY;
//	    
//	    // html에서 a태그, form 태그 쓰는 것처럼 자바에서 다른 서버에 action 요청하는 방법 : URL 객체 사용하기
//	    URL url = new URL(surl);
//	    
//	    // URL.openConnection() : google에 쿼리 날리기(action 실행)
//	    // URLConnection.getInputStream() : java가 아닌 외부에서 데이터 받아오기(InputStream)
//	    InputStream is = url.openConnection().getInputStream();
//
//	    // 받아온 데이터 버퍼(보조 스트림)에 담기
//	    BufferedReader streamReader = new BufferedReader(new InputStreamReader(is, "utf-8"));
//	    
//	    // StringBuilder : String 객체는 내용이 변할 때마다 객체가 새로 생성되는데,
//	    // StringBuilder는 한 객체에 내용을 계속 누적시키므로 내용이 계속 변해도 메모리를 절약할 수 있음
//	    StringBuilder responseStrBuilder = new StringBuilder();
//	    String inputStr;
//	    
//	    // 받아온 데이터 읽어와서 값 strBuilder에 누적하기
//	    while ((inputStr = streamReader.readLine()) != null) {
//	    	responseStrBuilder.append(inputStr);
//	    }
//	    System.out.println("StrBuilder : " + responseStrBuilder);
//	    System.out.println("======================================");
//	    
//	    // 받아온 문자열은 json 형식으로 되어 있음, 사용하기 위해 json 객체로 변환하기
//	    JSONObject jsonObj = new JSONObject(responseStrBuilder.toString());
//	    System.out.println("jsonObj : " + jsonObj);
//	    System.out.println("======================================");
//	    // 해당 json 객체는 results라는 키에 모든 json 객체를 값(배열)으로 가지기 때문에,
//	    // results 키의 값인 배열을 JSONArray로 만들어 각 배열 요소에 접근함
//	    JSONArray results = jsonObj.getJSONArray("results");
//	    
//	    if(results.length() > 0) {
//	    	JSONObject obj;
//	    	// 배열의 첫번째 값 가져오기 : json 객체
//	    	obj = results.getJSONObject(0);
//	    	// 그 객체 안의 geometry 키의 값(json객체) -> 안의 location 키의 값(json객체) -> 안의 lat 키의 값(double) 가져오기 : 위도, 경도 가져오기
//	    	Double lat = obj.getJSONObject("geometry").getJSONObject("location").getDouble("lat");
//	    	Double lng = obj.getJSONObject("geometry").getJSONObject("location").getDouble("lng");
//	    	System.out.println("lat : " + lat + ", lng : " + lng);
//	    	System.out.println("======================================");
//	    	// 받아온 위치 값을 MapDTO에 set하고 리턴
//	    	dto.setX(lat);
//	    	dto.setY(lng);
//	    	return dto;
//	    }
//	    // if문 실행되지 않았을때 null 리턴
//	    return null;
//	}
//}