import { useEffect, useRef } from "react";
import styled from "styled-components";
const Dialog = styled.dialog`
 width:calc(100% - 40px);max-width:340px;box-sizing:border-box;padding:32px 24px 24px;
 border:1px solid #ddd;border-radius:0;background:#fff;color:#222;text-align:center;font-family:inherit;
 &::backdrop{background:rgb(0 0 0 / 40%);}
 h2{margin:0 0 12px;font-size:18px;font-weight:600;} p{margin:0 0 28px;font-size:13px;line-height:1.6;color:#666;}
 button{width:100%;height:40px;border:1px solid #111;background:#111;color:#fff;font:inherit;font-size:13px;cursor:pointer;}
 button:focus-visible{outline:2px solid #222;outline-offset:3px;}
`;
export default function LoginSuccessModal({onConfirm}:{onConfirm:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;if(dialog&&!dialog.open)dialog.showModal();return()=>dialog?.close();},[]);
 return <Dialog ref={ref} aria-labelledby="login-success-title" aria-describedby="login-success-description" onCancel={e=>{e.preventDefault();onConfirm();}}><h2 id="login-success-title">로그인 완료</h2><p id="login-success-description">로그인되었습니다.<br/>pueblo에서 쇼핑을 계속해보세요.</p><button type="button" autoFocus onClick={onConfirm}>확인</button></Dialog>;
}
