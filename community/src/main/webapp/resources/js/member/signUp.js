/* signUp.js */

// 유효성 검사 여부를 기록할 객체 생성
const checkObj = {
    "memberEmail"        : false,
    "memberPw"           : false,
    "memberPwConfirm"    : false,
    "memberNickname"     : false,
    "memberTel"          : false
};

// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

// ** input 이벤트 **
// -> 입력과 관련된 모든 동작(key관련, mouse관련, 붙여넣기)
memberTel.addEventListener("input", function(){

    // 입력이 되지 않은 경우
    if(memberTel.value.length == 0){
        telMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
        //telMessage.classList.remove("error");
        //telMessage.classList.remove("confirm");
        telMessage.classList.remove("confirm", "error");

        checkObj.memberTel = false; // 유효하지 않은 상태임을 기록
        return;
    }

    // 전화번호 정규식
    const regExp= /^0(1[01679]|2|[3-6][1-5]|70)\d{3,4}\d{4}$/;

    if(regExp.test(memberTel.value)){ // 유효한 경우
        telMessage.innerText = "유효한 전화번호 형식입니다.";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true; // 유효한 상태임을 기록

    }else{ // 유효하지 않은 경우
        telMessage.innerText = "전화번호 형식이 올바르지 않습니다.";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false; // 유효하지 않은 상태임을 기록
    }
});

// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.querySelector("#emailMessage");

memberEmail.addEventListener("input", function(){

    // 입력이 되지 않은 경우
    if(memberEmail.value.trim().length == 0){
        emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
        emailMessage.classList.remove("confirm", "error");

        checkObj.memberEmail = false; // 유효하지 않은 상태임을 기록
        return;
    }

    // 입력된 경우
    const regExp = /^[\w\-\_]{4,}@[\w\-\_]+(\.\w+){1,3}$/;

    if(regExp.test(memberEmail.value)){ // 유효한 경우

        // *********** 이메일 중복 검사(ajax) 진행 예정 *************

        // $.ajax( {K:V , K:V} ); //jQuery ajax 기본형태 


        // 입력된 이메일 == memberEmail.value 
        $.ajax({
            url : "emailDupCheck", // 필수 속성 url 
            // 현재 주소 : /community/member/signUp
            // 상대 경로 : /community/member/emailDupCheck

            data : { "memberEmail" : memberEmail.value },
            // data속성 : 비동기 통신 시 서버로 전달할 값을 작성(JS 객체 형식)
            // -> 비동기 통신 시 input에 입력된 값을 
            //    "memberEmail" 이라는 key 값(파라미터)으로 전달 

            type : "GET", // 데이터 전달 방식 type

            success : function(result){
                // 비동기 통신(ajax)가 오류없이 요청/응답 성공한 경우

                // 매개변수 result : servlet에서 출력된 result 값이 담겨 있음
                // console.log(result);
                if(result == 1){ // 중복 o

                    emailMessage.innerText = "이미 사용중인 이메일 입니다.";
                    emailMessage.classList.add("error");
                    emailMessage.classList.remove("confirm");
            
                    checkObj.memberEmail = false; // 유효 x 기록

                }else{ // 중복 x

                    
                    emailMessage.innerText = "사용 가능한 이메일 입니다.";
                    emailMessage.classList.add("confirm");
                    emailMessage.classList.remove("error");
            
                    checkObj.memberEmail = true; // 유효 o 기록
                }
            },

            error : function(){
                // 비동기 통신(ajax) 중 오류가 발생한 경우
                console.log("에러 발생");
            }
        });

    }else{ // 유효하지 않은 경우
        emailMessage.innerText = "이메일 형식이 올바르지 않습니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");
        checkObj.memberEmail = false; // 유효 X 기록
    }
});

// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nicknameMessage = document.getElementById("nicknameMessage");

memberNickname.addEventListener("input", function(){

    // 입력되지 않은 경우
    if(memberNickname.value.trim().length == 0){
        nicknameMessage.innerText = "영어/숫자/한글 2~10글자 사이로 작성해주세요.";
        nicknameMessage.classList.remove("confirm", "error");
        checkObj.memberNickname = false; // 유효 X 기록
        return;
    }

    const regExp = /^[a-zA-Z0-9가-힣]{2,10}$/; 

    if(regExp.test(memberNickname.value)){ // 유효한 경우
        

        // ************* 닉네임 중복 검사(ajax) 진행 예정 *************

        //  /community/member/nicknameDupCheck
        $.ajax({

            url : "nicknameDupCheck" ,  // 필수 작성 속성
            data : {"memberNickname" : memberNickname.value} , // 서버로 전달할 값(파라미터)
            type : "GET" , // 데이터 전달 방식 (기본값 GET)

            success : function(res){  // 비동기 통신 성공 시 (에러 발생 X)

                // 매개변수 res : Servlet에서 응답으로 출력된 데이터가 저장 

                if(res == 0 ){ // 닉네임 중복 x
                    nicknameMessage.innerText = "사용 가능한 닉네임 입니다.";
                    nicknameMessage.classList.add("confirm");
                    nicknameMessage.classList.remove("error");
                    checkObj.memberNickname = true; // 유효 O 기록

                }else { // 닉네임 중복 o

                    nicknameMessage.innerText = "이미 사용중인 닉네임 입니다.";
                    nicknameMessage.classList.add("error");
                    nicknameMessage.classList.remove("confirm");
                    checkObj.memberNickname = false; // 유효 x 기록
                }

            },

            error : function(){  // 비동기 통신 중 에러가 발생한 경우 
                console.log("에러 발생");
            }
        });

    } else{
        nicknameMessage.innerText = "닉네임 형식이 유효하지 않습니다.";
        nicknameMessage.classList.add("error");
        nicknameMessage.classList.remove("confirm");
        checkObj.memberNickname = false; // 유효 X 기록
    }
});

// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

memberPw.addEventListener("input", function(){

    if(memberPw.value.trim().length == 0){
        pwMessage.innerText = "영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요.";
        pwMessage.classList.remove("confirm", "error");
        checkObj.memberPw = false; // 유효 X 기록
        return;
    }

    const regExp = /^[\w!@#_-]{6,30}$/;

    if(regExp.test(memberPw.value)){ // 비밀번호 유효한 경우
        
        checkObj.memberPw = true; // 유효 O 기록

        if(memberPwConfirm.value.trim().length == 0){ // 비밀번호 유효, 확인 작성 X
            pwMessage.innerText = "유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");0


        } else{ // 비밀번호 유효, 확인 작성 O
            checkPw(); // 비밀번호 일치 검사 함수 호출()
        }

    } else{
        pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");
        checkObj.memberPw = false; // 유효 X 기록
    }

});

// 비밀번호 확인 유효성 검사

// 함수명() : 함수 호출(수행)
// 함수명   : 함수에 작성된 코드 반환 
memberPwConfirm.addEventListener("input", checkPw);
// -> 이벤트가 발생 되었을 때 정의된 함수를 호출하겠다.

function checkPw(){ // 비밀번호 일치 검사
    // 비밀번호 / 비밀번호 확인이 같을 경우
    if(memberPwConfirm.value == memberPw.value){
        pwMessage.innerText = "비밀번호가 일치합니다.";
        pwMessage.classList.add("confirm");
        pwMessage.classList.remove("error");
        checkObj.memberPwConfirm = true; // 유효 O 기록

    }else{
        pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm"); 
        checkObj.memberPwConfirm = false; // 유효 X 기록
    }
}

// 회원가입 버튼 클릭 시 유효성 검사가 완료 되었는지 확인하는 함수
function signUpValidate(){

        // checkObj에 있는 모든 속성을 반복 접근하여
        // false가 하나라도 있는 경우에는 form 태그 기본 이벤트 제거 
        let str;

        for(let key in checkObj){ // 객체용 향상된 for문

            // 현재 접근 중인 key의 value가 false인 경우 
            if(!checkObj[key]){

                switch(key){
                    case "memberEmail"      : str = "이메일이"; break;
                    case "memberPw"         : str = "비밀번호가"; break;
                    case "memberPwConfirm"  : str = "비밀번호 확인이"; break;
                    case "memberNickname"   : str = "닉네임이"; break;
                    case "memberTel"        : str = "전화번호가"; break;
                }

                str += " 유효하지 않습니다.";

                alert(str);

                document.getElementById(key).focus();

                return false; // form 태그 기본 이벤트 제거 
            }
        }
        return true;  // form 태그 기본 이벤트 수행 
}

