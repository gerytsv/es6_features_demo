const gitUsersDemo = function () {
    const resultsElement = document.getElementById('results');

    fetch('users.json')
        .then((usersResponse) => usersResponse.json())
        .then((users) => {
            console.log(users);
            return Promise.all(
                users.map((user) => fetch(`http://api.github.com/users/${user.username}`).then((user) => user.json()))
            );
        })
        .then((gitUsers) => {
            console.log(gitUsers);
            const images = gitUsers.map((gitUser) => {
                const image = new Image();
                image.src = gitUser.avatar_url;
                resultsElement.appendChild(image);
                return image;
            });

            return new Promise((resolve, reject) => {
                setTimeout(resolve, 5000, images);
            });
        })
        .finally(() => console.log('Demo finished.'));
};

window.addEventListener('load', gitUsersDemo);
