export default class Quizes {
    constructor(express) {
        let self = this;

        express.post("/quizes", (request, response, next) => {
            console.log("post");
            response.status(200);
        });

        express.put("/quizes", (request, response, next) => {
            console.log("put");
            response.status(200);
        });

        

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });
    }

    create() {

    }

    getAll() {
        let promise = new Promise((resolve, reject) => {
            resolve([
                {
                    id: 42, title: "Magical quiz", description: "This is the awesome one", questions: [
                        {
                            question: "Name all magicians", options: [
                                { text: "Lord Vader", isCorrect: false },
                                { text: "El Presidento", isCorrect: false },
                                { text: "David Blaine", isCorrect: true },
                                { text: "David Copperfield", isCorrect: true }
                            ]
                        }

                    ]
                },
                { title: "Magical quiz", description: "This is the awesome one" },
                { title: "Magical quiz", description: "This is the awesome one" },
                { title: "Magical quiz", description: "This is the awesome one" }
            ])

        });
        return promise;
    }

}
