import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'
// import { parseOptions } from './lib/cmd.js'
import { loadCorpus, saveCorpus } from './lib/corpus.js'
import { interact } from './lib/interact.js'
const corpus = loadCorpus('corpus/data.json')
const pickTitle = createRandomPicker(corpus.title);
const title = pickTitle();
const userInput = await interact({
    title
})
// const inputOptions = parseOptions(...userInput)
const article = generate(title, { corpus, ...userInput });
saveCorpus(title, article)