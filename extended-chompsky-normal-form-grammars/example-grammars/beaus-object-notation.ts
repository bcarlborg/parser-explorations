import type {Grammar, GrammarRuleRightHandSides, GrammarRuleRightHandSide } from '../grammar-types';

type BON_NON_TERMINALS = 'ARRAY' 
| 'OPEN_CONTENT' 
| 'CLOSE_CONTENT' 
| 'LEFT_BRACKET' 
| 'RIGHT_BRACKET' 
| 'STRING' 
| 'STRING_OPEN'
| 'STRING_CONTENT'
| 'QUOTE'
| 'LETTER'
| 'NUMBER' 
| 'DIGIT' 
| 'CONTENT' 
| 'CONTENTS' 
| 'COMMA';

type BON_TERMINALS = ','
| '['
| ']'
| ','
| '"'
| '0'
| '1'
| '2'
| '3'
| '4'
| '5'
| '6'
| '7'
| '8'
| '9'
| 'a'
| 'b'
| 'c'
| 'd'
| 'e'
| 'f'
| 'g'
| 'h'
| 'i'
| 'j'
| 'k'
| 'l'
| 'm'
| 'n'
| 'o'
| 'p'
| 'q'
| 'r'
| 's'
| 't'
| 'u'
| 'v'
| 'w'
| 'x'
| 'y'
| 'z'

export const BON_GRAMMAR: Grammar<BON_NON_TERMINALS, BON_TERMINALS> = {
    startSymbol: 'ARRAY',
    rules: {
        // Array -> Left_bracket Right_bracket
        //        | OpenContent CloseContent
        ['ARRAY']: [
            { nonTerminal1: 'LEFT_BRACKET', nonTerminal2: 'RIGHT_BRACKET' },
            { nonTerminal1: 'OPEN_CONTENT', nonTerminal2: 'CLOSE_CONTENT' },
        ],

        // Open_content -> Left_bracekt Content
        ['OPEN_CONTENT']: [
            { nonTerminal1: 'LEFT_BRACKET', nonTerminal2: 'CONTENT' }
        ],

        // Close_content -> Right_bracket
        ['CLOSE_CONTENT']: [
            { nonTerminal1: 'RIGHT_BRACKET' }
        ],

        // Content -> Number
        //          | Number Contents
        ['CONTENT']: [
            { nonTerminal1: 'NUMBER' },
            { nonTerminal1: 'STRING' },
            { nonTerminal1: 'NUMBER', nonTerminal2: 'CONTENTS' },
            { nonTerminal1: 'STRING', nonTerminal2: 'CONTENTS' }
        ],

        // Contents -> Comma Content
        ['CONTENTS']: [
            { nonTerminal1: 'COMMA', nonTerminal2: 'CONTENT' }
        ],

        ['STRING']: [
            { nonTerminal1: 'QUOTE', nonTerminal2: 'QUOTE' },
            { nonTerminal1: 'STRING_OPEN', nonTerminal2: 'QUOTE' }
        ],

        ['STRING_OPEN']: [
            { nonTerminal1: 'QUOTE', nonTerminal2: 'STRING_CONTENT' },
        ],

        ['STRING_CONTENT']: [
            { nonTerminal1: 'LETTER' },
            { nonTerminal1: 'LETTER', nonTerminal2: 'STRING_CONTENT' }
        ],

        // Number -> Digit
        //         | Digit Number
        ['NUMBER']: [
            { nonTerminal1: 'DIGIT' },
            { nonTerminal1: 'DIGIT', nonTerminal2: 'NUMBER' }
        ],

        // mapping Non Terminals to Terminals
        ['DIGIT']: [
            { terminal: '0' },
            { terminal: '1' },
            { terminal: '2' },
            { terminal: '3' },
            { terminal: '4' },
            { terminal: '5' },
            { terminal: '6' },
            { terminal: '7' },
            { terminal: '8' },
            { terminal: '9' },
        ],
        ['LETTER']: [
            { terminal: 'a' },
            { terminal: 'b' },
            { terminal: 'c' },
            { terminal: 'd' },
            { terminal: 'e' },
            { terminal: 'f' },
            { terminal: 'g' },
            { terminal: 'h' },
            { terminal: 'i' },
            { terminal: 'j' },
            { terminal: 'k' },
            { terminal: 'l' },
            { terminal: 'm' },
            { terminal: 'n' },
            { terminal: 'o' },
            { terminal: 'p' },
            { terminal: 'q' },
            { terminal: 'r' },
            { terminal: 's' },
            { terminal: 't' },
            { terminal: 'u' },
            { terminal: 'v' },
            { terminal: 'w' },
            { terminal: 'x' },
            { terminal: 'y' },
            { terminal: 'z' },
        ],
        ['LEFT_BRACKET']: [{ terminal: '[' }],
        ['RIGHT_BRACKET']: [{ terminal: ']' }],
        ['COMMA']: [{ terminal: ',' }],
        ['QUOTE']: [{ terminal: '"' }],
    },
}
