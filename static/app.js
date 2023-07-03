// 메모 업데이트
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 내용을 입력 하세요.");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT" /* PUT : 수정 */,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id /* // id:id = id 하나만 적어도 된다. */,
      content: editInput,
    }),
  });
  readMemo();
}

// 메모조회 출력
function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  const editBtn = document.createElement("button");

  li.innerText = `[id:${memo.id}] ${memo.content}`;
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
}

// 메모조회
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  // console.log(jsonRes);
  // jsonRes = [{id: '2023-07-03T03:15:32.490Z', content: '내용'}}]
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = ""; // ul 초기화
  jsonRes.forEach(displayMemos);
}

// 메모생성
async function createMemo(value) {
  // await 은 async 가 function 앞에 꼭 붙어있어야 한다.!
  //   const res = await fetch("/memos"); // 이렇게 보내면 get요청(달라는 요청)을 보내게된다. 우리는 post요청을 보내야함
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  // const jsonRes = await res.json();
  // console.log(jsonRes);
  readMemo();
}

function handleSubmit(event) {
  // .preventDefault() : event의 실행을 막음.
  // form에 있는 submitd의 redirect(새로고침)event를 막는 함수선언
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

// 새로고침을 해도 조회된 메모가 그대로 있는 이유는
// 서버에 있는 (memos)를 가져와서 ul에 업데이트 해주고 있음.
// ul을 초기화 시킨 다음에 가져온 값으로 업데이트 하고 있으니까
// 항상 새로운 값으로 선언되어 있다.
readMemo();
