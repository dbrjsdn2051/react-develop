import {Link, Outlet} from "react-router";
import logo from "@/assets/logo.png"
import {SunIcon} from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png"
import ProfileButton from "@/layout/header/profile-button.tsx";
import ThemeButton from "@/layout/header/theme-button.tsx";

export default function GlobalLayout() {
    return <div className={"flex min-h-screen flex-col"}>
        <header className={"h-15 border-b"}>
            <div className={"flex justify-between h-full max-w-175 w-full m-auto px-4"}>
                <Link to={"/"} className={"flex items-center gap-2"}>
                    <img src={logo} alt={"logo"} className={"h-5"}/>
                    <div className="font-bold">SNS</div>
                </Link>
                <div className={"flex items-center gap-5"}>
                    <ThemeButton />
                    <ProfileButton/>
                </div>
            </div>
        </header>
        <main className={"flex-1 m-auto w-full max-w-175 border-x px-4 py-6"}>
            <Outlet/>
        </main>
        <footer className={"border-t py-10 text-muted-foreground text-center"}>
            @dbrjsdn2051
        </footer>
    </div>
}