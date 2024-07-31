// console.log("test")
// 미리보기 관련 요소 모두 얻어오기
// --> 동일한 개수의 요소가 존재함 == 인덱스 일치함

const preview = document.getElementsByClassName("preview");
const inputImage = document.getElementsByClassName("inputImage");
const deleteImage = document.getElementsByClassName("delete-image");

// 게시글 수정 시 삭제된 이미지의 레벨(위치)를 저장할 input 요소
const deleteList = document.getElementById("delteList");

// 게시글 수정 시 삭제된 이미지의 레벨(위치)를 기록해둘 Set 생성
const deleteSet = new Set(); // 중복 허용 X, 순서 X -> 여러번 클릭 시 중복 값 저장 방지



for(let i=0; i<inputImage.length; i++){

    // 파일이 선택 되었을 때
    inputImage[i].addEventListener("change", function(){

        if(this.files[0] != undefined){
            
            const reader = new FileReader();
            // 선택된 파일을 읽을 객체 생성

            reader.readAsDataURL(this.files[0]);
            // 지정된 파일을 읽음 -> result에 저장(URL 포함)
            // -> URL을 이용해서 이미지를 볼 수 있음

            reader.onload = function(e){// reader가 파일을 다 읽어온 경우
                // e.target == reader
                // e.target.result == 읽어들인 이미지의 URL 포함  
                // preview[i] == 파일이 선택된 input 태그와 인접한 preview 이미지 태그  
                preview[i].setAttribute("src", e.target.result);

                // 이미지를 다시 불러왔을 경우
                // deleteSet에서 해당 레벨 제거해줘야 함
                // deleteSet.clear(); clear는 모든 요소를 삭제
                deleteSet.delete(i);
                // delete는 특정 요소를 삭제

           
            }


        } else{ // 파일이 선택이 되지 않았을 때 (취소)
            preview[i].removeAttribute("src");


        }

            
    })

    // 미리보기 삭제 버튼(x)이 클릭 되었을 때
    deleteImage[i].addEventListener("click", function(){

        // 이미지가 있을 때만 x버튼이 동작되게
        // 만약에 미리보기가 존재하는 경우에만 x버튼 동작해야 한다
        // 미리보기가 존재하는 경우에만 (이전에 추가된 이미지가 있을 때만) x버튼 동작
        if(preview[i].getAttribute("src") != ""){
            alert("사진이 있습니다 이 사진을 정말 취소하시겠습니까?")

            // 미리보기 삭제
            preview[i].removeAttribute("src");

            // input의 값 "" 만들기
            inputImage[i].value = "";

            // deleteSet에 삭제된 이미지 레벨(i) 추가
            deleteSet.add(i);
        }
        else{
            alert("사진이 없습니다 사진 먼저 넣어주세요")
        }

    })
    


}

// 게시글 작성 유효성 검사
function writeValidate(){
    const boardTitle = document.getElementsByName('boardTitle')[0];
    const boardContent = document.querySelector("[name='boardContent]");

    if(boardTitle.value.trim().length == 0){
        alert("제목을 입력해주세요.");
        boardTitle.focus();
        boardTitle.value = "";
        return false();
    }


    if(boardContent.value.length == 0){
        alert("내용을 입력해주세요.");
        boardContent.focus();
        boardContent.value = "";
        return false;

    }

    // 제목, 내용이 유효한 경우
    // deleteList(input 태그)에 deleteSet(삭제된 이미지 레벨)을 추가
    // -> JS 배열의 특징 이용
    //    : JS 배열을 HTML 요소 또는 console에 출력하게 되는 경우 0,1,2,3 과 같은 문자열로 출력
    //      (배열 기호 사라짐)


    // * Set -> Array로 변경 -> deleteList.value에 대입

    // Array.from(유사배열 | 컬렉션) : 유사배열 | 컬렉션을 배열로 변환해서 반환
    deleteList.value = Array.from(deleteSet);

    return true;


}