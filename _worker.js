export default {
    async fetch(request, env) {
        const response = await env.ASSETS.fetch(request);

        const headers = new Headers(response.headers);
        headers.set('Content-Security-Policy',
            "default-src 'self'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src https://fonts.gstatic.com; " +
            "script-src 'self'; " +
            "img-src 'self' data:; " +
            "connect-src 'none'; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self'"
        );
        headers.set('X-Content-Type-Options', 'nosniff');
        headers.set('X-Frame-Options', 'DENY');
        headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
        headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
    }
};
