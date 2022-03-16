const gitUsersDemo = async () => {
    try {
        const resultsElement = document.getElementById('results');
        const usersResponce = await fetch('users.json');
        const users = await usersResponce.json();
        const gitUsers = await Promise.all(
            users.map(async (user) => {
                const gitUsersResponse = await fetch(`http://api.github.com/users/${user.username}`);
                return gitUsersResponse.json();
            })
        );

        console.log(gitUsers);
        const images = gitUsers.map((gitUser) => {
            const image = new Image();
            image.src = gitUser.avatar_url;
            resultsElement.appendChild(image);
            return image;
        });

        await new Promise((resolve, reject) => {
            setTimeout(resolve, 5000);
        });
        return images;
    } catch (err) {
        console.log(err);
    } finally {
        console.log('Demo finished!');
    }
};

window.addEventListener('load', gitUsersDemo);
