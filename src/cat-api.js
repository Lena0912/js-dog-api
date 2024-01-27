
    const api_key =
        'live_W98260Uh6BnYfHxVL49pyAEjPqHNaRJoS7H3lp9VHbD2kKIfswThqYHZurjRek0D';
    const base_url = 'https://api.thecatapi.com/v1/';
    const end_point_breeds = 'breeds';
    const end_point_img = 'images/search';

    export function fetchBreeds() {
      const url = `${base_url}${end_point_breeds}?${api_key}`;

      return fetch(url)
        .then(resp => {
          if (!resp.ok) {
            throw new Error(resp.status);
          }
          return resp.json();
        })
        .catch(err => {
          console.err(
            'Oops! Something went wrong! Try reloading the page!',
            err
          );
        });
    }

export function fetchCatByBreed(breedId) {
    return fetch(`${base_url}${end_point_img}?api_key=${api_key}&breed_ids=${breedId}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        });
}
