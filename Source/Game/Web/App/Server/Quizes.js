import rabbit from "rabbit.js";

export default class Quizes {
    constructor(express) {
        let self = this;

        express.get("/quizes", (request, response, next) => {
            self.getAll().then(all => {
                response.send(all);
            });
        });

        console.log("Quizes - game");

        let context = rabbit.createContext("amqp://localhost");
        context.on("ready", () => {
            let sub = context.socket("SUB");

            console.log("Ready");

            sub.setEncoding("utf8");

            sub.on("data", message => {
                console.log(`Data ${message}`);
            });

            sub.connect("events", () => {
                console.log("Connected");

            });
        });
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
