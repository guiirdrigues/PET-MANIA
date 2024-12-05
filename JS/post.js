function searchPosts() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var posts = document.getElementsByClassName('post');

    for (var i = 0; i < posts.length; i++) {
        var postTitle = posts[i].getAttribute('data-title').toLowerCase();

        if (postTitle === searchInput) {
            posts[i].scrollIntoView({ behavior: 'smooth' });
            return;
        }
    }

    alert('Post não encontrado.');
}