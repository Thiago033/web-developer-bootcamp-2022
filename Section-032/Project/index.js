import {franc, francAll} from 'franc';
import langs from 'langs';

const input = process.argv[2];

console.log("String passada:");
console.log(input);

console.log("");

const langCode = franc(input);

if (langCode === 'und'){
    console.log("Sorry, couldn't figure it out!");
} else {
    const language = langs.where("3", langCode);
    console.log(`Language detected: ${language.name}`);
}

