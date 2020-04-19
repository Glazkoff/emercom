import axios from "axios";

const myLoginRoutine = (user) =>
    new Promise((resolve, reject) => {
        axios({
                url: "auth",
                data: user,
                method: "POST",
            })
            .then((resp) => {
                const token = resp.data.token;
                localStorage.setItem("user-token", token); // сохранение токена в localstorage
                resolve(resp);
            })
            .catch((err) => {
                localStorage.removeItem("user-token"); // если запрос ошибочен, удаление токена в localstorage при возможности
                reject(err);
            });
    });

export default myLoginRoutine;