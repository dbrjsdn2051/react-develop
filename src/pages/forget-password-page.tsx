import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/auth/use-request-password-reset-email.ts";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error.ts";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const {
    mutate: requestPasswordResetEmail,
    isPending: isReqeustPasswordResetEmailPending
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증 메일이 잘 발송되었습니다.");
      setEmail("");
    },
    onError: error => {
      const message = generateErrorMessage(error);
      toast.error(message);
      setEmail("");
    }
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") {
      return;
    }
    requestPasswordResetEmail(email);

  };


  return <div className={"flex flex-col gap-8"}>
    <div className={"flex flex-col gap-1"}>
      <div className={"text-xl font-bold"}>비밀번호를 잊으셨나요?</div>
      <div className={"text-muted-foreground"}>이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.</div>
    </div>
    <Input disabled={isReqeustPasswordResetEmailPending} value={email} onChange={(e) => setEmail(e.target.value)}
           className={"py-6"}
           placeholder={"example@abc.com"} />
    <Button disabled={isReqeustPasswordResetEmailPending} onClick={handleSendEmailClick} className={"w-full"}>인증 메일
      요청하기</Button>
  </div>;
}