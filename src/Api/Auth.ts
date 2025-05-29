export type SigninData = {
    email: string;
    password: string;
};

export async function signin(data: SigninData): Promise<string | null> {
    try {
        const answer = await fetch('http://localhost:3000/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!answer.ok) {
        throw new Error(`Erreur serveur: ${answer.status}`);
        }

        const result = await answer.json();
        return result.token;
    } catch (error) {
        console.error('Erreur de connexion:', error);
        return null;
    }
}