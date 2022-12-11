import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage';
import { exit } from 'process'
const optionDefinitions = [
    { name: 'title', alias: 't', type: String },
    { name: 'min', type: Number },
    { name: 'max', type: Number },
    { name: 'help' },
];
const sections = [
    {
        header: '狗屁不通文章生成器',
        content: '生成随机的文章段落用于测试',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'title',
                typeLabel: '{underline string}',
                description: '文章的主题。',
            },
            {
                name: 'min',
                typeLabel: '{underline number}',
                description: '文章最小字数。',
            },
            {
                name: 'max',
                typeLabel: '{underline number}',
                description: '文章最大字数。',
            },
        ],
    },
];
const usage = commandLineUsage(sections);
export function parseOptions() {
    const argv = commandLineArgs(optionDefinitions);
    if ('help' in argv) { // 如果输入的是help，就打印帮助文本
        console.log(usage);
        exit()
    } else {
        return argv;
    }
}
