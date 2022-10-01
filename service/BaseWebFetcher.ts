
const BASE_URL = 'http://10.0.4.214:5000';

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
            headers: body ? {
                'Content-Type': 'application/json'
            } : undefined,
            mode: 'no-cors',
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!result.ok) {
            throw new Error('Result is not ok');
        }
        return (await result.json()) as T;
    }
}
