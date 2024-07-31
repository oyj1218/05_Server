//package controller;
//
//import java.io.IOException;
//
//import javax.servlet.RequestDispatcher;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import dao.MapDAO;
//import dto.MapDTO;
//
//@WebServlet("/map")
//public class MapController extends HttpServlet {
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		doPost(request, response);
//	}
//	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// 주소 정보를 한글로 받기 때문에 한글 깨짐 방지
//		request.setCharacterEncoding("utf-8");
//		// 입력한 주소를 변수로 받기
//		String addr = request.getParameter("addr");
//		
//		// dao 사용을 위해 객체 생성
//		MapDAO dao = new MapDAO();
//		// dao의 메서드 호출해 MapDTO 받아오기
//		MapDTO dto = dao.getByGeoDataByAddress(addr);
//		dto.setName(addr);
//		
//		// request에 바인딩하고 포워드
//		request.setAttribute("mapInfo", dto);
//		RequestDispatcher dispatch = request.getRequestDispatcher("view.jsp");
//		dispatch.forward(request, response);
//	}
//}