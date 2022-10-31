
const BASE_URL = 'http://nick-rathje.de:888';

export class BaseWebFetcher {

    protected async get<T>(route: string): Promise<T>
    {
        return await BaseWebFetcher.generalFetch<T>("GET", route);
    }

    protected async post<T>(route: string, body: any): Promise<T>
    {
        return await BaseWebFetcher.generalFetch<T>("POST", route, body);
    }

    private static async generalFetch<T>(method: string, route: string, body?: any): Promise<T>
    {
        const result = await window.fetch(`${BASE_URL}${route}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!result.ok) {
            throw new Error('Result is not ok');
        }
        return (await result.json()) as T;
    }
}
