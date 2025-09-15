
async function getUserData (userId: string): Promise<any> {
    const data = await fetch(`https://api.example.com/users/${userId}`)

    return data.json()
}
