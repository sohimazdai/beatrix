type TGoogleUserData = {
    id: string,
    email: string,
    name: string,
};

export default async function fetchGoogleUserInfo(
    accessToken: string,
): Promise<TGoogleUserData> {
    const packedUserData: any = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const unpackedUserData: TGoogleUserData = await packedUserData.json();

    return unpackedUserData;
}