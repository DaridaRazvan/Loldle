export const fetchChampion = async () => {
    const response = await fetch('http://localhost:8080/api/champion/random');

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    const responseData = await response.json();

    return responseData;
}

export const getChampion = async (inputChampion) => {

    const response = await fetch(`http://localhost:8080/api/champion/get/${inputChampion}`);

    if (!response.ok) {
        throw new Error(response.status)
    }
    const responseData = await response.json();

    return responseData;
}

export const getChampions = async (prefix) => {
    const response = await fetch(`http://localhost:8080/api/champion/get/prefix/${prefix}`);

    if (!response.ok) {
        throw new Error(response.status)
    }
    const responseData = await response.json();

    return responseData;
}