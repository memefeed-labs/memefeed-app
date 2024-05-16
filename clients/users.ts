const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3100';

const getUser = async (address: string) => {
    const response = await fetch(`${BASE_URL}/v1/user?address=${address}`);
    if (!response.ok) {
        throw new Error('Failed to get user');
    }

    return response.json();
};

type SignMessageAsync = (args: { message: string }) => Promise<string>;
const createUser = async (address: string, username: string, signMessageAsync: SignMessageAsync) => {
    try {
        // Generate a signature
        const message = `Create account with username: ${username}`;
        const signature = await signMessageAsync({ message });

        const response = await fetch(`${BASE_URL}/v1/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                address,
                signature,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        return response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export { getUser, createUser };
