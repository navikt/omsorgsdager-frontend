export async function patch(
    path: string,
    body?: any
): Promise<Response> {
    return await fetch(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
}