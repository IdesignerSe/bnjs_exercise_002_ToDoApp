Bun.serve({
    hostname: "localhost",
    port: 4000,
    fetch: fetchHandler
});

function fetchHandler(request: Request): Response {

    return new Response(Bun.file("index.html"));
}