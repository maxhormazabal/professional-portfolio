
const mediumUsername = "maxhormazabal";
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40${mediumUsername}`;

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const posts = data.items;
    let output = "";

    const nameMonths = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']

    posts.forEach((post,index) => {
        // Contenido
        const content_without_caption = post.content.replace(/<figcaption>(.*?)<\/figcaption>/g, ''); // Quita la descripción de la imagen inicial
        const content_without_subtitle = content_without_caption.replace(/<h4>(.*?)<\/h4>/g, ''); // Quita el subtitulo
        const content = content_without_subtitle.replace(/<[^>]+>/g, '').substr(0, 150)+'...'; //Ignora todas las etiquetas HTML
        const hasImage = post.thumbnail && post.thumbnail !== ''; // Booleano que evalúa si existe una imagen y si es distinta de vacío
        const activeClass = index === 0 ? 'active' : ''; // Ternario que entrega la clase CSS que activa el div en caso de existir post, el === es comparacion estricta
        const publicationTitle = post.title
        const publicationLink = post.link

        const stringDate = post.pubDate
        const justDate = stringDate.split(' ')[0]
        const year = justDate.split('-')[0]
        const month = justDate.split('-')[1]
        const name_month = nameMonths[Number(month)-1]
        const day = justDate.split('-')[2]
        const imageLink = post.thumbnail

        output += `
        <div class="col-lg-4 mb-5">
            <div class="position-relative mb-4">
                <a target="_blank" class="" href="${publicationLink}">
                    <img class="img-fluid rounded w-100 blog-image" src="${imageLink}" alt="">
                </a>
                <div class="blog-date">
                    <h4 class="font-weight-bold mb-n1">${day}</h4>
                    <small class="text-white text-uppercase">${name_month}</small>
                </div>
            </div>
            <h5 class="font-weight-medium mb-4">${publicationTitle}</h5>
            <p>${content}</p>
            <a target="_blank" class="btn btn-sm btn-outline-primary py-2" href="${publicationLink}">Read More</a>
        </div>
        `
    });
    document.getElementById("blog-posts").innerHTML = output
})
.catch(error => console.error(error));