export default class Quizes
{
    constructor(express) {
        let self = this;

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });
    }


    getAll() {
        let promise = new Promise((resolve, reject) => {
            resolve([
                { title: "Magical quiz", description: "This is the awesome one" },
                { title: "Magical quiz", description: "This is the awesome one" },
                { title: "Magical quiz", description: "This is the awesome one" },
                { title: "Magical quiz", description: "This is the awesome one" }
            ])

        });
        return promise;
    }

}
