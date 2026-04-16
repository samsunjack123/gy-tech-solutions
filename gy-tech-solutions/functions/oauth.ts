// File: /functions/oauth.ts

export interface Env {
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const url = new URL(request.url);

    // This is the main OAuth endpoint that GitHub will redirect to
    if (url.pathname === "/api/oauth/callback") {
        const code = url.searchParams.get("code");
        if (!code) {
            return new Response("Missing code", { status: 400 });
        }

        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code: code,
            }),
        });

        const data = await response.json<{ access_token?: string }>();
        if (!data.access_token) {
            return new Response("Failed to get access token", { status: 500 });
        }

        // Return the token as a simple JSON response
        return new Response(JSON.stringify({ token: data.access_token }), {
            headers: { "Content-Type": "application/json" },
        });
    }

    // If it's not the callback, return a 404
    return new Response("Not found", { status: 404 });
};