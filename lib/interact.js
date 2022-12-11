import readline from 'readline';
const questions = [
    { text: '请输入文章主题', key: "title", value: 'lalal' },
    { text: '请输入最小字数', key: "min", value: 6000 },
    { text: '请输入最大字数', key: "max", value: 10000 },
]
function question(rl, { text, value }) {
    const q = `${text}(${value})\n`;
    return new Promise((resolve) => {
        rl.question(q, (answer) => {
            resolve(answer || value);
        });
    });
}
export async function interact(defaultValue = {}) {
    for (let key of Object.keys(defaultValue)) {
        const target = questions.find(item => item.key === key)
        if (target) {
            target.value = defaultValue[key]
        }
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answers = {};
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const answer = await question(rl, q); // 等待问题的输入
        answers[q.key] = answer
    }
    rl.close();
    return answers;
}