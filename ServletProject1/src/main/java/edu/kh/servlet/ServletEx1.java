package edu.kh.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet 클래스 만들기 위해서는
// java.servlet.http.Httpservlet 추상 클래스를
// 반드시 상속받아야 한다.
// -> doGet() / doPost()를 필요한 형태로 오버라이딩 진행

public class ServletEx1 extends HttpServlet{
			// /ServletProject1/example1.do주소로 요청이 왔을 때
			// 해당 클래스가 응답할 수 있도록 연결하는 작업이 필요함
	
			// -> web.xml 파일에서 연결 작업 수행
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		// HttpServletRequest : 클라이언트 + 요청 정보가 담긴 객체
		// HttpServletResponse : 서버가 클라이언트에게 응답하는 방법을 제공하는 객체
		
		// 요청 시 전달된 input 태그 값(==Parameter)을 얻어오는 방법
		// req.getParameter("input 태그 name 속성값")
		
		String inputName = req.getParameter("inputName");
		String inputAge = req.getParameter("inputAge");
		
		System.out.println(inputName);
		System.out.println(inputAge);
	}

}