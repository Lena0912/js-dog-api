
    const API_KEY =
      'live_W98260Uh6BnYfHxVL49pyAEjPqHNaRJoS7H3lp9VHbD2kKIfswThqYHZurjRek0D';
    const BASE_URL = 'https://api.thecatapi.com/v1/';
    const END_POINT_BREEDS = 'breeds';
    const END_POINT_IMG = 'images/search';

    export function fetchBreeds() {
      const url = `${BASE_URL}${END_POINT_BREEDS}?${API_KEY}`;

      return fetch(url)
        .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      });
    }
    

export function fetchCatByBreed(breedId) {
    return fetch(
      `${BASE_URL}${END_POINT_IMG}?api_key=${API_KEY}&breed_ids=${breedId}`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    });
}
