import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password.ts";
import { useNavigate } from "react-router";
import { generateErrorMessage } from "@/lib/error.ts";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } = useUpdatePassword({
    onSuccess: () => {
      toast.success("Password reset successfully.");
      navigate("/");
    },
    onError: error => {
      const message = generateErrorMessage(error);
      toast.error(message);
      setPassword("");
    }
  });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") {
      return;
    }
    updatePassword(password);
  };

  return <div className={"flex flex-col gap-8"}>
    <div className={"flex flex-col gap-1"}>
      <div className={"text-xl font-bold"}>비밀번호 재설정하기</div>
      <div className={"text-muted-foreground"}>새로운 비밀번호를 입력하세요</div>
    </div>
    <Input disabled={isUpdatePasswordPending} value={password} onChange={(e) => setPassword(e.target.value)}
           type={"password"} className={"py-6"}
           placeholder={"password"} />
    <Button disabled={isUpdatePasswordPending} onClick={handleUpdatePasswordClick} className={"w-full"}>비밀번호
      변경하기</Button>
  </div>;
}