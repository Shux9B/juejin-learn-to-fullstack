import { generate } from './lib/generator.js'
// import { createRandomPicker } from './lib/random.js'
export async function loadCorpus() {
    const corpus = await (await fetch('./corpus.json')).json();
    return corpus;
}
export function gen(userInput) {
    return {
        title: userInput.title,
        article: generate(userInput.title, userInput)
    }
}
