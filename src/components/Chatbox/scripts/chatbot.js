
const responses = ['Really?', 'I totally agree', 'So am I', 'and how do you feel about that?']

export const greet = (submitter) => {
    setTimeout(() => submitter('Hi there!'), 2000 )
}

export const respond = (submitter) => {
    let reponseIdx = Math.floor(Math.random() * responses.length);
    let delay = 1000 + Math.floor(Math.random() * 3000);

    setTimeout(() => submitter(responses[reponseIdx]), delay )
}

