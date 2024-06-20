package edu.kh.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet 클래스를 만들 때는
// 반드시 HttpServlet을 상속받아야 한다.
public class ServletEx2 extends HttpServlet{
	
	// Get 방식 요청을 처리하는 (do) 메소드
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 파라미터(Parameter) == 요청 시 전달된 input 태그의 값이다.
		
		String orderer = req.getParameter("orderer");
		// getParameter()는 전달된 input 태그의 name이 하나일 때만 가능
		
		// -> 같은 name이 여러 개면 String[]으로 반환해주는
		//	  getParameterValues()를 사용하면 된다.
		
		String[] coffee = req.getParameterValues("coffee");
		// 체크박스에 체크된 메뉴들이 모두 배열에 담김
		// -> 체크가 안 되면 배열에 하나도 담기지 않음
		
		if(coffee != null) {
			// 향상된 for문 사용
			for(String c : coffee) {
				System.out.println(c);
			}
		}
System.out.println("주문자 : " + orderer);
		// HttpServletRequest : 클라이언트 정보 + 전달된 값
		// HttpServletResponse : 서버가 클라이언트에게 응답할 방법을 제공
		
		// Write : 서버가 클라이언트에게 쓰다 == 출력
		// resp.getWriter() : 서버가 클라이언트에게 응답할 수 있는
		//					  출력 전용 스트림을 얻어옴
		resp.setContentType("text/html; charset=UTF-8");
		
		PrintWriter out = resp.getWriter();
		
//		out.print("응답 되나?");
		
		// ** 스트림을 통해서 그냥 문자열을 내보내면 정상 출력되지 않는 문제 발생 **
		// 왜? 전달되는 응답 데이터가
		//     어떤 형식인지, 문자 인코딩은 어떤 건지를 지정해주지 않아서

		// ***********************************************************
		/* Dynamic Web project(동적 웹 프로젝트)
		 * 
		 * - 요청에 따라서 응답되는 화면 (HTML)을 실시간으로 만들어 내서(동적)
		 *   클라이언트에게 응답하는 프로젝트
		 */
		// ***********************************************************
		
		// HTML 코드를 자바(Servlet)에서 작성하여 
		// 클라이언트와 연결된 응답 출력용 스트림(out)을 이용해서 출력
		
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		
		out.println("<head>");
		out.println("<title>"+ orderer +"님의 주문 목록</title>");
		out.println("</head>");
		
		out.println("<body>");
		
		out.println("<ul>");
		if(coffee != null) {
			for(String c:coffee) {

				out.println("<li>"+ c +"</li>");
			}
		}
		out.println("</ul>");
		
		out.println("</body>");
		
		out.println("</html>");
	}

}