import { type } from "os";
import {renderToString} from "react-dom/server";

const server = Bun.serve({
    hostname: "localhost",
    port: 4000,
    fetch: fetchHandler
});

console.log(`Bun Todo running on ${server.hostname}: ${server.port}`);

type Todo = { id: number; name: string};
const todos: Todo[] = [];

function fetchHandler(request: Request): Response {
    const url = new URL(request.url)
    if(url.pathname === "" || url.pathname === "/"){
        return new Response(Bun.file("index.html"));
    }

    if(url.pathname === "/todos" && request.method === "GET"){
        return new Response(renderToString(<TodoList todos={todos } />));
    }

    return new Response ("Not Found", { status: 404});
}

function TodoList(props: { todos: Todo[] }) {
    return (
    <ul>
        {props.todos.length ? props.todos.map((todo) => <li>{todo.name}</li>) : "No todo found"}
    </ul>
    );
}
