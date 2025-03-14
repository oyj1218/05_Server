package edu.kh.jsp.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/pizzaOrder")
public class PizzaOrderServlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
//		파라미터 얻어오기
		String pizza = req.getParameter("pizza");
		
//		* radio 타입의 값은 1개밖에 전달되지 않으므로 getParameter()를 사용한다.
		String size = req.getParameter("size");
		
//		* 파라미터는 모두 String이다.
//		-> String을 정수로 변경하고 싶은 경우
//		   Integer.parseInt("문자열")을 사용하여 변경(파싱)
		
		int amount = Integer.parseInt( req.getParameter("amount") );
		
//		피자 - 1판 1만원
//		사이즈 - L인 경우 3천원 추가
//		수량 - 1 ~ 10판
//		(피자 + 사이즈) * 수량
		
		int temp = 0; // 사이즈에 따른 추가 금액
		
		if(size.equals("L")) { // L 사이즈면 3천원으로 변경
			temp = 3000;
		}
		
		int result = (10000 + temp) * amount;
		
//		응답 화면 작성하는 것을 JSP 위임
		
//		JSP 경로는 webapp 폴더를 기준으로 작성
		RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/views/orderResult.jsp");
		
		req.setAttribute("res", result);
		
		dispatcher.forward(req, resp);
	}

}