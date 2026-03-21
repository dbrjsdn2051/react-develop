import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return <div className={"h-[100vh] w-[100vw] bg-muted flex flex-col items-center justify-center"}>
    <div className={"flex items-center gap-4 mb-15 animate-bounce"}>
      <img src={logo} alt={"logo"} className={"w-10"} />
      <div className={"text-2xl font-bold"}>LOG</div>
    </div>
  </div>;
}