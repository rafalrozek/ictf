export function MainWelcomeText() {
    return <>
        <h1 className={"title"}>Zaloguj się,<br/>aby wziąć udział.</h1>
        <h2 className={"subtitle"}>Jeśli nie masz konta, możesz się <a href={"/register"}
               style={{textDecoration: "underline"}} >zarejestrować
            </a>.

        </h2>
    </>;
}