const form = document.forms.searchForm;
const search_input = form.searchInput;
const xdel = document.querySelector('.del');
const search_btn = form.searchButton;
let check = false;
let detail;
let arr;
let fullArr = [];
search_input.addEventListener('focus', () => {
    xdel.classList.add('showDel');
});
xdel.addEventListener('click', () => {
    search_input.value = '';
    xdel.classList.remove('showDel');
});
search_btn.addEventListener('click', async () => {
    xdel.classList.remove('showDel');
    event.preventDefault();
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=68c9cab0&s=${search_input.value}`);
        const data = await response.json();
        if(fullArr.length>0){
            fullArr=[];
        }
        for (let i = 0; i < data.Search.length; i++) {
            const full = await fetch(`http://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=68c9cab0`);
            const info = await full.json();
            fullArr.push(info);
        }
        return elem(fullArr);
    } catch (err) {
        return console.log(err);
    }
});
function elem(data) {
    console.log(data);
    if (check) {
        document.body.removeChild(document.querySelector('.container'));
    }
    const container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
    for (let i = 0; i < data.length; i++) {
        createElements(data, i);
    }
    detail = document.querySelector('.btn-detailes');
    arr = Object.assign({}, data);

}
function moreDetailes() {
    document.querySelector('.ratings').innerHTML='';
    let container = document.querySelector('.container');
    document.querySelector('.modal').classList.remove('hide');
    document.querySelector('*').style.overflow = 'hidden';
    for (let i = 0; i < container.children.length; i++) {
        for (let j = 0; j < document.querySelector('.movie').children.length; j++) {
            if (container.children[i].children[j] == event.target) {
                document.querySelector('.image').setAttribute('src', `${arr[i].Poster}`);
                document.querySelector('.title').textContent = arr[i].Title;
                document.querySelector('.rating').textContent = arr[i].Rated + ' ' + arr[i].Year + ' ' + arr[i].Genre;
                document.querySelector('.plot').textContent = arr[i].Plot;
                document.querySelector('.written').textContent = arr[i].Writer;
                document.querySelector('.directed').textContent = arr[i].Director;
                document.querySelector('.starring').textContent = arr[i].Actors;
                document.querySelector('.boxOffice').textContent = arr[i].BoxOffice;
                document.querySelector('.awards').textContent = arr[i].Awards;
                for(let k=0; k<arr[i].Ratings.length;k++){
                    document.querySelector('.ratings').innerHTML += arr[i].Ratings[k].Source +' '+ arr[i].Ratings[k].Value + '<br>';

                }


            }
        }
    }
}
function createElements(data, ind) {
    const container = document.querySelector('.container');
    const cont = document.createElement('div');
    const image = document.createElement('img');
    const movieName = document.createElement('p');
    const movietype = document.createElement('span');
    const movieYear = document.createElement('span');
    const btnDetailes = document.createElement('button');
    image.setAttribute('src', `${data[ind].Poster}`);
    cont.classList.add('movie');
    movieName.classList.add('movie_name');
    movietype.classList.add('type');
    movieYear.classList.add('movie_year');
    btnDetailes.classList.add('btn-detailes');
    btnDetailes.textContent = 'More detailes';
    btnDetailes.setAttribute('onclick', `moreDetailes()`);
    movieName.textContent = data[ind].Title;
    movieYear.textContent = data[ind].Year;
    movietype.textContent = data[ind].Type;
    container.appendChild(cont);
    cont.appendChild(image);
    cont.appendChild(movieName);
    cont.appendChild(movietype);
    cont.appendChild(movieYear);
    cont.appendChild(btnDetailes);
    check = true;
}
document.querySelector('.modal').addEventListener('click', () => {
    document.querySelector('.modal').classList.add('hide');
    document.querySelector('*').style.overflow = 'auto';

})
