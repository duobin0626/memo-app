async function createMemo(value) {
  // await 은 async 가 function 앞에 꼭 붙어있어야 한다.!
  //   const res = await fetch("/memos"); // 이렇게 보내면 get요청(달라는 요청)을 보내게된다. 우리는 post요청을 보내야함
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
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
