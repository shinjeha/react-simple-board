import { makeAutoObservable } from 'mobx';

function movie() {
  return makeAutoObservable({
    movieList: [],
    movieCount() {
      return this.movieList.length;
    },
  });
}

export default movie;
