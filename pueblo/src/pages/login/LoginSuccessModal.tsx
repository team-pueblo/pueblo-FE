import { useEffect, useRef } from "react";
import styled from "styled-components";
const Dialog = styled.dialog`
 width:calc(100% - 40px);max-width:360px;box-sizing:border-box;padding:36px 28px 28px;
 border:1px solid #e8e8e8;border-radius:8px;background:#fff;color:#222;text-align:center;font-family:inherit;
 box-shadow:0 16px 56px rgb(0 0 0 / 12%);
 &::backdrop{background:rgb(0 0 0 / 40%);}
 .brand{margin:8px 0 18px;}
 .brand img{display:block;width:126px;height:auto;margin:0 auto;}
 h2{margin:0 0 12px;font-size:18px;font-weight:600;letter-spacing:-.02em;outline:none;}
 p{margin:0 0 28px;font-size:13px;line-height:1.8;color:#777;}
 button{width:100%;height:42px;border:1px solid #111;border-radius:3px;background:#111;color:#fff;font:inherit;font-size:13px;cursor:pointer;transition:background .15s;}
 button:hover{background:#333;} button:focus-visible{outline:2px solid #fff;outline-offset:-5px;}
 @media(max-width:400px){padding:30px 24px 24px;}
`;
export default function LoginSuccessModal({onConfirm}:{onConfirm:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 const titleRef=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{const dialog=ref.current;if(dialog&&!dialog.open){dialog.showModal();titleRef.current?.focus();}return()=>dialog?.close();},[]);
 return <Dialog ref={ref} aria-labelledby="login-success-title" aria-describedby="login-success-description" onCancel={e=>{e.preventDefault();onConfirm();}}>
  <div className="brand"><img src="/images/pueblo_logo.png" alt="pueblo"/></div>
  <h2 ref={titleRef} tabIndex={-1} id="login-success-title">로그인 완료</h2>
  <p id="login-success-description">다시 만나 반가워요.<br/>pueblo에서 나만의 스타일을 찾아보세요.</p>
  <button type="button" onClick={onConfirm}>쇼핑 계속하기</button>
 </Dialog>;
}
